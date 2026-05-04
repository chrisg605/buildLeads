'use server';

import prisma from "@/../lib/prisma";
import { auth0 } from '@/lib/auth0';

export async function updateName(name: string) {
  const session = await auth0.getSession();
  const userId = session?.user.sub;

  if (!userId) throw new Error('Not authenticated');

  await prisma.users.update({
    where: { auth0_id: userId },
    data: { name },
  });
}