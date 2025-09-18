// src/app/api/contact/route.js

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, phone, message } = await request.json();

    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
        <p><em>Sent on ${new Date().toLocaleString()}</em></p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
