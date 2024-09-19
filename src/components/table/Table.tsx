import React from "react"
import { IconId } from "../../types/Icon"
import Badge from "../Badge"
import Icon from "../Icon"
import { TableGroupProps } from "./TableGroup"
import { Entity } from "../../types/gen/Entity"
import { ConcreteEntity } from "../../common/entity"

export type TableProps = {
  entities : Entity[] | ConcreteEntity<any>[],
  tableName? : string,
  children?: React.ReactElement<TableGroupProps<any>> | React.ReactElement<TableGroupProps<any>>[],
  icon? : IconId,
}

export const EntityContext = React.createContext<Entity[]>([])

export function Table({ icon, entities, children, tableName = "Table" } : TableProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between border-b border-theme-text py-1 items-end px-1">
        <div className="flex gap-2">
          {icon ? <Badge size={24} variant={icon} className="text-theme-text" /> : null}
          <p className="text-theme-text text-2xl align-text-bottom">{tableName}</p>
        </div>
        <Icon variant="ellipsis" size={24} className="fill-theme-text"/>
      </div>
      <EntityContext.Provider value={entities as Entity[]}>
        {children}
      </EntityContext.Provider>
    </div>
  )
}