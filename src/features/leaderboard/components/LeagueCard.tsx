import type { League, RankedPlayer } from '../types'
import { PlayerAvatar } from './PlayerAvatar'
import { getRankColor } from './rankStyles'

type LeagueCardProps = {
  league: League
  leagueNumber: number
  dataDragonVersion?: string
}

function MovementIcon({ down }: { down: boolean }) {
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path d={down ? 'M4 6.5 10 12l6-5.5M10 12V3' : 'M4 13.5 10 8l6 5.5M10 8v9'} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d={down ? 'M4 16h12' : 'M4 4h12'} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

function PromotionBadge({ status }: { status: NonNullable<RankedPlayer['note']> }) {
  const isDemotion = status === 'DESCENSO'
  const styles = isDemotion
    ? 'bg-rose-400/10 text-rose-300'
    : 'bg-emerald-400/10 text-emerald-300'

  return (
    <span className={'inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ' + styles}>
      <MovementIcon down={isDemotion} />{status}
    </span>
  )
}

function PlayerRow({ player, position, dataDragonVersion }: { player: RankedPlayer; position: number; dataDragonVersion?: string }) {
  const winRate = player.wins + player.losses > 0
    ? `${Math.round(player.wins / (player.wins + player.losses) * 100)}% WR`
    : '- WR'
  const rankColor = getRankColor(player.color)
  const rankDot = rankColor.split(' ').find((style) => style.startsWith('bg-')) || 'bg-slate-300/10'

  return (
    <div className="relative grid grid-cols-[32px_minmax(0,1fr)_auto] items-center gap-3 border-b border-white/[.045] px-5 py-3.5 last:border-b-0 sm:grid-cols-[38px_minmax(0,1fr)_145px_84px] sm:px-6">
      {player.note && <span className={player.note === 'DESCENSO' ? 'absolute bottom-0 left-0 top-0 w-0.5 bg-rose-400' : 'absolute bottom-0 left-0 top-0 w-0.5 bg-emerald-400'} />}
      <span className={position === 0 ? 'text-sm font-bold tabular-nums text-orange-200' : 'text-sm font-bold tabular-nums text-slate-500'}>{String(position + 1).padStart(2, '0')}</span>
      <div className="flex min-w-0 items-center gap-3">
        <PlayerAvatar key={`${player.id}-${player.profileIconId ?? 'initial'}`} name={player.name} profileIconId={player.profileIconId} version={dataDragonVersion} color={player.color} />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="truncate text-sm font-semibold text-slate-100">{player.name}</span>
            {player.note && <PromotionBadge status={player.note} />}
            {player.streak && <span title={player.streak === 'WIN' ? 'Al menos 3 victorias consecutivas' : 'Al menos 3 derrotas consecutivas'} aria-label={player.streak === 'WIN' ? 'Racha de victorias' : 'Racha de derrotas'} className="text-sm">{player.streak === 'WIN' ? '🔥' : '🧊'}</span>}
          </div>
          <div className="mt-0.5 text-[10px] text-slate-600">#{player.tagline}</div>
        </div>
      </div>
      <div className="hidden text-right sm:block">
        <div className="flex items-center justify-end gap-2">
          <span className={'h-2 w-2 rounded-full ' + rankDot} />
          <span className="text-[11px] font-bold tracking-wide text-slate-300">{player.tier} {player.division}</span>
        </div>
        <div className="mt-1 text-[10px] text-slate-500">{player.lp} LP</div>
      </div>
      <div className="text-right sm:text-center">
        <div className="text-xs font-semibold tabular-nums text-slate-300">{player.wins}<span className="px-1 text-slate-600">/</span>{player.losses}</div>
        <div className="mt-1 text-[9px] text-slate-600 sm:hidden">{player.tier} {player.division} · {player.lp} LP</div>
        <div className="mt-1 hidden text-[9px] text-slate-600 sm:block">{winRate}</div>
      </div>
    </div>
  )
}

export function LeagueCard({ league, leagueNumber, dataDragonVersion }: LeagueCardProps) {
  const isFirstLeague = leagueNumber === 1
  const leagueAccent = isFirstLeague
    ? 'border-orange-300/20 bg-orange-300/10 text-orange-200'
    : 'border-violet-300/20 bg-violet-300/10 text-violet-200'

  return (
    <article className="overflow-hidden rounded-2xl border border-white/[.08] bg-[#12171d] shadow-[0_18px_55px_-38px_rgba(0,0,0,.9)]">
      <div className="flex items-center justify-between border-b border-white/[.07] px-5 py-5 sm:px-6">
        <div className="flex items-center gap-3">
          <div className={'flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-black ' + leagueAccent}>0{leagueNumber}</div>
          <div><h3 className="font-bold text-white">{league.name}</h3><p className="mt-0.5 text-xs text-slate-500">{league.subtitle}</p></div>
        </div>
        <span className="rounded-md border border-white/[.07] bg-white/[.03] px-2.5 py-1 text-[10px] font-bold tracking-wide text-slate-400">{league.players.length} JUGADORES</span>
      </div>
      <div className="grid grid-cols-[32px_minmax(0,1fr)_auto] items-center gap-3 border-b border-white/[.05] px-5 py-2.5 text-[9px] font-bold tracking-[.14em] text-slate-600 sm:grid-cols-[38px_minmax(0,1fr)_145px_84px] sm:px-6">
        <span>#</span><span>JUGADOR</span><span className="hidden text-right sm:block">RANGO ACTUAL</span><span className="text-right sm:text-center">RÉCORD</span>
      </div>
      {league.players.map((player, position) => <PlayerRow key={player.id} player={player} position={position} dataDragonVersion={dataDragonVersion} />)}
      {league.players.length === 0 && <div className="px-6 py-12 text-center text-sm text-slate-500">No se encontró a nadie. Debe ser el mejor.</div>}
      <div className="border-t border-white/[.07] bg-black/10 px-5 py-3.5 sm:px-6">
        <p className="flex items-center gap-2 text-[10px] leading-5 text-slate-500">
          <span className={isFirstLeague ? 'h-1.5 w-1.5 rounded-full bg-rose-400' : 'h-1.5 w-1.5 rounded-full bg-emerald-400'} />
          {isFirstLeague ? 'El último baja a Liga 2 al cierre de temporada.' : 'El primero asciende a Liga 1 al cierre de temporada.'}
        </p>
      </div>
    </article>
  )
}
