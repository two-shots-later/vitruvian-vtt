import { forwardRef, useState, useMemo, KeyboardEvent, KeyboardEventHandler} from "react";
import { twMerge } from "tailwind-merge";
import Icon from "./Icon";
import PopOver from "./PopOver";

export type SearchBarItem = {
  name : string;
  tags? : string[];
}

export type SearchBarProps = {
  className?: string;
  searchItems: SearchBarItem[];
  limit? : number;
};

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(({className, searchItems, limit = 10} : SearchBarProps, ref) => {
  
  const classes = twMerge("bg-theme-background rounded-md h-8", className);
  
  const [searchText, setSearchText] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const possibleTags : string[] = useMemo(() => {
    const currentTags = new Set<string>();
    
    for(const item of searchItems) {
      if(!item.tags) continue;
      for(const tag of item.tags) {
        currentTags.add(tag)
      }
    }
    
    return Array.from(currentTags).sort();
  }, [searchItems])
  
  const {areHintsOpen, currentTag} = useMemo(() => {
    if(possibleTags.length === 0) return {areHintsOpen: false, currentTag: ""}
    
    const areHintsOpen = searchText.startsWith("#")
    const currentTag = searchText.slice(1);
    
    return {areHintsOpen, currentTag}
  }, [searchText])
  
  const filteredTags = useMemo(() => {
    if(!currentTag || currentTag === "") return possibleTags;
    const filteredTags = possibleTags.filter(tag => tag.includes(currentTag));
    return filteredTags;
  }, [currentTag, possibleTags])
  
  const reducedTags = useMemo(() => filteredTags.map(tag => `#${tag}`).splice(0, limit), [filteredTags])
  
  const onKeyPress : KeyboardEventHandler = (event : KeyboardEvent) => {
    console.log(event.code)
    if(event.code === 'Enter') {
      
    }
  }
  
  const onBlur = () => {
  }
  
  return (
    <div className={classes + " flex justify-stretch items-center border overflow-hidden p2"}>
      <div className="bg-white h-full px-1">
        <button className="h-full">
          <Icon variant="search" className="fill-theme-background" size={16}/>
        </button>
      </div>
      <PopOver align="start" className="w-full h-full" childWidth="hug" renderChild={areHintsOpen}> 
        <input 
          type="text" 
          className="bg-theme-background round px-2 outline-none w-full h-full" 
          placeholder="Search..." 
          ref={ref}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          onKeyPress={onKeyPress}
        />
        <div className="bg-theme-background border rounded-md overflow-hidden">
          { reducedTags.map(item => 
            <div className="bg-theme-background hover:bg-theme-background-secondary p-1">
              <button>{ item }</button>
            </div>
          )}
        </div>
      </PopOver>
    </div>
  );
});

export default SearchBar;