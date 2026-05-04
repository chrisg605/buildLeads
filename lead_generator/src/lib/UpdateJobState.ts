"use server"
import prisma from "../../lib/prisma";
import { getCustomUserId } from "./getUser";
import { auth0 } from "@/lib/auth0";


export default async function UpdateJobState(jobId:number, status: string) {//updates job state
    const session = await auth0.getSession();
    const auth_user = session?.user;
    let auth_id = "";
    if (auth_user){
        auth_id = auth_user.sub;
    }
    const id = (await getCustomUserId(auth_id)) ?? 0;
    if (status == "new" ){
        const deleteUser = await prisma.user_Job.deleteMany({
        where: {
            user_id : id,
            job_id : jobId,
            contacted: false
        }       
        });
    }
    else {
        const user = await prisma.user_Job.upsert({
        where: {user_id_job_id: {
            user_id: id,
            job_id: jobId
        }},
            update: { job_state: status},
            create: {
                job_id: jobId,
                user_id: id,
                job_state: status
            },
        });
        
    }
 
    
}