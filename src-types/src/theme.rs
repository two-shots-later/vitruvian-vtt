use serde::{Deserialize, Serialize};
use ts_rs::TS;

/// This defines a theme in the program.
#[derive(Serialize, Deserialize, TS, Clone, Debug, PartialEq, Eq)]
pub struct VitruvianTheme {
    pub primary: String,
    pub secondary: String,
    pub accent: String,
    pub background: String,
    pub background_alt: String,
    pub font_color_primary: String,
    pub font_color_secondary: String,
    pub font_primary: String,
    pub error: String,
    pub button_background: String,
}
