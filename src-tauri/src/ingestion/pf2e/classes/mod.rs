mod ancestry_feat_levels;
mod attacks;
mod class_feat_levels;
mod defenses;
mod general_feat_levels;
mod key_ability;
mod perception;
mod saving_throws;
mod skill_feat_levels;
mod skill_increase_levels;
mod spellcasting;
mod trained_skills;

use std::{collections::HashMap, path::PathBuf};

use ancestry_feat_levels::AncestryFeatLevels;
use attacks::Attacks;
use class_feat_levels::ClassFeatLevels;
use defenses::Defenses;
use general_feat_levels::GeneralFeatLevels;
use key_ability::KeyAbility;
use saving_throws::SavingThrows;
use serde::{Deserialize, Serialize};
use skill_feat_levels::SkillFeatLevels;
use skill_increase_levels::SkillIncreaseLevels;
use strum::IntoEnumIterator;
use strum_macros::EnumIter;
use trained_skills::TrainedSkills;

use crate::ingestion::{Ingest, Named};

use super::{
    core::{
        description::Description, item::Item, publication::Publication, rule::Rule, traits::Traits,
    },
    Pf2eWorld,
};

/// Internal representation of a class in Pathfinder 2nd Edition.
#[derive(Serialize, Deserialize, Debug)]
pub struct Class {
    #[serde(rename = "_id")]
    pub id: String,
    #[serde(rename = "img")]
    pub image: String,
    pub name: String,
    pub system: System,
    #[serde(rename = "type")]
    pub data_type: String,
}

/// The systems of a class in Pathfinder 2nd Edition.
#[derive(Serialize, Deserialize, Debug)]
pub struct System {
    pub attacks: Attacks,
    #[serde(rename = "ancestryFeatLevels")]
    pub ancestry_feat_levels: AncestryFeatLevels,
    #[serde(rename = "classFeatLevels")]
    pub class_feat_levels: ClassFeatLevels,
    pub defenses: Defenses,
    pub description: Description,
    #[serde(rename = "generalFeatLevels")]
    pub general_feat_levels: GeneralFeatLevels,
    #[serde(rename = "hp")]
    pub hit_points: u16,
    pub items: HashMap<String, Item>,
    #[serde(rename = "keyAbility")]
    pub key_ability: KeyAbility,
    pub perception: u8,
    pub publication: Publication,
    pub rules: Vec<Rule>,
    #[serde(rename = "savingThrows")]
    pub saving_throws: SavingThrows,
    #[serde(rename = "skillFeatLevels")]
    pub skill_feat_levels: SkillFeatLevels,
    #[serde(rename = "skillIncreaseLevels")]
    pub skill_increase_levels: SkillIncreaseLevels,
    pub spellcasting: u8,
    #[serde(rename = "trainedSkills")]
    pub trained_skills: TrainedSkills,
    pub traits: Traits,
}

impl Ingest for Class {
    type Parent = Pf2eWorld;

    fn path() -> std::path::PathBuf {
        PathBuf::from(Self::Parent::path()).join("packs/classes")
    }
}

impl Named for Class {
    fn name() -> String {
        String::from("Classes")
    }
}

/// The classes in Pathfinder 2nd Edition.
#[derive(EnumIter, Debug)]
pub enum PathfinderClass {
    Alchemist,
    Barbarian,
    Bard,
    Champion,
    Cleric,
    Druid,
    Fighter,
    Gunslinger,
    Inventor,
    Investigator,
    Kineticist,
    Magus,
    Monk,
    Oracle,
    Psychic,
    Ranger,
    Rogue,
    Sorcerer,
    Summoner,
    Swashbuckler,
    Thaumaturge,
    Witch,
    Wizard,
}

impl PathfinderClass {
    pub fn from_str(s: &str) -> Self {
        match s {
            "alchemist" => PathfinderClass::Alchemist,
            "barbarian" => PathfinderClass::Barbarian,
            "bard" => PathfinderClass::Bard,
            "champion" => PathfinderClass::Champion,
            "cleric" => PathfinderClass::Cleric,
            "druid" => PathfinderClass::Druid,
            "fighter" => PathfinderClass::Fighter,
            "gunslinger" => PathfinderClass::Gunslinger,
            "inventor" => PathfinderClass::Inventor,
            "investigator" => PathfinderClass::Investigator,
            "kineticist" => PathfinderClass::Kineticist,
            "magus" => PathfinderClass::Magus,
            "monk" => PathfinderClass::Monk,
            "oracle" => PathfinderClass::Oracle,
            "psychic" => PathfinderClass::Psychic,
            "ranger" => PathfinderClass::Ranger,
            "rogue" => PathfinderClass::Rogue,
            "sorcerer" => PathfinderClass::Sorcerer,
            "summoner" => PathfinderClass::Summoner,
            "swashbuckler" => PathfinderClass::Swashbuckler,
            "thaumaturge" => PathfinderClass::Thaumaturge,
            "witch" => PathfinderClass::Witch,
            "wizard" => PathfinderClass::Wizard,
            _ => panic!("Unknown class: {}", s),
        }
    }
    pub fn to_str(&self) -> &str {
        match self {
            PathfinderClass::Alchemist => "alchemist",
            PathfinderClass::Barbarian => "barbarian",
            PathfinderClass::Bard => "bard",
            PathfinderClass::Champion => "champion",
            PathfinderClass::Cleric => "cleric",
            PathfinderClass::Druid => "druid",
            PathfinderClass::Fighter => "fighter",
            PathfinderClass::Gunslinger => "gunslinger",
            PathfinderClass::Inventor => "inventor",
            PathfinderClass::Investigator => "investigator",
            PathfinderClass::Kineticist => "kineticist",
            PathfinderClass::Magus => "magus",
            PathfinderClass::Monk => "monk",
            PathfinderClass::Oracle => "oracle",
            PathfinderClass::Psychic => "psychic",
            PathfinderClass::Ranger => "ranger",
            PathfinderClass::Rogue => "rogue",
            PathfinderClass::Sorcerer => "sorcerer",
            PathfinderClass::Summoner => "summoner",
            PathfinderClass::Swashbuckler => "swashbuckler",
            PathfinderClass::Thaumaturge => "thaumaturge",
            PathfinderClass::Witch => "witch",
            PathfinderClass::Wizard => "wizard",
        }
    }
}
