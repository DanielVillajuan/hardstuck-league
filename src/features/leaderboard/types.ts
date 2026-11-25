export type PromotionStatus = 'ASCENSO' | 'DESCENSO'
export type StreakStatus = 'WIN' | 'LOSS'

export type RankedPlayer = {
  id: string
  name: string
  tagline: string
  tier: string
  division: string
  lp: number
  wins: number
  losses: number
  profileIconId?: number | null
  streak?: StreakStatus | null
  color: string
  note?: PromotionStatus
}

export type League = {
  id: string
  name: string
  subtitle: string
  players: RankedPlayer[]
}

export interface LeagueRepository {
  getStandings(): Promise<League[]>
}
