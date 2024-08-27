use std::{fs::{read_to_string, OpenOptions}, io::Write, path::{Path, PathBuf}};
use std::any::Any;
use std::collections::HashMap;
use ts_rs::TS;
use crate::prelude::Bulk;

pub mod component;
mod entity;

pub mod prelude {
    pub use crate::component::core::*;
}

pub fn generate_types(mut path : PathBuf) -> Result<(), ts_rs::ExportError> {
    // Entity::export_all_to(path.clone())?;
    Bulk::export_all_to(path.clone())?;
    
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
pub struct Entity {
    compnents : HashMap<String, Box<dyn Any>>
}

impl Entity {
    fn set<T : 'static>(&mut self, data : T) {
        self.compnents.insert(std::any::type_name::<T>().to_string(), Box::new(data));
    }

    fn get<T : 'static>(&self) -> Option<&T>  {
        let data = self.compnents.get(std::any::type_name::<T>());
        match data {
            None => {None}
            Some(data) => {
                Some(data.downcast_ref::<T>().expect("Unable to downcast"))
            }
        }
    }
}

//=========================================================================================================================
//           Entity Struct
//=========================================================================================================================