"use server"
import Form from 'next/form'
import Insertdata from "@/lib/data"
export default async function Submitdata(){
    return (
        <Form action={Insertdata}>
            <input name="query" />
            <button type="submit">Submit</button>
        </Form>
    )

}