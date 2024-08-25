use std::path::Path;
use crate::component::Component;
use ts_rs::TS;

mod component;

pub fn generate_types(path : impl AsRef<Path>) -> Result<(), ts_rs::ExportError> {
    Component::export_all_to(path)
}