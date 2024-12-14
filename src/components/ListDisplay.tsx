import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export type ListDisplayProps<T extends ReactNode> = {
  children: T[],
  className?: string,
  noResultsMessage?: ReactNode,
}

export function ListDisplay<T extends ReactNode>({ children, className, noResultsMessage } : ListDisplayProps<T>) {
  if(children.length > 0) {
    return (
      <div className={twMerge("flex flex-wrap justify-center items-center gap-x-2 gap-y-6", className)}>
        {children}
      </div>
    )
  } else {
    return typeof noResultsMessage === "string" ? (
      <div className="w-full h-full flex flex-col items-center">
        <h1 className="text-5xl pt-20">No Results.</h1>
        {noResultsMessage}
      </div>
    ) : (
      <>{noResultsMessage}</>
    )
  }
}