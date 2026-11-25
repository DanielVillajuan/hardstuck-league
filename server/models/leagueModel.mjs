import { toPublicPlayer } from './playerModel.mjs'

const tiers = ['IRON', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'EMERALD', 'DIAMOND', 'MASTER', 'GRANDMASTER', 'CHALLENGER']
const divisions = { IV: 1, III: 2, II: 3, I: 4, '': 5 }

export function comparePlayersByRank(a, b) {
  const aTier = tiers.indexOf(a.tier)
  const bTier = tiers.indexOf(b.tier)
  const aScore = aTier < 0 ? -1 : aTier
  const bScore = bTier < 0 ? -1 : bTier
  return bScore - aScore || (divisions[b.division] || 0) - (divisions[a.division] || 0) || b.league_points - a.league_points || b.wins - a.wins
}

export function toPublicLeague(league, players) {
  return { ...league, players: players.map(toPublicPlayer) }
}

export function applyPromotionNotes(leagues) {
  return leagues.map((league) => {
    if (league.id === 'league-1' && league.players.length) league.players[league.players.length - 1].note = 'DESCENSO'
    if (league.id === 'league-2' && league.players.length) league.players[0].note = 'ASCENSO'
    return league
  })
}
