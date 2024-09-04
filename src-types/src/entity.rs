use std::{any::TypeId, cell::RefCell, collections::{HashMap, HashSet}};
use serde_json::Value;

use crate::component::{Archetype, Component, ComponentGroup};

//=========================================================================================================================
//           Entity Struct
//=========================================================================================================================

/// An object that holds up to one of each Component type. This is how everything is represented in vitruvian.
#[derive(Default)]
pub struct Entity {
    compnents : HashMap<TypeId, RefCell<Box<dyn Component>>>,
    archetype : HashSet<TypeId>
}

#[allow(unused)]
impl Entity {
    /// Creates a new, empty Entity.
    fn new() -> Self {
        Self::default()
    }
    
    /// Adds a component or group of components to the Entity. If the Entity already contains a component of the same type, it will be replaced.
    fn add<T : ComponentGroup + 'static>(&mut self, data : T) {
        for component in data.components_take() {
            let t = component.id();
            self.archetype.insert(t);
            self.compnents.insert(t, RefCell::new(component));
        }
    }

    /// Gets a reference to a component or group of components from the Entity. These are for reading only.
    fn get<'s, T : ComponentGroup + 'static>(&'s self) -> Option<<T as ComponentGroup>::Ref<'s>>  {
        T::components_ref(&self.compnents)
    }
    
    /// Gets a mutable reference to a component or group of components from the Entity. These are for reading and writing.
    fn get_mut<'s, T : ComponentGroup + Archetype + 'static>(&'s mut self) -> Option<<T as ComponentGroup>::RefMut<'s>> {
        T::components_mut(&mut self.compnents)
    }
    
    ///Removes componets from the entity based of the passed in Archetype. Example:
    fn remove<T : Archetype + 'static>(&mut self) {
        for t in T::types() {
            self.archetype.remove(&t);
            self.compnents.remove(&t);
        }
    }
    
    /// Returns a JSON representation of the Entity. This representation should match to the type definition generated by the TS macro.
    fn json(&self) -> Value {
        let mut map = serde_json::Map::new();
        for (_, value) in self.compnents.iter() {
            let name = value.borrow().type_name();
            map.insert(name, value.borrow().json());
        }
        Value::Object(map)
    }
    
    /// Returns the number of components in the Entity.
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
//           Entity Tests
//=========================================================================================================================

#[cfg(test)]
mod tests {
    use serde::{Deserialize, Serialize};
    use serde_json::json;
    use ts_rs::TS;
    use crate::{entity::Entity, prelude::{ComponentMarker, Component}};

    //These components are just for structs.
    #[derive(TS, Serialize, Deserialize)]
    struct A(f64);
    impl ComponentMarker for A {}
    
    #[derive(TS, Serialize, Deserialize)]
    struct B(i32);
    impl ComponentMarker for B {}
    
    #[test]
    fn mutate_entity() {
        //Creating and new entity with the new() function and adding with add().
        let mut entity : Entity = (A(10.0), B(10)).into();
        assert_eq!(entity.len(), 2);
        
        //Edit them and see if the mutable references are correct.
        if let Some((mut a, mut b)) = entity.get_mut::<(A, B)>() {
            a.0 = 20.0;
            b.0 = 20;
            assert_eq!(a.0, 20.0);
            assert_eq!(b.0, 20);
        };
        
        
    }
    
    #[test]
    fn generate_json_from_entity() {
        //Create an entity
        let entity : Entity = (A(10.0), B(10)).into();
        
        //Turn it into a json object
        let json = entity.json();
        
        //construct a json object that should be the same
        let other = json!({ 
            "A" : 10.0, 
            "B" : 10 
        });
        
        //check
        assert_eq!(json, other);
    }
    
    #[test]
    fn read_from_entity() {
        //Create an entity
        let entity : Entity = (A(10.0), B(10)).into();
        
        //Get the components out of the entity and check to see if they are the same.
        if let Some((a, b)) = entity.get::<(A, B)>() {
            assert_eq!(a.0, 10.0);
            assert_eq!(b.0, 10);
        };
    }
}