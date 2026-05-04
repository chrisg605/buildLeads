"use server"
import { redirect } from 'next/navigation';

export default async function FilterProjects(formData: FormData){
    const status = formData.get('status') as string;
    const start_date = formData.get('start_date') as string;
    const end_date = formData.get('end_date') as string;
    const cities = formData.getAll('cities') as string[];
    const favorite = formData.get('favorite') as string;
    console.log(favorite)

    const params = new URLSearchParams();
    if (status) params.set('status', status);
    if (start_date) params.set('start_date', start_date);
    if (end_date) params.set('end_date', end_date);
    if (cities.length > 0) params.set('cities', cities.join(','));
    if (favorite) params.set('saved', favorite);
    redirect(`/dashboard?${params.toString()}`);
}