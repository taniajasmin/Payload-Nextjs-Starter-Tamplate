"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SupportRequestFormData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  category: string;
  priority: string;
  subject: string;
  description: string;
}

const categoryOptions = [
  "Order Issue",
  "Product Inquiry",
  "Technical Support",
  "Warranty & Returns",
  "Billing",
  "General",
];

const priorityOptions = [
  { value: "low", label: "Low — General question or minor issue" },
  { value: "medium", label: "Medium — Issue affecting workflow" },
  { value: "high", label: "High — Critical system impacted" },
  { value: "critical", label: "Critical — System down / data loss" },
];

const initialFormData: SupportRequestFormData = {
  fullName: "",
  email: "",
  phone: "",
  companyName: "",
  category: "",
  priority: "",
  subject: "",
  description: "",
};

function validate(data: SupportRequestFormData): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!data.fullName.trim()) errors.fullName = "Full name is required";
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }
  if (!data.category) errors.category = "Please select a category";
  if (!data.priority) errors.priority = "Please select a priority level";
  if (!data.subject.trim()) errors.subject = "Subject is required";
  if (!data.description.trim()) errors.description = "Description is required";
  return errors;
}

export function SupportRequestForm() {
  const [formData, setFormData] = useState<SupportRequestFormData>(initialFormData);
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
          type: "support",
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.companyName,
          subject: formData.subject,
          message: formData.description,
          details: {
            category: formData.category,
            priority: formData.priority,
          },
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
      <div className="border border-border bg-muted p-8 md:p-12 text-center">
        <svg
          className="mx-auto h-12 w-12 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-4 text-[length:var(--font-heading)] font-semibold text-neutral-900">
          Support Ticket Created
        </h3>
        <p className="mt-2 text-neutral-600">
          We aim to respond within 4 business hours during working days.
        </p>
        <p className="mt-1 text-[length:var(--font-body)] text-neutral-500">
          Ticket: SUP-{Date.now().toString(36).toUpperCase()}
        </p>
        <button
          type="button"
          onClick={() => {
            setFormData(initialFormData);
            setSubmitted(false);
          }}
          className="mt-6 text-[length:var(--font-button)] font-medium text-foreground underline hover:no-underline"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="border border-border bg-card p-6 md:p-8"
    >
      {/* Contact Information */}
      <h3 className="text-[length:var(--font-heading)] font-semibold mb-4">Contact Information</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="Full Name *"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Your full name"
          error={errors.fullName}
        />
        <Input
          label="Email *"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@company.com"
          error={errors.email}
        />
        <Input
          label="Phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+971 XX XXX XXXX"
          error={errors.phone}
        />
        <Input
          label="Company"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Company name"
          error={errors.companyName}
        />
      </div>

      {/* Issue Details */}
      <h3 className="text-[length:var(--font-heading)] font-semibold mt-8 mb-4">Issue Details</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="w-full">
          <label htmlFor="category" className="block text-[length:var(--font-body)] font-medium mb-1.5">
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full rounded-lg border px-4 py-2.5 text-[length:var(--font-body)] bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all duration-200 ${
              errors.category ? "border-red-500" : "border-border"
            }`}
          >
            <option value="">Select a category</option>
            {categoryOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-[length:var(--font-body)] text-red-500">{errors.category}</p>
          )}
        </div>
        <div className="w-full">
          <label htmlFor="priority" className="block text-[length:var(--font-body)] font-medium mb-1.5">
            Priority *
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className={`w-full rounded-lg border px-4 py-2.5 text-[length:var(--font-body)] bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all duration-200 ${
              errors.priority ? "border-red-500" : "border-border"
            }`}
          >
            <option value="">Select priority</option>
            {priorityOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.priority && (
            <p className="mt-1 text-[length:var(--font-body)] text-red-500">{errors.priority}</p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <Input
          label="Subject *"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Brief summary of your issue"
          error={errors.subject}
        />
      </div>

      <div className="mt-6 w-full">
        <label htmlFor="description" className="block text-[length:var(--font-body)] font-medium mb-1.5">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          rows={5}
          value={formData.description}
          onChange={handleChange}
          placeholder="Please describe your issue in detail, including any error messages or steps to reproduce..."
          className={`w-full rounded-lg border px-4 py-2.5 text-[length:var(--font-body)] bg-background text-foreground placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all duration-200 resize-y ${
            errors.description ? "border-red-500" : "border-border"
          }`}
        />
        {errors.description && (
          <p className="mt-1 text-[length:var(--font-body)] text-red-500">{errors.description}</p>
        )}
      </div>

      <div className="mt-6">
        {errorMessage && (
          <p className="mb-3 text-[length:var(--font-body)] text-red-500 font-medium">{errorMessage}</p>
        )}
        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Support Request"}
        </Button>
      </div>
    </form>
  );
}
