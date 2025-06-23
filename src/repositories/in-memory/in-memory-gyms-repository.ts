import { Gym } from 'generated/prisma'
import { FindManyNearbyParams, GymsRepository } from '../gyms-repository'
import { randomUUID } from 'node:crypto'
import { Decimal } from 'generated/prisma/runtime/library'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

export class InMemoryGymsRepository implements GymsRepository {
  private items: Gym[] = []

  async create(data: Gym): Promise<Gym> {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Decimal(data.latitude),
      longitude: new Decimal(data.longitude),
      created_at: new Date(),
    }

    this.items.push(gym)

    return gym
  }

  async findById(gymId: string): Promise<Gym | null> {
    const gym = this.items.find((gym) => gym.id === gymId)

    if (!gym) {
      return null
    }

    return gym
  }

  async findManyNearby({
    latitude,
    longitude,
  }: FindManyNearbyParams): Promise<Gym[]> {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude,
          longitude,
        },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      )
      const MAX_DISTANCE_IN_KILOMETERS = 10

      return distance <= MAX_DISTANCE_IN_KILOMETERS
    })
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    const gyms = await this.items
      .filter((gyms) => gyms.title.includes(query))
      .slice((page - 1) * 20, page * 20)

    return gyms
  }
}
