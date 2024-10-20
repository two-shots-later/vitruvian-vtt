use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Languages {
    custom: String,
    value: Vec<String>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct AdditionalLanguages {
    count: u8,
    custom: String,
    value: Vec<String>,
}
