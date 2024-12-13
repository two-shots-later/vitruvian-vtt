import { PathfinderCharacter } from "../../common/types";
import { Button } from "../../components/Button";
import CharacterCard from "../../components/CharacterCard";
import Icon from "../../components/Icon";
import { useSearchBar } from "../../components/SearchBar";
import pathfinderCharacters from "../../test_character_data.json";
import backgroundImage from "./assets/project-paper.png";

const characters : PathfinderCharacter[] = pathfinderCharacters as PathfinderCharacter[];

export function CharacterSelectionPage() {
  const { searchBar, searchResults } = useSearchBar(characters, {className : "w-full"});
  
  
  
  return (
    <div className="">
      {/* <div className="flex justify-center items-center pb-4">
        <PopOver gap="0.25rem" renderChild={true} side="bottom" align="center">
          <div className="p-2 border-4 w-24 bg-theme-background z-10">Parent</div>
          <div className="p-2 border animate-fade bg-theme-background">Child</div>
        </PopOver>
      </div> */}
      <div className="flex flex-col gap-4 p-4 justify-center items-center">
        <div className="flex justify-between items-center w-full gap-6 max-w-7xl">
          <h1 className="text-5xl font-bold">Characters</h1>
          <div className="w-full flex gap-2">
            <Button variant="primary"><Icon variant={"plus"}/></Button>
            { searchBar }
          </div>
        </div>
        <div className="flex flex-wrap gap-y-8 justify-center w-full border-l border-r max-w-7xl min-h-full">
          {searchResults.map(c => (
            <div className="p-2 hover:bg-theme-background-secondary hover:cursor-pointer rounded-lg">
              <CharacterCard key={c.name + ":" + c.campaign} character={c}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}