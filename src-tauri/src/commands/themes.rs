use vitruvian_types::theme::VitruvianTheme;

/// Command for the frontend, returns the current theme that is being used. This state should be stored between sessions.
#[tauri::command]
pub fn get_current_theme() -> VitruvianTheme {
    // This is a dummy functions for now, will be properly implemented in #30
    VitruvianTheme {
        primary: "#ff7598".to_string(),
        secondary: "#fe2b71".to_string(),
        accent: "#59dfaa".to_string(),
        background: "#292929".to_string(),
        background_alt: "#5A5A5A".to_string(),
        font_color_primary: "#ffffff".to_string(),
        font_color_secondary: "#707070".to_string(),
        font_primary: "CrimsonPro".to_string(),
        button_background: "radial-gradient(circle, var(--secondary-color) 25%, var(--primary-color) 100%)".to_string(),
        error: "#ff0000".to_string(),
    }
}

/// Command for the frontend, returns the theme with the given theme_id.
#[tauri::command]
pub fn get_theme(theme_id: String) -> VitruvianTheme {
    // This is a dummy functions for now, will be properly implemented in #30
    if &theme_id == "green" {
        VitruvianTheme {
            primary: "#a5d6a7".to_string(),
            secondary: "#66bb6a".to_string(),
            accent: "#59dfaa".to_string(),
            background: "#292929".to_string(),
            background_alt: "#5A5A5A".to_string(),
            font_color_primary: "#ffffff".to_string(),
            font_color_secondary: "#909090".to_string(),
            font_primary: "CrimsonPro".to_string(),
            button_background: "radial-gradient(circle, rgba(255,42,113,1) 25%, rgba(214,1,79,1) 100%)".to_string(),
            error: "#ff0000".to_string(),
        }
    } else if &theme_id == "red" {
        VitruvianTheme {
            primary: "#ff7598".to_string(),
            secondary: "#fe2b71".to_string(),
            accent: "#59dfaa".to_string(),
            background: "#292929".to_string(),
            background_alt: "#2e2e2e".to_string(),
            font_color_primary: "#ffffff".to_string(),
            font_color_secondary: "#909090".to_string(),
            font_primary: "CrimsonPro".to_string(),
            button_background: "radial-gradient(circle, rgba(255,42,113,1) 25%, rgba(214,1,79,1) 100%)".to_string(),
            error: "#ff0000".to_string(),
        }
    } else {
        get_current_theme()
    }
}

/// Command for the frontend, returns all available themes by ids.
#[tauri::command]
pub fn get_available_themes() -> Vec<String> {
    vec!["green".to_string(), "red".to_string()]
}

/// Command for the frontend, sets the current theme to the provided theme.
#[tauri::command]
pub fn set_current_theme(theme: VitruvianTheme) {
    // This is a dummy functions for now, will be properly implemented in #30

    println!("Setting theme to: {:?}", theme);
}
