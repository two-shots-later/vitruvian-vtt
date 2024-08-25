use std::env;
use ts_rs::TS;

fn main() {
    println!("STARTING EXPORT ON TYPES");
    let Ok(mut working_directory) = env::current_dir() else {
        panic!("Unable to find current Directory.")
    };
    working_directory.push("../src/types/gen");
    AddressBook::export_all_to(working_directory);
}

#[derive(TS)]
struct Person {
    first_name : String,
    last_name : String
}

#[derive(TS)]
struct AddressBook {
    people : Vec<Person>
}