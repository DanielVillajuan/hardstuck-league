import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as schema from './db/schema.ts'

const projectRoot = resolve(fileURLToPath(new URL('../', import.meta.url)))
const databasePath = resolve(projectRoot, process.env.DATABASE_PATH || './data/hardstuck.sqlite')
const migrationsFolder = fileURLToPath(new URL('./db/migrations/', import.meta.url))
mkdirSync(dirname(databasePath), { recursive: true })

const sqlite = new Database(databasePath)
sqlite.pragma('journal_mode = WAL')
sqlite.pragma('foreign_keys = ON')
sqlite.pragma('busy_timeout = 5000')

function addMissingLegacyColumns() {
  const playersTableExists = sqlite.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'players'").get()
  if (!playersTableExists) return

  const columns = new Set(sqlite.pragma('table_info(players)').map((column) => column.name))
  if (!columns.has('profile_icon_id')) sqlite.exec('ALTER TABLE players ADD COLUMN profile_icon_id INTEGER')
  if (!columns.has('hot_streak')) sqlite.exec('ALTER TABLE players ADD COLUMN hot_streak INTEGER NOT NULL DEFAULT 0')
  if (!columns.has('loss_streak')) sqlite.exec('ALTER TABLE players ADD COLUMN loss_streak INTEGER')
}

addMissingLegacyColumns()

export const db = drizzle(sqlite, { schema })
migrate(db, { migrationsFolder })

db.insert(schema.leagues).values([
  { id: 'league-1', name: 'LPF', subtitle: 'Bastante decente', sortOrder: 1 },
  { id: 'league-2', name: 'Primera B', subtitle: 'Sabes lo que te falta!?', sortOrder: 2 },
]).onConflictDoNothing().run()