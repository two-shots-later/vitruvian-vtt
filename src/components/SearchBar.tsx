import { forwardRef, useState, useMemo, KeyboardEvent, KeyboardEventHandler, useEffect} from "react";
import { twMerge } from "tailwind-merge";
import Icon from "./Icon";
import PopOver from "./PopOver";
import Tag from "./Tag";

export type SearchBarItem = {
  name : string;
  tags? : string[];
}

export type SearchBarProps = {
  className?: string;
  searchItems: SearchBarItem[];
  limit? : number;
  onSearchResultsChange? : (results : SearchBarItem[]) => void;
};

const applySearch = <T extends SearchBarItem>(items : T[], search : string, tags? : string[]) => {
  const searchFilteredItems = items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

  if(!tags || tags.length === 0) return searchFilteredItems;
  
  const tagFilteredItems = searchFilteredItems.filter(item => {
    let shouldBeIncluded = true;
    if(!item.tags) { 
      if (tags.length !== 0) shouldBeIncluded = false;
    } else {
      for (const tag of tags) {
        shouldBeIncluded = shouldBeIncluded && item.tags.includes(tag);
        // if (item.tags?.includes(tag)) return true;
      }
    }
    return shouldBeIncluded;
  })
  
  return tagFilteredItems;
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(({
  className, 
  searchItems, 
  limit = 10, 
  onSearchResultsChange = () => {},
} : SearchBarProps, ref) => {
  
  const classes = twMerge("bg-theme-background rounded-md h-8", className);
  
  const [searchText, setSearchText] = useState<string>("");
  const [focusedTag, setFocusedTag] = useState<number>(0);
  const [tagScroll, setTagScroll] = useState<number>(0);
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
  
  const maxLength = useMemo(() => {
    setTagScroll(0);
    setFocusedTag(0);
    console.log(filteredTags);
    return Math.min(filteredTags.length, limit);
  }, [currentTag, filteredTags.length])
  
  const reducedTags = useMemo(() => filteredTags.map(tag => `#${tag}`).splice(tagScroll,limit), [filteredTags, tagScroll])
  
  const onKeyPress : KeyboardEventHandler = (event : KeyboardEvent) => {
    // console.log(event.code)
    if(event.code === 'Enter' && areHintsOpen) {
      setSearchText("");
      setTagScroll(0);
      setFocusedTag(0);
      const newTag = filteredTags[focusedTag + tagScroll];
      if(newTag) { 
        setSelectedTags([...selectedTags, newTag]);
      }
    }
    
    if(event.code === "Backspace" && searchText === "") {
      setSelectedTags(selectedTags.slice(0, selectedTags.length - 1));
    }
    
    if (event.code === "ArrowUp" && areHintsOpen) {
      if(focusedTag > 0) setFocusedTag(focusedTag - 1)
      if(focusedTag === 0 && tagScroll !== 0) setTagScroll(tagScroll - 1)
      event.preventDefault()
    }
    
    if (event.code === "ArrowDown" && areHintsOpen) {
      if(focusedTag < (maxLength - 1)) setFocusedTag(focusedTag + 1)
      if(focusedTag === (maxLength - 1) && tagScroll + focusedTag < filteredTags.length - 1) setTagScroll(tagScroll + 1)
      event.preventDefault()
    }
  }
  
  useEffect(() => {
    if (areHintsOpen) return;
    const filteredSearchItems = applySearch(searchItems, searchText, selectedTags);
    if(searchItems !== filteredSearchItems) {
      onSearchResultsChange(filteredSearchItems)
    }
  }, [selectedTags, searchText])
  
  return (
    <div className={classes + " flex justify-stretch items-center border overflow-hidden p2"}>
      <div className="bg-white h-full px-1">
        <button className="h-full">
          <Icon variant="search" className="fill-theme-background" size={16}/>
        </button>
      </div>
      <div className="flex gap-1 px-1"> 
        {selectedTags.map(tag => {
          return <Tag>{tag}</Tag>
        })}
      </div>
      <PopOver align="start" className="w-full h-full" side="bottom" childWidth="hug" renderChild={areHintsOpen}> 
        <input 
          type="text" 
          className="bg-theme-background round px-1 outline-none w-full h-full" 
          placeholder="Search..." 
          ref={ref}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          onKeyDown={onKeyPress}
        />
        <div className="bg-theme-background border rounded-md overflow-hidden">
          { reducedTags.map((item, index) => 
            <div className={`bg-theme-background ${index === focusedTag ? "bg-theme-background-secondary" : "hover:bg-theme-background-secondary"} p-1`}> <button>{ item }</button> </div>
          )}
        </div>
      </PopOver>
    </div>
  );
});

export const useSearchBar = <T extends SearchBarItem>(items : T[], searchBarProps? : Omit<SearchBarProps, 'searchItems'>) => {
  const [searchResults, setSearchResults] = useState<T[]>(items);
  const searchBar = <SearchBar {...searchBarProps} searchItems={items} onSearchResultsChange={i => setSearchResults(i as T[])} />
  return {searchResults, searchBar}
}

export default SearchBar;

