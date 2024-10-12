import { IconId } from "../types/Icon";
import sprites from "../assets/spirtes.svg"

export type IconProps = {
  /** Defines what icon is shown. */
  variant: IconId;
  /** The size of the icon. */
  size?: number;
  /** Optional class names for the icon. */
  className?: string;
}

export default function Icon({ variant, size = 24, className } : IconProps) {
  return (
    <svg width={size} height={size}>
      <use xlinkHref={`${sprites}#${variant}`} className={className}/>
    </svg>
  )
}