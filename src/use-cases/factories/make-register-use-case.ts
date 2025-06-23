import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../register-use-case'

export function makeRegisterUseCase() {
  const userRepository = new PrismaUsersRepository()
  const useCase = new RegisterUseCase(userRepository)

  return useCase
}
