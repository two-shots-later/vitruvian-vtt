use serde::{Deserialize, Serialize};

/// The key ability of a class in Pathfinder 2nd Edition.
#[derive(Serialize, Deserialize, Debug, PartialEq, Eq, PartialOrd, Ord)]
pub struct KeyAbility {
    pub value: Vec<String>,
}
