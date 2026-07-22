"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SalesInquiryFormData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  country: string;
  solutionInterest: string;
  estimatedQuantity: string;
  deliveryTimeline: string;
  budgetRange: string;
  message: string;
  preferredContactMethod: string;
}

const countries = [
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "Oman",
  "Egypt",
  "Nigeria",
  "Kenya",
  "South Africa",
  "Kazakhstan",
  "Other",
];

const solutionOptions = [
  "AMC (Annual Maintenance Contract)",
  "AV & Meeting Room Solutions",
  "Cloud Security Solutions",
  "Data Recovery & Storage",
  "Firewall Solutions",
  "Hardware (General)",
];

const quantityOptions = [
  "1–10 units",
  "11–50 units",
  "51–100 units",
  "100+ units",
  "Not sure yet",
];

const timelineOptions = [
  "Immediately",
  "Within 1 month",
  "1–3 months",
  "3–6 months",
  "Flexible",
];

const budgetOptions = [
  "Under $1,000",
  "$1,000–$10,000",
  "$10,000–$50,000",
  "$50,000+",
  "Not specified",
];

const contactMethods = ["Email", "Phone", "WhatsApp"];

const initialFormData: SalesInquiryFormData = {
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  country: "",
  solutionInterest: "",
  estimatedQuantity: "",
  deliveryTimeline: "",
  budgetRange: "",
  message: "",
  preferredContactMethod: "",
};

const stepLabels = ["Company Info", "Requirements", "Details"];

function validateStep(step: number, data: SalesInquiryFormData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (step === 1) {
    if (!data.companyName.trim()) errors.companyName = "Company name is required";
    if (!data.contactName.trim()) errors.contactName = "Contact name is required";
    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!data.phone.trim()) errors.phone = "Phone is required";
    if (!data.country) errors.country = "Please select a country";
  }

  if (step === 2) {
    if (!data.solutionInterest) errors.solutionInterest = "Please select a solution area";
  }

  if (step === 3) {
    if (!data.preferredContactMethod) errors.preferredContactMethod = "Please select a contact method";
  }

  return errors;
}

