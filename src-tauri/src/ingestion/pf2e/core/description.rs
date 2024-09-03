use serde::{Deserialize, Serialize};

/// The description of something in Pathfinder 2nd Edition.
#[derive(Serialize, Deserialize, Debug, PartialEq, Eq, PartialOrd, Ord)]
pub struct Description {
    pub value: String,
}
