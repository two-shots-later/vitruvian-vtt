import { CharacterPortraitImage } from "../components/ChracterPortrait"

export type UnitSize = "hug" | "full" | `${number}${SizeUnits}`
type SizeUnits = "fr" | "px" | "em" | "rem" | "%" | "vw" | "vh"

export function parseUnitSize(unitSize: UnitSize): string {
    if(unitSize === "full") return "100%"
    if(unitSize === "hug") return "auto"
    return unitSize
}

/** This is a type that should be used on any component that accepts styling. Doen't apply for all components. */
export type StyledComponent = {
  className?: string,
  style?: React.CSSProperties,
}


/** THIS IS TEMPARARY UNTIL WE HAVE CHARACTER TYPE FROM BACKEND */
export type PathfinderCharacter = {
  name : string,
  level : number,
  class : Class,
  campaign : string,
  ancestry : Ancestry,
  image? : CharacterPortraitImage,
}

export type Class = "Barbarian" | "Bard"

type Ancestry = "Dwarf" | "Elf"