import { PathfinderCharacter } from "../common/types";
import CharacterCard from "../components/CharacterCard";
import { useSearchBar } from "../components/SearchBar";
import pathfinderCharacters from "../test_character_data.json";

const characters : PathfinderCharacter[] = pathfinderCharacters as PathfinderCharacter[];

export function CharacterSelectionPage() {
  const { searchBar, searchResults } = useSearchBar(characters, {className : "w-full"});
  
  return (
    <div>
      {/* <div className="flex justify-center items-center pb-4">
        <PopOver gap="0.25rem" renderChild={true} side="bottom" align="center">
          <div className="p-2 border-4 w-24 bg-theme-background z-10">Parent</div>
          <div className="p-2 border animate-fade bg-theme-background">Child</div>
        </PopOver>
      </div> */}
      <div className="flex flex-col gap-4 p-4 justify-center items-center">
        <div className="flex justify-between w-full gap-6 pr-8">
          <h1 className="text-5xl font-bold">Characters</h1>
          { searchBar }
        </div>
        <div className="flex flex-wrap gap-8 justify-start w-full py-6">
          {searchResults.map(c => <CharacterCard key={c.name + c.campaign} character={c} />)}
        </div>
      </div>
    </div>
  );
}