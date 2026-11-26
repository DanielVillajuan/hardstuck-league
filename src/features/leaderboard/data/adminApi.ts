type AddPlayerInput = { gameName: string; tagLine: string; platform: string; leagueId: string }

async function sendAdminRequest<T>(url: string, token: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers)
  headers.set('X-Admin-Token', token)
  const response = await fetch(url, { ...init, headers })
  const body = await response.json() as { error?: string } & T
  if (!response.ok) throw new Error(body.error || 'La solicitud administrativa falló.')
  return body
}
export function addPlayer(input: AddPlayerInput, token: string) {
  return sendAdminRequest<{ id: string }>('/api/admin/players', token, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(input),
  })
}
export function removePlayer(id: string, token: string) {
  return sendAdminRequest<{ deleted: boolean }>('/api/admin/players/' + encodeURIComponent(id), token, { method: 'DELETE' })
}
export function refreshPlayerRanks(token: string) {
  return sendAdminRequest<{ updated: number; failures: { playerId: string; message: string }[] }>('/api/admin/refresh-ranks', token, { method: 'POST' })
}
export function updateRiotApiKey(apiKey: string, token: string) {
  return sendAdminRequest<{ updated: boolean }>('/api/admin/riot-api-key', token, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ apiKey }),
  })
}
