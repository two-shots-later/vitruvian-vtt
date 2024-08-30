use serde::{Deserialize, Serialize};
use ts_rs::TS;

use crate::Component;


#[derive(TS, Deserialize, Serialize)]
pub struct Bulk(pub u32);

impl Component for Bulk {
    fn json(&self) -> serde_json::Value {
        serde_json::to_value(self).unwrap()
    }
}