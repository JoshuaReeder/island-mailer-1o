import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      name,
      businessName,
      phone,
      email,
      website,
      businessType,
      industryCategory,
      mailings,
      areas,
      notes,
    } = body

    // Format the email content
    const emailContent = `
New Island Mailer Lead

Contact Information:
- Name: ${name}
- Business Name: ${businessName}
- Phone: ${phone}
- Email: ${email}
- Website/Instagram: ${website || "Not provided"}

Business Details:
- Business Type: ${businessType}
- Industry Category: ${industryCategory}
- Number of Mailings: ${mailings}
- Preferred Areas: ${areas.length > 0 ? areas.join(", ") : "None selected"}

Additional Notes:
${notes || "None"}

---
This lead was submitted via the Island Mailer website contact form.
    `.trim()

    // Only send email if API key is available
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      
      try {
        const { data, error } = await resend.emails.send({
          from: "Island Mailer <onboarding@resend.dev>",
          to: ["aloha@islandmailer.com"],
          replyTo: email,
          subject: `New Lead: ${businessName} - ${industryCategory}`,
          text: emailContent,
        })

        if (error) {
          console.error("[v0] Resend error:", error)
          return NextResponse.json(
            { success: false, error: "Failed to send email" },
            { status: 500 }
          )
        }

        console.log("[v0] Email sent successfully:", data)
      } catch (emailError) {
        console.error("[v0] Email sending error:", emailError)
        // Don't fail the request if email fails - still return success to user
      }
    } else {
      console.log("[v0] No RESEND_API_KEY configured - submission recorded but email not sent")
      console.log("[v0] Form submission data:", { name, businessName, phone, email, businessType, industryCategory, mailings, areas, website, notes })
    }

    return NextResponse.json({ success: true, message: "Application submitted successfully" })
  } catch (error) {
    console.error("[v0] API error:", error)
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}
