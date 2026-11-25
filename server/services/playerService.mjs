import * as leagueDao from '../daos/leagueDao.mjs'
import * as playerDao from '../daos/playerDao.mjs'
import { toCreatedPlayer, toRiotAccount } from '../models/playerModel.mjs'
import { HttpError } from '../errors.mjs'
import { addRiotAccount, refreshRiotAccount } from './riotService.mjs'

export async function addPlayer({ gameName, tagLine, platform, leagueId }) {
  const normalizedName = typeof gameName === 'string' ? gameName.trim() : ''
  const normalizedTag = typeof tagLine === 'string' ? tagLine.trim() : ''
  const normalizedPlatform = typeof platform === 'string' ? platform.toUpperCase() : ''
  const normalizedLeagueId = typeof leagueId === 'string' ? leagueId : ''
  if (!normalizedName || !normalizedTag || normalizedName.length > 64 || normalizedTag.length > 16) {
    throw new HttpError(400, 'Indicá un Riot ID válido.')
  }
  if (!leagueDao.exists(normalizedLeagueId)) throw new HttpError(400, 'La liga indicada no existe.')

  const rank = await addRiotAccount(normalizedName, normalizedTag, normalizedPlatform)
  try {
    const result = playerDao.insertPlayer({ rank, platform: normalizedPlatform, leagueId: normalizedLeagueId })
    return toCreatedPlayer(result.lastInsertRowid, rank, normalizedLeagueId)
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') throw new HttpError(409, 'Esa cuenta ya está agregada.')
    throw error
  }
}

export function removePlayer(rawId) {
  const result = playerDao.deletePlayer(Number(rawId))
  if (!result.changes) throw new HttpError(404, 'No se encontró ese jugador.')
  return { deleted: true }
}

export async function refreshPlayerRanks() {
  const players = playerDao.findAllForRefresh()
  const failures = []
  let updated = 0

  for (const row of players) {
    const player = toRiotAccount(row)
    try {
      const rank = await refreshRiotAccount(player)
      playerDao.updateRankData(player.id, rank)
      updated += 1
    } catch (error) {
      failures.push({ playerId: String(player.id), message: error.message })
      if (error.status === 429) break
    }
  }
  return { updated, failures }
}
