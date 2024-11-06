import { useState } from "react"
import {WizardComponentContext} from "./WizardComponentContext"

export type WizardComponentProps<T extends object> = {
  startingData: T;
  onWizardComplete? : (data: T) => void;
  children: React.ReactNode | React.ReactNode[];
}

export type WizardStepHandler<T> = {
  data : T,
  submitStep : (data : T) => void
}

const WizardComponent = <T extends object>({ children, startingData, onWizardComplete = () => {} } : WizardComponentProps<T>) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<T>(startingData);
  
  let childrenArray = Array.isArray(children) ?  children : [children];
  
  if(currentStep >= childrenArray.length) {
    onWizardComplete(data);
  }
  
  const Child = childrenArray[currentStep];
  if (!Child) {
    return null;
  }
  
  const onSubmitStep = (data : T) => {
    setData({...data, ...data});
    setCurrentStep(currentStep + 1);
  }
  
  return (
    <WizardComponentContext.Provider value={{ data: data, submitStep : onSubmitStep}}>
      {Child}
    </WizardComponentContext.Provider>
  )
}

export default WizardComponent;
