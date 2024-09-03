use serde::{Deserialize, Serialize};

/// The saving throws of a class in Pathfinder 2nd Edition.
#[derive(Serialize, Deserialize, Debug, PartialEq, Eq, PartialOrd, Ord)]
pub struct SavingThrows {
    pub fortitude: u8,
    pub reflex: u8,
    pub will: u8,
}
