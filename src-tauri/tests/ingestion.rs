use vitruvian_vtt_lib::ingestion::core::Book;


#[test]
fn run_slurp_book() {
    let path = "../5etools/data/book/book-phb.json";
    let data = std::fs::read_to_string(path).unwrap();

    let book: Book = serde_json::from_str(&data).unwrap();
    println!("{:?}", book);
}
