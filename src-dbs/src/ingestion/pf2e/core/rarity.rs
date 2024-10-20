use serde::{Deserialize, Serialize};

/// The traits of a class in Pathfinder 2nd Edition.
/// Describes how rare something is in the Pathfinder 2nd Edition world.
#[derive(Serialize, Deserialize, Debug, PartialEq, Eq, PartialOrd, Ord)]
pub enum Rarity {
    #[serde(alias = "common")]
    Common,
    #[serde(alias = "uncommon")]
    Uncommon,
    #[serde(alias = "rare")]
    Rare,
}

impl Rarity {
    pub fn from_str(s: &str) -> Self {
        match s {
            "common" => Rarity::Common,
            "uncommon" => Rarity::Uncommon,
            "rare" => Rarity::Rare,
            _ => panic!("Unknown trait value: {}", s),
        }
    }

    pub fn to_str(&self) -> &str {
        match self {
            Rarity::Common => "common",
            Rarity::Uncommon => "uncommon",
            Rarity::Rare => "rare",
        }
    }
}
