use ts_rs::TS;
use crate::component::core::{Bulk, Name};

mod core;

#[derive(TS)]
#[doc="A Component is a bit of data that can be stored onto an Entity. Objects in Vitruvian-VTT are represented by entities that have one or more of these components."]
pub enum Component {
    Name(Name),
    Bulk(Bulk)
}