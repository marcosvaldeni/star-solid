import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterUseCasRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private usersRepository: any) {}

  async execute({ name, email, password }: RegisterUseCasRequest) {
    const password_hash = await hash(password, 6)

    const userWithSomeEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSomeEmail) {
      throw new Error('E-mail already exists.')
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
