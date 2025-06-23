import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { CheckInUseCase } from './check-in-use-case'
import { GymsRepository } from '@/repositories/gyms-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { MaxDistanceError } from './error/max-distance-error'
import { MaxNumberOfCheckInsError } from './error/max-number-of-check-ins-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: GymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym_01',
      title: 'Javascript Gym',
      description: null,
      phone: null,
      latitude: -22.705274345363204,
      longitude: -43.426805364654314,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able create check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym_01',
      userId: 'user_01',
      userLatitude: -22.705109487467546,
      userLongitude: -43.426095727555,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able create check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym_01',
      userId: 'user-01',
      userLatitude: -22.705109487467546,
      userLongitude: -43.426095727555,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym_01',
        userId: 'user-01',
        userLatitude: -22.705109487467546,
        userLongitude: -43.426095727555,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should not be able create check in twice but in different day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym_01',
      userId: 'user-01',
      userLatitude: -22.705109487467546,
      userLongitude: -43.426095727555,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym_01',
      userId: 'user-01',
      userLatitude: -22.705109487467546,
      userLongitude: -43.426095727555,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    await gymsRepository.create({
      id: 'gym_02',
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -22.7082445,
      longitude: -43.4383325,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym_02',
        userId: 'user-01',
        userLatitude: -22.705109487467546,
        userLongitude: -43.426095727555,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
