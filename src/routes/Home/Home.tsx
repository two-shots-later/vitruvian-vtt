import { Entity } from "../../types/gen/Entity"
import CharacterPortrait from "../../components/ChracterPortrait"

const exampleEntities : Entity[] = [
  {
    Name: "John Doe",
    Damage: "D12"
  },
  {
    Name: "Dilf Laungrin",
    Damage: "D100"
  },
  {
    Name: "Jane Doe",
    Damage: "D6"
  },
  {
    Name: "Jane Doe",
    Damage: "D6"
  },
  {
    Name: "Jane Doe",
    Damage: "D6"
  },
  {
    Name: "Jane Doe",
    Damage: "D6"
  },
  {
    Name: "Jane Doe",
    Damage: "D6"
  },
  {
    Name: "Jane Doe",
    Damage: "D6"
  },
  {
    Name: "Jane Doe",
    Damage: "D6"
  }
]

const Home = () => {
  return (
    <div className="py-10">
      <div className="flex flex-col gap-6 justify-center items-center px-56">
        <CharacterPortrait image={{image : "test_character.png", x_offset: -90}} icon="moon"/>
        <CharacterPortrait/>
      </div>
    </div>
  )
}

export default Home