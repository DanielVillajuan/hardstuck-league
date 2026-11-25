import { HttpError } from '../errors.mjs'
import { hasLossStreak } from './matchService.mjs'
import { riotGet } from './riotApiClient.mjs'

export const platformRouting = {
  BR1: 'americas', LA1: 'americas', LA2: 'americas', NA1: 'americas',
  EUN1: 'europe', EUW1: 'europe', RU: 'europe', TR1: 'europe',
  KR: 'asia', JP1: 'asia',
  OC1: 'sea', PH2: 'sea', SG2: 'sea', TH2: 'sea', TW2: 'sea', VN2: 'sea',
}

async function rankForAccount(account, platform, region, previous = {}) {
  const puuid = encodeURIComponent(account.puuid)
  const [entries, summoner] = await Promise.all([
    riotGet('https://' + platform.toLowerCase() + '.api.riotgames.com/lol/league/v4/entries/by-puuid/' + puuid),
    riotGet('https://' + platform.toLowerCase() + '.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/' + puuid),
  ])
  const solo = entries.find((entry) => entry.queueType === 'RANKED_SOLO_5x5')
  const hotStreak = Boolean(solo?.hotStreak)
  const lossStreak = !solo
    ? previous.loss_streak ?? null
    : hotStreak
      ? false
      : await hasLossStreak(account.puuid, region, previous.loss_streak ?? null)

  return {
    puuid: account.puuid,
    gameName: account.gameName || previous.game_name || '',
    tagLine: account.tagLine || previous.tag_line || '',
    tier: solo?.tier || 'UNRANKED',
    division: solo?.rank || '',
    leaguePoints: solo?.leaguePoints || 0,
    wins: solo?.wins || 0,
    losses: solo?.losses || 0,
    profileIconId: summoner.profileIconId ?? previous.profile_icon_id ?? null,
    hotStreak,
    lossStreak,
  }
}

export async function addRiotAccount(gameName, tagLine, platform) {
  const region = platformRouting[platform]
  if (!region) throw new HttpError(400, 'Servidor no reconocido.')
  const account = await riotGet('https://' + region + '.api.riotgames.com/riot/account/v1/accounts/by-riot-id/' + encodeURIComponent(gameName) + '/' + encodeURIComponent(tagLine))
  return rankForAccount(account, platform, region)
}

export async function refreshRiotAccount(player) {
  const region = platformRouting[player.platform]
  if (!region) throw new HttpError(400, 'Servidor no reconocido.')
  const account = await riotGet('https://' + region + '.api.riotgames.com/riot/account/v1/accounts/by-puuid/' + encodeURIComponent(player.puuid))
  return rankForAccount(account, player.platform, region, player)
}