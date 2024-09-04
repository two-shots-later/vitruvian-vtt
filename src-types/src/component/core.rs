use serde::{Deserialize, Serialize};
use ts_rs::TS;

use super::{ComponentMarker};
#[derive(TS, Deserialize, Serialize)]
pub struct Bulk(pub u32);
impl ComponentMarker for Bulk {}

//=========================================================================================================================
//           Core Components Tests
//=========================================================================================================================

#[cfg(test)]
mod tests {
    use crate::{entity::Entity, prelude::Component};

    use super::*;
    
    #[test]
    fn mutate_entity() {
        //Creating and new entity with the new() function and adding with add().
    }
}