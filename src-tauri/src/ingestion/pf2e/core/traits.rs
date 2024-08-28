use serde::{Deserialize, Serialize};

/// The traits of a class in Pathfinder 2nd Edition.
/// Describes how rare something is in the Pathfinder 2nd Edition world.
#[derive(Serialize, Deserialize, Debug, PartialEq, Eq, PartialOrd, Ord)]
pub enum TraitValue {
    Common,
    Uncommon,
    Rare,
}

impl TraitValue {
    pub fn from_str(s: &str) -> Self {
        match s {
            "common" => TraitValue::Common,
            "uncommon" => TraitValue::Uncommon,
            "rare" => TraitValue::Rare,
            _ => panic!("Unknown trait value: {}", s),
        }
    }

    pub fn to_str(&self) -> &str {
        match self {
            TraitValue::Common => "common",
            TraitValue::Uncommon => "uncommon",
            TraitValue::Rare => "rare"
        }
    }
}

#[derive(Serialize, Deserialize, Debug, PartialEq, Eq, PartialOrd, Ord)]
pub struct Traits {
    pub rarity: String,
    pub value: Vec<TraitValue>,
}
