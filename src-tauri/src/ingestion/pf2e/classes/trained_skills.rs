use serde::{Deserialize, Serialize};

/// The trained skills of a class in Pathfinder 2nd Edition.
#[derive(Serialize, Deserialize, Debug, PartialEq, Eq, PartialOrd, Ord)]
pub struct TrainedSkills {
    pub additional: u8,
    pub value: Vec<String>,
}
