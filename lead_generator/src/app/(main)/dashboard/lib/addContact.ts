"use server"
import prisma from "@/../lib/prisma";

export default async function addContact(address: string, city: string, jobId: number){
    const zip = address.slice(-5);
    console.log(zip);
    try {
        const response = await fetch('https://tracerfy.com/v1/api/trace/lookup/', {
        method: 'POST',
        headers: {
        'Authorization': `Bearer ${process.env.TRACERFY_API_KEY}`,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        address: address,
        city: city,
        state: "CA",
        zip: zip,
        find_owner: true
    })
    });
    if (!response.ok){
        throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();


    if (data.hit == true){
        data.persons?.map(async (person:any) => {


        const contact = await prisma.contacts.create({
            data: { job_id: jobId, name: person.first_name, owner: person.property_owner}
        });
        const contact_id = contact.id;
        person.phones?.map(async (phone:any) => {
            await prisma.contact_methods.create({
            data: {
                contact_id: contact_id,
                type: "phone",
                value: phone.number
            }
        })})
        person.emails?.map(async (email:any) => {
            await prisma.contact_methods.create({
            data: {
                contact_id: contact_id,
                type: "email",
                value: email.email,
            }})})
        })
        
    }
    await prisma.jobs.update({
        where: { id: jobId },
        data: { traced: true }
    });
        if (!data.hit){
            return false;
        }
        else {
            return true;
        }
    }
    catch (err){
        console.log(err);
        return false;
    }
    
}