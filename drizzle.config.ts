import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { defineConfig } from 'drizzle-kit'

const databasePath = resolve(process.cwd(), process.env.DATABASE_PATH || './data/hardstuck.sqlite')
mkdirSync(dirname(databasePath), { recursive: true })

export default defineConfig({
  dialect: 'sqlite',
  schema: './server/db/schema.ts',
  out: './server/db/migrations',
  dbCredentials: { url: databasePath },
})