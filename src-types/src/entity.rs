use serde::{
    ser::{SerializeMap, SerializeSeq},
    Serialize,
};
use serde_json::Value;
use std::{
    any::TypeId,
    cell::RefCell,
    collections::{HashMap, HashSet},
};

use crate::component::{Archetype, Component, ComponentGroup};

//=========================================================================================================================
//           Entity Struct
//=========================================================================================================================

/// An object that holds up to one of each Component type. This is how everything is represented in vitruvian.
#[derive(Default)]
pub struct Entity {
    components: HashMap<TypeId, RefCell<Box<dyn Component>>>,
    archetype: HashSet<TypeId>,
}

#[allow(unused)]
impl Entity {
    /// Creates a new, empty Entity.
    pub fn new() -> Self {
        Self::default()
    }

    /// Adds a component or group of components to the Entity. If the Entity already contains a component of the same type, it will be replaced.
    pub fn add<T: ComponentGroup + 'static>(&mut self, data: T) {
        for component in data.components_take() {
            let t = component.id();
            self.archetype.insert(t);
            self.components.insert(t, RefCell::new(component));
        }
    }

    /// Gets a reference to a component or group of components from the Entity. These are for reading only.
    pub fn get<'s, T: ComponentGroup + 'static>(
        &'s self,
    ) -> Option<<T as ComponentGroup>::Ref<'s>> {
        T::components_ref(&self.components)
    }

    /// Gets a mutable reference to a component or group of components from the Entity. These are for reading and writing.
    pub fn get_mut<'s, T: ComponentGroup + Archetype + 'static>(
        &'s mut self,
    ) -> Option<<T as ComponentGroup>::RefMut<'s>> {
        T::components_mut(&mut self.components)
    }

    ///Removes componets from the entity based of the passed in Archetype. Example:
    pub fn remove<T: Archetype + 'static>(&mut self) {
        for t in T::types() {
            self.archetype.remove(&t);
            self.components.remove(&t);
        }
    }

    /// Returns a JSON representation of the Entity. This representation should match to the type definition generated by the TS macro.
    pub fn get_json(&self) -> Value {
        let mut map = serde_json::Map::new();
        for (_, value) in self.components.iter() {
            let name = value.borrow().type_name();
            map.insert(name, value.borrow().set_json());
        }
        Value::Object(map)
    }

    /// Returns the number of components in the Entity.
    pub fn len(&self) -> usize {
        self.components.len()
    }
}

impl Serialize for Entity {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let mut map = serializer.serialize_map(Some(self.len()))?;
        for (_, e) in self.components.iter() {
            let component = e.borrow();
            map.serialize_entry(&component.type_name(), component.as_ref())?;
        }
        map.end()
    }
}

impl<CG: ComponentGroup + 'static> From<CG> for Entity {
    fn from(data: CG) -> Self {
        let mut entity = Entity::new();
        entity.add(data);
        entity
    }
}

impl ToString for Entity {
    fn to_string(&self) -> String {
        self.get_json().to_string()
    }
}

//=========================================================================================================================
//           Entity Tests
//=========================================================================================================================

#[cfg(test)]
mod tests {
    use crate::{entity::Entity, prelude::ComponentMarker};
    use serde::{Deserialize, Serialize};
    use serde_json::json;
    use ts_rs::TS;

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
        let mut entity: Entity = (A(10.0), B(10)).into();
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
        let entity: Entity = (A(10.0), B(10)).into();

        //Turn it into a json object
        let json = entity.get_json();

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
        let entity: Entity = (A(10.0), B(10)).into();

        //Get the components out of the entity and check to see if they are the same.
        if let Some((a, b)) = entity.get::<(A, B)>() {
            assert_eq!(a.0, 10.0);
            assert_eq!(b.0, 10);
        };
    }
}
