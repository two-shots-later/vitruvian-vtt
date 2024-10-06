import { CSSProperties, useState } from "react"
import { createPortal } from "react-dom"

export type ModalProps = {
  children: ((close : () => void) => React.ReactNode) | React.ReactNode,
  active: boolean,
  setActive: (newState : boolean) => void,
  onClose?: () => void,
  onOpen?: () => void,
  noTransition?: boolean,
  allowBackgroundScroll?: boolean,
}

export default function Modal({ 
  children, 
  active, 
  setActive,
  onOpen = () => {},
  onClose = () => {},
} : ModalProps) {
  
  const [style, setStyle] = useState<CSSProperties>({
    animation: "fadeIn .15s ease-in-out"
  })
  
  if(active) {
    document.body.style.overflow = "hidden"
    onOpen()
  } else {
    document.body.style.overflow = "auto"
    onClose()
  }
  
  const closeFunction = () => {
    setTimeout(() => { setActive(false); setStyle({animation: "fadeIn .15s ease-in-out"})}, 150)
    setStyle({
      animation: "fadeOut .15s ease-in-out"
    })
  }
  
  return active ? createPortal(<div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-45" style={style} onClick={closeFunction}>
    <div className="z-20" onClick={event => event.stopPropagation()}>
      {typeof children === "function" ? children(closeFunction) : children}
    </div>
  </div>, document.body) : null;
}