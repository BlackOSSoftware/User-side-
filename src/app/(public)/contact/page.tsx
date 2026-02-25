"use client";

import { useEffect, useState } from "react";

export default function ContactPage() {
  const text = "Questions about plans? Let’s connect";
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!deleting && displayed.length < text.length) {
      timeout = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, 90);
    } else if (!deleting && displayed.length === text.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length - 1));
      }, 25);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, text]);

  return (
    <div className="min-h-screen px-6 pb-24 pt-28">
      <div className="mx-auto w-full max-w-6xl">

        {/* ⭐ HERO */}
        <div className="mb-12 text-center">

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Get in Touch
          </h1>

          {/* ⭐ Infinite gradient typing */}
          <p className="mt-4 text-3xl md:text-5xl font-heading font-bold tracking-tighter leading-[1.1]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 animate-gradient-x">
              {displayed}
            </span>
            <span className="ml-1 animate-pulse text-blue-400">|</span>
          </p>

        </div>

        {/* Split Layout */}
        <div className="grid gap-8 md:grid-cols-2">

          {/* LEFT */}
          <div className="rounded-2xl border border-border bg-background/60 backdrop-blur p-8 space-y-6">
            <h2 className="text-xl font-semibold">Contact Information</h2>

            <div>
              <p className="text-sm text-muted-foreground">WhatsApp</p>
              <a
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                className="font-medium hover:text-primary transition"
              >
                Chat on WhatsApp
              </a>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">support@mspktrading.com</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">+91 XXXXX XXXXX</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="font-medium">Indore, Madhya Pradesh, India</p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="rounded-2xl border border-border bg-background/60 backdrop-blur p-8">
            <h2 className="text-xl font-semibold mb-6">Send Message</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Form submitted");
              }}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              />

              <textarea
                placeholder="Your Message"
                rows={5}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              />

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-primary to-primary/70 py-3 font-semibold text-white hover:opacity-90 transition"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}