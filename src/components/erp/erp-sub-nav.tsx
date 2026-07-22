"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/erp/overview", label: "Overview" },
  { href: "/erp/finance-accounting", label: "Finance & Accounting" },
  { href: "/erp/hr-payroll", label: "HR & Payroll" },
  { href: "/erp/sales-crm", label: "Sales & CRM" },
  { href: "/erp/inventory-supply-chain", label: "Inventory & Supply Chain" },
  { href: "/erp/manufacturing", label: "Manufacturing" },
  { href: "/erp/project-management", label: "Project Management" },
];

export function ErpSubNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="ERP sections"
      className="border-b border-border bg-background"
    >
      <div className="container-secondary">
        <div className="flex gap-1 overflow-x-auto py-2 no-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 px-4 py-2 text-[length:var(--font-nav-item)] font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
