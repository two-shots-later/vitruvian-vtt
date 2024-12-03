export type TagProps = {
  children?: string
}

export default function Tag({ children } : TagProps) {
  return (
    <div className="px-2 bg-theme-secondary rounded-lg text-nowrap whitespace-nowrap">
      {children}
    </div>
  )
}