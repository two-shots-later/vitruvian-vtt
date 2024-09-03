use std::{any::TypeId, cell::{Ref, RefCell, RefMut}, collections::{HashMap, HashSet}, ops::{Deref, DerefMut}};
use paste::paste;
use serde::Serialize;
use serde_json::Value;
use ts_rs::TS;

pub mod core;

/// This trait is used to mark a type that should auto implment the Component trait.
pub trait ComponentMarker {}

//=========================================================================================================================
//           Component Trait
//=========================================================================================================================

/// A compoenent is a piece of data that can be attached to an Entity.
pub trait Component : 'static {
    
    /// Converts the component to a JSON Value.
    fn json(&self) -> Value;
    
    /// Returns the TypeId of the type that is implemented by Component.
    fn id(&self) -> TypeId {
        std::any::TypeId::of::<Self>()
    }
    
    /// Returns the name of the type that is implemented by Component.
    fn type_name(&self) -> String {
        std::any::type_name::<Self>().split("::").last().unwrap().to_string()
    }
}

impl dyn Component {
    /// Casts a reference to a Component to a reference to a specific type. If the underlying type is not the same as the type being cast to, None is returned.
    pub fn cast<T : 'static>(&self) -> Option<&T> {
        if self.id() == std::any::TypeId::of::<T>() {
            unsafe { Some(&*(self as *const dyn Component as *const T)) }
        } else {
            None
        }
    }
    
    /// Casts a mutable reference to a Component to a mutable reference to a specific type. If the underlying type is not the same as the type being cast to, None is returned.
    pub fn cast_mut<T : 'static>(&mut self) -> Option<&mut T> {
        if self.id() == std::any::TypeId::of::<T>() {
            unsafe { Some(&mut *(self as *mut dyn Component as *mut T)) }
        } else {
            None
        }
    }
}

impl <T : Serialize + ComponentMarker + TS + 'static> Component for T {
    fn json(&self) -> Value {
        serde_json::to_value(self).unwrap()
    }
}

//=========================================================================================================================
//           Archetype Trait
//=========================================================================================================================

/// An Archetype describes a minimun set of components that an Entity must have. 
pub trait Archetype {
    /// Returns a HashSet of TypeIds that represent the types that are required for the Archetype.
    fn types() -> HashSet<TypeId>;
    
    /// Returns true if the Archetype is a superset of the passed in Archetype.
    fn is_superset<A : Archetype>(&self, other : &A) -> bool {
        let types = A::types();
        let self_types = Self::types();
        
        types.is_subset(&self_types)
    }
    
    /// Returns true if the Archetype is a subset of the passed in Archetype.
    fn is_subset<A : Archetype>(&self, other : &A) -> bool {
        let types = A::types();
        let self_types = Self::types();
        
        self_types.is_subset(&types)
    }   
}

impl Archetype for () {
    fn types() -> HashSet<TypeId> {
        HashSet::new()
    }
}

impl <C : Component + 'static> Archetype for C {
    fn types() -> HashSet<TypeId> {
        let mut set = HashSet::new();
        set.insert(std::any::TypeId::of::<Self>());
        set
    }
}

/// A Macro to help implement different versions of the Archetype trait.
macro_rules! impl_archetype {
    ($($params:ident),*) => { 
        impl <$($params : Component),*> Archetype for ($($params,)*) {
            fn types() -> HashSet<TypeId> {
            HashSet::from([$(std::any::TypeId::of::<$params>()),*])
            }
        }
    };
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
//           Res Struct
//=========================================================================================================================\

/// A Res struct is a wrapper around a Ref that contains a reference to a Component. It is used to access the data of a Component.
pub struct Res<'s, C : Component + 'static> {
    component : Ref<'s, Box<dyn Component>>,
    _phantom : std::marker::PhantomData<&'s C>
}

impl <'s, C : Component + 'static> Res<'s, C> {
    /// Creates a new Res struct from a Ref to a Component. It has the same lifetime as the Ref.
    pub fn new(component : Ref<'s, Box<dyn Component>>) -> Self {
        Self {
            component,
            _phantom : std::marker::PhantomData
        }
    }
}

impl <C : Component> Deref for Res<'_, C> {
    type Target = C;
    
    fn deref(&self) -> &Self::Target {
        self.component.deref().cast::<C>().unwrap()
    }
}

