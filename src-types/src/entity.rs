use std::collections::HashMap;

use ts_rs::TS;
use crate::{component::ComponentId, prelude::Component};

#[derive(TS)]
pub struct Entity {
    components : HashMap<ComponentId, Component>
}

impl Default for Entity {
    fn default() -> Self {
        Entity::new()
    }
}

impl Entity {
    pub fn new() -> Self {
        Entity {
            components : HashMap::new()
        }
    }
    
    pub fn with(mut self, component : Component) -> Self {
        self.add(component);
        self
    }

    pub fn add(&mut self, component : Component) -> &mut Self {
        self.components.insert(component.id(), component);
        self
    }

    pub fn get(&self, id : ComponentId) -> Option<&Component> {
        self.components.get(&id)
    }
    
    pub fn has(&self, id : ComponentId) -> bool {
        self.components.contains_key(&id)
    }
    
    pub fn remove(&mut self, id : ComponentId) -> Option<Component> {
        self.components.remove(&id)
    }
}