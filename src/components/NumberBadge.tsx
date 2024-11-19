import { parseUnitSize, UnitSize } from "../common/types";
import { clamp } from "../common/util";

export type NumberBadgeProps = {
  number: number;
  size?: UnitSize;
  stroke?: number;
};

export default function NumberBadge({number, size = "150px", stroke = 1} : NumberBadgeProps) {
  const parsedSize = parseUnitSize(size);
  const circleStyle = {
    stroke : "white",
    fill: "none",
    strokeWidth: stroke
  }
  
  return <svg style={{width: parsedSize, height : parsedSize}}>
    <circle cx="50%" cy="50%" r="49%" style={circleStyle}/>
    <circle cx="50%" cy="50%" r="40%" style={circleStyle}/>
    <text x="50%" y="50%" textAnchor="middle" dy="0.3em" fontSize="30" fill="white">{clamp(number, 0, 99)}</text>
  </svg>
}