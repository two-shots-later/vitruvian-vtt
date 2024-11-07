import { useState } from "react"
import {WizardComponentContext} from "./WizardComponentContext"

export type WizardComponentProps<T extends object> = {
  startingData: T;
  onWizardAbort : () => void;
  onWizardComplete? : (data: T) => void;
  children: React.ReactNode | React.ReactNode[];
}

export type WizardStepHandler<T> = {
  data : T,
  abort: () => void,
  submitStep : (data : T) => void,
  backStep : () => void
}

const WizardComponent = <T extends object>({ 
  children, 
  startingData, 
  onWizardComplete = () => {}, 
  onWizardAbort 
} : WizardComponentProps<T>) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<T>(startingData);
  
  let childrenArray = Array.isArray(children) ?  children : [children];
  
  if(currentStep >= childrenArray.length) {
    onWizardComplete(data);
  }
  
  const onSubmitStep = (d : T) => {
    setData({...data, ...d});
    setCurrentStep(currentStep + 1);
  }
  
  const onBackStep = () => {
    setCurrentStep(currentStep - 1);
  }
  
  const onAbortProcess = () => {
    setCurrentStep(0)
    onWizardAbort();
  }
  
  return (
    <WizardComponentContext.Provider value={{ data: data, submitStep : onSubmitStep, backStep : onBackStep, abort: onAbortProcess}}>
      <div className="relative w-full h-full">
        {childrenArray.map((child, index) => {
          const currentPos = (index - currentStep) * 100;
          const style = {
            transform : `translateX(calc(${currentPos}vw - 50%)) translateY(-50%)`, 
            left : `50%`, 
            top : '50%'
          }
          return <div style={style} className={`absolute transition-all duration-300 ${currentStep === index ? "opacity-100" : "opacity-0"}`}>      
            {child}
          </div>
        })}
      </div>
    </WizardComponentContext.Provider>
  )
}

export default WizardComponent;
