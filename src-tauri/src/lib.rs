use commands::themes;
use serde_json::Value;
use vitruvian_types::prelude::*;

pub mod commands;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// Test function for testing sending data to the frontend
#[tauri::command]
fn get_test_data() -> Vec<Entity> {
    let mut entity: Entity = Entity::new();
    entity.add(Name("Test".to_string()));
    vec![entity]
}

// Test function for testing receiving data from the frontend. Sadly, there is not automatic deserialization of the data. This must be done manually.
#[tauri::command]
fn set_test_data(data: Value) {
    let mut entity: Entity = Entity::new();
    let name: Name = serde_json::from_value(data["Name"].clone()).unwrap();
    let damage: Damage = serde_json::from_value(data["Damage"].clone()).unwrap();
    entity.add(name);
    entity.add(damage);
    println!("Test {}", entity.to_string());
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run_main_app() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            get_test_data,
            set_test_data,
            themes::get_current_theme,
            themes::get_theme,
            themes::get_available_themes,
            themes::set_current_theme,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// #[cfg_attr(mobile, tauri::mobile_entry_point)]
// pub fn run_storybook() {
//     tauri::Builder::default()
//         .plugin(tauri_plugin_shell::init())
//         .invoke_handler(tauri::generate_handler![
//             greet,
//             get_test_data,
//             set_test_data,
//             themes::get_current_theme,
//             themes::get_theme,
//             themes::get_available_themes,
//             themes::set_current_theme,
//         ])
//         .run(tauri::generate_context!())
//         .expect("error while running tauri application");
// }
