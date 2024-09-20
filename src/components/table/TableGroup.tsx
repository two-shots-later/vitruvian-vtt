import { ReactElement, useContext } from "react";
import { Archetype, ConcreteEntity, filterEntities } from "../../common/entity";
import { IconId } from "../../types/Icon";
import { EntityContext } from "./Table";
import Badge from "../Badge";

export type TableGroupLabels<A extends Archetype> = {
  [k in A[number] as string] : string
}

export type TableGroupRenderFunctions<A extends Archetype> = {
  [k in A[number] as string] : TableGroupRenderFunction<A>
}

type TableGroupRenderFunction<A extends Archetype> = <V extends ConcreteEntity<A>[A[number]]>(component : V) => ReactElement

export type TableGroupProps<A extends Archetype, D extends Archetype = []> = {
  archetype : A,
  renderFunctions? : TableGroupRenderFunctions<A>,
  data? : ConcreteEntity<A>[],
  headerLabels? : TableGroupLabels<A>,
  disallow? : D,
  icon? : IconId
  label? : string
}

export default function TableGroup<A extends Archetype, D extends Archetype = []>({
  archetype, 
  disallow, 
  icon, 
  label = "Group", 
  headerLabels,
  renderFunctions,
  data
} : TableGroupProps<A, D>) {
  const e = useContext(EntityContext)
  /// This line is a bit confusing. The tableGroup will use the entity context if available and filter from that.
  /// Otherwise, it will use the data prop if available. if both aren't there, it will default to an empty array.
  const entities = 
    e ? filterEntities<A, D>(e, disallow, ...archetype) : 
    data ? data : []
  ;
  
  const entityHtml = entities.map((entity, entityIndex) => {
    return archetype.map((componentID, componentIndex) => {
      const id = componentID as keyof ConcreteEntity<A>;
      const key = `${id}-${entityIndex}-${componentIndex}`
      const renderFunction = 
        renderFunctions ? renderFunctions[id] as TableGroupRenderFunction<A> : 
        ((component : any) => <div>{component}</div>) as TableGroupRenderFunction<A>
      const component = entity[componentID as keyof ConcreteEntity<A>]
      const componentHtml = renderFunction(component)
      const style = {
        gridRowStart : entityIndex + 2,
        gridColumnStart : componentIndex
      }
      return <div key={key} style={style} className="w-full h-full">{componentHtml}</div>
    })
  }).flat()
  
  const labelHtml = archetype.map((a, index) => {
    const l = a as string;
    const display = headerLabels ? headerLabels[a] || l : l;
    const style = {
      gridColumnStart : index + 1,
      gridRowStart : 1
    }
    return <div key={l} className="text-theme-font-secondary border-b border-theme-font-secondary truncate" style={style}>{display}</div>
  })
  
  const gridStyle = {
    gridTemplateColumns : `repeat(${archetype.length}, 1fr)`,
    gridTemplateRows : `min-content repeat(${entities.length}, min-content)`,
  }
  
  return (
    <div className="flex gap-1 px-1">
      <div className="flex flex-col gap-2 items-center w-min">
        {icon ? <Badge variant={icon} /> : null}
        <div className="[writingMode:vertical-rl] text-lg">{label}</div>
      </div>
      <div className="w-full border border-dashed rounded-lg grid p-1" style={gridStyle}>
        {labelHtml}
        {entityHtml}
      </div>
    </div>
  )
}