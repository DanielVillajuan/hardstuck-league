import { Router } from 'express'
import * as publicController from '../controllers/publicController.mjs'

const router = Router()

router.get('/health', publicController.health)
router.get('/leagues', publicController.getLeagues)
router.use((req, res) => res.status(404).json({ error: 'Endpoint no encontrado.' }))

export default router