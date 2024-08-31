use std::{cell::RefCell, collections::{HashMap, HashSet}};
use serde_json::Value;

use crate::component::{Archetype, Component, ComponentGroup};

//=========================================================================================================================
//           Entity Struct
//=========================================================================================================================

/// An object that holds up to one of each Component type. This is how everything is represented in vitruvian.
#[derive(Default)]
pub struct Entity {
    compnents : HashMap<String, RefCell<Box<dyn Component>>>,
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
            self.compnents.insert(name.to_string(), RefCell::new(component));
        }
    }

    fn get<'s, T : ComponentGroup + Archetype + 'static>(&'s self) -> Option<<T as ComponentGroup>::Ref<'s>>  {
        T::from_components_ref(&self.compnents)
    }
    
    fn get_mut<'s, T : ComponentGroup + Archetype + 'static>(&'s mut self) -> Option<<T as ComponentGroup>::RefMut<'s>> {
        T::from_components_mut(&mut self.compnents)
    }
    
    fn remove<T : 'static>(&mut self) {
        let name = std::any::type_name::<T>();
        self.archetype.remove(name);
        self.compnents.remove(name);
    }
    
    fn json(&self) -> Value {
        let mut map = serde_json::Map::new();
        for (key, value) in self.compnents.iter() {
            map.insert(key.clone(), value.borrow().json());
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

#[cfg(test)]
mod tests {
    use serde::{Deserialize, Serialize};
    use serde_json::{json, Value};
    use crate::{component::Component, entity::Entity};

    
    //These components are jsut for structs.
    #[derive(Debug, Serialize, Deserialize)]
    #[serde(rename = "A")]
    struct A(f64);
    impl Component for A {
        fn json(&self) -> Value {
            serde_json::to_value(self).unwrap()
        }
    }
    
    #[derive(Debug, Serialize, Deserialize)]
    #[serde(rename = "B")]
    struct B(i32);
    impl Component for B {
        fn json(&self) -> Value {
            serde_json::to_value(self).unwrap()
        }
    }
    
    #[test]
    fn editing_entity() {
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
        
        let json = entity.json();
        let other = json!({ 
            "A" : 20.0, 
            "B" : 20 
        });
        
        assert_eq!(json, other);
    }
}