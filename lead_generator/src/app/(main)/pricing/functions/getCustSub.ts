import { unstable_cache } from 'next/cache';
import prisma from "../../../../../lib/prisma";

export const GetCustSub = 
  async (auth0Id: string) => {
    const user = await prisma.users.findUnique({ where: { auth0_id: auth0Id } });
    return user;
  }