export type TagProps = {
  children?: string
}

export default function Tag({ children } : TagProps) {
  return (
    <div className="p-2 bg-theme-secondary rounded-lg text-nowrap whitespace-nowrap">
      {children}
    </div>
  )
}