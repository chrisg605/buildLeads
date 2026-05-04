"use server"
import Form from 'next/form'
import InsertData from "@/lib/data"
export default async function Submitdata(){
    return (
        <Form action={InsertData}>
            <button type="submit">Submit</button>
        </Form>
    )

}