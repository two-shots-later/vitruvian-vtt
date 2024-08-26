use serde::{Deserialize, Serialize};
use ts_rs::TS;
use strum::EnumDiscriminants;
use crate::component::core::{Bulk, Name};

pub mod core;

#[derive(TS, EnumDiscriminants)]
#[strum_discriminants(name(ComponentId))]
#[strum_discriminants(derive(TS, Hash))]
#[strum_discriminants(ts(rename_all = "lowercase"))]
#[ts(rename_all = "lowercase")]
#[doc="A Component is a bit of data that can be stored onto an Entity. Objects in Vitruvian-VTT are represented by entities that have one or more of these components."]
pub enum Component {
    Name(String),
    Bulk(u32)
}

impl Component {
    pub fn id(&self) -> ComponentId {
        self.into()
    }
}

pub trait Translatable : TS + Serialize + Deserialize<'static> where Self : 'static {
    fn id(&self) -> String;
    
    fn into_json(&self) -> serde_json::Value {
        let Ok(value) = Self::export_to_string() else {return serde_json::to_value(self).unwrap()};
        eprintln!("{value}");
        
        serde_json::to_value(self).unwrap()
    }
}