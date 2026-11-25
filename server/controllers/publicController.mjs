import * as leagueService from '../services/leagueService.mjs'

export function health(req, res) {
  res.json({ status: 'ok' })
}

export function getLeagues(req, res) {
  res.json(leagueService.getStandings())
}
