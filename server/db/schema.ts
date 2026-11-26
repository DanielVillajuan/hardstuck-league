import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const leagues = sqliteTable('leagues', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  subtitle: text('subtitle').notNull(),
  sortOrder: integer('sort_order').notNull().unique(),
})

export const players = sqliteTable('players', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  puuid: text('puuid').notNull().unique(),
  gameName: text('game_name').notNull(),
  tagLine: text('tag_line').notNull(),
  platform: text('platform').notNull(),
  leagueId: text('league_id').notNull().references(() => leagues.id),
  tier: text('tier').notNull().default('UNRANKED'),
  division: text('division').notNull().default(''),
  leaguePoints: integer('league_points').notNull().default(0),
  wins: integer('wins').notNull().default(0),
  losses: integer('losses').notNull().default(0),
  profileIconId: integer('profile_icon_id'),
  hotStreak: integer('hot_streak', { mode: 'boolean' }).notNull().default(false),
  lossStreak: integer('loss_streak', { mode: 'boolean' }),
  lastSyncedAt: text('last_synced_at'),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
})

export const appSettings = sqliteTable('app_settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
  updatedAt: text('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
})
