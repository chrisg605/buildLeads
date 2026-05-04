// lib/actions.ts
'use server';
import { ManagementClient } from 'auth0';
import { auth0 } from '@/lib/auth0';

const management = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN!,
  clientId: process.env.AUTH0_CLIENT_ID!,
  clientSecret: process.env.AUTH0_CLIENT_SECRET!,
});

export async function updateEmail( newEmail: string) {
  const session = await auth0.getSession();
  const userId = session?.user.sub;
  
  if (!userId) throw new Error('Not authenticated');
  await management.users.update(userId,
    { email: newEmail, email_verified: false }
  );
}