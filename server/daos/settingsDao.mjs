import { eq } from 'drizzle-orm'
import { db } from '../db.mjs'
import { appSettings } from '../db/schema.ts'

const RIOT_API_KEY_SETTING = 'riot_api_key'

export function findRiotApiKey() {
  return db.select({ value: appSettings.value })
    .from(appSettings)
    .where(eq(appSettings.key, RIOT_API_KEY_SETTING))
    .get()?.value ?? null
}

export function saveRiotApiKey(value) {
  db.insert(appSettings)
    .values({ key: RIOT_API_KEY_SETTING, value, updatedAt: new Date().toISOString() })
    .onConflictDoUpdate({
      target: appSettings.key,
      set: { value, updatedAt: new Date().toISOString() },
    })
    .run()
}
