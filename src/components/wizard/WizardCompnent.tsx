import React, { useState } from "react"

export type WizardComponentProps<T extends object> = {
  children? : Children<T>
  startingData : T
}

// type Children<T> = React.ReactElement<WizardStep<T>>[] | React.ReactElement<WizardStep<T>>
type Children<T> = Child<T>[] | Child<T>
type Child<T> = (handler : WizardStepHandler<T>) => React.ReactNode
export type WizardStepHandler<T> = {
  data : T,
  submitStep : (data : T) => void
}

const WizardComponent = <T extends object>({ children, startingData} : WizardComponentProps<T>) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepData, setStepData] = useState<T>(startingData);
  
  let childrenArray = Array.isArray(children) ?  children : [children];
  
  const child = childrenArray[currentStep];
  if (!child) {
    return null;
  }
  
  const onSubmitStep = (data : T) => {
    setStepData({...stepData, ...data});
    setCurrentStep(currentStep + 1);
  }
  
  return (
    <div>
      {child({data : stepData, submitStep : onSubmitStep})}
    </div>
  )
}

export default WizardComponent;
