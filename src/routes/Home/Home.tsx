import Input from "../../components/input/Input";
import WizardComponent, { WizardStepHandler } from "../../components/wizard/WizardCompnent";

const Home = () => {
  return (
    <div className="py-10">
      <div className="flex flex-col gap-6 justify-center items-center px-56">
        {/* <CharacterPortrait image={{image : "test_character.png", x_offset: -90}} icon="moon"/>
        <CharacterPortrait/> */}
        <WizardComponent startingData={{name : "Test"}}>
          {Step1}
        </WizardComponent>
      </div>
    </div>
  );
};

export default Home;

type TestType = {
  name?: string;
  age?: number;
};

function Step1({ data, submitStep } : WizardStepHandler<TestType>) {
  return (
    <div className="flex flex-col gap-2">
      <Input type="email" placeholder="Email"/>
      <Input placeholder="Name"/>
    </div>
  )
}
