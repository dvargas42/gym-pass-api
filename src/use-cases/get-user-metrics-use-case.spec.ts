import { beforeEach, describe, expect, it } from 'vitest'

import { GetUserMetricsUseCase } from './get-user-metrics-use-case'

import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

let checkInsRepository: CheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })
  it('should be able to get check-in count of metrics', async () => {
    const MAX_GYMS = 15

    for (let i = 1; i <= MAX_GYMS; i++) {
      await checkInsRepository.create({
        gym_id: `gym-${i}`,
        user_id: 'user-01',
      })
    }
    const { checkInsCount } = await sut.execute({ userId: 'user-01' })

    expect(checkInsCount).toEqual(MAX_GYMS)
  })
})
