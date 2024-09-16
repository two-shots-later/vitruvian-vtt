import { twMerge } from "tailwind-merge"
import Icon, { IconProps } from "./Icon"

export type BadgeProps = IconProps & {
  className?: string
}

export default function Badge(props : BadgeProps) {
  return (
    <div className={twMerge(`rounded-full p-1 w-min bg-theme-primary`, props.className)}>
      <Icon {...props}/>
    </div>
  )
}