import { useMemo, useState } from 'react'
import { AppHeader } from './app/components/AppHeader'
import { LeaderboardToolbar } from './app/components/LeaderboardToolbar'
import { SeasonHero } from './app/components/SeasonHero'
import { AdminPanel } from './features/leaderboard/AdminPanel'
import { LeagueCard } from './features/leaderboard/components/LeagueCard'
import { useDataDragonVersion, useLeagueStandings } from './features/leaderboard/queries'

function App() {
  const [search, setSearch] = useState('')
  const [adminOpen, setAdminOpen] = useState(false)
  const { data: dataDragonVersion } = useDataDragonVersion()
  const { data: leagues = [], isPending, isFetching, isError, dataUpdatedAt, refetch } = useLeagueStandings()

  const lastSync = isPending
    ? 'cargando'
    : dataUpdatedAt
      ? new Intl.DateTimeFormat('es-AR', { hour: '2-digit', minute: '2-digit' }).format(dataUpdatedAt)
      : '—'
  const totalPlayers = leagues.reduce((total, league) => total + league.players.length, 0)
  const visibleLeagues = useMemo(() => {
    const normalizedSearch = search.toLowerCase()
    return leagues.map((league) => ({
      ...league,
      players: league.players.filter((player) => player.name.toLowerCase().includes(normalizedSearch)),
    }))
  }, [leagues, search])

  return (
    <div className="min-h-screen bg-[#0c1015] text-slate-100 selection:bg-orange-400/30">
      <AppHeader
        isRefreshing={isFetching}
        onOpenAdmin={() => setAdminOpen(true)}
        onRefresh={() => void refetch()}
      />
      <main id="home" className="mx-auto max-w-[1440px] px-5 pb-16 pt-8 sm:px-8 sm:pt-12 lg:px-12">
        {isError && (
          <p role="alert" className="mb-4 rounded-lg border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
            No pudimos cargar la tabla. Probá actualizar de nuevo.
          </p>
        )}
        <SeasonHero playerCount={totalPlayers} lastSync={lastSync} />
        <LeaderboardToolbar search={search} onSearchChange={setSearch} />
        <section className="mt-4 grid gap-5 xl:grid-cols-2">
          {visibleLeagues.map((league, index) => (
            <LeagueCard
              key={league.id}
              league={league}
              leagueNumber={index + 1}
              dataDragonVersion={dataDragonVersion}
            />
          ))}
        </section>
        <footer className="mt-7 flex flex-col justify-between gap-2 text-[10px] text-slate-600 sm:flex-row sm:items-center">
          <span>RANGOS DE SOLO/DUO · DATOS CONSULTADOS A RIOT</span>
          <span>Hecho para amigos. Y para recordarles quién quedó último.</span>
        </footer>
      </main>
      {adminOpen && <AdminPanel onClose={() => setAdminOpen(false)} onPlayerAdded={() => setSearch('')} />}
    </div>
  )
}

export default App
