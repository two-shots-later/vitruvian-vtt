import React from "react"
import { IconId } from "../../types/Icon"
import Badge from "../Badge"
import Icon from "../Icon"
import { TableGroupProps } from "./TableGroup"
import { Entity } from "../../types/gen/Entity"
import { ConcreteEntity } from "../../common/entity"
import { twMerge } from "tailwind-merge"

export type TableProps = {
  entities : Entity[] | ConcreteEntity<any>[],
  tableName? : string,
  children?: React.ReactElement<TableGroupProps<any>> | React.ReactElement<TableGroupProps<any>>[],
  icon? : IconId,
  className? : string
}

export const EntityContext = React.createContext<Entity[] | undefined>(undefined)

export function Table({ icon, entities, children, tableName = "Table", className} : TableProps) {
  
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
          <p className="text-theme-text align-text-bottom truncate">{`Showing ${entities.length} entities`}</p>
        </div>
      </div>
    </div>
  )
}