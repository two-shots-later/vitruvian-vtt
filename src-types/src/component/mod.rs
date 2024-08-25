use ts_rs::TS;
use strum::EnumDiscriminants;
use crate::component::core::{Bulk, Name};

pub mod core;

#[derive(TS, EnumDiscriminants)]
#[strum_discriminants(name(ComponentId))]
#[strum_discriminants(derive(TS, Hash))]
#[ts(rename_all = "kebab-case")]
#[doc="A Component is a bit of data that can be stored onto an Entity. Objects in Vitruvian-VTT are represented by entities that have one or more of these components."]
pub enum Component {
    Name(Name),
    Bulk(Bulk)
}

impl Component {
    pub fn id(&self) -> ComponentId {
        self.into()
    }
}