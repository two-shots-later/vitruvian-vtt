import { useContext } from "react";
import { Archetype, ConcreteEntity, matchArchetype } from "../../common/entity";
import { IconId } from "../../types/Icon";
import { EntityContext } from "./Table";
import Badge from "../Badge";

export type TableGroupLabels<A extends Archetype> = {
  [k in A[number] as string] : string
}

export type TableGroupProps<A extends Archetype, D extends Archetype = []> = {
  archetype : A,
  headerLabels? : TableGroupLabels<A>,
  disallow? : D,
  icon? : IconId
  label? : string
}

export default function TableGroup<A extends Archetype, D extends Archetype = []>({ archetype, disallow, icon, label = "Group", headerLabels} : TableGroupProps<A, D>) {
  const entities = useContext(EntityContext)
  
  const filtered = entities.filter(e => {
    let d = disallow || [];
    if (matchArchetype(e, ...d)) return false;
    return matchArchetype(e, ...archetype)
  }) as ConcreteEntity<A>[]
  
  const labelHtml = archetype.map(a => {
    let l = a as string;
    let display = headerLabels ? headerLabels[a] || l : l;
    return <div key={l}>{display}</div>
  })
  
  return (
    <div className="flex gap-1 px-1">
      <div className="flex flex-col gap-2 items-center">
        {icon ? <Badge variant={icon} /> : null}
        <div className="[writingMode:vertical-rl] text-lg">{label}</div>
      </div>
      <div className="w-full border border-dashed rounded-lg grid p-1">
        {labelHtml}
      </div>
    </div>
  )
}