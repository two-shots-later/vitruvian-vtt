use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, PartialEq, Eq, PartialOrd, Ord)]
#[serde(untagged)]
pub enum ItemLevel {
    U8(u8),
    String(String)
}

/// An reference to an item in Pathfinder 2nd Edition.
#[derive(Serialize, Deserialize, Debug, PartialEq, Eq, PartialOrd, Ord)]
pub struct Item {
    #[serde(rename = "img")]
    pub image: String,
    pub level: ItemLevel,
    pub name: String,
    pub uuid: String,
}
