import { useState } from "react";
import Input, { useInput } from "../../components/input/Input";
import WizardComponent, { WizardStepHandler } from "../../components/wizard/WizardCompnent";
import Modal from "../../components/Modal";
import useWizardComponentContext from "../../components/wizard/WizardComponentContext";
import CharacterPortrait from "../../components/ChracterPortrait";

const Home = () => {
  
  const [open, setOpen] = useState(false);
  
  return (
    <div className="py-10">
      <div className="flex flex-col gap-6 justify-center items-center px-56">
        <button className="border p-2 rounded-md w-16" onClick={() => setOpen(true)}>Test</button>
        <CharacterPortrait image={{image : "test_character.png", x_offset: 90, scale:200}} icon="moon"/>
        <CharacterPortrait/>
        <Modal active={open} setActive={setOpen}>
            <WizardComponent startingData={{name : "Test Testington", email: "test@test.com"}} onWizardComplete={() => setOpen(false)}>
              <Step1/>
              <Step2/>
            </WizardComponent>
        </Modal>
      </div>
    </div>
  );
};

export default Home;

type TestType = {
  email?: string;
  name?: string;
};

function Step1() {
  
  const { data, submitStep} = useWizardComponentContext<TestType>()
  
  const [email, _setEmail, EmailInput] = useInput({
    width: "25rem",
    placeholder: "Email",
    value: data.email,
    type: "email"
  });
  
  return (
    <div className="flex flex-col justify-center items-center py-10 gap-2 w-[80vw] bg-theme-background border rounded-lg">
      {EmailInput}
      <button className="border p-2 rounded-md w-16" onClick={() => submitStep({email})}>Next</button>
    </div>
  )
}

function Step2() {
  const { data, submitStep} = useWizardComponentContext<TestType>()
  
  return (
    <div className="flex flex-col justify-center items-center py-10 gap-2 w-[80vw] bg-theme-background border rounded-lg">
      <div>Your Email: {data.email}</div>
      <button className="border p-2 rounded-md w-16" onClick={() => submitStep({})}>Done</button>
    </div>
  )
}
