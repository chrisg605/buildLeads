'use server';
import  prisma from "@/../lib/prisma"; // Your prisma client
import { getCustomUserId } from "./getUser";
import { auth0 } from "@/lib/auth0";


export async function updateJobSelection(jobId: number, isSelected: boolean) {
  const session = await auth0.getSession();
      const auth_user = session?.user;
      let auth_id = "";
      if (auth_user){
          auth_id = auth_user.sub;
      }
      const id = (await getCustomUserId(auth_id)) ?? 0;
      if (isSelected == false ){
        const updateUser = await prisma.user_Job.updateMany({
            where: {
                user_id: id,
                job_id: jobId,
            },
            data: {
                saved: false
            }
            });
          const deleteUser = await prisma.user_Job.deleteMany({
          where: {
              user_id : id,
              job_id : jobId,
              contacted: false,
              job_state: "all"
          }       
          });
      }
      else {
          const user = await prisma.user_Job.upsert({
          where: {user_id_job_id: {
              user_id: id,
              job_id: jobId
          }},
              update: { saved: true},
              create: {
                  job_id: jobId,
                  user_id: id,
                  saved: true,
                  job_state: "all"
              },
          });
          
      }
}