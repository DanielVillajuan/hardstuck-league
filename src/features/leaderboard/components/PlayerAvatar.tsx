import { useState } from 'react'
import { getRankColor } from './rankStyles'

type PlayerAvatarProps = {
  name: string
  profileIconId?: number | null
  version?: string
  color: string
}

export function PlayerAvatar({ name, profileIconId, version, color }: PlayerAvatarProps) {
  const [imageFailed, setImageFailed] = useState(false)
  const showIcon = profileIconId != null && Boolean(version) && !imageFailed

  return (
    <div className={'relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border text-xs font-black ' + getRankColor(color)}>
      {showIcon ? (
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${profileIconId}.png`}
          alt={`Icono de ${name}`}
          className="h-full w-full object-cover"
          onError={() => setImageFailed(true)}
        />
      ) : name.slice(0, 1)}
      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#12171d] bg-emerald-400" />
    </div>
  )
}
