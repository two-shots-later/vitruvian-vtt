use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
#[serde(untagged)]
pub enum RowValue {
    String(String),
    Number(usize),
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(untagged)]
pub enum RowType {
    Object(RowObject),
    Strings(Vec<String>),
    Entries(Vec<Entries>),
    Mixed(Vec<RowValue>),
}

#[derive(Serialize, Deserialize, Debug)]
pub struct RowObject {
    #[serde(rename = "type")]
    pub row_type: String,
    pub style: String,
    pub row: Vec<String>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct InsetReadAloudEntry {
    #[serde(rename = "type")]
    pub data_type: String,
    pub entries: Vec<String>,
    pub id: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Section {
    #[serde(rename = "type")]
    pub data_type: String,
    pub name: Option<String>,
    pub page: Option<usize>,
    pub data: Option<Data>,
    pub entries: Vec<Entries>,
    pub id: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Href {
    #[serde(rename = "type")]
    pub data_type: String,
    pub path: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ImageEntry {
    #[serde(rename = "type")]
    pub data_type: String,
    pub href: Href,
    pub width: usize,
    pub height: usize,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct InsetEntry {
    #[serde(rename = "type")]
    pub data_type: String,
    pub name: String,
    pub page: usize,
    pub entries: Vec<Entries>,
    pub id: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct TableEntry {
    #[serde(rename = "type")]
    pub data_type: String,
    pub caption: Option<String>,
    pub srd: Option<bool>,
    #[serde(rename = "basicRules")]
    pub basic_rules: Option<bool>,
    #[serde(rename = "colLabels")]
    pub col_labels: Option<Vec<String>>,
    #[serde(rename = "colStyles")]
    pub col_styles: Vec<String>,
    pub rows: Vec<RowType>,
    pub data: Option<Data>,
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(untagged)]
pub enum ListObject {
    String(String),
    Object(Item),
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ListEntry {
    #[serde(rename = "type")]
    pub data_type: String,
    pub items: Vec<ListObject>,
    pub style: Option<String>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct GalleryEntry {
    #[serde(rename = "type")]
    pub data_type: String,
    pub images: Vec<ImageEntry>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct AbilityGenericEntry {
    #[serde(rename = "type")]
    pub data_type: String,
    pub text: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Item {
    #[serde(rename = "type")]
    pub data_type: String,
    pub name: String,
    pub entry: Option<String>,
    pub entries: Option<Vec<Entries>>,
    #[serde(rename = "nameDot")]
    pub name_dot: Option<bool>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct InlineBlockEntry {
    #[serde(rename = "type")]
    pub data_type: String,
    pub entries: Vec<Entries>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct TableGroupEntry {
    #[serde(rename = "type")]
    pub data_type: String,
    pub name: String,
    pub tables: Vec<TableEntry>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Data {
    pub quickref: Option<usize>,
    #[serde(rename = "tableIgnore")]
    pub table_ignore: Option<bool>,
    #[serde(rename = "quickrefIndex")]
    pub quick_ref_index: Option<bool>,
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(untagged)]
pub enum Entries {
    String(String),
    InsetReadAloud(InsetReadAloudEntry),
    Section(Section),
    Image(ImageEntry),
    Inset(InsetEntry),
    Table(TableEntry),
    List(ListEntry),
    Gallery(GalleryEntry),
    AbilityGeneric(AbilityGenericEntry),
    InlineBlock(InlineBlockEntry),
    TableGroup(TableGroupEntry),
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Book {
    data: Vec<Section>,
}
