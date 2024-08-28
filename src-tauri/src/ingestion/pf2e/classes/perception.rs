use serde::{Deserialize, Serialize};

/// The perception of a class in Pathfinder 2nd Edition.
#[derive(Serialize, Deserialize, Debug, PartialEq, Eq, PartialOrd, Ord)]
pub struct Perception {
    pub value: u8,
}
