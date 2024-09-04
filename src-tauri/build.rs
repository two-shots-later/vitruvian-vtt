use std::env;
use vitruvian_types;

const GENERATED_TYPES_EXPORT_LOCATION : &'static str = "../src/types/gen";

fn main() {
    tauri_build::build();

    let Ok(mut working_directory) = env::current_dir() else {
        panic!("Unable to find current Directory.")
    };
    working_directory.push(GENERATED_TYPES_EXPORT_LOCATION);
    vitruvian_types::generate_types(working_directory).expect("Unable to generate types");
}
