import type { League, LeagueRepository, RankedPlayer } from '../types'

type ApiPlayer = Omit<RankedPlayer, 'color'>
type ApiLeague = Omit<League, 'players'> & { players: ApiPlayer[] }
const tierColors: Record<string, string> = {
  IRON: 'slate', BRONZE: 'orange', SILVER: 'slate', GOLD: 'amber', PLATINUM: 'blue',
  EMERALD: 'green', DIAMOND: 'cyan', MASTER: 'violet', GRANDMASTER: 'red',
  CHALLENGER: 'yellow', UNRANKED: 'slate',
}
export const apiLeagueRepository: LeagueRepository = {
  async getStandings() {
    const response = await fetch('/api/leagues')
    if (!response.ok) throw new Error('No se pudo cargar la tabla de ligas.')
    const leagues = await response.json() as ApiLeague[]
    return leagues.map((league) => ({
      ...league,
      players: league.players.map((player) => ({ ...player, color: tierColors[player.tier] || 'slate' })),
    }))
  },
}
