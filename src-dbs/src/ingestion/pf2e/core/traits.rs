use serde::{Deserialize, Serialize};

use super::rarity::Rarity;

#[derive(Serialize, Deserialize, Debug, PartialEq, Eq, PartialOrd, Ord)]
pub struct Traits {
    pub rarity: Rarity,
    // TODO: make list of traits to reference to as enum
    pub value: Vec<String>,
}
