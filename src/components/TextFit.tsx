import { useLayoutEffect, useRef } from "react";
import { clamp } from "../common/util";
import { StyledComponent, UnitSize } from "../common/types";

const ITERATION_LIMIT = 10;
const MAXIMUM_DIFFERENCE = 1;

export type TextFitProps = StyledComponent & {
  children: string;
  minFontSize?: number;
  maxFontSize?: number;
  width?: UnitSize;
  padding?: {x : number, y : number}
}

export default function TextFit({children, minFontSize = 0, maxFontSize = Number.MAX_VALUE, padding} : TextFitProps) {
  
  const textRef = useRef<HTMLDivElement>(null);
  
  const fontSize = useRef<number>(0);
  const fontSizeLowerBound = useRef<number>(0);
  const fontSizeUpperBound = useRef<number>(0);
  
  const adjustFontSize = (childDimensions: Dimensions, parentDimensions: Dimensions) => {
    const childElement = textRef.current;

    if (!childElement) return;

    let newFontSize;

    if (
      childDimensions.width > parentDimensions.width ||
      childDimensions.height > parentDimensions.height
    ) {
      // The element is bigger than the parent, scale down
      newFontSize = (fontSizeLowerBound.current + fontSize.current) / 2;
      fontSizeUpperBound.current = fontSize.current;
    } else if (
      childDimensions.width < parentDimensions.width ||
      childDimensions.height < parentDimensions.height
    ) {
      // The element is smaller than the parent, scale up
      newFontSize = (fontSizeUpperBound.current + fontSize.current) / 2;
      fontSizeLowerBound.current = fontSize.current;
    } else {
      // The element fits perfectly
      return;
    }

    // Store font size in a ref so we don't have to measure styles to get it
    fontSize.current = newFontSize;
    childElement.style.fontSize = `${clamp(newFontSize, minFontSize, maxFontSize)}px`;
  };
  
  useLayoutEffect(() => {
    let textComponent = textRef.current;
    let parentComponent = textComponent?.parentElement;
    
    if (!textComponent || !parentComponent) return undefined;
    
    //Setup an observer to watch for changes in the parent component
    const observer = new ResizeObserver(entries => {
      const parentEntry = entries[0];
      if (!parentEntry) return;
      
      const parentDimensions = parentEntry.contentRect;
      
      // Reset the iteration parameters
      fontSizeLowerBound.current = 0;
      fontSizeUpperBound.current = parentDimensions.height;

      let iterationCount = 0;

      while (iterationCount <= ITERATION_LIMIT) {
        const childDimensions = getElementDimensions(textComponent, padding);

        const widthDifference = parentDimensions.width - childDimensions.width;
        const heightDifference = parentDimensions.height - childDimensions.height;

        const childFitsIntoParent = heightDifference >= 0 && widthDifference >= 0;
        const childIsWithinWidthTolerance =
          Math.abs(widthDifference) <= MAXIMUM_DIFFERENCE;
        const childIsWithinHeightTolerance =
          Math.abs(heightDifference) <= MAXIMUM_DIFFERENCE;

        if (
          childFitsIntoParent &&
          (childIsWithinWidthTolerance || childIsWithinHeightTolerance)
        ) {
          // Stop the iteration, we've found a fit!
          break;
        }

        adjustFontSize(childDimensions, parentDimensions);

        iterationCount += 1;
      }
    })
    
    observer.observe(parentComponent);
    return () => observer.disconnect();
  }, []);
  
  return (
    <div ref={textRef} className="text-nowrap">
      {children}
    </div>
  );
}

type Dimensions = {
  height: number;
  width: number;
};

type Padding = {
  x : number,
  y : number
}

function getElementDimensions(element: HTMLElement, padding: Padding = {x: 0, y : 0}): Dimensions {
  const bbox = element.getBoundingClientRect();
  
  return {
    width: bbox.width + padding.x,
    height: bbox.height + padding.y,
  };
}
