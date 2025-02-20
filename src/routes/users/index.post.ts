import prisma from '@/db';
import { ConflictError, LithiaRequest, LithiaResponse } from 'lithia';

export default async function handle(req: LithiaRequest, res: LithiaResponse) {
  const body = await req.body<{
    name: string;
    age: number;
    email: string;
  }>();

  const userExists = await prisma.users.findFirst({
    where: {
      email: body.email,
    },
  });

  if (userExists) {
    throw new ConflictError('Email already in use');
  }

  const user = await prisma.users.create({
    data: {
      name: body.name,
      age: body.age,
      email: body.email,
    },
  });

  res.status(201).json(user);
}
