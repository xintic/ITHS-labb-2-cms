import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload;
    const { name, email, message } = payload;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    const sender = process.env.EMAIL_APP_SENDER;
    const recipient = process.env.EMAIL_APP_RECIPIENT;
    const password = process.env.EMAIL_APP_PASSWORD;

    if (!sender || !recipient || !password) {
      return NextResponse.json(
        { error: 'Email is not configured.' },
        { status: 500 }
      );
    }

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: sender,
        pass: password
      }
    });

    await transport.sendMail({
      from: sender,
      to: recipient,
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send message.' },
      { status: 500 }
    );
  }
}
