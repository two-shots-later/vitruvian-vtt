import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";


const ButtonCVA = cva(["rounded p-1"], {
  variants: {
    variant: {
      primary: "bg-theme-button-background text-theme-background",
      secondary: "bg-theme-secondary text-theme-background",
    },
    size : {
      small: "text-sm p-1",
      medium: "text-md p-2",
      large: "text-lg p-4",
    }
  }
})

export type ButtonProps = VariantProps<typeof ButtonCVA> & ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode,
}

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "small", className, children } = props;
  const styles = twMerge(ButtonCVA({variant, size}), className)
  
  return (
    <button {...props} className={styles} style={{background: "radial-gradient(circle, var(--primary-color) 5%, var(--secondary-color) 100%)"}}>
      {children}
    </button>
  )
}