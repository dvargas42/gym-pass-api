import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repostory'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms-use-case'

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new FetchNearbyGymsUseCase(gymsRepository)

  return useCase
}
