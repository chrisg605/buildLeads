"use server"
import { auth0 } from "@/lib/auth0";
import prisma from "../../../../../lib/prisma";
import addContact from "../lib/addContact";

export default async function HandleContact(jobId : number, traced: boolean, address:string, city:string, count: number){
    const session = await auth0.getSession();
    const auth_user = session?.user;
    let auth_id = "";
    if (auth_user){
        auth_id = auth_user.sub;
    }
    else {
        return { error: 'unauthorized' };
    }
    const user = await prisma.users.findUnique({
        where: { auth0_id: auth_id }
    });

    if (!user || user.credits < 1) {
        return { error: 'insufficient_credits' };
    }
    let hit:boolean = true;
    if (!traced){
        hit = await addContact(address, city, jobId);
    }
    else if (!count){
        hit = false;
    }

    await prisma.$transaction(async (tx) => {
        if (hit){
            await tx.users.update({
                where: { auth0_id: auth_id },
                data: { credits: { decrement: 1 } }
            });
        }
        const user_job = await tx.user_Job.upsert({
        where: {user_id_job_id: {
            user_id: user.id,
            job_id: jobId,
        }},
            update: { contacted: true},
            create: {
                job_id: jobId,
                user_id: user.id,
                contacted: true,
                job_state: "all"
            },
        });
    });

}

