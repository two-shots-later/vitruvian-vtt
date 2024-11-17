import { PathfinderCharacter } from "../common/types"
import CharacterPortrait from "./ChracterPortrait"
import TextFit from "./TextFit"

export type CharacterCardProps = {
  character : PathfinderCharacter
}

export default function CharacterCard({character} : CharacterCardProps) {
  return (
    <div className="w-[300px] flex flex-col z-0">
      <div className="-mb-[40px] w-full">
        <CharacterPortrait width="full"/>
      </div>
      <div className="flex flex-col justify-center items-center border border-white rounded-lg bg-theme-background z-10 overflow-hidden">
        <TextFit minFontSize={0} maxFontSize={72} padding={{x: 20, y : 0}}>{character.name}</TextFit>
        <p className="text-[20px] text-nowrap truncate">{`${character.ancestry} ${character.class} ${character.level}`}</p>
        <p className="text-[20px] text-nowrap truncate text-ellipsis">{character.campaign}</p>
      </div>
    </div>
  )
}