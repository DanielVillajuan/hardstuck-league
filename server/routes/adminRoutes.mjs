import { Router } from 'express'
import * as adminController from '../controllers/adminController.mjs'
import { requireAdmin } from '../middleware/requireAdmin.mjs'

const router = Router()

router.post('/players', requireAdmin, adminController.addPlayer)
router.delete('/players/:id', requireAdmin, adminController.removePlayer)
router.post('/refresh-ranks', requireAdmin, adminController.refreshRanks)

export default router