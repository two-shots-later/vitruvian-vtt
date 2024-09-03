use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, PartialEq, Eq, PartialOrd, Ord)]
pub struct Publication {
    pub license: String,
    pub remaster: bool,
    pub title: String,
}
