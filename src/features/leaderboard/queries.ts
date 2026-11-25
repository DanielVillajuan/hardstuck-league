import { useQuery } from '@tanstack/react-query'
import { useLeagueRepository } from '../../app/data-provider'

export const leaderboardQueryKey = ['leaderboard', 'standings'] as const

export function useLeagueStandings() {
  const repository = useLeagueRepository()

  return useQuery({
    queryKey: leaderboardQueryKey,
    queryFn: () => repository.getStandings(),
    staleTime: 60_000,
  })
}

export function useDataDragonVersion() {
  return useQuery({
    queryKey: ['data-dragon-version'],
    queryFn: async () => {
      const response = await fetch('https://ddragon.leagueoflegends.com/api/versions.json')
      if (!response.ok) throw new Error('No se pudo obtener la versión de Data Dragon.')
      const versions = await response.json() as string[]
      return versions[0]
    },
    staleTime: 24 * 60 * 60 * 1000,
    retry: 1,
  })
}
