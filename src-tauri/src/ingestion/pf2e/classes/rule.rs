use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, PartialEq, Eq, PartialOrd, Ord)]
pub struct RuleOrCondition {
    pub or: Vec<String>,
}

#[derive(Serialize, Deserialize, Debug, PartialEq, Eq, PartialOrd, Ord)]
pub struct RuleAndCondition {
    pub and: Vec<String>,
}

#[derive(Serialize, Deserialize, Debug, PartialEq, Eq, PartialOrd, Ord)]
#[serde(untagged)]
pub enum RuleDefinition {
    Category(String),
    OrCondition(RuleOrCondition),
    AndCondition(RuleAndCondition),
}

#[derive(Serialize, Deserialize, Debug, PartialEq, Eq, PartialOrd, Ord)]
#[serde(untagged)]
pub enum RuleValue {
    String(String),
    U8(u8),
}

/// A rule pertaining to a Pathfinder 2nd Edition class.
#[derive(Serialize, Deserialize, Debug, PartialEq, Eq, PartialOrd, Ord)]
pub struct Rule {
    key: String,
    value: Option<RuleValue>,
    definition: Option<Vec<RuleDefinition>>,
    label: Option<String>,
    slug: Option<String>,
    mode: Option<String>,
    path: Option<String>,
}
