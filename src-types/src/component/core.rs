use serde::{Deserialize, Serialize};
use ts_rs::TS;

use crate::Component;


#[derive(TS, Deserialize, Serialize)]
pub struct Bulk(pub u32);