// app/api/sms-contact/route.js
import { NextResponse } from "next/server";

const OPENPHONE_API_KEY = process.env.OPENPHONE_API_KEY;
const OPENPHONE_FROM_NUMBER = process.env.OPENPHONE_FROM_NUMBER;

const SMS_MESSAGE = `Aloha! This is Island Mailer — 🌺

We'd love to feature your business in front of thousands of local Maui households.

Just reply with:
1. Your business name
2. Your preferred method of communication

We'll check availability and can send you more info. Reply STOP to opt out.`;

function isValidUSPhone(digits) {
  return /^[2-9]\d{9}$/.test(digits);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const rawPhone = (body.phone ?? "").replace(/\D/g, "");
    if (!rawPhone) return NextResponse.json({ error: "Phone number is required." }, { status: 400 });
    if (!isValidUSPhone(rawPhone)) return NextResponse.json({ error: "Please provide a valid 10-digit US phone number." }, { status: 400 });
    if (!OPENPHONE_API_KEY || !OPENPHONE_FROM_NUMBER) return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
    const e164Phone = `+1${rawPhone}`;
    const opRes = await fetch("https://api.openphone.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": OPENPHONE_API_KEY },
      body: JSON.stringify({ to: [e164Phone], from: OPENPHONE_FROM_NUMBER, content: SMS_MESSAGE }),
    });
    if (!opRes.ok) {
      const errData = await opRes.json().catch(() => ({}));
      return NextResponse.json({ error: "Could not send message. Please try again." }, { status: 502 });
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Unexpected error. Please try again." }, { status: 500 });
  }
}
