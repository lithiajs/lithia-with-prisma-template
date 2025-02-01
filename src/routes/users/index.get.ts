import prisma from '@/db';
import { LithiaRequest, LithiaResponse } from 'lithia/types';

export default async function handle(req: LithiaRequest, res: LithiaResponse) {
  const users = await prisma.users.findMany();
  res.json(users);
}
