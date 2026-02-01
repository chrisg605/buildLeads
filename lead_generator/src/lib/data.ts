"use server"
import postgres from 'postgres';



export default async function Insertdata(){
    const sql = postgres(process.env.POSTGRES_URL!, { ssl: false });
    let s = await sql`SELECT COUNT(*) FROM users`
    console.log(s)

}
