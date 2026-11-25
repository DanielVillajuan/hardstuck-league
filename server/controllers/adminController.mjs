import * as playerService from '../services/playerService.mjs'

export async function addPlayer(req, res) {
  const player = await playerService.addPlayer(req.body || {})
  res.status(201).json(player)
}

export function removePlayer(req, res) {
  res.json(playerService.removePlayer(req.params.id))
}

export async function refreshRanks(req, res) {
  const result = await playerService.refreshPlayerRanks()
  res.status(result.failures.length ? 207 : 200).json(result)
}
