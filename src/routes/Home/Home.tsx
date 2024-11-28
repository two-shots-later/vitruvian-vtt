import { PathfinderCharacter } from "../../common/types";
import CharacterCard from "../../components/CharacterCard";
import PopOver from "../../components/PopOver";
import SearchBar from "../../components/SearchBar";

const character : PathfinderCharacter = {
  name : "Tolskir Snowtreader",
  level : 5,
  class : "Barbarian",
  ancestry : "Dwarf",
  campaign : "Radiant Dawn",
  tags : [
    "Dwarf",
    "Barbarian",
    "Test",
    "Level 5",
    "Alkenstar Rebel"
  ],
  image : {image : "test_character.png", x_offset: 90, scale:200}
}

const Home = () => {
  return (
    <div className="py-10">
      <SearchBar />
      <div className="flex justify-center items-center pb-4">
        <PopOver gap="0.25rem" renderChild={true} side="bottom" align="center">
          <div className="p-2 border-4 w-24 bg-theme-background z-10">Parent</div>
          <div className="p-2 border animate-fade bg-theme-background">Child</div>
        </PopOver>
      </div>
      <div className="flex flex-wrap gap-4 justify-center items-center w-full">
        <CharacterCard character={character} />
        <CharacterCard character={character} />
        <CharacterCard character={character} />
        <CharacterCard character={character} />
        <CharacterCard character={character} />
        <CharacterCard character={character} />
        <CharacterCard character={character} />
        <CharacterCard character={character} />
        <CharacterCard character={character} />
        <CharacterCard character={character} />
      </div>
    </div>
  );
};

export default Home;