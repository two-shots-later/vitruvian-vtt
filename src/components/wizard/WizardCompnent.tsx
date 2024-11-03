import React, { useState } from "react"


const test = (
  <WizardComponent>
    <WizardStep>{() => {
      
    }}</WizardStep>
    <WizardStep></WizardStep>
  </WizardComponent>
)

export type WizardComponentProps = {
  children : React.ReactElement<>
}

export default function WizardComponent() {
  const [isComplete, setIsComplete] = useState(false);
  
  
}