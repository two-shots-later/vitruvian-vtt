export type UnitSize = "hug" | "full" | `${number}${SizeUnits}`
type SizeUnits = "fr" | "px" | "em" | "rem" | "%" | "vw" | "vh"

export function parseUnitSize(unitSize: UnitSize): string {
    if(unitSize === "full") return "100%"
    if(unitSize === "hug") return "auto"
    return unitSize
}