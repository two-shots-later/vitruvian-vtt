use serde::{Deserialize, Serialize};

/// The defenses of a class in Pathfinder 2nd Edition.
#[derive(Serialize, Deserialize, Debug, PartialEq, Eq, PartialOrd, Ord)]
pub struct Defenses {
    pub heavy: u8,
    pub light: u8,
    pub medium: u8,
    pub unarmored: u8,
}
