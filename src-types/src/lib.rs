use std::{any::type_name, path::PathBuf};
use std::collections::{HashMap, HashSet};
use component::{Archetype, ComponentGroup};
use serde::{de::DeserializeOwned, Serialize};
use serde_json::{Error, Map, Value};
use ts_rs::{ExportError, TS};
use crate::prelude::Bulk;

pub mod component;

pub mod prelude {
    pub use crate::component::core::*;
}

pub fn generate_types(mut path : PathBuf) -> Result<(), ts_rs::ExportError> {
    // Entity::export_all_to(path.clone())?;
    Bulk::export_all_to(path.clone())?;
    
    let mut entity = Entity::new();
    
    
    //This is a fix for the generated TS file.
    //The problem is that since the key of th `components` HashMap is a `ComponentId` enum, the generated TS file will have the key that type.
    //In TS, `ComponentID` is an enum, so we need to change the generated file to have `key in ComponentID` instead of `key: ComponentID`.
    //This is a temporary fix until the `ts-rs` crate is updated to support this.
    //You can track this at the following issue: https://github.com/Aleph-Alpha/ts-rs/issues/349
    // path.push("Entity.ts");
    // let entity_file = read_to_string(&path)?;
    // let entity_file = entity_file.replace("key: ", "key in ");
    // let mut file = OpenOptions::new().write(true).truncate(true).open(&path)?;
    // file.write(entity_file.as_bytes())?;
    
    Ok(())
}

//=========================================================================================================================
//           Entity Struct
//=========================================================================================================================

/// An object that holds up to one of each Component type. This is how everything is represented in vitruvian.
#[derive(Default)]
pub struct Entity {
    compnents : HashMap<String, Box<dyn Component>>,
    archetype : HashSet<String>
}

impl Entity {
    fn new() -> Self {
        Self::default()
    }
    
    fn add<T : ComponentGroup + 'static>(&mut self, data : T) {
        for component in data.components_take() {
            let name = component.id();
            self.archetype.insert(name.to_string());
            self.compnents.insert(name.to_string(), component);
        }
    }
    
    fn single<T : Component + 'static>(&self) -> Option<&T> {
        let name = std::any::type_name::<T>();
        if !self.archetype.contains(name) { return None; }
        Some(self.compnents.get(name).unwrap().cast::<T>().expect("Unable to downcast"))
    }
    
    fn single_mut<T : Component + 'static>(&mut self) -> Option<&mut T> {
        let name = std::any::type_name::<T>();
        if !self.archetype.contains(name) { return None; }
        Some(self.compnents.get_mut(name).unwrap().cast_mut::<T>().expect("Unable to downcast"))
    }

    fn get<'s, T : ComponentGroup + Archetype + 'static>(&'s self) -> Option<<T as ComponentGroup>::Ref<'s>>  {
        // let mut components = Vec::new();
        // for id in T::types() {
        //     let Some(component) = self.compnents.get(&id) else {return None};
        //     components.push(component);
        // }
        // let name = std::any::type_name::<T>();
        // if !self.archetype.contains(name) { return None; }
        // Some(self.compnents.get(name).unwrap().cast().expect("Unable to downcast"))
        T::from_components_ref(&self.compnents)
    }
    
    fn get_mut<T : 'static>(&mut self) -> Option<&mut T> {
        let name = std::any::type_name::<T>();
        if !self.archetype.contains(name) { return None; }
        Some(self.compnents.get_mut(name).unwrap().cast_mut().expect("Unable to downcast"))
    }
    
    fn remove<T : 'static>(&mut self) {
        let name = std::any::type_name::<T>();
        self.archetype.remove(name);
        self.compnents.remove(name);
    }
    
    fn json(&self) -> Value {
        let mut map = Map::new();
        for (key, value) in self.compnents.iter() {
            map.insert(key.clone(), value.json());
        }
        Value::Object(map)
    }
    
    fn len(&self) -> usize {
        self.compnents.len()
    }
}

impl <CG : ComponentGroup + 'static> From<CG> for Entity {
    fn from(data : CG) -> Self {
        let mut entity = Entity::new();
        entity.add(data);
        entity
    }
}

impl ToString for Entity {
    fn to_string(&self) -> String {
        self.json().to_string()
    }
}

//=========================================================================================================================
//           Component Trait
//=========================================================================================================================

/// A compoenent is a piece of data that can be attached to an Entity.
pub(crate) trait Component {
    fn json(&self) -> Value;
    
    fn id(&self) -> &str {
        std::any::type_name::<Self>()
    }
}

impl dyn Component {
    pub fn cast<T : 'static>(&self) -> Option<&T> {
        if self.id() == std::any::type_name::<T>() {
            unsafe { Some(&*(self as *const dyn Component as *const T)) }
        } else {
            None
        }
    }
    
    pub fn cast_mut<T : 'static>(&mut self) -> Option<&mut T> {
        if self.id() == std::any::type_name::<T>() {
            unsafe { Some(&mut *(self as *mut dyn Component as *mut T)) }
        } else {
            None
        }
    }
}

//=========================================================================================================================
//           DataObject Trait
//=========================================================================================================================

pub trait DataObject : Sized {
    fn to_json(&self) -> Result<Value, Error>;
    
    fn from_json(json : Value) -> Result<Self, Error>;
    
    fn type_def() -> Result<String, ExportError>;
}

impl <C : TS + DeserializeOwned + Serialize + 'static> DataObject for C {
    fn to_json(&self) -> Result<Value, Error> {
        serde_json::to_value(self)
    }

    fn from_json(json : Value) -> Result<Self, Error> {
        serde_json::from_value(json.clone())
    }

    fn type_def() -> Result<String, ExportError> {
        Self::export_to_string()
    }
}

#[cfg(test)]
mod tests {
    use serde::Deserialize;
    use serde_json::Number;
    use super::*;

    #[derive(Debug, Serialize, Deserialize)]
    struct A(f64);
    impl Component for A {
        fn json(&self) -> Value {
            serde_json::to_value(self).unwrap()
        }
    }
    
    #[derive(Debug, Serialize, Deserialize)]
    struct B(i32);
    impl Component for B {
        fn json(&self) -> Value {
            serde_json::to_value(self).unwrap()
        }
    }
    
    #[test]
    fn creating_and_editing_entities() {
        //Creating and new entity with the new() function and adding with add().
        let mut entity = Entity::new();
        entity.add((A(10.0), B(10)));
        assert_eq!(entity.len(), 2);
        
        //Getting a component from the entity.
        let (a, b) = entity.get::<(A, B)>().unwrap();
        assert_eq!(a.0, 10.0);
        assert_eq!(b.0, 10);
    }
}
