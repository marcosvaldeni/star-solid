import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterUseCasRequest {
  name: string
  email: string
  password: string
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUseCasRequest) {
  const password_hash = await hash(password, 6)

  const userWithSomeEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSomeEmail) {
    throw new Error('E-mail already exists.')
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })
}
