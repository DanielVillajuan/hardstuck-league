import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import adminRoutes from './routes/adminRoutes.mjs'
import publicRoutes from './routes/publicRoutes.mjs'

const app = express()
const projectRoot = resolve(fileURLToPath(new URL('../', import.meta.url)))
const staticDirectory = resolve(projectRoot, 'dist')
const openApiDocument = JSON.parse(readFileSync(resolve(projectRoot, 'server/openapi.json'), 'utf8'))

app.disable('x-powered-by')
app.use(express.json({ limit: '32kb' }))
app.use('/api/admin', adminRoutes)
app.get('/api/openapi.json', (req, res) => res.json(openApiDocument))
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openApiDocument, { explorer: true }))
app.use('/api', publicRoutes)
app.use(express.static(staticDirectory))
app.get(/.*/, (req, res) => res.sendFile(resolve(staticDirectory, 'index.html')))
app.use((error, req, res, next) => {
  if (res.headersSent) return next(error)
  const status = Number.isInteger(error.status) ? error.status : error.type === 'entity.too.large' ? 413 : 500
  const message = status === 500 ? 'Error interno del servidor.' : error.message
  if (status >= 500) console.error(error.message)
  res.status(status).json({ error: message })
})

export default app
