use std::any::Any;
use std::collections::{HashMap, HashSet};
use ts_rs::TS;
use crate::component::core::Component;
// macro_rules! define_entity {
//     ([$name:ident] $($id:ident => $t:ty),*) => {
//         use ts_rs::TS;
//         use serde::{Serialize, Deserialize};
//
//         #[derive(TS, Serialize, Deserialize)]
//         pub struct $name {
//             $(
//                 #[ts(optional)]
//                 $id : Option<$t>,
//             )*
//         }
//     };
// }
//
// define_entity!{
//     [PathfinderEntity]
//     name => String,
//     bulk => u32
// }



