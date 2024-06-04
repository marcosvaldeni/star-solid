import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', async () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    gymsRepository.create({
      title: 'Gym Javascript',
      description: null,
      phone: null,
      latitude: 38.69200041952125,
      longitude: -9.365901601183827,
    })

    gymsRepository.create({
      title: 'Gym Typescript',
      description: null,
      phone: null,
      latitude: 38.69200041952125,
      longitude: -9.365901601183827,
    })

    const { gyms } = await sut.execute({
      query: 'Gym Javascript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Gym Javascript' })])
  })

  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      gymsRepository.create({
        title: 'Gym-' + i,
        description: null,
        phone: null,
        latitude: 38.69200041952125,
        longitude: -9.365901601183827,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Gym',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Gym-21' }),
      expect.objectContaining({ title: 'Gym-22' }),
    ])
  })
})
