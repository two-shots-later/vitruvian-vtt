import { ReactNode, useLayoutEffect, useRef } from "react"
import { calcUnitSize, parseUnitSize, UnitSize } from "../common/types";
import { createPortal } from "react-dom";

export type PopOverProps = {
  children: [ReactNode, ReactNode];
  side? : PopoverSide;
  gap? : UnitSize;
  shear?: UnitSize;
  align? : PopoverAlign;
  fitWithin? : React.RefObject<HTMLElement>;
  renderChild?: boolean;
  container? : HTMLElement;
  className? : string;
  childWidth? : UnitSize;
}

export default function PopOver({ 
  children, side = "bottom", 
  align = "center", 
  gap = "0.25rem",
  shear = "0px",
  renderChild = true, 
  container = document.body,
  className,
  childWidth = "hug"
} : PopOverProps) {
  
  const parentRef = useRef<HTMLDivElement>(null)
  const childRef = useRef<HTMLDivElement>(null)
  
  const gapSize = parseUnitSize(gap);
  const shearSize = parseUnitSize(shear);
  
  useLayoutEffect(() => {
    console.log(side)
    if (!parentRef.current || !childRef.current || !renderChild) return;
    
    for(const s of sidePriorityArray(side)) {
      applyPos(parentRef.current, childRef.current, gapSize,shearSize, s, align);
      if (elementIsVisibleInViewport(childRef.current)) break;
    }
    
    const width = calcUnitSize(childWidth, parentRef.current.getBoundingClientRect().width)
    childRef.current.style.width = width;
  })
  
  return <>
    <div ref={parentRef} className={className}>
      {children[0]}
    </div>
    {renderChild && createPortal((
      <div ref={childRef} className="absolute top-0 left-0 z-40">
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
  shear : string,
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
    x = `calc(${parentBB.x}px + ${alignValue} + ${shear})`
    y = `calc(${parentBB.y - childBB.height}px - ${gap})`
  } else if(side === 'bottom') {
    x = `calc(${parentBB.left}px + ${alignValue}  + ${shear})`
    y = `calc(${parentBB.bottom}px + ${gap})`
    console.log(x, y)
  } else if(side === 'right') {
    x = `calc(${parentBB.right}px + ${gap})`
    y = `calc(${parentBB.top}px + ${alignValue} - ${shear})`
    console.log(x, y)
  } else {
    x = `calc(${parentBB.left}px - ${childBB.width}px - ${gap})`
    y = `calc(${parentBB.top}px + ${alignValue} - ${shear})`
  }
  
  child.style.transform = `translate(${x}, ${y})`
}

function isWithin(container : HTMLElement, element : HTMLElement) {
  const containterBB = container.getBoundingClientRect();
  const elementBB = element.getBoundingClientRect();
  
  const p0 = { x: elementBB.x, y: elementBB.y }
  const p1 = { x: elementBB.x + elementBB.width, y: elementBB.y + elementBB.height }
  
  const isPointWithin = (p: {x : number, y : number}) => 
    p.x >= containterBB.x && 
    p.x <= containterBB.x + containterBB.width && 
    p.y >= containterBB.y && 
    p.y <= containterBB.y + containterBB.height;
  
  return isPointWithin(p0) && isPointWithin(p1);
}

function elementIsVisibleInViewport(el : HTMLElement, partiallyVisible = false) {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) ||
        (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};


function sidePriorityArray(side : PopoverSide) : PopoverSide[] {
  switch(side) {
    case 'top': return ['top', 'bottom', 'left', 'right'];
    case 'bottom': return ['bottom', 'top', 'left', 'right'];
    case 'left': return ['left', 'right', 'top', 'bottom'];
    case 'right': return ['right', 'left', 'top', 'bottom'];
  }
}
