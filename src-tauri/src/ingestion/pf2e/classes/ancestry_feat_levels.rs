use serde::{Deserialize, Serialize};

/// The ancestry feat levels of a class in Pathfinder 2nd Edition.
#[derive(Serialize, Deserialize, Debug, PartialEq, Eq, PartialOrd, Ord)]
pub struct AncestryFeatLevels {
    pub value: Vec<u8>,
}