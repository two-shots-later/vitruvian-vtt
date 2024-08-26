use serde::{Deserialize, Serialize};
use ts_rs::TS;

use super::Translatable;

#[derive(TS, Serialize, Deserialize)]
pub struct Name(pub String);

impl Translatable for Name {
    fn id(&self) -> String {
        self.0.clone()
    }
}

#[derive(TS)]
pub struct Bulk(u32);