export function SalesInquiryForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<SalesInquiryFormData>(initialFormData);
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

  const handleNext = () => {
    const stepErrors = validateStep(step, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    setErrors({});
    setStep((s) => s - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    const stepErrors = validateStep(3, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "sales",
          name: formData.contactName,
          email: formData.email,
          phone: formData.phone,
          company: formData.companyName,
          message: formData.message,
          details: {
            country: formData.country,
            solutionInterest: formData.solutionInterest,
            estimatedQuantity: formData.estimatedQuantity,
            deliveryTimeline: formData.deliveryTimeline,
            budgetRange: formData.budgetRange,
            preferredContactMethod: formData.preferredContactMethod,
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
          Inquiry Submitted Successfully
        </h3>
        <p className="mt-2 text-neutral-600">
          Our sales team will review your requirements and respond within 4 business hours.
        </p>
        <p className="mt-1 text-[length:var(--font-body)] text-neutral-500">
          Reference: RFQ-{Date.now().toString(36).toUpperCase()}
        </p>
        <button
          type="button"
          onClick={() => {
            setFormData(initialFormData);
            setStep(1);
            setSubmitted(false);
          }}
          className="mt-6 text-[length:var(--font-button)] font-medium text-foreground underline hover:no-underline"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="border border-border bg-card p-6 md:p-8">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-2">
          {stepLabels.map((label, i) => {
            const stepNum = i + 1;
            const isActive = step === stepNum;
            const isCompleted = step > stepNum;
            return (
              <div key={label} className="flex items-center">
                {i > 0 && (
                  <div
                    className={`h-px w-8 md:w-16 ${
                      isCompleted ? "bg-foreground" : "bg-neutral-200"
                    }`}
                  />
                )}
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center text-[length:var(--font-body)] font-bold transition-colors ${
                      isActive
                        ? "bg-foreground text-background"
                        : isCompleted
                          ? "bg-foreground text-background"
                          : "bg-neutral-100 text-neutral-400"
                    }`}
                  >
                    {isCompleted ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    ) : (
                      stepNum
                    )}
                  </div>
                  <span
                    className={`mt-1 text-[length:var(--font-body)] font-medium whitespace-nowrap ${
                      isActive ? "text-foreground" : "text-neutral-400"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Step 1: Company Info */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-[length:var(--font-heading)] font-semibold">Company Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Company Name *"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Your company name"
                error={errors.companyName}
              />
              <Input
                label="Contact Name *"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                placeholder="Your full name"
                error={errors.contactName}
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
                label="Phone *"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+971 XX XXX XXXX"
                error={errors.phone}
              />
            </div>
            <div className="w-full">
              <label htmlFor="country" className="block text-[length:var(--font-body)] font-medium mb-1.5">
                Country *
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={`w-full rounded-lg border px-4 py-2.5 text-[length:var(--font-body)] bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all duration-200 ${
                  errors.country ? "border-red-500" : "border-border"
                }`}
              >
                <option value="">Select a country</option>
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className="mt-1 text-[length:var(--font-body)] text-red-500">{errors.country}</p>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Requirements */}
        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-[length:var(--font-heading)] font-semibold">Your Requirements</h3>
            <div className="w-full">
              <label htmlFor="solutionInterest" className="block text-[length:var(--font-body)] font-medium mb-1.5">
                Solution of Interest *
              </label>
              <select
                id="solutionInterest"
                name="solutionInterest"
                value={formData.solutionInterest}
                onChange={handleChange}
                className={`w-full rounded-lg border px-4 py-2.5 text-[length:var(--font-body)] bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all duration-200 ${
                  errors.solutionInterest ? "border-red-500" : "border-border"
                }`}
              >
                <option value="">Select a solution</option>
                {solutionOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors.solutionInterest && (
                <p className="mt-1 text-[length:var(--font-body)] text-red-500">{errors.solutionInterest}</p>
              )}
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="w-full">
                <label htmlFor="estimatedQuantity" className="block text-[length:var(--font-body)] font-medium mb-1.5">
                  Estimated Quantity
                </label>
                <select
                  id="estimatedQuantity"
                  name="estimatedQuantity"
                  value={formData.estimatedQuantity}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-border px-4 py-2.5 text-[length:var(--font-body)] bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all duration-200"
                >
                  <option value="">Select quantity</option>
                  {quantityOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full">
                <label htmlFor="deliveryTimeline" className="block text-[length:var(--font-body)] font-medium mb-1.5">
                  Delivery Timeline
                </label>
                <select
                  id="deliveryTimeline"
                  name="deliveryTimeline"
                  value={formData.deliveryTimeline}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-border px-4 py-2.5 text-[length:var(--font-body)] bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all duration-200"
                >
                  <option value="">Select timeline</option>
                  {timelineOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full">
                <label htmlFor="budgetRange" className="block text-[length:var(--font-body)] font-medium mb-1.5">
                  Budget Range
                </label>
                <select
                  id="budgetRange"
                  name="budgetRange"
                  value={formData.budgetRange}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-border px-4 py-2.5 text-[length:var(--font-body)] bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all duration-200"
                >
                  <option value="">Select budget</option>
                  {budgetOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Details */}
        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-[length:var(--font-heading)] font-semibold">Additional Details</h3>
            <div className="w-full">
              <label htmlFor="message" className="block text-[length:var(--font-body)] font-medium mb-1.5">
                Additional Information
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us more about your project requirements..."
                className="w-full rounded-lg border border-border px-4 py-2.5 text-[length:var(--font-body)] bg-background text-foreground placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all duration-200 resize-y"
              />
            </div>
            <div>
              <p className="text-[length:var(--font-body)] font-medium mb-3">
                Preferred Contact Method *
              </p>
              <div className="flex flex-wrap gap-4">
                {contactMethods.map((method) => (
                  <label
                    key={method}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="preferredContactMethod"
                      value={method}
                      checked={formData.preferredContactMethod === method}
                      onChange={handleChange}
                      className="h-4 w-4 text-foreground focus:ring-brand-500"
                    />
                    <span className="text-[length:var(--font-body)] text-neutral-700">{method}</span>
                  </label>
                ))}
              </div>
              {errors.preferredContactMethod && (
                <p className="mt-1 text-[length:var(--font-body)] text-red-500">
                  {errors.preferredContactMethod}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              disabled={submitting}
              className="text-[length:var(--font-button)] font-medium text-neutral-600 hover:text-foreground disabled:opacity-50 transition-colors"
            >
              ← Back
            </button>
          ) : (
            <div />
          )}
          {step < 3 ? (
            <Button type="button" variant="primary" onClick={handleNext}>
              Next Step →
            </Button>
          ) : (
            <Button type="submit" variant="primary" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Inquiry"}
            </Button>
          )}
        </div>
        {errorMessage && step === 3 && (
          <p className="mt-3 text-[length:var(--font-body)] text-red-500 font-medium">{errorMessage}</p>
        )}
      </form>
    </div>
  );
}
