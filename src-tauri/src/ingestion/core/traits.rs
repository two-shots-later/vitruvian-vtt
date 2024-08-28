use serde::{Deserialize, Serialize};

// TODO: add more values when they come up
#[derive(Serialize, Deserialize, Debug, PartialEq, Eq, PartialOrd, Ord)]
pub enum TraitValue {
    Common,
    Uncommon,
}

impl TraitValue {
    pub fn from_str(s: &str) -> Self {
        match s {
            "common" => TraitValue::Common,
            "uncommon" => TraitValue::Uncommon,
            _ => panic!("Unknown trait value: {}", s),
        }
    }

    pub fn to_str(&self) -> &str {
        match self {
            TraitValue::Common => "common",
            TraitValue::Uncommon => "uncommon",
        }
    }
}

#[derive(Serialize, Deserialize, Debug, PartialEq, Eq, PartialOrd, Ord)]
pub struct Traits {
    pub rarity: String,
    pub value: Vec<TraitValue>,
}
