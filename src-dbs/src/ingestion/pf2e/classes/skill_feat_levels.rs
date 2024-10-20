use serde::{Deserialize, Serialize};

/// The skill feat levels of a class in Pathfinder 2nd Edition.
#[derive(Serialize, Deserialize, Debug, PartialEq, Eq, PartialOrd, Ord)]
pub struct SkillFeatLevels {
    pub value: Vec<u8>,
}
