use serde::{Deserialize, Serialize};

/// The publication of a class in Pathfinder 2nd Edition.
/// This is where the data actually comes from.
#[derive(Serialize, Deserialize, Debug, PartialEq, Eq, PartialOrd, Ord)]
pub struct Publication {
    pub license: String,
    pub remaster: bool,
    pub title: String,
}
