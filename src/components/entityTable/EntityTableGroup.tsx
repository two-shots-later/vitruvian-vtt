import React from "react"
import { IconId } from "../../types/Icon"
import Badge from "../Badge"
import Icon from "../Icon"
import { EntityTableProps } from "./EntityTable"
import { Entity } from "../../types/gen/Entity"
import { ConcreteEntity } from "../../common/entity"

/**
 * @description The props for the EntityTableGroup component
 * @param entities The entities to display in the table
*/
export type TableProps = {
  /** @description These are the entities that will be filtered and displayed by the EntityTable children*/
  entities : Entity[] | ConcreteEntity<any>[],
  /** @description The name of the table. Defaults to 'Table'.*/
  tableName? : string,
  /** @description These are the inner EntityTables.*/
  children?: React.ReactElement<EntityTableProps<any>> | React.ReactElement<EntityTableProps<any>>[],
  /** @description The icon for this table. If not defines, icon is not shown*/
  icon? : IconId,
  /** @description classes, applied to the outer div of the table */
  className? : string
}

export const EntityContext = React.createContext<Entity[] | undefined>(undefined)

/**
* @component
* @description Typically, an EntityTable can only display one type of entity that is determined by that table's archetype.
* With the EntityTableGroup, you can display multiple tables of different entities in a single component.
* To use it, all you need to do is put an EntityTable component inside this component for each archetype you want to display.
* @example
* ```tsx
* <EntityTableGroup>
*   <EntityTable archetype={["Name", "Source", ...]} />
* </EntityTableGroup>
* ```
*/
export default function EntityTableGroup({ icon, entities, children, tableName = "Table", className} : TableProps) {
  return (
    <div className={"flex flex-col " + className}>
      <div className="flex justify-between border-b border-theme-text py-1 items-end px-1 bg-theme-background">
        <div className="flex gap-2">
          {icon ? <Badge size={24} variant={icon} className="text-theme-text" /> : null}
          <p className="text-theme-text text-2xl align-text-bottom truncate font-crimson">{tableName}</p>
        </div>
        <Icon variant="ellipsis" size={24} className="fill-theme-font-primary"/>
      </div>
      <div className="flex flex-col gap-2 h-[1fr] overflow-scroll py-2 pr-2">
        <EntityContext.Provider value={entities as Entity[]}>
          {children}
        </EntityContext.Provider>
      </div>
      <div className="flex justify-between border-t border-theme-text items-end px-2 bg-theme-background">
        <div></div>
        <div className="flex gap-2">
          <p className="text-theme-text text-xs align-text-bottom truncate">{`Showing ${entities.length} entities`}</p>
        </div>
      </div>
    </div>
  )
}