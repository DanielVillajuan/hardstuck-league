import { HttpError } from '../errors.mjs'
import { findRiotApiKey, saveRiotApiKey } from '../daos/settingsDao.mjs'

export function getRiotApiKey() {
  const storedKey = findRiotApiKey()
  const environmentKey = process.env.RIOT_API_KEY?.trim()
  const apiKey = storedKey || environmentKey
  if (!apiKey) throw new HttpError(503, 'Configurá la Riot API key desde el panel de administración.')
  return apiKey
}

export function saveNewRiotApiKey(value) {
  if (typeof value !== 'string' || !value.trim()) {
    throw new HttpError(400, 'Ingresá una Riot API key.')
  }
  const apiKey = value.trim()
  if (apiKey.length > 512 || /[\r\n]/.test(apiKey)) {
    throw new HttpError(400, 'La Riot API key no tiene un formato válido.')
  }
  saveRiotApiKey(apiKey)
  return { updated: true }
}
