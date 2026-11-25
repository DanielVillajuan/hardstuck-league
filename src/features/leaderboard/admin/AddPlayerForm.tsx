import type { FormEvent } from 'react'
import type { League } from '../types'

type AddPlayerFormProps = {
  leagues: League[]
  gameName: string
  tagLine: string
  platform: string
  leagueId: string
  disabled: boolean
  isAdding: boolean
  onGameNameChange: (value: string) => void
  onTagLineChange: (value: string) => void
  onPlatformChange: (value: string) => void
  onLeagueChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

const fieldClassName = 'rounded-lg border border-white/10 bg-[#0c1015] px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-orange-300/50'

export function AddPlayerForm({
  leagues,
  gameName,
  tagLine,
  platform,
  leagueId,
  disabled,
  isAdding,
  onGameNameChange,
  onTagLineChange,
  onPlatformChange,
  onLeagueChange,
  onSubmit,
}: AddPlayerFormProps) {
  return (
    <form onSubmit={onSubmit} autoComplete="off" className="space-y-3">
      <h3 className="text-sm font-bold text-white">Agregar jugador</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <input required maxLength={64} autoComplete="off" value={gameName} onChange={(event) => onGameNameChange(event.target.value)} placeholder="Riot ID: nombre" className={fieldClassName} />
        <input required maxLength={16} autoComplete="off" value={tagLine} onChange={(event) => onTagLineChange(event.target.value)} placeholder="Tag: LAS" className={fieldClassName} />
        <select value={platform} onChange={(event) => onPlatformChange(event.target.value)} className={fieldClassName}>
          <option value="LA2">LAS (LA2)</option><option value="BR1">BR (BR1)</option><option value="NA1">NA (NA1)</option><option value="EUW1">EUW (EUW1)</option><option value="EUN1">EUNE (EUN1)</option><option value="KR">KR</option><option value="JP1">JP (JP1)</option>
        </select>
        <select value={leagueId} onChange={(event) => onLeagueChange(event.target.value)} className={fieldClassName}>
          {leagues.map((league) => <option key={league.id} value={league.id}>{league.name}</option>)}
        </select>
      </div>
      <button disabled={disabled} className="w-full rounded-lg bg-orange-300 px-4 py-2.5 text-sm font-bold text-[#20140f] transition hover:bg-orange-200 disabled:opacity-40">
        {isAdding ? 'Consultando Riot…' : 'Agregar a la liga'}
      </button>
    </form>
  )
}
