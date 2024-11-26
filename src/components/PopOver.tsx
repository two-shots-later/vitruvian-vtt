import { ReactNode, useLayoutEffect, useRef } from "react"
import { parseUnitSize, UnitSize } from "../common/types";
import { createPortal } from "react-dom";

export type PopOverProps = {
  children: [ReactNode, ReactNode];
  side? : PopoverSide;
  gap? : UnitSize;
  align? : PopoverAlign;
  fitWithin? : React.RefObject<HTMLElement>;
  renderChild? : boolean
}

export default function PopOver({ children, side = "bottom", align = "center", gap = "0.25rem", renderChild = true } : PopOverProps) {
  
  const parentRef = useRef<HTMLDivElement>(null)
  const childRef = useRef<HTMLDivElement>(null)
  
  const gapSize = parseUnitSize(gap);
  
  useLayoutEffect(() => {
    if (!parentRef.current || !childRef.current || !renderChild) return;
    
    applyPos(parentRef.current, childRef.current, gapSize, side, align);
  })
  
  return <>
    <div ref={parentRef}>
      {children[0]}
    </div>
    {renderChild && createPortal((
      <div ref={childRef} className="absolute top-0 left-0 bg-theme-background">
        {children[1]}
      </div>
    ), document.body)}
  </>
}

type PopoverSide = "top" | "bottom" | "left" | "right";
type PopoverAlign = "start" | "center" | "end";

function applyPos(
  parent : HTMLDivElement, 
  child : HTMLDivElement, 
  gap : string, 
  side : PopoverSide,
  align : PopoverAlign
) {
  const parentBB = parent.getBoundingClientRect();
  const childBB = child.getBoundingClientRect();
  
  let alignValue = "0px";
  if(align === 'center') {
    if(side === 'top' || side === 'bottom') {
      alignValue = `${parentBB.width / 2 - childBB.width / 2}px`
    } else {
      alignValue = `${parentBB.height / 2 - childBB.height / 2}px`
    }
  } else if(align === 'end') {
    if(side === 'top' || side === 'bottom') {
      alignValue = `${parentBB.width - childBB.width}px`
    } else {
      alignValue = `${parentBB.height - childBB.height}px`
    }
  }
  
  let x = "", y = "";
  if(side === "top") {
    x = `calc(${parentBB.left}px + ${alignValue})`
    y = `calc(${parentBB.top - childBB.height}px - ${gap})`
  } else if(side === 'bottom') {
    x = `calc(${parentBB.left}px + ${alignValue})`
    y = `calc(${parentBB.bottom}px + ${gap})`
  } else if(side === 'right') {
    x = `calc(${parentBB.right}px + ${gap})`
    y = `calc(${parentBB.top}px + ${alignValue})`
  } else {
    x = `calc(${parentBB.left}px - ${childBB.width}px - ${gap})`
    y = `calc(${parentBB.top}px + ${alignValue})`
  }
  
  child.style.transform = `translate(${x}, ${y})`
}

function isWithin() {
  
}
