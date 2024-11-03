import { Entity } from "../../types/gen/Entity";
import CharacterPortrait from "../../components/ChracterPortrait";

const Home = () => {
  return (
    <div className="py-10">
      <div className="flex flex-col gap-6 justify-center items-center px-56">
        {/* <CharacterPortrait image={{image : "test_character.png", x_offset: -90}} icon="moon"/>
        <CharacterPortrait/> */}
      </div>
    </div>
  );
};

export default Home;
