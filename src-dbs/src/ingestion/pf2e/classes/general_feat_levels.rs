use serde::{Deserialize, Serialize};

/// The general feat levels of a class in Pathfinder 2nd Edition.
#[derive(Serialize, Deserialize, Debug, PartialEq, Eq, PartialOrd, Ord)]
pub struct GeneralFeatLevels {
    pub value: Vec<u8>,
}
