import { NextResponse } from 'next/server';
import { getSupabase } from '../../../lib/supabase';

const REQUIRED = ['firstName', 'lastName', 'email'];

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  for (const field of REQUIRED) {
    if (!body?.[field]) {
      return NextResponse.json({ error: `Missing ${field}.` }, { status: 400 });
    }
  }

  const { firstName, lastName, email, phone, interest, budget, message, project } = body;

  const { error } = await getSupabase().from('contact_submissions').insert({
    first_name: firstName,
    last_name: lastName,
    email,
    phone: phone || null,
    interest: interest || null,
    budget: budget || null,
    message: message || null,
    // Set when the enquiry came from a project page, so the dashboard can
    // separate project leads from general contact-form traffic.
    project: project || null,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
