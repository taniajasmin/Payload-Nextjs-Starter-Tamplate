"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
}

const subjectOptions = [
  "General Inquiry",
  "Partnership",
  "Product Inquiry",
  "Careers",
  "Media / Press",
  "Other",
];

const initialFormData: ContactFormData = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  subject: "",
  message: "",
};

function validate(data: ContactFormData): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!data.fullName.trim()) errors.fullName = "Full name is required";
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }
  if (!data.subject) errors.subject = "Please select a subject";
  if (!data.message.trim()) errors.message = "Message is required";
  return errors;
}

/* ── Reusable styled input ── */
function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
        {label}{required && <span className="text-destructive ml-0.5">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground bg-background focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors ${
          error ? "border-destructive bg-destructive/5" : "border-border hover:border-muted-foreground/30"
        }`}
      />
      {error && <p className="mt-1 text-xs text-destructive font-medium">{error}</p>}
    </div>
  );
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "general",
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          subject: formData.subject,
          message: formData.message,
        }),
      });
      if (!res.ok) {
        let message = "Something went wrong. Please try again.";
        try {
          const data = await res.json();
          message = data?.error || message;
        } catch {
          /* keep default message */
        }
        throw new Error(message);
      }
      setSubmitted(true);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="border border-border bg-card p-10 md:p-14 text-center">
        <div className="w-14 h-14 bg-primary/10 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-7 h-7 text-primary" strokeWidth={1.6} />
        </div>
        <h3 className="text-xl font-extrabold leading-[1.1] tracking-tight text-foreground">
          Thank You for Your Inquiry
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          We have received your message and will respond within 24 hours.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Reference: SIM-{Date.now().toString(36).toUpperCase()}
        </p>
        <button
          type="button"
          onClick={() => {
            setFormData(initialFormData);
            setSubmitted(false);
          }}
          className="mt-6 inline-flex items-center gap-2 border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid md:grid-cols-2 gap-5">
        <FormInput
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Your full name"
          error={errors.fullName}
          required
        />
        <FormInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@company.com"
          error={errors.email}
          required
        />
        <FormInput
          label="Phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+971 XX XXX XXXX"
          error={errors.phone}
        />
        <FormInput
          label="Company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company name"
          error={errors.company}
        />
      </div>

      {/* Subject */}
      <div className="mt-5 w-full">
        <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
          Subject<span className="text-destructive ml-0.5">*</span>
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={`w-full border px-4 py-3 text-sm bg-background text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none cursor-pointer ${
            errors.subject ? "border-destructive bg-destructive/5" : "border-border hover:border-muted-foreground/30"
          }`}
        >
          <option value="">Select a subject</option>
          {subjectOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {errors.subject && (
          <p className="mt-1 text-xs text-destructive font-medium">{errors.subject}</p>
        )}
      </div>

      {/* Message */}
      <div className="mt-5 w-full">
        <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
          Message<span className="text-destructive ml-0.5">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us how we can help..."
          className={`w-full border px-4 py-3 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-y ${
            errors.message ? "border-destructive bg-destructive/5" : "border-border hover:border-muted-foreground/30"
          }`}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-destructive font-medium">{errors.message}</p>
        )}
      </div>

      <div className="mt-6">
        {errorMessage && (
          <p className="mb-3 text-xs text-destructive font-medium">{errorMessage}</p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Sending..." : "Send Message"} <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
