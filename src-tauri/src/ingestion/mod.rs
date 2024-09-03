use std::path::PathBuf;

pub mod pf2e;

/// Trait for ingesting data from a source
pub trait Ingest {
    /// The output type of the ingestion.
    type Output;
    /// The parent type of the ingestion.
    type Parent: Ingest;

    /// Ingest the data, return the data ingested.
    fn ingest() -> Self::Output;

    /// The path to the data.
    fn path() -> PathBuf;
}

/// Trait for a role playing game.
pub trait RolePlayingGame {
    /// Install the role playing game.
    /// This will typically clone a public repository if not already present on your system.
    fn install();
}
