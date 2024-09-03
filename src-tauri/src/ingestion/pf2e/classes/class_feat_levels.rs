use serde::{Deserialize, Serialize};

/// The class feat levels of a class in Pathfinder 2nd Edition.
#[derive(Serialize, Deserialize, Debug, PartialEq, Eq, PartialOrd, Ord)]
pub struct ClassFeatLevels {
    pub value: Vec<u8>,
}
