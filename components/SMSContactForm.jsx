"use client";

import { useState } from "react";

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
    <div className="textme shimmer">
      <div className="container narrow">
        <div className="label">Advertise With Us</div>
        <h2>Get your business in front of Maui.</h2>
        <p>
          Drop your number and we'll text you details on ad space, pricing, and your next mailing date — no pressure,
          just aloha.
        </p>
        {status === "success" ? (
          <SuccessState />
        ) : (
          <>
            <form className="phone-row" onSubmit={handleSubmit} noValidate>
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="(808) 555-0123"
                aria-label="Your phone number"
                inputMode="numeric"
                style={errorMsg ? { borderColor: "#e05252" } : undefined}
              />
              <button className="btn" type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Sending…" : "Text Me Details"}
              </button>
            </form>
            {errorMsg && (
              <p role="alert" style={{ color: "#e88899", marginTop: 16 }}>
                {errorMsg}
              </p>
            )}
          </>
        )}
        <p className="micro2">US numbers only. Reply STOP to opt out anytime.</p>
      </div>
    </div>
  );
}

function SuccessState() {
  return (
    <div style={{ marginTop: "var(--gap-xs)" }}>
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "rgba(163,124,79,0.15)",
          border: "2px solid var(--gold-bright)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 20px",
          fontSize: 26,
          color: "var(--gold-bright)",
        }}
      >
        ✓
      </div>
      <p style={{ color: "var(--gold-bright)", fontWeight: 800 }}>Check your phone!</p>
      <p>
        We just sent you a text. Reply with your business name and what you do — we'll take it from there. 🌺
      </p>
    </div>
  );
}
