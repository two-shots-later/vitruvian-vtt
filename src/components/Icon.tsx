import { IconId } from "../types/Icon";
import sprites from "../assets/spirtes.svg"

export type IconProps = {
  variant: IconId;
  size?: number;
}

export default function Icon({ variant, size = 24 } : IconProps) {
  return (
    <svg width={size} height={size}>
      <use xlinkHref={`${sprites}#${variant}`} />
    </svg>
  )
}