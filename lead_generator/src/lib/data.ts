
import prisma from "../../lib/prisma";
export default async function InsertData(){
  const date = new Date();

  date.setDate(date.getDate() - 2);
  const date_iso = date.toISOString();
  const date_float = date_iso.slice(0, 10) + "T00:00:00";
  const url = `https://data.marincounty.gov/api/v3/views/mkbn-caye/query.json`;
  const body = {//set up request
    query: `SELECT construction_value,construction,description,address,city_town,issued_date,received_date,type_permit,contractor,contractor_license WHERE issued_date="${date_float}"`,
    page: {
        pageNumber: 1,
        pageSize: 100
    },
    includeSynthetic: false
  }
  const data = await fetch(`${url}?$$app_token=${process.env.APP_TOKEN}`, {//fetch data
      method: 'POST',
      headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
    })
    const json_data = await data.json();
    json_data.forEach(async (permit_lead:any) => {//insert data into db  
        const jobs = await prisma.jobs.create({
          data: {
            address: permit_lead.address,
            estimated_cost: permit_lead.construction_value ? parseInt(permit_lead.construction_value) : 0,
            job_description: permit_lead.description,
            issued_date: date_iso,
            job_name: permit_lead.construction,
            contractor: (permit_lead.contractor ? permit_lead.contractor : ""),
            contractor_license: permit_lead.contractor_license,
            job_type: permit_lead.type_permit,
            city: permit_lead.city_town
          },
        });
    });
    
  }







