use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, PartialEq, Eq, PartialOrd, Ord)]
pub enum SizeKind {
    #[serde(alias = "tiny")]
    Tiny,
    #[serde(alias = "sm")]
    Small,
    #[serde(alias = "med")]
    Medium,
    #[serde(alias = "lg")]
    Large,
    Huge,
    Gargantuan,
}
