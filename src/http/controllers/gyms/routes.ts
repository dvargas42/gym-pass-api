import { FastifyInstance } from 'fastify'

import { verifyJWTMiddleware } from '@/http/middleware/verify-jwt-middleware'

import { createController } from './create-controller'
import { searchController } from './search-controller'
import { nearbyController } from './nearby-controller'
import { verifyUserRoleMiddleware } from '@/http/middleware/verify-user-role-middleware'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWTMiddleware)

  app.get('/gyms/search', searchController)
  app.get('/gyms/nearby', nearbyController)

  app.post(
    '/gyms',
    { onRequest: [verifyUserRoleMiddleware('ADMIN')] },
    createController,
  )
}
