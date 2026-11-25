import * as leagueDao from '../daos/leagueDao.mjs'
import * as playerDao from '../daos/playerDao.mjs'
import { applyPromotionNotes, comparePlayersByRank, toPublicLeague } from '../models/leagueModel.mjs'

export function getStandings() {
  const leagues = leagueDao.findAll().map((league) => {
    const players = playerDao.findByLeague(league.id).sort(comparePlayersByRank)
    return toPublicLeague(league, players)
  })
  return applyPromotionNotes(leagues)
}
