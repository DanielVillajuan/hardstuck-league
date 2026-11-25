import { riotGet } from './riotApiClient.mjs'

const requiredLossesForStreak = 3

export async function hasLossStreak(puuid, region, previousLossStreak = null) {
  try {
    const encodedPuuid = encodeURIComponent(puuid)
    const ids = await riotGet(`https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${encodedPuuid}/ids?queue=420&start=0&count=${requiredLossesForStreak}`)
    if (ids.length < requiredLossesForStreak) return false

    for (const matchId of ids) {
      const match = await riotGet(`https://${region}.api.riotgames.com/lol/match/v5/matches/${encodeURIComponent(matchId)}`)
      const participant = match.info?.participants?.find((entry) => entry.puuid === puuid)
      if (!participant) return previousLossStreak ?? null
      if (participant.win) return false
    }
    return true
  } catch {
    // Ranked data still syncs if Match-V5 is temporarily unavailable.
    return previousLossStreak ?? null
  }
}