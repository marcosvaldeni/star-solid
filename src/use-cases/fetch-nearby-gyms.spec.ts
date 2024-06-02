import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearByGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearByGymsUseCase

describe('Fetch Nearby Gyms Use Case', async () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearByGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: 38.70362984462574,
      longitude: -9.384039764633501,
    })

    gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: 38.70643016490088,
      longitude: -9.141936738101936,
    })

    const { gyms } = await sut.execute({
      userLatitude: 38.70343794475386,
      userLongitude: -9.38191828969629,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
