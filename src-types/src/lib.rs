use std::{fmt::format, fs, path::PathBuf};

use convert_case::{Case, Casing};
use prelude::{Damage, Name};
use ts_rs::TS;

pub mod component;
pub mod entity;

pub mod prelude {
    pub use crate::component::core::*;
    pub use crate::entity::*;
    pub use crate::component::*;
}

/// This Marco is reponsible for generating type definition for a component.
macro_rules! list_types {
    ($path:ident; $($type:ty),*) => {
        {
            $(
                <$type>::export_all_to(($path).clone())?;
            )*
            
            vec![$(stringify!($type)),*]
        }
    };
}

pub fn generate_types(path : &PathBuf) -> Result<(), ts_rs::ExportError> {
    // Entity::export_all_to(path.clone())?;
    // Name::export_all_to(&path)?;
    // Damage::export_all_to(&path)?;
    // Component::export_all_to(&path)?;
    
    let types = list_types!( path;
        Name, 
        Damage
    );
    
    // Generate the Component file
    let imports = types.iter().map(|t| format!("import {{ {t} }} from \"./{t}\";")).collect::<Vec<_>>().join("\n");
    let component_main = types.iter().map(|t| format!("{t}")).collect::<Vec<_>>().join(" | ");
    let component_file = format!("{imports}\n\nexport type Component = {component_main}");
    fs::write(path.clone().join("Component.ts"), component_file)?;
    
    // Generate the Entity file
    let entity_params = types.iter().map(|t| format!("{t}? : {t}")).collect::<Vec<_>>().join(", \n\t");
    let entity_file = format!("import {{ Component }} from \"./Component\";\n{imports}\n\nexport type Entity = {{\n\t{entity_params}\n}}");
    fs::write(path.join("Entity.ts"), entity_file)?;
    
    Ok(())
}
