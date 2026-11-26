import { HttpError } from '../errors.mjs'
import { getRiotApiKey } from './riotApiKeyService.mjs'

export async function riotGet(url) {
  const apiKey = getRiotApiKey()
  const response = await fetch(url, { headers: { 'X-Riot-Token': apiKey } })
  if (!response.ok) throw new HttpError(response.status === 429 ? 429 : 502, 'Riot API respondió con HTTP ' + response.status + '.')
  return response.json()
}
