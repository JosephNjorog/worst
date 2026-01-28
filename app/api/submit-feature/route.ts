import { sendEmail } from '@/lib/mail';
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { name, email, featureDescription } = await request.json();

    if (!name || !email || !featureDescription) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Save to database
    const { error: dbError } = await supabase.from('applications').insert({
      name,
      email,
      feature_description: featureDescription,
    });

    if (dbError) {
      console.error('Database error:', dbError);
    }

    // Send email using Nodemailer
    try {
      await sendEmail({
        to: 'worstfriendspodcast1@gmail.com', // Updated to the correct podcast email
        subject: `New Feature Application: ${name}`,
        replyTo: email,
        html: `
          <h1>New Feature Application</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Feature Description:</strong></p>
          <p>${featureDescription}</p>
          <hr />
          <p><small>Note: Applicant has been instructed to send their portfolio and 2-min intro video to this email address as well.</small></p>
        `,
      });
    } catch (mailError) {
      console.error('Mail error:', mailError);
      // We still return success if it was saved to DB, but log the mail error
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
