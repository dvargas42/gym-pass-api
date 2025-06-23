import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repostory'
import { SearchGymsUseCase } from '../search-gyms-use-case'

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new SearchGymsUseCase(gymsRepository)

  return useCase
}
