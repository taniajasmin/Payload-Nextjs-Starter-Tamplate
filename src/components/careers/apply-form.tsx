"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { CareersSubNav } from "@/components/careers/careers-sub-nav";
import {
  Upload,
  X,
  Loader2,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
  Heart,
  FileText,
  Users,
  MessageSquare,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  expectedSalary: string;
  coverLetter: string;
}

interface FormErrors {
  [key: string]: string;
}

type FormStatus = "idle" | "uploading" | "submitting" | "success" | "error";

const POSITION_OPTIONS = [
  { value: "", label: "Select a position (or choose General Application)" },
  { value: "general", label: "General Application" },
  { value: "senior-account-manager", label: "Senior Account Manager — IT Distribution" },
  { value: "product-specialist", label: "Product Specialist — Storage & Memory" },
  { value: "technical-support", label: "Technical Support Engineer" },
  { value: "warehouse-coordinator", label: "Warehouse & Logistics Coordinator" },
  { value: "digital-marketing", label: "Digital Marketing Specialist" },
  { value: "b2b-sales", label: "B2B Sales Executive" },
];

const EXPERIENCE_OPTIONS = [
  { value: "", label: "Select" },
  { value: "0-1", label: "0–1 years" },
  { value: "1-3", label: "1–3 years" },
  { value: "3-5", label: "3–5 years" },
  { value: "5-10", label: "5–10 years" },
  { value: "10+", label: "10+ years" },
];

/* ── Side-panel content ── */
const APPLICATION_STEPS = [
  {
    icon: <FileText className="w-4 h-4" strokeWidth={1.6} />,
    title: "Submit your application",
    desc: "Send your details and CV through this secure form.",
  },
  {
    icon: <Users className="w-4 h-4" strokeWidth={1.6} />,
    title: "HR review",
    desc: "Our talent team reviews your profile within a few days.",
  },
  {
    icon: <MessageSquare className="w-4 h-4" strokeWidth={1.6} />,
    title: "Conversation",
    desc: "If there's a fit, we'll invite you to chat with the hiring team.",
  },
  {
    icon: <CheckCircle2 className="w-4 h-4" strokeWidth={1.6} />,
    title: "Offer & onboard",
    desc: "Selected candidates receive an offer and a warm welcome.",
  },
];

const TRUST_BADGES = [
  { icon: <ShieldCheck className="w-5 h-5" strokeWidth={1.6} />, label: "Confidential" },
  { icon: <Zap className="w-5 h-5" strokeWidth={1.6} />, label: "Fast review" },
  { icon: <Heart className="w-5 h-5" strokeWidth={1.6} />, label: "People-first" },
];

const INITIAL_DATA: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  position: "",
  experience: "",
  expectedSalary: "",
  coverLetter: "",
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

/* ------------------------------------------------------------------ */
/*  Validation                                                         */
/* ------------------------------------------------------------------ */

