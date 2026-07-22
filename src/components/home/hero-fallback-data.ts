import { Cpu, ShieldCheck } from "lucide-react";

// Product data adapted from real product catalog — used as fallback
// when CMS heroContent.heroProducts is empty.
// Extracted to a separate file so it is only loaded when needed.

export const SLIDE_PRODUCTS = [
  {
    id: "h-prod-1",
    name: 'KOORUI 27" Gaming Monitor',
    model: "27E1QA",
    category: "Monitors",
    description: "QHD 144Hz 1ms Gaming Monitor with Adaptive Sync — stunning visuals for professionals and gamers.",
    stats: [
      { label: "Resolution", value: "2560x1440" },
      { label: "Refresh", value: "144Hz" },
      { label: "Response", value: "1ms" },
    ],
    status: "IN STOCK",
    themeColor: "from-purple-500 to-indigo-600",
    glowColor: "rgba(139, 92, 246, 0.4)",
    icon: Cpu,
    imageUrl: "/assets/images/products/koorui/p49_koorui-monitor-27-1_c76b66b2b8.jpg",
    slug: "koorui-27-inch-gaming-monitor",
  },
  {
    id: "h-prod-2",
    name: "Crucial T500 PCIe Gen4 SSD",
    model: "CT500T500SSD8",
    category: "Storage",
    description: "Next-Gen NVMe SSD with heatsink — up to 7,400 MB/s sequential read speeds.",
    stats: [
      { label: "Read", value: "7,400 MB/s" },
      { label: "Write", value: "7,000 MB/s" },
      { label: "Capacity", value: "500GB-2TB" },
    ],
    status: "IN STOCK",
    themeColor: "from-cyan-500 to-blue-600",
    glowColor: "rgba(6, 182, 212, 0.4)",
    icon: ShieldCheck,
    imageUrl: "/assets/images/products/crucial/p13_t705_HS___7_-removebg-preview_bfa0ce4928.png",
    slug: "crucial-t500",
  },
  {
    id: "h-prod-3",
    name: "HIKVISION Future SSD",
    model: "HS-SSD-FUTURE",
    category: "Storage",
    description: "Enterprise storage with advanced thermal dissipation for demanding workloads.",
    stats: [
      { label: "Read", value: "5,500 MB/s" },
      { label: "Endurance", value: "600 TBW" },
      { label: "Interface", value: "PCIe 3.0" },
    ],
    status: "IN STOCK",
    themeColor: "from-emerald-500 to-teal-600",
    glowColor: "rgba(16, 185, 129, 0.4)",
    icon: ShieldCheck,
    imageUrl: "/assets/images/products/hikvision/p42_FUTURE主图-3-removebg-preview_a8cf23e0c5.png",
    slug: "hs-ssd-future",
  },
  {
    id: "h-prod-4",
    name: "UGREEN Revodok Pro 209",
    model: "UGREEN-209",
    category: "Accessories",
    description: "9-in-1 USB-C Docking Station featuring HDMI, USB-A 3.0, SD/TF card readers, and 100W PD.",
    stats: [
      { label: "Ports", value: "9-in-1" },
      { label: "Power", value: "100W PD" },
      { label: "Video", value: "4K@60Hz" },
    ],
    status: "IN STOCK",
    themeColor: "from-rose-500 to-pink-600",
    glowColor: "rgba(244, 63, 94, 0.4)",
    icon: ShieldCheck,
    imageUrl: "/assets/images/products/ugreen/p73_xcs-removebg-preview_d5bb7aaa00.png",
    slug: "ugreen-revodok-pro-209-9-in-1-docking-station",
  },
  {
    id: "h-prod-5",
    name: "Nearity C30R Conference Cam",
    model: "C30R",
    category: "AV Solutions",
    description: "All-in-one conference room solution featuring 4K Ultra HD video with intelligent auto-framing.",
    stats: [
      { label: "Video", value: "4K Ultra HD" },
      { label: "FOV", value: "120° Wide" },
      { label: "Audio", value: "6 Mic Array" },
    ],
    status: "IN STOCK",
    themeColor: "from-amber-500 to-orange-600",
    glowColor: "rgba(245, 158, 11, 0.4)",
    icon: ShieldCheck,
    imageUrl: "/assets/images/products/nearity/p52_C30R_1-1_54401d16a5.png",
    slug: "nearity-c30r",
  },
];

export const DEFAULT_FEATURE_PILLS = [
  { label: "GCC Wide Delivery", icon: "Globe" },
  { label: "Certified Hardware", icon: "ShieldCheck" },
  { label: "JAFZA Stocked", icon: "Truck" },
  { label: "CITC Compliant", icon: "BadgeCheck" },
];

export const DEFAULT_STATS = [
  { value: "20+", label: "Premium Vendors", sub: "Global brands", icon: "Award" },
  { value: "24/7", label: "GCC SLA Helpdesk", sub: "Always online", icon: "Headphones" },
  { value: "140+", label: "Active Resellers", sub: "Across Middle East", icon: "Users" },
];
