import prisma from '@/db';
import { NotFoundError } from 'lithia/core';
import { LithiaRequest, LithiaResponse } from 'lithia/types';

export default async function handle(req: LithiaRequest, res: LithiaResponse) {
  const id = Number(req.params.id);
  const user = await prisma.users.findFirst({
    where: {
      id,
    },
  });

  if (!user) {
    throw new NotFoundError(`Cannot find user with id ${id}`);
  }

  await prisma.users.delete({
    where: {
      id,
    },
  });

  res.status(204).end();
}
