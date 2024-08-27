use vitruvian_types::prelude::Component;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    let bulk = vitruvian_types::prelude::Bulk(10);
    println!("{}", bulk.to_json().as_str().unwrap())
}


struct Test {
    first_name : String,
    last_name : String
}
