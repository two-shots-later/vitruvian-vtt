import { ReactElement, useContext } from "react";
import { Archetype, ArchetypeValue, ConcreteEntity, filterEntities } from "../../common/entity";
import { IconId } from "../../types/Icon";
import { EntityContext } from "./EntityTableGroup";
import Badge from "../Badge";
import { twMerge } from "tailwind-merge";
import React from "react";
import { EntityTableHeaderProps } from "./EntityTableHeader";
import { Entity } from "../../types/gen/Entity";
import { parseUnitSize } from "../../common/types";

type EntityTableContextData = {
  entities : Entity[], 
  archetype : Archetype,
  column : number
}

export type TableGroupLabels<A extends Archetype> = {
  [k in A[number] as string]? : string
}

export type TableGroupRenderFunctions<A extends Archetype> = {
  [K in A[number]]? : TableGroupRenderFunction<A, K, ConcreteEntity<A>[K]>
}

export type TableGroupRenderFunction<A extends Archetype, N extends ArchetypeValue, V extends ConcreteEntity<A>[N]> = (component : V) => ReactElement

/** 
 * @component An entity that is used to display entities with a specific archetype. 
 */
export type EntityTableProps<A extends Archetype, D extends Archetype = []> = {
  /** This can be used to override the table's archetype. Typically the table will detect it's archetype by the data passed to it. */
  archetypeOverride? : A,
  /** These are the entities that are going to be displayed on the table. */
  data? : Entity[],
  /** An archetype the defines entities that will be filtered out of the table*/
  disallow? : D,
  /** The id of the icon that is displayed in the top right corner. If this is undefined, the icon will not be there.*/
  icon? : IconId
  /** The name of the table. If empty, the table will have no label.*/
  label? : string
  /** Class styles to style the table. */
  className? : string
  /** The children of the table. These must be `EntityTableHeader` components.*/
  children? : React.ReactElement<EntityTableHeaderProps<A, A[number]>> | React.ReactElement<EntityTableHeaderProps<A, A[number]>>[],
}

export const EntityTableContext = React.createContext<EntityTableContextData | undefined>(undefined)

/**
 * This component is used to display entities in a table format. It can be used in conjunction with 
 * the `EntityTableGroup` component or by itself. You define what columns will be rendered with the
 * `EntityTableHeader` component.
*/
export default function EntityTable<A extends Archetype, D extends Archetype = []>({
  archetypeOverride, 
  disallow, 
  icon, 
  label = "",
  data,
  className,
  children
} : EntityTableProps<A, D>) {
  const c = children instanceof Array ? children : [children];
  let archetype: A = archetypeOverride ? archetypeOverride : c.map(child => child?.props.component) as A;
  
  const e = useContext(EntityContext)
  /// This line is a bit confusing. The tableGroup will use the entity context if available and filter from that.
  /// Otherwise, it will use the data prop if available. if both aren't there, it will default to an empty array.
  const entities = 
    e ? filterEntities<A, D>(e, disallow, ...archetype) : 
    data ? data : []
  ;
  
  let columnLayout = "";
  for(const child of c) {
    let width = parseUnitSize(child?.props.width ? child.props.width : "1fr");
    columnLayout += width + " "
  }
  
  const style = {
    gridTemplateRows : `repeat(${entities.length}, min-content)`,
    gridTemplateColumns : columnLayout,
  }
  
  return (
    <div className={"flex " + twMerge("gap-1 px-1", className)}>
      <div className="flex flex-col gap-2 items-center">
        {icon ? <Badge variant={icon} /> : null}
        <div className="[writingMode:vertical-rl] text-lg text-nowrap truncate">{label}</div>
      </div>
      <div className="w-full border border-dashed rounded-lg grid overflow-y-scroll justify-start px-1" style={style}>
        {c.map((child, index) => {
          return <EntityTableContext.Provider value={{ entities, archetype, column : index}} key={"col-" + index}>{child}</EntityTableContext.Provider>
        })}
          
      </div>
    </div>
  )
}