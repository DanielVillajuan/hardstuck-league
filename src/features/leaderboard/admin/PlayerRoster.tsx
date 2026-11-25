import type { League } from '../types'

type PlayerRosterProps = {
  leagues: League[]
  disabled: boolean
  onRemove: (playerId: string) => void
}

export function PlayerRoster({ leagues, disabled, onRemove }: PlayerRosterProps) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-bold text-white">Roster actual</h3>
      <div className="space-y-3">
        {leagues.map((league) => (
          <div key={league.id} className="rounded-xl border border-white/[.07] p-3">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">{league.name}</p>
            {league.players.length ? league.players.map((player) => (
              <div key={player.id} className="flex items-center justify-between gap-3 border-t border-white/[.05] py-2">
                <span className="min-w-0 truncate text-sm text-slate-300">{player.name}<span className="ml-1 text-xs text-slate-600">#{player.tagline}</span></span>
                <button type="button" disabled={disabled} onClick={() => onRemove(player.id)} className="shrink-0 rounded-md px-2 py-1 text-[10px] font-bold text-rose-300 hover:bg-rose-300/10 disabled:opacity-40">
                  Quitar
                </button>
              </div>
            )) : <p className="text-xs text-slate-600">Todavía no hay jugadores.</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
