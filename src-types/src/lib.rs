use std::path::PathBuf;

pub mod component;
pub mod entity;

pub mod prelude {
    pub use crate::component::core::*;
    pub use crate::entity::*;
    pub use crate::component::*;
}

pub fn generate_types(mut path : PathBuf) -> Result<(), ts_rs::ExportError> {
    // Entity::export_all_to(path.clone())?;
    
    Ok(())
}
