import { PathfinderCharacter } from "../../common/types";
import CharacterCard from "../../components/CharacterCard";

const character : PathfinderCharacter = {
  name : "Tolskir Snowtreader",
  level : 5,
  class : "Barbarian",
  ancestry : "Dwarf",
  campaign : "Radiant Dawn",
  image : {image : "test_character.png", x_offset: 90, scale:200}
}

const Home = () => {
  return (
    <div className="py-10">
      <div className="flex flex-wrap gap-4 justify-center items-center w-full">
        <CharacterCard character={character} />
        <CharacterCard character={character} />
      </div>
    </div>
  );
};

export default Home;