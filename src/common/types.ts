import { CharacterPortraitImage } from "../components/ChracterPortrait"

export type UnitSize = "hug" | "full" | `${number}${SizeUnits}`
type SizeUnits = "fr" | "px" | "em" | "rem" | "%" | "vw" | "vh"

export function parseUnitSize(unitSize: UnitSize): string {
    if(unitSize === "full") return "100%"
    if(unitSize === "hug") return "auto"
    return unitSize
}

export function calcUnitSize(unitSize : UnitSize, dimention : number) : string {
  if(unitSize === "full") return `${dimention}px`
  if(unitSize === "hug") return "auto"
  
  const [value, unit] = separateUnit(unitSize)
  
  console.log(unit);
  
  switch (unit) {
    case "%":
      return `${(value / 100) * dimention}px`
      break;
  }
  return unitSize
}

function separateUnit(unitSize: UnitSize) : [number, string] {
  const value = unitSize.replace(/[a-z%]+/, '')
  const unit = unitSize.replace(/[0-9.]+/, '')
  return [Number.parseFloat(value), unit]
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
  
  tags : string[],
  image? : CharacterPortraitImage,
}

export type Class = "Barbarian" | "Bard"

type Ancestry = "Dwarf" | "Elf"