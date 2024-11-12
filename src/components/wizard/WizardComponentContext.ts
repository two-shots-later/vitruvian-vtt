import { createContext, useContext } from "react";
import { WizardStepHandler } from "./WizardCompnent";

export type WizardComponentContextData = WizardStepHandler<any>

export const WizardComponentContext = createContext<WizardComponentContextData | null>(null);

export default function useWizardComponentContext<T>() : WizardStepHandler<T> {
  return useContext(WizardComponentContext) as WizardStepHandler<T>;
};