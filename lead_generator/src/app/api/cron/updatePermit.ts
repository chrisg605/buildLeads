// api/cron/updatePermits.ts
// Runs at 3 AM PST (11 AM UTC) every day
import prisma from "@/../lib/prisma";
import { VercelRequest, VercelResponse } from '@vercel/node';

interface CronResponse {
  success: boolean;
  timestamp: string;
  message: string;
  error?: string;
  count?: number;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  // Verify request is from Vercel
  const authHeader = req.headers['authorization'];
  const expectedAuth = `Bearer ${process.env.CRON_SECRET}`;
  
  if (!authHeader || authHeader !== expectedAuth) {
    res.status(401).json({
      success: false,
      timestamp: new Date().toISOString(),
      message: 'Unauthorized request',
      error: 'Missing or invalid authorization header'
    });
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({
      success: false,
      timestamp: new Date().toISOString(),
      message: 'Method not allowed',
      error: 'Only POST requests are supported'
    });
    return;
  }

  try {
    const startTime = Date.now();
    console.log('✓ Cron job started at', new Date().toISOString());


    const duration = Date.now() - startTime;
    console.log(`✓ Cron job completed in ${duration}ms`);
    const date = new Date();

  date.setDate(date.getDate() - 1);
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

    const response: CronResponse = {
      success: true,
      timestamp: new Date().toISOString(),
      message: 'Database updated successfully',
    };

    res.status(200).json(response);

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    const errorStack = error instanceof Error ? error.stack : '';
    
    console.error('❌ Cron job failed:', errorMessage);
    console.error('Stack:', errorStack);

    // Optional: Send alerts to Slack, email, or monitoring service
    // await sendAlert(`Permit cron job failed: ${errorMessage}`);

    const response: CronResponse = {
      success: false,
      timestamp: new Date().toISOString(),
      message: 'Database update failed',
      error: errorMessage
    };

    res.status(500).json(response);
  }
}