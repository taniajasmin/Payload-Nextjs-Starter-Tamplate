"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, MapPin, Clock, Briefcase, ArrowRight } from "lucide-react";

interface JobOpening {
  id?: string;
  title: string;
  slug?: string;
  department: string;
  location: string;
  type: string;
  experience?: string;
  status?: string;
  description: string;
  requirements: string[];
}

interface JobFilterProps {
  jobOpenings: JobOpening[];
  departments: string[];
}

export function JobFilter({ jobOpenings, departments }: JobFilterProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filteredJobs =
    activeFilter === "All"
      ? jobOpenings
      : jobOpenings.filter((j) => j.department === activeFilter);

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setActiveFilter("All")}
          className={`px-4 py-2 text-sm font-semibold transition-colors ${
            activeFilter === "All"
              ? "bg-primary text-primary-foreground"
              : "border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          All ({jobOpenings.length})
        </button>
        {departments.map((dept) => {
          const count = jobOpenings.filter((j) => j.department === dept).length;
          const isActive = activeFilter === dept;
          return (
            <button
              key={dept}
              onClick={() => setActiveFilter(dept)}
              className={`px-4 py-2 text-sm font-semibold transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {dept} ({count})
            </button>
          );
        })}
      </div>

      {/* Results Count */}
      <p className="text-sm text-muted-foreground mb-6">
        Showing {filteredJobs.length} of {jobOpenings.length} open positions
        {activeFilter !== "All" && ` in ${activeFilter}`}
      </p>

      {/* Job Listings */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {filteredJobs.map((job, index) => (
            <div key={job.id || job.slug || `job-${index}`} className="flex flex-col border border-border bg-card p-8 md:p-10">
              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1 border border-border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                  <Briefcase className="w-3 h-3" />
                  {job.department}
                </span>
                <span className="inline-flex items-center gap-1 border border-border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  {job.location}
                </span>
                <span className="inline-flex items-center gap-1 border border-border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {job.type}
                </span>
              </div>

              {/* Title + Description */}
              <h3 className="text-xl font-extrabold leading-[1.1] tracking-tight text-foreground">
                {job.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {job.description}
              </p>

              {/* Requirements */}
              <div className="mt-4">
                <h4 className="text-sm font-bold text-foreground mb-2">
                  Requirements:
                </h4>
                <ul className="space-y-0">
                  {job.requirements.map((req) => (
                    <li
                      key={req}
                      className="flex items-start gap-2.5 border-b border-border/60 py-2.5 text-sm text-muted-foreground"
                    >
                      <span className="h-1 w-1 shrink-0 bg-primary mt-2" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/careers/apply"
                  className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Apply Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={`/careers/openings/${job.slug || job.id || "placeholder"}`}
                  className="inline-flex items-center gap-2 border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Empty State */}
      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-sm text-muted-foreground">
            No open positions in this department right now.
          </p>
          <button
            onClick={() => setActiveFilter("All")}
            className="mt-4 text-sm font-semibold text-primary hover:underline transition-colors"
          >
            View all positions
          </button>
        </div>
      )}
    </div>
  );
}
