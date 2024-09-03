use serde::{Deserialize, Serialize};

/// An reference to an item in Pathfinder 2nd Edition.
#[derive(Serialize, Deserialize, Debug, PartialEq, Eq, PartialOrd, Ord)]
pub struct Item {
    #[serde(rename = "img")]
    pub image: String,
    pub level: u8,
    pub name: String,
    pub uuid: String,
}
