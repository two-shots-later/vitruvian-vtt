mod boost;
mod flaw;

use super::{
    core::{
        description::Description,
        item::Item,
        languages::{AdditionalLanguages, Languages},
        publication::Publication,
        rule::Rule,
        size::SizeKind,
        traits::Traits,
        vision::VisionKind,
    },
    Pf2eWorld,
};
use crate::ingestion::{Ingest, Named};
use boost::BoostValue;
use flaw::FlawValue;
use serde::{Deserialize, Serialize};
use std::{collections::HashMap, path::PathBuf};

#[derive(Serialize, Deserialize, Debug)]
pub struct System {
    #[serde(rename = "additionalLanguages")]
    additional_languages: AdditionalLanguages,
    boosts: HashMap<String, BoostValue>,
    description: Description,
    flaws: HashMap<String, FlawValue>,
    hp: u16,
    items: HashMap<String, Item>,
    languages: Languages,
    publication: Publication,
    reach: u8,
    rules: Vec<Rule>,
    size: SizeKind,
    speed: u8,
    traits: Traits,
    vision: VisionKind,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Ancestry {
    #[serde(rename = "_id")]
    id: String,
    img: String,
    name: String,
    system: System,
    #[serde(rename = "type")]
    data_type: String,
}

impl Ingest for Ancestry {
    type Parent = Pf2eWorld;

    fn path() -> PathBuf {
        PathBuf::from(Self::Parent::path()).join("packs/ancestries")
    }
}

impl Named for Ancestry {
    fn name() -> String {
        String::from("Ancestories")
    }
}
