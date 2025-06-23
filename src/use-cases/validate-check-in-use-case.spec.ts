import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { ValidateCheckInUseCase } from './validate-check-in-use-case'
import { ResourceNotFoundError } from './error/resource-not-found-error'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    const createCheckIn = await checkInsRepository.create({
      gym_id: 'gym_id',
      user_id: 'user_id',
    })

    const { checkIn } = await sut.execute({ checkInId: createCheckIn.id })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate an inexistent check-in', async () => {
    await expect(() =>
      sut.execute({ checkInId: 'inexistent-check-in-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2025, 0, 1, 21, 40))
    const createCheckIn = await checkInsRepository.create({
      gym_id: 'gym_id',
      user_id: 'user_id',
    })
    const TWENTY_ONE_MINUTES = 1000 * 60 * 21

    vi.advanceTimersByTime(TWENTY_ONE_MINUTES)

    await expect(() =>
      sut.execute({ checkInId: createCheckIn.id }),
    ).rejects.toBeInstanceOf(Error)
  })
})
