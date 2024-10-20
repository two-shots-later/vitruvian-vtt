use serde::{Deserialize, Serialize};

/// The attacks of a class in Pathfinder 2nd Edition.
#[derive(Serialize, Deserialize, Debug, PartialEq, Eq, PartialOrd, Ord)]
pub struct Attacks {
    pub advanced: u8,
    pub martial: u8,
    pub other: OtherAttack,
    pub simple: u8,
    pub unarmed: u8,
}

// TODO
#[derive(Serialize, Deserialize, Debug, PartialEq, Eq, PartialOrd, Ord)]
pub struct OtherAttack {
    pub name: String,
    pub rank: u8,
}
