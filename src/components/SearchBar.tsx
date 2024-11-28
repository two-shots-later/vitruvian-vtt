import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export type SearchBarProps = {
  className?: string;
};

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(({className} : SearchBarProps, ref) => {
  
  const classes = twMerge("p-2 bg-theme-background border rounded-md outline-none", className);
  
  return (
      <input type="text" className={classes} placeholder="Search..." ref={ref}/>
  );
});

export default SearchBar;