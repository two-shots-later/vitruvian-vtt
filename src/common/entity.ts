import { Entity } from "../types/gen/Entity";

export type Archetype = ArchetypeValue[];
export type ConcreteEntity<K extends Archetype> = Pick<Required<Entity>, K[number]>;

type ArchetypeValue = keyof Required<Entity>;

export function matchArchetype<A extends Archetype>(entity : Entity, ...archetype : A) : entity is ConcreteEntity<A>  {
  if (archetype.length == 0) return false;
  let archetypeMatch = true;
  for(const entry of archetype) {
    archetypeMatch = archetypeMatch && (entry in entity);
  }
  return archetypeMatch;
}