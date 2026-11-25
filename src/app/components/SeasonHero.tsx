import { ChallengeCountdown } from '../../features/leaderboard/components/ChallengeCountdown'
import { StatCard } from '../../features/leaderboard/components/StatCard'

type SeasonHeroProps = {
  playerCount: number
  lastSync: string
}

export function SeasonHero({ playerCount, lastSync }: SeasonHeroProps) {
  return (
    <section className="relative isolate overflow-hidden rounded-2xl border border-white/[.08] bg-[#141a21] px-6 py-7 sm:px-9 sm:py-9">
      <div className="pointer-events-none absolute -right-16 -top-32 -z-10 h-80 w-80 rounded-full bg-orange-500/[.09] blur-[90px]" />
      <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
        <div>
          <div className="mb-3 flex items-center gap-2 text-[10px] font-bold tracking-[.22em] text-orange-300">
            <span className="h-px w-6 bg-orange-400" /> A VER QUIEN ES EL MAS PIJA?
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">El de peor ELO deja el LoL <span className="text-orange-300">1 año.</span></h1>
          <ChallengeCountdown />
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <StatCard label="JUGADORES" value={String(playerCount)} detail="activos" />
          <StatCard label="COLA" value="Solo" detail="/ Duo" />
          <StatCard label="ÚLTIMA SYNC" value={lastSync} />
        </div>
      </div>
    </section>
  )
}
