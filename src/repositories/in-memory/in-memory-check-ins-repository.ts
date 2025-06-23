import { Prisma, CheckIn } from 'generated/prisma'
import { randomUUID } from 'node:crypto'

import { CheckInsRepository } from '../check-ins-repository'
import dayjs from 'dayjs'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn: CheckIn = {
      id: randomUUID() as string,
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at
        ? new Date(data.validated_at)
        : new Date(),
      created_at: new Date(),
    }

    this.items.push(checkIn)
    return checkIn
  }

  async findById(id: string): Promise<CheckIn | null> {
    const checkIn = this.items.find((checkIn) => checkIn.id === id)

    if (!checkIn) {
      return null
    }

    return checkIn
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf('date') // "date" = "calendar day, "day" = week day
    const endOfTheDay = dayjs(date).endOf('date')

    const checkOnSameDate = this.items.find((checkin) => {
      const checkInDate = dayjs(checkin.validated_at)
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkin.user_id === userId && isOnSameDate
    })

    if (!checkOnSameDate) {
      return null
    }

    return checkOnSameDate
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = this.items
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1) * 20, page * 20)

    return checkIns
  }

  async countByUserId(userId: string) {
    const checkIns = this.items.filter(
      (checkIn) => checkIn.user_id === userId,
    ).length

    return checkIns
  }

  async save(checkIn: CheckIn): Promise<CheckIn> {
    const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id)

    if (checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn
    }

    return checkIn
  }
}
