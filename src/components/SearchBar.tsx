import { forwardRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import Icon from "./Icon";
import PopOver from "./PopOver";

export type SearchBarProps = {
  className?: string;
};

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(({className} : SearchBarProps, ref) => {
  
  const classes = twMerge("bg-theme-background rounded-md h-8", className);
  
  const [searchText, setSearchText] = useState<string>("");
  
  
  return (
    <div className={classes + " flex justify-stretch items-center border overflow-hidden p2"}>
      <div className="bg-white h-full px-1">
        <button className="h-full">
          <Icon variant="search" className="fill-theme-background" size={16}/>
        </button>
      </div>
      <PopOver className="w-full h-full"> 
        <input 
          type="text" 
          className="bg-theme-background round px-2 outline-none w-full h-full" 
          placeholder="Search..." 
          ref={ref}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
        Test
      </PopOver>
    </div>
  );
});

export default SearchBar;