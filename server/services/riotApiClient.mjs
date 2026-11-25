import { HttpError } from '../errors.mjs'

export async function riotGet(url) {
  const apiKey = process.env.RIOT_API_KEY
  if (!apiKey) throw new HttpError(503, 'Falta configurar RIOT_API_KEY en el backend.')
  const response = await fetch(url, { headers: { 'X-Riot-Token': apiKey } })
  if (!response.ok) throw new HttpError(response.status === 429 ? 429 : 502, 'Riot API respondió con HTTP ' + response.status + '.')
  return response.json()
}