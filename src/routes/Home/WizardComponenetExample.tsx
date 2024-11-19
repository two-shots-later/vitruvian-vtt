import { useState } from "react";
import { useInput } from "../../components/input/Input";
import useWizardComponentContext from "../../components/wizard/WizardComponentContext";
import WizardComponent from "../../components/wizard/WizardCompnent";
import Modal from "../../components/Modal";


/** This is just here to keep for later, when implementing the wizard component */

const WizardComponentExample = () => {
  
  const [open, setOpen] = useState(false);
  
  return (
    <div className="py-10">
      <div className="flex flex-col gap-6 justify-center items-center px-56">
        <button className="border p-2 rounded-md w-16" onClick={() => setOpen(true)}>Test</button>
        <Modal active={open} setActive={setOpen}>
            <WizardComponent onWizardAbort={() => setOpen(false)} startingData={{name : "Test Testington", email: "test@test.com"}} onWizardComplete={() => setOpen(false)}>
              <Step1/>
              <Step2/>
            </WizardComponent>
        </Modal>
      </div>
    </div>
  );
};

type TestType = {
  email?: string;
  name?: string;
};

export default WizardComponentExample;

function Step1() {
  
  const { data, submitStep, abort} = useWizardComponentContext<TestType>()
  
  const [email, _setEmail, EmailInput] = useInput({
    width: "25rem",
    placeholder: "Email",
    value: data.email,
    type: "email",
  });
  
  return (
    <div className="flex flex-col justify-center items-center py-10 gap-2 w-[80vw] bg-theme-background border rounded-lg">
      {EmailInput}
      <div className="w-full flex justify-center gap-4">
        <button className="border p-2 rounded-md w-16" onClick={abort}>Cancel</button>
        <button className="border p-2 rounded-md w-16" onClick={() => submitStep({email})}>Next</button>
      </div>
    </div>
  )
}

function Step2() {
  const { data, submitStep, backStep, abort} = useWizardComponentContext<TestType>()
  
  return (
    <div className="flex flex-col justify-center items-center py-10 gap-2 w-[80vw] bg-theme-background border rounded-lg">
      <div>Your Email: {data.email}</div>
      <div className="w-full flex justify-center gap-4">
        <button className="border p-2 rounded-md w-16" onClick={backStep}>Back</button>
        <button className="border p-2 rounded-md w-16" onClick={abort}>Cancel</button>
        <button className="border p-2 rounded-md w-16" onClick={() => submitStep({})}>Done</button>
      </div>
    </div>
  )
}