use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub enum VisionKind {
    #[serde(alias = "darkvision")]
    DarkVision,
    #[serde(alias = "low-light-vision")]
    LowLightVision,
    #[serde(alias = "normal")]
    Normal,
}
