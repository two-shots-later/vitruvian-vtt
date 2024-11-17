import { PathfinderCharacter } from "../../common/types";
import CharacterCard from "../../components/CharacterCard";

const character : PathfinderCharacter = {
  name : "Tolskir Snowtreader",
  level : 1,
  class : "Barbarian"
}

const Home = () => {
  return (
    <div className="py-10">
      <div className="flex flex-col gap-20 justify-center items-center w-full">
        <CharacterCard character={character} />
        <CharacterCard character={character} />
      </div>
    </div>
  );
};

export default Home;