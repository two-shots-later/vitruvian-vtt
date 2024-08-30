use std::collections::{HashMap, HashSet};
use paste::paste;
use serde::{Deserialize, Serialize};
use ts_rs::TS;

use crate::Component;

pub mod core;

//=========================================================================================================================
//           Archetype Trait
//=========================================================================================================================

pub trait Archetype {
    fn types() -> HashSet<String>;
    
    fn is_superset<A : Archetype>(&self, other : &A) -> bool {
        let types = A::types();
        let self_types = Self::types();
        
        types.is_subset(&self_types)
    }
    
    fn is_subset<A : Archetype>(&self, other : &A) -> bool {
        let types = A::types();
        let self_types = Self::types();
        
        self_types.is_subset(&types)
    }   
}

/// A Macro to help implement different versions of the Archetype trait.
macro_rules! impl_archetype {
    ($($params:ident),*) => { 
        impl <$($params : Component),*> Archetype for ($($params,)*) {
            fn types() -> HashSet<String> {
                HashSet::from([$(std::any::type_name::<$params>().to_string()),*])
            }
        }
    };
}

impl Archetype for () {
    fn types() -> HashSet<String> {
        HashSet::new()
    }
}

impl <C : Component + 'static> Archetype for C {
    fn types() -> HashSet<String> {
        let mut set = HashSet::new();
        set.insert(std::any::type_name::<Self>().to_string());
        set
    }
}

impl_archetype!(T1);
impl_archetype!(T1, T2);
impl_archetype!(T1, T2, T3);
impl_archetype!(T1, T2, T3, T4);
impl_archetype!(T1, T2, T3, T4, T5);
impl_archetype!(T1, T2, T3, T4, T5, T6);
impl_archetype!(T1, T2, T3, T4, T5, T6, T7);
impl_archetype!(T1, T2, T3, T4, T5, T6, T7, T8);
impl_archetype!(T1, T2, T3, T4, T5, T6, T7, T8, T9);
impl_archetype!(T1, T2, T3, T4, T5, T6, T7, T8, T9, T10);
impl_archetype!(T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11);
impl_archetype!(T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12);
impl_archetype!(T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13);
impl_archetype!(T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14);
impl_archetype!(T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15);
impl_archetype!(T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16);

//=========================================================================================================================
//           ComponentGroup Trait
//=========================================================================================================================

pub(crate) trait ComponentGroup {
    type Ref<'s>;
    
    fn components(&self) -> Vec<&dyn Component>;
    
    fn components_mut(&mut self) -> Vec<&mut dyn Component>;
    
    fn components_take(self) -> Vec<Box<dyn Component>>;
    
    fn from_components_ref<'s>(components : &'s HashMap<String, Box<dyn Component>>) -> Option<Self::Ref<'s>>;
}

impl ComponentGroup for () {
    
    type Ref<'s> = &'s Self;
    
    fn components(&self) -> Vec<&dyn Component> {
        vec![]
    }
    
    fn components_mut(&mut self) -> Vec<&mut dyn Component> {
        vec![]
    }
    
    fn components_take(self) -> Vec<Box<dyn Component>> {
        vec![]
    }
    
    fn from_components_ref<'s>(_ : &'s HashMap<String, Box<dyn Component>>) -> Option<Self::Ref<'s>>{
        Some(&())
    }
}

impl <C : Component + 'static> ComponentGroup for C {
    type Ref<'s> = &'s Self;
    
    fn components(&self) -> Vec<&dyn Component> {
        vec![self]
    }

    fn components_mut(&mut self) -> Vec<&mut dyn Component> {
        vec![self]
    }

    fn components_take(self) -> Vec<Box<dyn Component>> {
        vec![Box::new(self)]
    }
    
    fn from_components_ref(components : &HashMap<String, Box<dyn Component>>) -> Option<&Self>{
        let Some(component) = components.get(std::any::type_name::<C>()) else { return None };
        Some(&component.cast::<C>().unwrap())
    }
}

/// A Macro to help implement different versions of the Archetype trait.
macro_rules! impl_component_group {
    ($($params:ident, $location:tt);*) => { 
        impl <$($params : Component + Sized + 'static),*> ComponentGroup for ($($params,)*) {
            
            type Ref<'s> = ($(&'s $params),*);
            
            fn components(&self) -> Vec<&dyn Component> {
                vec![$(&self.$location),*]
            }
            
            fn components_mut(&mut self) -> Vec<&mut dyn Component> {
                vec![$(&mut self.$location),*]
            }
            
            fn components_take(self) -> Vec<Box<dyn Component>> {
                vec![$(Box::new(self.$location)),*]
            }
            
            fn from_components_ref<'s>(components : &'s HashMap<String, Box<dyn Component>>) -> Option<Self::Ref<'s>> {
                $(
                    let paste!{[<c$location>]} = components.get(std::any::type_name::<$params>())?;
                )*
                Some(($(paste!{[<c$location>]}.cast::<$params>()?),*))
            }
        }
    };
}

impl_component_group!(T1, 0);
impl_component_group!(T1, 0; T2, 1);
impl_component_group!(T1, 0; T2, 1; T3, 2);
impl_component_group!(T1, 0; T2, 1; T3, 2; T4, 3);
impl_component_group!(T1, 0; T2, 1; T3, 2; T4, 3; T5, 4);
impl_component_group!(T1, 0; T2, 1; T3, 2; T4, 3; T5, 4; T6, 5);
impl_component_group!(T1, 0; T2, 1; T3, 2; T4, 3; T5, 4; T6, 5; T7, 6);
impl_component_group!(T1, 0; T2, 1; T3, 2; T4, 3; T5, 4; T6, 5; T7, 6; T8, 7);
impl_component_group!(T1, 0; T2, 1; T3, 2; T4, 3; T5, 4; T6, 5; T7, 6; T8, 7; T9, 8);
impl_component_group!(T1, 0; T2, 1; T3, 2; T4, 3; T5, 4; T6, 5; T7, 6; T8, 7; T9, 8; T10, 9);
impl_component_group!(T1, 0; T2, 1; T3, 2; T4, 3; T5, 4; T6, 5; T7, 6; T8, 7; T9, 8; T10, 9; T11, 10);
impl_component_group!(T1, 0; T2, 1; T3, 2; T4, 3; T5, 4; T6, 5; T7, 6; T8, 7; T9, 8; T10, 9; T11, 10; T12, 11);
impl_component_group!(T1, 0; T2, 1; T3, 2; T4, 3; T5, 4; T6, 5; T7, 6; T8, 7; T9, 8; T10, 9; T11, 10; T12, 11; T13, 12);
impl_component_group!(T1, 0; T2, 1; T3, 2; T4, 3; T5, 4; T6, 5; T7, 6; T8, 7; T9, 8; T10, 9; T11, 10; T12, 11; T13, 12; T14, 13);
impl_component_group!(T1, 0; T2, 1; T3, 2; T4, 3; T5, 4; T6, 5; T7, 6; T8, 7; T9, 8; T10, 9; T11, 10; T12, 11; T13, 12; T14, 13; T15, 14);
impl_component_group!(T1, 0; T2, 1; T3, 2; T4, 3; T5, 4; T6, 5; T7, 6; T8, 7; T9, 8; T10, 9; T11, 10; T12, 11; T13, 12; T14, 13; T15, 14; T16, 15);