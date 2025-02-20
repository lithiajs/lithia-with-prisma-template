import prisma from '@/db';
import { LithiaRequest, LithiaResponse, NotFoundError } from 'lithia';

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

  res.json(user);
}
