import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // Configure Nodemailer with Gmail SMTP and your env values
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: `"Newsletter" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // send to your Gmail inbox
      subject: 'New Newsletter Subscription',
      text: `New subscriber: ${email}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Subscription successful, thank you!' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
