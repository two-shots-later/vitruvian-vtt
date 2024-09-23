import { ReactElement, useContext } from "react";
import { Archetype, ArchetypeValue, ConcreteEntity, filterEntities } from "../../common/entity";
import { IconId } from "../../types/Icon";
import { EntityContext } from "./Table";
import Badge from "../Badge";
import { twMerge } from "tailwind-merge";

export type TableGroupLabels<A extends Archetype> = {
  [k in A[number] as string]? : string
}

export type TableGroupRenderFunctions<A extends Archetype> = {
  [K in A[number]]? : TableGroupRenderFunction<A, K, ConcreteEntity<A>[K]>
}

export type TableGroupRenderFunction<A extends Archetype, N extends ArchetypeValue, V extends ConcreteEntity<A>[N]> = (component : V) => ReactElement

export type TableGroupProps<A extends Archetype, D extends Archetype = []> = {
  archetype : A,
  renderFunctions? : TableGroupRenderFunctions<A>,
  data? : ConcreteEntity<A>[],
  headerLabels? : TableGroupLabels<A>,
  disallow? : D,
  icon? : IconId
  label? : string
  className? : string
}

export default function TableGroup<A extends Archetype, D extends Archetype = []>({
  archetype, 
  disallow, 
  icon, 
  label = "", 
  headerLabels,
  renderFunctions,
  data,
  className,
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
      const defaultRenderFunction : TableGroupRenderFunction<A, any, typeof component> = (component : any) => <div>{component}</div>
      const component = entity[id]
      const renderFunction = 
        renderFunctions ? renderFunctions[id] ? renderFunctions[id] as TableGroupRenderFunction<A, any, typeof component> : defaultRenderFunction : defaultRenderFunction
      const componentHtml = renderFunction(component)
      const style = {
        gridRowStart : entityIndex + 2,
        gridColumnStart : componentIndex + 1
      }
      return <div key={key} style={style} className="w-full h-full px-1">{componentHtml}</div>
    })
  }).flat()
  
  const labelHtml = archetype.map((a, index) => {
    const l = a as string;
    const display = headerLabels ? headerLabels[a] || l : l;
    const style = {
      gridColumnStart : index + 1,
      gridRowStart : 1
    }
    return <div key={l} className="text-theme-font-secondary border-b border-theme-font-secondary truncate px-1" style={style}>{display}</div>
  })
  
  const gridRowStyle = {
    gridTemplateRows : `min-content repeat(${entities.length}, minmax(min-content, 1fr))`,
  }
  
  const gridColumnStyle = {
    gridTemplateColumns : `repeat(${archetype.length}, 1fr)`,
  }
  
  return (
    <div className={"flex " + twMerge("gap-1 px-1 h-[1fr]", className)}>
      <div className="flex flex-col gap-2 items-center">
        {icon ? <Badge variant={icon} /> : null}
        <div className="[writingMode:vertical-rl] text-lg text-nowrap truncate">{label}</div>
      </div>
      <div className="w-full border border-dashed rounded-lg flex flex-col" style={gridRowStyle}>
        <div className="grid px-1 sticky -top-2 bg-theme-background rounded-t-lg pt-1" style={gridColumnStyle}>
          {labelHtml}
        </div>
        <div className="overflow-scroll h-[1fr]">
          <div className="grid px-1" style={{...gridRowStyle, ...gridColumnStyle}}>
            {entityHtml}
          </div>
        </div>
      </div>
    </div>
  )
}