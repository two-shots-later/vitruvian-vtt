use crate::ingestion::core::Book;

pub mod core;

// note: this ingestion is for version 1.209.3 of 5e Tools. You can check this by looking at the package.json of the 5e Tools repo.
pub fn slurp_phb(path: String) -> Book {
    let data: String = std::fs::read_to_string(path).unwrap();
    let book: Book = serde_json::from_str(&data).unwrap();
    book
}
