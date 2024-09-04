use serde_json::Value;
use vitruvian_types::prelude::*;

pub mod ingestion;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// Test function for testing sending data to the frontend
#[tauri::command]
fn get_test_data() -> Vec<Value> {
    let mut entity : Entity = Entity::new();
    entity.add(Name("Test".to_string()));
    vec![entity.json()]
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![greet, get_test_data])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}


struct Test {
    first_name : String,
    last_name : String
}