function validate(data: FormData, cvFile: File | null): FormErrors {
  const errors: FormErrors = {};

  if (!data.firstName.trim()) errors.firstName = "First name is required";
  if (!data.lastName.trim()) errors.lastName = "Last name is required";

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.phone.trim()) errors.phone = "Phone number is required";
  if (!data.experience) errors.experience = "Years of experience is required";

  if (!cvFile) {
    errors.cv = "CV / Resume is required";
  } else if (cvFile.size > MAX_FILE_SIZE) {
    errors.cv = "File size must be under 5 MB";
  } else if (
    ![
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ].includes(cvFile.type)
  ) {
    errors.cv = "Only PDF and DOC/DOCX files are accepted";
  }

  return errors;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ApplyForm() {
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvFileName, setCvFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [referenceId, setReferenceId] = useState("");

  /* Handlers */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setCvFile(file);
    setCvFileName(file?.name || "");
    if (errors.cv) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.cv;
        return next;
      });
    }
  };

  const clearFile = () => {
    setCvFile(null);
    setCvFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /* Submit */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const validationErrors = validate(formData, cvFile);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      setStatus("uploading");

      const payload = new FormData();
      payload.append("firstName", formData.firstName);
      payload.append("lastName", formData.lastName);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      payload.append("position", formData.position || "general");
      payload.append("experience", formData.experience);
      if (formData.expectedSalary) payload.append("expectedSalary", formData.expectedSalary);
      if (formData.coverLetter) payload.append("coverLetter", formData.coverLetter);
      payload.append("cv", cvFile!);

      setStatus("submitting");
      const res = await fetch("/api/apply", {
        method: "POST",
        body: payload,
      });

      if (!res.ok) {
        let message = "Application submission failed.";
        try {
          const data = await res.json();
          message = data?.error || message;
        } catch {
          /* keep default message */
        }
        throw new Error(message);
      }

      const data = await res.json();
      setReferenceId(data?.reference || `APP-${Date.now().toString(36).toUpperCase()}`);
      setStatus("success");
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
      setStatus("error");
    }
  };

  /* Success State */

  if (status === "success") {
    return (
      <div className="flex flex-col">
        <CareersSubNav />
        <section className="relative overflow-hidden bg-background">
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="max-w-2xl mx-auto">
              <div className="border border-border bg-card p-8 md:p-12 text-center">
                <div className="mx-auto text-primary mb-6">
                  <CheckCircle2 className="w-12 h-12" strokeWidth={1.6} />
                </div>
                <h3 className="text-xl font-extrabold leading-[1.1] tracking-tight text-foreground">
                  Application Submitted Successfully!
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Thank you for applying to Simal Technologies. Our HR team will
                  review your application and get back to you soon.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Reference:{" "}
                  <span className="font-bold text-foreground">
                    {referenceId}
                  </span>
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFormData(INITIAL_DATA);
                    setCvFile(null);
                    setCvFileName("");
                    setStatus("idle");
                    setReferenceId("");
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="mt-6 inline-flex items-center gap-2 border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  Submit Another Application
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  /* Form */

  const isWorking = status === "uploading" || status === "submitting";

  return (
    <div className="flex flex-col">
      <CareersSubNav />
      <section className="relative overflow-hidden bg-background">

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid lg:grid-cols-[2fr_3fr] gap-8 lg:gap-10 items-start">
            {/* ── Brand / info panel — desktop only ── */}
            <motion.aside
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block lg:sticky lg:top-24 self-start"
            >
              <div className="relative overflow-hidden border border-border bg-card">
                <div className="p-8 xl:p-10">
                  {/* Enterprise badge */}
                  <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
                    Join Simal
                  </span>

                  <h2 className="text-xl font-extrabold leading-[1.1] tracking-tight text-foreground">
                    Let&apos;s build the future of{" "}
                    <span className="text-primary">IT distribution</span>{" "}
                    together.
                  </h2>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    We&apos;re always looking for driven, curious people. Tell us
                    about yourself — every application is read by a real person on
                    our team.
                  </p>

                  {/* What happens next */}
                  <div className="mt-10">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-6">
                      What happens next
                    </p>
                    <ol className="relative">
                      {APPLICATION_STEPS.map((step, i) => (
                        <li
                          key={i}
                          className="relative flex gap-4 pb-6 last:pb-0"
                        >
                          <span className="relative z-10 shrink-0 w-9 h-9 border border-border bg-muted flex items-center justify-center text-primary">
                            {step.icon}
                          </span>
                          <div className="pt-1">
                            <p className="text-sm font-bold text-foreground">
                              {step.title}
                            </p>
                            <p className="text-xs text-muted-foreground leading-snug mt-0.5">
                              {step.desc}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* trust badges */}
                  <div className="mt-8 grid grid-cols-3 gap-3 border-t border-border pt-6">
                    {TRUST_BADGES.map((b) => (
                      <div
                        key={b.label}
                        className="flex flex-col items-center text-center gap-2 border border-border bg-muted px-2 py-3"
                      >
                        <span className="text-primary">{b.icon}</span>
                        <span className="text-[11px] font-medium text-foreground">
                          {b.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>

            {/* ── Compact banner — mobile only ── */}
            <div className="lg:hidden border border-border bg-card relative overflow-hidden p-6">
              <div className="relative z-10">
                <span className="mb-3 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
                  Join Simal
                </span>
                <h2 className="text-xl font-extrabold leading-[1.1] tracking-tight text-foreground">
                  Let&apos;s build the future of{" "}
                  <span className="text-primary">IT distribution</span>{" "}
                  together.
                </h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Every application is read by a real person on our team.
                </p>
              </div>
            </div>

            {/* ── Form ── */}
            <div className="flex flex-col border border-border bg-card p-6 sm:p-8 md:p-10">
              <div className="flex items-center justify-between gap-4 mb-5 pb-5 border-b border-border">
                <div className="flex items-center gap-2.5">
                  <span className="text-primary">
                    <FileText className="w-5 h-5" strokeWidth={1.6} />
                  </span>
                  <h2 className="text-xl font-extrabold leading-[1.1] tracking-tight text-foreground">
                    Your Application
                  </h2>
                </div>
                <span className="hidden sm:block text-xs text-muted-foreground">
                  * required
                </span>
              </div>
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Error banner */}
                {status === "error" && errorMessage && (
                  <div className="border border-destructive bg-destructive/5 p-4 text-sm text-destructive">
                    {errorMessage}
                  </div>
                )}

                {/* Personal Information */}
                <h2 className="text-lg font-extrabold leading-[1.1] tracking-tight text-foreground">
                  Personal Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="First Name *"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    error={errors.firstName}
                    disabled={isWorking}
                  />
                  <Input
                    label="Last Name *"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                    error={errors.lastName}
                    disabled={isWorking}
                  />
                  <Input
                    label="Email *"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    error={errors.email}
                    disabled={isWorking}
                  />
                  <Input
                    label="Phone *"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+971 XX XXX XXXX"
                    error={errors.phone}
                    disabled={isWorking}
                  />
                </div>

                {/* Position Details */}
                <h2 className="text-lg font-extrabold leading-[1.1] tracking-tight text-foreground mt-8">
                  Position Details
                </h2>
                <div>
                  <label
                    htmlFor="position"
                    className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5"
                  >
                    Position Applied For
                  </label>
                  <select
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    disabled={isWorking}
                    className="w-full border border-border px-4 py-3 text-sm bg-background text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  >
                    {POSITION_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="experience"
                      className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5"
                    >
                      Years of Experience *
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      disabled={isWorking}
                      className={`w-full border px-4 py-3 text-sm bg-background text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors ${
                        errors.experience ? "border-destructive" : "border-border"
                      }`}
                    >
                      {EXPERIENCE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {errors.experience && (
                      <p className="mt-1 text-xs text-destructive">{errors.experience}</p>
                    )}
                  </div>
                  <Input
                    label="Expected Salary (AED/month)"
                    name="expectedSalary"
                    value={formData.expectedSalary}
                    onChange={handleChange}
                    placeholder="e.g. 8,000"
                    disabled={isWorking}
                  />
                </div>

                {/* CV Upload */}
                <h2 className="text-lg font-extrabold leading-[1.1] tracking-tight text-foreground mt-8">
                  CV Upload
                </h2>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Upload CV / Resume * (PDF or DOC, max 5 MB)
                  </label>
                  {cvFileName ? (
                    <div className="flex items-center gap-3 border border-border bg-muted px-4 py-3">
                      <Upload className="w-4 h-4 text-muted-foreground shrink-0" strokeWidth={1.6} />
                      <span className="flex-1 text-sm text-foreground truncate">
                        {cvFileName}
                      </span>
                      <button
                        type="button"
                        onClick={clearFile}
                        disabled={isWorking}
                        className="text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
                        aria-label="Remove file"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className={`flex items-center justify-center gap-2 border-2 border-dashed px-4 py-8 text-sm text-muted-foreground cursor-pointer hover:border-primary hover:text-primary transition-colors ${
                        errors.cv ? "border-destructive" : "border-border"
                      }`}
                    >
                      <Upload className="w-5 h-5" strokeWidth={1.6} />
                      <span>Click to upload your CV / Resume</span>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="cv"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    disabled={isWorking}
                    className="hidden"
                  />
                  {errors.cv && (
                    <p className="mt-1 text-xs text-destructive">{errors.cv}</p>
                  )}
                </div>

                {/* Cover Letter */}
                <div>
                  <label
                    htmlFor="coverLetter"
                    className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5"
                  >
                    Cover Letter (optional)
                  </label>
                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    rows={5}
                    value={formData.coverLetter}
                    onChange={handleChange}
                    disabled={isWorking}
                    placeholder="Tell us why you'd like to join Simal Technologies and what makes you a great fit."
                    className="w-full border border-border px-4 py-3 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-y"
                  />
                </div>

                {/* Privacy */}
                <div className="text-xs text-muted-foreground">
                  <p>
                    By submitting this application, you agree to our{" "}
                    <span className="text-primary font-semibold">
                      Privacy Policy
                    </span>{" "}
                    and consent to Simal Technologies processing your personal data
                    for recruitment purposes.
                  </p>
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isWorking}
                    className="inline-flex items-center justify-center gap-2 bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "uploading" && (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Uploading CV...
                      </>
                    )}
                    {status === "submitting" && (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    )}
                    {(status === "idle" || status === "error") && "Submit Application"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
