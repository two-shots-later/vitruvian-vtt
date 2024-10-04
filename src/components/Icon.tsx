import { IconId } from "../types/Icon";
import sprites from "../assets/spirtes.svg"

export type IconProps = {
  variant: IconId;
  size?: number;
  className?: string;
}

export default function Icon({ variant, size = 24, className } : IconProps) {
  return (
    <svg width={size} height={size}>
      <use xlinkHref={`${sprites}#${variant}`} className={className}/>
    </svg>
  )
}