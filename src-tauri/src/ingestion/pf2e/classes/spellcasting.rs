use serde::{Deserialize, Serialize};

/// TODO
#[derive(Serialize, Deserialize, Debug, PartialEq, Eq, PartialOrd, Ord)]
pub struct Spellcasting {
    pub value: u8,
}
