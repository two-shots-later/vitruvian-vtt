import { PathfinderCharacter } from "../common/types"
import CharacterPortrait from "./ChracterPortrait"
import ClassBadge from "./ClassBadge"
import NumberBadge from "./NumberBadge"
import Tag from "./Tag"
import TextFit from "./TextFit"

export type CharacterCardProps = {
  /** This is the Character object to be displayed. This Object is temparary for now, until we have character data from the backend. */
  character : PathfinderCharacter
}

export default function CharacterCard({character} : CharacterCardProps) {
  return (
    <div className="w-[300px] flex flex-col z-0 relative">
      <div className="-mb-[40px] w-full">
        <CharacterPortrait width="full" stars={false} image={character.image}/>
      </div>
      <div className="flex flex-col justify-center items-center border border-white rounded-lg bg-theme-background z-10 overflow-hidden">
        <div className="h-16 w-full flex items-center justify-center">
          <TextFit minFontSize={10} maxFontSize={72} padding={{x: 20, y : 0}}>{character.name}</TextFit>
        </div>
        
        <p className="text-[20px] text-nowrap truncate">{`${character.ancestry} ${character.class} ${character.level}`}</p>
        <p className="text-[20px] text-nowrap truncate text-ellipsis">{character.campaign}</p>
        <div className="overflow-scroll w-full">
          <div className="flex gap-2 p-1 px-4 overflow-x-scroll">{character.tags.map((tag) => <Tag>{ tag }</Tag>)}</div>
        </div>
      </div>
      <div className="absolute top-0 left-0">
        <ClassBadge pathfinderClass={character.class} size="50px" stroke={2}/>
      </div>
      <div className="absolute top-0 right-0">
        <NumberBadge number={character.level} size="50px" stroke={2}/>
      </div>
    </div>
  )
}