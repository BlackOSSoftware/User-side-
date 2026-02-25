"use client";

import { Mail, Phone, MapPin, Headphones } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert("Form submitted");
  };

  return (
    <div className="min-h-screen px-6 pb-24 pt-28">
      <div className="mx-auto w-full max-w-7xl space-y-10">

        {/* ⭐ HERO */}
        <div className="max-w-3xl space-y-3">
          <p className="text-sm font-semibold tracking-widest text-primary uppercase">
            Contact MSPK Trading
          </p>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Talk to a real specialist, not a generic support queue.
          </h1>

          <p className="text-muted-foreground">
            Send your request and our team routes it directly to the relevant desk
            for faster and clearer resolution.
          </p>
        </div>

        {/* ⭐ QUICK CONTACT CARDS */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Mail, title: "Email", val: "support@mspktrading.com" },
            { icon: Phone, title: "Phone", val: "+91 XXXXX XXXXX" },
            { icon: MapPin, title: "Office", val: "Indore, India" },
            { icon: Headphones, title: "Support Hours", val: "24/7 Active Desk" },
          ].map((c, i) => (
            <div
              key={i}
              className="rounded-xl border border-border/50 bg-background/50 backdrop-blur p-5 flex gap-4 hover:border-primary/30 transition-all duration-500"
            >
              <c.icon className="text-primary" />
              <div>
                <p className="font-medium">{c.title}</p>
                <p className="text-sm text-muted-foreground">{c.val}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ⭐ MAIN GRID */}
        <div className="grid gap-8 lg:grid-cols-3 items-stretch">

          {/* ⭐ FORM */}
          <div className="lg:col-span-2 rounded-2xl border border-border/50 bg-background/50 backdrop-blur p-4 sm:p-6 md:p-8 hover:border-primary/30 transition-all duration-500 flex flex-col">

            <h2 className="text-xl font-semibold mb-1">Send us your query</h2>
            <p className="text-muted-foreground mb-4">
              Please share your details and requirement. We usually respond within one business day.
            </p>

            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2 flex-1">

              <input
                name="name"
                onChange={handleChange}
                placeholder="Full Name"
                className="rounded-xl border border-border bg-transparent px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              />

              <input
                name="email"
                onChange={handleChange}
                placeholder="Email"
                className="rounded-xl border border-border bg-transparent px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              />

              <input
                name="phone"
                onChange={handleChange}
                placeholder="Phone"
                className="rounded-xl border border-border bg-transparent px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              />

              <select
                name="subject"
                onChange={handleChange}
                className="rounded-xl border border-border bg-transparent px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              >
                <option>General Inquiry</option>
                <option>Plans</option>
                <option>Technical</option>
                <option>Account</option>
              </select>

              <textarea
                name="message"
                onChange={handleChange}
                rows={4}
                placeholder="Message"
                className="md:col-span-2 rounded-xl border border-border bg-transparent px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              />

              <div className="md:col-span-2">
                <button className="group relative rounded-xl bg-gradient-to-r from-primary to-primary/70 px-8 py-3.5 text-white font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] active:scale-95">
                  {/* Shine effect overlay */}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                  
                  {/* Button text */}
                  <span className="relative z-10 inline-block group-hover:tracking-wide transition-all duration-300">
                    Submit Request
                  </span>
                  
                  {/* Pulse ring effect */}
                  <span className="absolute inset-0 rounded-xl ring-2 ring-transparent group-hover:ring-primary/50 group-hover:ring-offset-2 group-hover:ring-offset-background transition-all duration-300" />
                </button>
              </div>

            </form>
          </div>

          {/* ⭐ RIGHT COLUMN */}
          <div className="flex flex-col gap-6">

            <div className="rounded-2xl border border-border/50 bg-background/50 backdrop-blur p-6 flex-1 hover:border-primary/30 transition-all duration-500">
              <h3 className="font-semibold mb-4">How We Respond</h3>

              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="bg-muted rounded-lg px-3 py-2">
                  Your request is triaged to the correct desk within minutes.
                </li>
                <li className="bg-muted rounded-lg px-3 py-2">
                  Priority and account-impacting queries are escalated faster.
                </li>
                <li className="bg-muted rounded-lg px-3 py-2">
                  You receive clear next steps instead of generic replies.
                </li>
                <li className="bg-muted rounded-lg px-3 py-2">
                  Complex cases get direct specialist follow-up.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border/50 bg-muted/60 p-6 hover:border-primary/30 transition-all duration-500">
              <h3 className="font-semibold mb-2">Expected Reply Window</h3>
              <p className="text-sm text-muted-foreground">
                Standard queries: same business day. Account-critical or trading-critical
                issues follow priority response path.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}