import { NextResponse } from "next/server";
import { Resend } from "resend";
import ContactInquiryEmail from "@/emails/ContactInquiryEmail";
import ContactConfirmationEmail from "@/emails/ContactConfirmationEmail";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "zach@the717agency.com";

export async function POST(request) {
  try {
    const body = await request.json();
    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim();
    const service = String(body?.service || "Partnerships").trim();
    const message = String(body?.message || "").trim();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Please provide your name and email." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Email service is not configured (missing RESEND_API_KEY)." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const from = process.env.RESEND_FROM_EMAIL || "Lafa Agency <business@lafaagency.com>";

    const { data, error } = await resend.emails.send({
      from,
      to: [TO_EMAIL],
      replyTo: email,
      subject: `[Lafa Agency] ${service} inquiry from ${name}`,
      react: ContactInquiryEmail({ name, email, service, message }),
    });

    if (error) {
      return NextResponse.json(
        { error: error.message || "Failed to send inquiry." },
        { status: 500 }
      );
    }

    // Send confirmation email to the sender (non-blocking if it fails)
    await resend.emails.send({
      from,
      to: [email],
      replyTo: "business@lafaagency.com",
      subject: `We received your ${service} inquiry — Lafa Agency`,
      react: ContactConfirmationEmail({ name, service, message }),
    }).catch(() => null);

    return NextResponse.json({ ok: true, id: data?.id });
  } catch {
    return NextResponse.json(
      { error: "Invalid request or server error." },
      { status: 500 }
    );
  }
}

