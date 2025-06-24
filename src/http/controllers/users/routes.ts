import { FastifyInstance } from 'fastify'

import { profileController } from './profile-controller'
import { refreshController } from './refresh-controller'
import { registerController } from './register-controller'
import { authenticateController } from './authenticate-controller'
import { verifyJWTMiddleware } from '@/http/middleware/verify-jwt-middleware'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
  app.post('/sessions', authenticateController)

  app.patch('/token/refresh', refreshController)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJWTMiddleware] }, profileController)
}
