import { ReactElement, useContext } from "react";
import { Archetype, ConcreteEntity, filterEntities } from "../../common/entity";
import { IconId } from "../../types/Icon";
import { EntityContext } from "./Table";
import Badge from "../Badge";

export type TableGroupLabels<A extends Archetype> = {
  [k in A[number] as string] : string
}

export type TableGroupRenderFunction<A extends Archetype> = {
  [k in A[number] as string] : <V extends ConcreteEntity<A>[A[number]]>(component : V) => ReactElement
}

export type TableGroupProps<A extends Archetype, D extends Archetype = []> = {
  archetype : A,
  renderFunctions? : TableGroupRenderFunction<A>,
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
  
  const entityHtml = entities.map((entity, index) => {
    return archetype.map((componentID, index) => {
      let id = componentID as keyof ConcreteEntity<A>;
      let renderFunction = 
        renderFunctions ? renderFunctions[id] : 
        ((component : any) => <div>{component}</div>) as TableGroupRenderFunction<A>[A[number]]
      let component = renderFunction(entity[componentID as keyof ConcreteEntity<A>])
    })
  }).flat()
  
  const labelHtml = archetype.map((a, index) => {
    let l = a as string;
    let display = headerLabels ? headerLabels[a] || l : l;
    return <div key={l} className="text-theme-font-secondary border-b border-theme-font-secondary truncate" style={{gridRow : index}}>{display}</div>
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
        {JSON.stringify(filterEntities)}
      </div>
    </div>
  )
}