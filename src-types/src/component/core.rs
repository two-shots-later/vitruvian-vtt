use std::any::type_name;
use serde::{Deserialize, Serialize};
use serde::de::DeserializeOwned;
use serde_json::Value;
use ts_rs::TS;

pub(crate) trait Component : TS + DeserializeOwned + Serialize {
    fn id() -> &'static str {
        type_name::<Self>()
    }

    fn to_json(&self) -> Value {
        serde_json::to_value(self).expect(format!("There was an error converting type `{}` to JSON: ", type_name::<Self>()).as_str())
    }

    fn from_json(json : Value) -> Self {
        serde_json::from_value(json.clone()).expect(format!("There was an error converting json `{}` to type `{}`: ", json, type_name::<Self>()).as_str())
    }
}

#[derive(TS, Deserialize, Serialize)]
pub struct Bulk(pub u32);
impl Component for Bulk {}