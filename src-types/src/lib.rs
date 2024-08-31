use std::cell::RefCell;
use std::{any::type_name, path::PathBuf};
use std::collections::{HashMap, HashSet};
use component::{Archetype, Component, ComponentGroup};
use serde::{de::DeserializeOwned, Serialize};
use serde_json::{Error, Map, Value};
use ts_rs::{ExportError, TS};
use crate::prelude::Bulk;

pub mod component;
pub mod entity;

pub mod prelude {
    pub use crate::component::core::*;
}

pub fn generate_types(mut path : PathBuf) -> Result<(), ts_rs::ExportError> {
    // Entity::export_all_to(path.clone())?;
    Bulk::export_all_to(path.clone())?;
    
    Ok(())
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
