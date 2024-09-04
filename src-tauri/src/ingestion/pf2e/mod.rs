use std::{env, path::PathBuf};

use ancestry::Ancestry;
use classes::Class;
use git2::Repository;
use serde::{Deserialize, Serialize};
use spinoff::{spinners, Color, Spinner};

use super::{Ingest, Named, RolePlayingGame};

mod ancestry;
mod classes;
mod core;

/// The P2FE world of data.
///
/// # Examples
///
/// ```
/// use crate::vitruvian_vtt_lib::ingestion::pf2e::Pf2eWorld;
/// use crate::vitruvian_vtt_lib::ingestion::Ingest;
///
/// let world = Pf2eWorld::new();
///
/// assert_eq!(world.classes.len(), 23);
/// assert_eq!(world.ancestry.len(), 42);
/// ```
///
#[derive(Debug, Serialize, Deserialize)]
pub struct Pf2eWorld {
    pub classes: Vec<Class>,
    pub ancestry: Vec<Ancestry>,
}

impl Pf2eWorld {
    pub fn new() -> Self {
        Self {
            classes: Class::ingest_all(),
            ancestry: Ancestry::ingest_all(),
        }
    }
}

impl RolePlayingGame for Pf2eWorld {
    fn install() {
        if Self::path().exists() {
            println!("Pf2e repository already installed locally");
        } else {
            println!("Cloning pf2e repository...");
            println!("(This may take 5-10 minutes)");
            let mut spinner = Spinner::new(spinners::Dots, "Loading...", Color::Blue);
            let repo_url = "https://github.com/foundryvtt/pf2e.git";
            match Repository::clone(repo_url, Self::path()) {
                Ok(_) => (),
                Err(e) => panic!("Failed to clone repository: {}", e),
            }
            spinner.success("Done!");
        }
    }
}

impl Ingest for Pf2eWorld {
    type Parent = Pf2eWorld;

    fn path() -> PathBuf {
        let current_directory = env::current_dir().expect("Could not get current directory");
        current_directory.join("data/pf2e")
    }
}

impl Named for Pf2eWorld {
    fn name() -> String {
        String::from("Pathfinder 2nd Edition World")
    }
}
