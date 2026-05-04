import { unstable_cache } from 'next/cache';
import prisma from "../../lib/prisma";

export const getCustomUserId = unstable_cache(
  async (auth0Id: string) => {
    const user = await prisma.users.findUnique({ where: { auth0_id: auth0Id } });
    return user?.id;
  },
  ['custom-user-id'],
  { revalidate: 86400 } // cache for 24 hours
);