//=========================================================================================================================
//           ResMut Struct
//=========================================================================================================================\

/// A ResMut struct is a wrapper around a RefMut that contains a mutable reference to a Component. It is used to access and modify the data of a Component.
pub struct ResMut<'s, C : Component + 'static> {
    component : RefMut<'s, Box<dyn Component>>,
    _phantom : std::marker::PhantomData<&'s C>
}

impl <'s, C : Component + 'static> ResMut<'s, C> {
    /// Creates a new ResMut struct from a RefMut to a Component. It has the same lifetime as the RefMut.
    pub fn new(component : RefMut<'s, Box<dyn Component>>) -> Self {
        Self {
            component,
            _phantom : std::marker::PhantomData
        }
    }
}

impl <C : Component> Deref for ResMut<'_, C> {
    type Target = C;
    
    fn deref(&self) -> &Self::Target {
        self.component.deref().cast::<C>().unwrap()
    }
}

impl <C : Component> DerefMut for ResMut<'_, C> {
    fn deref_mut(&mut self) -> &mut Self::Target {
        self.component.deref_mut().cast_mut::<C>().unwrap()
    }
}


//=========================================================================================================================
//           ComponentGroup Trait
//=========================================================================================================================

/// The ComponentGroup trait is used to group multiple Components together. It can be used to get a disjoint mutable references to multiple Components.
pub(crate) trait ComponentGroup {
    type Ref<'s>;
    type RefMut<'s>;
    
    /// Takes the ComponentGroup and returns a Vec of the Components.
    fn components_take(self) -> Vec<Box<dyn Component>>;
    
    /// Returns a disjoint reference to the Components. 
    fn components_ref<'s>(components : &'s HashMap<TypeId, RefCell<Box<dyn Component>>>) -> Option<Self::Ref<'s>>;
    
    /// Returns a disjoint mutable reference to the Components.
    fn components_mut<'s>(components : &'s HashMap<TypeId, RefCell<Box<dyn Component>>>) -> Option<Self::RefMut<'s>>;
}

impl <C : Component> ComponentGroup for C {
    type Ref<'s> = Res<'s, C>;

    type RefMut<'s> = ResMut<'s, C>;

    fn components_take(self) -> Vec<Box<dyn Component>> {
        vec![Box::new(self)]
    }

    fn components_ref<'s>(components : &'s HashMap<TypeId, RefCell<Box<dyn Component>>>) -> Option<Self::Ref<'s>> {
        let component = components.get(&std::any::TypeId::of::<C>())?;
        Some(Res::new(component.borrow()))
    }
    fn components_mut<'s>(components : &'s HashMap<TypeId, RefCell<Box<dyn Component>>>) -> Option<Self::RefMut<'s>> {
        let component = components.get(&std::any::TypeId::of::<C>())?;
        Some(ResMut::new(component.borrow_mut()))
    }
}

/// A Macro to help implement different versions of the Archetype trait.
macro_rules! impl_component_group {
    ($($params:ident, $location:tt);*) => { 
        impl <$($params : Component + Sized + 'static),*> ComponentGroup for ($($params,)*) {
            
            type Ref<'s> = ($(Res<'s, $params>),*);
            type RefMut<'s> = ($(ResMut<'s, $params>),*);
            
            fn components_take(self) -> Vec<Box<dyn Component>> {
                vec![$(Box::new(self.$location)),*]
            }
            
            fn components_ref<'s>(components : &'s HashMap<TypeId, RefCell<Box<dyn Component>>>) -> Option<Self::Ref<'s>> {
                $(
                    let paste!{[<c$location>]} : Res<'s, $params> = Res::new(components.get(&std::any::TypeId::of::<$params>())?.borrow());
                )*
                Some(($(paste!{[<c$location>]}),*))
            }
            
            fn components_mut<'s>(components : &'s HashMap<TypeId, RefCell<Box<dyn Component>>>) -> Option<Self::RefMut<'s>> {
                $(
                    let paste!{[<c$location>]} : ResMut<'s, $params> = ResMut::new(components.get(&std::any::TypeId::of::<$params>())?.borrow_mut());
                )*
                Some(($(paste!{[<c$location>]}),*))
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