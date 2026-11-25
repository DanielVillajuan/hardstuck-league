import { eq } from 'drizzle-orm'
import { db } from '../db.mjs'
import { leagues } from '../db/schema.ts'

export function findAll() {
  return db.select({ id: leagues.id, name: leagues.name, subtitle: leagues.subtitle })
    .from(leagues)
    .orderBy(leagues.sortOrder)
    .all()
}

export function exists(leagueId) {
  return Boolean(db.select({ id: leagues.id }).from(leagues).where(eq(leagues.id, leagueId)).get())
}