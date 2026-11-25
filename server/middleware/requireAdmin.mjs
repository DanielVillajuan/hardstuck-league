import { timingSafeEqual } from 'node:crypto'
import { HttpError } from '../errors.mjs'

export function requireAdmin(req, res, next) {
  const expected = process.env.ADMIN_TOKEN
  if (!expected) return next(new HttpError(503, 'Falta configurar ADMIN_TOKEN en el backend.'))

  const providedBytes = Buffer.from(req.get('X-Admin-Token') || '')
  const expectedBytes = Buffer.from(expected)
  if (providedBytes.length !== expectedBytes.length || !timingSafeEqual(providedBytes, expectedBytes)) {
    return next(new HttpError(401, 'Token de administración inválido.'))
  }
  next()
}
