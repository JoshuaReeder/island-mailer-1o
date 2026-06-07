"use client";

import { useState } from "react";

const brand = {
  navy: "#1F2735",
  gold: "#A37C4F",
  sand: "#D5C1AA",
  cream: "#F5F4EF",
};

function formatPhoneNumber(value) {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function isValidPhone(value) {
  return value.replace(/\D/g, "").length === 10;
}

export default function SMSContactForm() {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handlePhoneChange(e) {
    setPhone(formatPhoneNumber(e.target.value));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isValidPhone(phone)) {
      setErrorMsg("Please enter a valid 10-digit US phone number.");
      return;
    }
    setErrorMsg("");
    setStatus("loading");
    try {
      const res = await fetch("/api/sms-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phone.replace(/\D/g, "") }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
    } catch (err) {
      setErrorMsg(err.message);
      setStatus("error");
    }
  }

  return (
    <section style={{ backgroundColor: brand.navy, padding: "64px 24px", fontFamily: "'Georgia', serif" }}>
      <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
        <p style={{ color: brand.gold, fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12, fontFamily: "sans-serif" }}>
          Advertise with Us
        </p>
        <h2 style={{ color: brand.cream, fontSize: 28, fontWeight: 600, lineHeight: 1.3, marginBottom: 12 }}>
          Get your business in front of Maui.
        </h2>
        <p style={{ color: brand.sand, fontSize: 15, lineHeight: 1.6, marginBottom: 32, fontFamily: "sans-serif" }}>
          Drop your number and we'll text you details on ad space, pricing, and your next mailing date — no pressure, just aloha.
        </p>
        {status === "success" ? (
          <SuccessState />
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="(808) 555-1234"
                aria-label="Your phone number"
                inputMode="numeric"
                style={{
                  flex: "1 1 200px", maxWidth: 260, padding: "14px 18px", fontSize: 16,
                  borderRadius: 6, border: errorMsg ? "2px solid #e05252" : `2px solid ${brand.sand}`,
                  backgroundColor: "#ffffff", color: brand.navy, outline: "none", fontFamily: "sans-serif",
                }}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                style={{
                  flex: "0 0 auto", padding: "14px 28px", fontSize: 15, fontWeight: 600,
                  fontFamily: "sans-serif", letterSpacing: "0.04em", borderRadius: 6, border: "none",
                  backgroundColor: status === "loading" ? brand.sand : brand.gold,
                  color: "#ffffff", cursor: status === "loading" ? "default" : "pointer", whiteSpace: "nowrap",
                }}
              >
                {status === "loading" ? "Sending…" : "Text Me Details"}
              </button>
            </div>
            {errorMsg && (
              <p role="alert" style={{ color: "#e88", fontSize: 13, marginTop: 10, fontFamily: "sans-serif" }}>
                {errorMsg}
              </p>
            )}
            <p style={{ color: brand.sand, fontSize: 11, marginTop: 14, opacity: 0.7, fontFamily: "sans-serif" }}>
              US numbers only. Reply STOP to opt out anytime.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

function SuccessState() {
  return (
    <div>
      <div style={{ width: 52, height: 52, borderRadius: "50%", backgroundColor: "#2d6a4f22", border: "2px solid #52b788", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 22 }}>
        ✓
      </div>
      <p style={{ color: "#52b788", fontSize: 17, fontWeight: 600, fontFamily: "sans-serif", marginBottom: 8 }}>
        Check your phone!
      </p>
      <p style={{ color: brand.sand, fontSize: 14, fontFamily: "sans-serif", lineHeight: 1.6 }}>
        We just sent you a text. Reply with your business name and what you do — we'll take it from there. 🌺
      </p>
    </div>
  );
}
