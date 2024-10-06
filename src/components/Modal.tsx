import { CSSProperties, useState } from "react"
import { createPortal } from "react-dom"

/** The Props for the modal component */
export type ModalProps = {
  /** The content of the modal. This can be any react component or a function that takes in one function and returns any component. The input to that function is a function that closes the model */
  children: ((close : () => void) => React.ReactNode) | React.ReactNode,
  /** Whether the modal is active or not. */
  active: boolean,
  /** A function that sets the active state of the value passed into the modal */
  setActive: (newState : boolean) => void,
  /** A callback function that is run when the modal closes */
  onClose?: () => void,
  /** A callback function that is run when the modal opens */
  onOpen?: () => void,
  /** Whether the modal should have a transition or not */
  noTransition?: boolean,
  /** Whether the modal should allow background scrolling or not */
  allowBackgroundScroll?: boolean,
}

/** This is the modal component for Vitruvian VTT. Unlike other Modals, the parrent of the modal is responsible for controlling the active state */
export default function Modal({
  children, 
  active, 
  setActive,
  onOpen = () => {},
  onClose = () => {},
  noTransition = false,
  allowBackgroundScroll = false
} : ModalProps) {
  
  const [style, setStyle] = useState<CSSProperties>({
    animation: "fadeIn .15s ease-in-out"
  })
  
  if(active) {
    if(!allowBackgroundScroll) document.body.style.overflow = "hidden"
    onOpen()
  } else {
    if(!allowBackgroundScroll) document.body.style.overflow = "auto"
    onClose()
  }
  
  const closeFunction = () => {
    if(noTransition) setActive(false)
    else {
      setTimeout(() => { setActive(false); setStyle({animation: "fadeIn .15s ease-in-out"})}, 150)
      setStyle({
        animation: "fadeOut .15s ease-in-out"
      })
    }
  }
  
  return active ? createPortal(<div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-45" style={noTransition ? undefined : style} onClick={closeFunction}>
    <div className="z-20" onClick={event => event.stopPropagation()}>
      {typeof children === "function" ? children(closeFunction) : children}
    </div>
  </div>, document.body) : null;
}