"use server"
import { headers } from 'next/headers'
import prisma from "../../../../lib/prisma";

export async function POST(request: Request) {
    const request_json = await request.json();
    const user_id  = request_json.auth_id;
    const headersList = await headers();
    const key = headersList.get('x-auth-token');
    if (key == process.env.AUTH_KEY){
        const user = await prisma.users.create({
            data: {
                auth0_id: user_id,
                name: "User",
            }
        });
        
        return new Response();
    }
}
