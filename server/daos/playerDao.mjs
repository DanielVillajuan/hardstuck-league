import { asc, eq, sql } from 'drizzle-orm'
import { db } from '../db.mjs'
import { players } from '../db/schema.ts'

export function insertPlayer({ rank, platform, leagueId }) {
  return db.insert(players).values({
    puuid: rank.puuid,
    gameName: rank.gameName,
    tagLine: rank.tagLine,
    platform,
    leagueId,
    tier: rank.tier,
    division: rank.division,
    leaguePoints: rank.leaguePoints,
    wins: rank.wins,
    losses: rank.losses,
    profileIconId: rank.profileIconId,
    hotStreak: rank.hotStreak,
    lossStreak: rank.lossStreak,
  }).run()
}

export function findAllForRefresh() {
  return db.select({
    id: players.id,
    puuid: players.puuid,
    game_name: players.gameName,
    tag_line: players.tagLine,
    platform: players.platform,
    profile_icon_id: players.profileIconId,
    hot_streak: players.hotStreak,
    loss_streak: players.lossStreak,
  }).from(players).orderBy(asc(players.id)).all()
}

export function updateRankData(id, rank) {
  return db.update(players).set({
    gameName: rank.gameName,
    tagLine: rank.tagLine,
    tier: rank.tier,
    division: rank.division,
    leaguePoints: rank.leaguePoints,
    wins: rank.wins,
    losses: rank.losses,
    profileIconId: rank.profileIconId,
    hotStreak: rank.hotStreak,
    lossStreak: rank.lossStreak,
    lastSyncedAt: sql`CURRENT_TIMESTAMP`,
  }).where(eq(players.id, id)).run()
}

export function deletePlayer(id) {
  return db.delete(players).where(eq(players.id, id)).run()
}

export function findByLeague(leagueId) {
  return db.select({
    id: players.id,
    game_name: players.gameName,
    tag_line: players.tagLine,
    tier: players.tier,
    division: players.division,
    league_points: players.leaguePoints,
    wins: players.wins,
    losses: players.losses,
    profile_icon_id: players.profileIconId,
    hot_streak: players.hotStreak,
    loss_streak: players.lossStreak,
  }).from(players).where(eq(players.leagueId, leagueId)).all()
}
