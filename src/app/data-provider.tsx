import { createContext, useContext, type ReactNode } from 'react'
import { apiLeagueRepository } from '../features/leaderboard/data/apiLeagueRepository'
import type { LeagueRepository } from '../features/leaderboard/types'

const LeagueRepositoryContext = createContext<LeagueRepository | null>(null)

export function LeagueDataProvider({
  children,
  repository = apiLeagueRepository,
}: {
  children: ReactNode
  repository?: LeagueRepository
}) {
  return (
    <LeagueRepositoryContext.Provider value={repository}>
      {children}
    </LeagueRepositoryContext.Provider>
  )
}

export function useLeagueRepository() {
  const repository = useContext(LeagueRepositoryContext)

  if (!repository) {
    throw new Error('useLeagueRepository debe usarse dentro de LeagueDataProvider')
  }

  return repository
}
