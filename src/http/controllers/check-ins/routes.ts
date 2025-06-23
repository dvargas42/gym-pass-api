import { FastifyInstance } from 'fastify'

import { verifyJWTMiddleware } from '@/http/middleware/verify-jwt-middleware'
import { createController } from './create-controller'
import { validateController } from './validate-controller'
import { historyController } from './history-controller'
import { metricsController } from './metrics-controller'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWTMiddleware)

  app.get('/check-ins/history', historyController)
  app.get('/check-ins/metrics', metricsController)

  app.post('/gyms/:gymId/check-ins', createController)
  app.patch('/check-ins/:checkInId/validate', validateController)
}
