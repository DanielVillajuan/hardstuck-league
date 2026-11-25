export function toPublicPlayer(player) {
  return {
    id: String(player.id),
    name: player.game_name,
    tagline: player.tag_line,
    tier: player.tier,
    division: player.division,
    lp: player.league_points,
    wins: player.wins,
    losses: player.losses,
    profileIconId: player.profile_icon_id ?? null,
    streak: player.hot_streak ? 'WIN' : player.loss_streak ? 'LOSS' : null,
  }
}

export function toRiotAccount(player) {
  return {
    id: player.id,
    puuid: player.puuid,
    game_name: player.game_name,
    tag_line: player.tag_line,
    platform: player.platform,
    profile_icon_id: player.profile_icon_id,
    hot_streak: player.hot_streak,
    loss_streak: player.loss_streak,
  }
}

export function toCreatedPlayer(id, player, leagueId) {
  return {
    id: String(id),
    gameName: player.gameName,
    tagLine: player.tagLine,
    leagueId,
  }
}
