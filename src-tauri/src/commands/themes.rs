use vitruvian_types::theme::VitruvianTheme;

#[tauri::command]
pub fn get_current_theme() -> VitruvianTheme {
    // This is a dummy functions for now, will be properly implemented in #30
    VitruvianTheme {
        primary: "#ff7598".to_string(),
        secondary: "#fe2b71".to_string(),
        accent: "#59dfaa".to_string(),
        background: "#292929".to_string(),
        background_alt: "#2e2e2e".to_string(),
        font_color: "#ffffff".to_string(),
    }
}

#[tauri::command]
pub fn get_theme(theme_id : String) -> VitruvianTheme {
    // This is a dummy functions for now, will be properly implemented in #30
    
    if &theme_id == "green" {
        VitruvianTheme {
            primary: "#a5d6a7".to_string(),
            secondary: "#66bb6a".to_string(),
            accent: "#59dfaa".to_string(),
            background: "#292929".to_string(),
            background_alt: "#2e2e2e".to_string(),
            font_color: "#ffffff".to_string(),
        }
    } else if &theme_id == "red" {
        VitruvianTheme {
            primary: "#ff7598".to_string(),
            secondary: "#fe2b71".to_string(),
            accent: "#59dfaa".to_string(),
            background: "#292929".to_string(),
            background_alt: "#2e2e2e".to_string(),
            font_color: "#ffffff".to_string(),
        }
    } else {
        get_current_theme()
    }
}