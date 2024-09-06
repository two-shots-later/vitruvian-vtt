use std::{
    fs::{self, DirEntry},
    path::PathBuf,
};

use serde::{de::DeserializeOwned, Serialize};

pub mod pf2e;

/// Trait for ingesting data from a source
pub trait Ingest: Serialize + Named + Sized + DeserializeOwned {
    /// The parent type of the ingestion.
    type Parent: Ingest;

    /// Used to ingest just one file.
    fn ingest(file: DirEntry) -> Self {
        let file_name = file
            .file_name()
            .into_string()
            .expect("Could not convert OSString to String for unknown reason");
        println!("{file_name}");
        let path = Self::path().join(file_name);
        let obj: String = std::fs::read_to_string(path).unwrap();
        serde_json::from_str(&obj).unwrap()
    }

    /// Ingest the data, return the data ingested.
    fn ingest_all() -> Vec<Self> {
        // using the provided path from Self::path(), for every file in that directory,
        // read in each file and serialize it into the implementor's type
        println!("Self::path(): {:?}", Self::path());
        let dir = fs::read_dir(Self::path()).unwrap();
        dir.map(|file| Self::ingest(file.expect("Could not retrieve file for unknown reason")))
            .collect()
    }

    /// The path to the data.
    fn path() -> PathBuf;
}

/// Trait for a role playing game.
pub trait RolePlayingGame {
    /// Install the role playing game.
    /// This will typically clone a public repository if not already present on your system.
    fn install();
}

// TODO: write proc macro to make this easy
/// Used in ingestion to note what is ingesting
pub trait Named {
    fn name() -> String;
}
