import { ReactElement, useContext } from "react"
import { Archetype, ArchetypeValue, ConcreteEntity} from "../../common/entity"
import { EntityTableContext } from "./EntityTable"
import { UnitSize } from "../../common/types"

type TableHeaderRenderFunction<A extends Archetype, N extends ArchetypeValue, V extends ConcreteEntity<A>[N]> = (component : V) => ReactElement

export type EntityTableHeaderProps<A extends Archetype, N extends A[number]> = {
  component : N,
  label? : string,
  renderer? : TableHeaderRenderFunction<A, N, ConcreteEntity<A>[N]>,
  width? : UnitSize
}

/**
* @description EntityTableHeader discribes a header inside of an EntityTable. If use anywhere outside of an EntityTable it will not render anything.
* @component
*/
export default function EntityTableHeader<A extends Archetype, N extends A[number]>({ 
  component,
  renderer,
} : EntityTableHeaderProps<A, N>) {
  const entityTableContext = useContext(EntityTableContext);
  if(entityTableContext == undefined) return null
  const { entities, column } = entityTableContext;
  
  const renderFunction = renderer ? renderer : (component : ConcreteEntity<A>[N]) => {
    return component
  }
  
  const renderedEntities = entities.map((entity, index) => { 
    const style = {
      gridColumn : column + 1,
      gridRow : index + 2
    }
    return <div className="truncate px-1" key={"row-" + index} style={style}>
      {renderFunction((entity as ConcreteEntity<A>)[component]) as ReactElement}
    </div>}
  );
  
  return (
    <>
      <div className="text-theme-font-secondary border-b border-theme-font-secondary truncate px-1 sticky top-0 bg-theme-background">{component}</div>
      {renderedEntities}
    </>
  )
}