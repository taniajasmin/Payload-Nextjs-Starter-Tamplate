/** @deprecated Use seed/index.ts instead — the canonical seeder. */
/// <reference types="node" />

/**
 * Comprehensive Seed Script — Simal Corporate Website
 *
 * Seeds ALL collections and globals in dependency order.
 * Idempotent: safe to run multiple times (finds by unique field, updates or creates).
 *
 * Uses Payload's Local API — no dev server required.
 *
 * Usage:  npx tsx src/scripts/seed-all.ts
 */

import "dotenv/config";

import { getPayload } from "payload";

import config from "../../payload.config";

type PayloadInstance = Awaited<ReturnType<typeof getPayload>>;

// Payload singleton — set in seedAll() before any helper runs.
let payload: PayloadInstance | null = null;

async function findDoc(
  collection: string,
  field: string,
  value: string,
): Promise<{ id: string | number } | null> {
  if (!payload) throw new Error("Payload not initialized");
  const where: Record<string, unknown> = {};
  where[field] = { equals: value };
  const res = await payload.find({
    collection: collection as never,
    where,
    limit: 1,
    overrideAccess: true,
  });
  return (res.docs[0] as { id: string | number } | undefined) || null;
}

async function findOrCreate(
  collection: string,
  field: string,
  value: string,
  data: Record<string, unknown>,
): Promise<string | number> {
  if (!payload) throw new Error("Payload not initialized");
  const existing = await findDoc(collection, field, value);
  if (existing) {
    await payload.update({
      collection: collection as never,
      id: existing.id as number,
      data,
      overrideAccess: true,
    });
    return existing.id;
  }
  const created = await payload.create({
    collection: collection as never,
    data,
    overrideAccess: true,
  });
  return created.id;
}

function log(phase: string, msg: string) {
  console.log(`  [${phase}] ${msg}`);
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

// ─── Seed Data ──────────────────────────────────────────────────────

const CATEGORIES = [
  {
    title: "Computer Components",
    slug: "computer-components",
    description:
      "SSDs, RAM, graphics cards, motherboards, and processors from leading brands.",
  },
  {
    title: "Computer Accessories",
    slug: "computer-accessories",
    description:
      "Cables, hubs, docking stations, chargers, and surge protectors.",
  },
  {
    title: "Monitors",
    slug: "monitors",
    description:
      "Professional and gaming monitors for every workspace and budget.",
  },
  {
    title: "Gaming",
    slug: "gaming",
    description:
      "High-performance gaming GPUs, monitors, and fast storage solutions.",
  },
  {
    title: "Laptops",
    slug: "laptops",
    description:
      "Enterprise and professional laptops from Dell, HP, and Lenovo.",
  },
];

const PRODUCTS = [
  // ── Aiwa Monitors ──
  {
    sku: "AIWA-MF2208V",
    name: 'Aiwa 22" Flat Slim Monitor, 75Hz, FHD, HDMI/VGA',
    category: "monitors",
    brand: "aiwa",
    stockStatus: "in-stock",
    specs: {
      size: '22"',
      resolution: "1920x1080",
      refreshRate: "75Hz",
      panelType: "VA",
      responseTime: "5ms",
      ports: "HDMI, VGA",
    },
  },
  {
    sku: "AIWA-MF2203V",
    name: 'Aiwa MF2203-V 21.5" FHD Black Slim LED Display',
    category: "monitors",
    brand: "aiwa",
    stockStatus: "in-stock",
    specs: {
      size: '21.5"',
      resolution: "1920x1080",
      refreshRate: "75Hz",
      panelType: "IPS",
      responseTime: "5ms",
      ports: "HDMI, VGA",
    },
  },
  {
    sku: "AIWA-MF240EV",
    name: "Aiwa MF240E-V Flat Slim Monitor",
    category: "monitors",
    brand: "aiwa",
    stockStatus: "in-stock",
    specs: {
      size: '24"',
      resolution: "1920x1080",
      refreshRate: "75Hz",
      panelType: "VA",
      responseTime: "5ms",
      ports: "HDMI, VGA",
    },
  },
  // ── ARKTEK Graphics Cards ──
  {
    sku: "ARK-GT610-2GB",
    name: "ARKTEK GeForce GT610 2GB DDR3 64-bit",
    category: "gaming",
    brand: "arktek",
    stockStatus: "in-stock",
    specs: {
      gpu: "GT610",
      vram: "2GB DDR3",
      bus: "64-bit",
      ports: "HDMI, DVI, VGA",
    },
  },
  {
    sku: "ARK-GT730-4GB",
    name: "ARKTEK GT730 4GB DDR3 128BIT Low Profile",
    category: "computer-components",
    brand: "arktek",
    stockStatus: "in-stock",
    specs: {
      gpu: "GT730",
      vram: "4GB DDR3",
      bus: "128-bit",
      profile: "Low Profile",
    },
  },
  {
    sku: "ARK-RTX3060-12GB",
    name: "ARKTEK RTX3060 LED 12GB GDDR6",
    category: "gaming",
    brand: "arktek",
    stockStatus: "in-stock",
    specs: {
      gpu: "RTX 3060",
      vram: "12GB GDDR6",
      bus: "192-bit",
      fans: "Dual",
    },
  },
  {
    sku: "ARK-GTX1030-2GB",
    name: "GTX1030 2GB GDDR5 64-bit",
    category: "gaming",
    brand: "arktek",
    stockStatus: "in-stock",
    specs: {
      gpu: "GTX 1030",
      vram: "2GB GDDR5",
      bus: "64-bit",
      ports: "HDMI, DVI, VGA",
    },
  },
  {
    sku: "ARK-RTX2060-6GB",
    name: "RTX2060 6GB GDDR6 192-bit Dual Fan",
    category: "gaming",
    brand: "arktek",
    stockStatus: "in-stock",
    specs: { gpu: "RTX 2060", vram: "6GB GDDR6", bus: "192-bit", fans: "Dual" },
  },
  // ── Crucial Memory ──
  {
    sku: "CP16G4DFRA32A",
    name: "Crucial DDR4 Pro Memory",
    category: "computer-components",
    brand: "crucial",
    stockStatus: "in-stock",
    specs: {
      type: "DDR4",
      capacities: "16GB, 32GB",
      features: "Intel XMP 2.0, Low-profile heatsink",
    },
  },
  {
    sku: "CT16G64C52CS5",
    name: "Crucial DDR5 Memory Desktop and Laptop",
    category: "computer-components",
    brand: "crucial",
    stockStatus: "in-stock",
    specs: {
      type: "DDR5",
      capacities: "16GB, 24GB, 32GB",
      formFactors: "Desktop, Laptop (SO-DIMM)",
    },
  },
  {
    sku: "CP2K16G64C38U5B",
    name: "Crucial DDR5 Pro Memory",
    category: "computer-components",
    brand: "crucial",
    stockStatus: "in-stock",
    specs: {
      type: "DDR5 Pro",
      capacities: "16GB, 24GB, 32GB, 48GB",
      features: "Intel XMP 3.0, AMD EXPO",
    },
  },
  {
    sku: "CP2K16G60C36U5B",
    name: "Crucial Overlocking DDR5 Pro Memory",
    category: "computer-components",
    brand: "crucial",
    stockStatus: "in-stock",
    specs: {
      type: "DDR5 Pro OC",
      capacities: "16GB, 24GB",
      features: "Low latency, Overclocking",
    },
  },
  // ── Crucial SSDs ──
  {
    sku: "CT1000P3SSD8",
    name: "Crucial P3",
    category: "computer-components",
    brand: "crucial",
    stockStatus: "in-stock",
    specs: {
      capacities: "1TB, 2TB, 4TB",
      interface: "PCIe Gen3 NVMe",
      formFactor: "M.2 2280",
    },
  },
  {
    sku: "CT4000P3PSSD8",
    name: "Crucial P3 Plus",
    category: "computer-components",
    brand: "crucial",
    stockStatus: "in-stock",
    specs: {
      capacities: "1TB, 2TB, 4TB",
      interface: "PCIe Gen4 NVMe",
      formFactor: "M.2 2280",
    },
  },
  {
    sku: "CT1000P310SSD2",
    name: "Crucial P310 2230",
    category: "computer-components",
    brand: "crucial",
    stockStatus: "in-stock",
    specs: {
      capacities: "1TB, 2TB",
      interface: "PCIe Gen4 NVMe",
      formFactor: "M.2 2230",
      readSpeed: "7,100 MB/s",
    },
  },
  {
    sku: "CT1000P310SSD8",
    name: "Crucial P310 2280",
    category: "computer-components",
    brand: "crucial",
    stockStatus: "in-stock",
    specs: {
      capacities: "1TB, 2TB, 4TB",
      interface: "PCIe Gen4 NVMe",
      formFactor: "M.2 2280",
      readSpeed: "7,100 MB/s",
    },
  },
  {
    sku: "CT1000P510SSD8",
    name: "Crucial P510 1TB PCIe Gen5 NVMe M.2 SSD",
    category: "computer-components",
    brand: "crucial",
    stockStatus: "in-stock",
    specs: {
      capacities: "1TB, 2TB",
      interface: "PCIe Gen5 NVMe",
      formFactor: "M.2 2280",
    },
  },
  {
    sku: "CT1000T500SSD8",
    name: "Crucial T500",
    category: "computer-components",
    brand: "crucial",
    stockStatus: "in-stock",
    specs: {
      capacities: "1TB, 2TB",
      interface: "PCIe Gen4 NVMe",
      formFactor: "M.2 2280",
    },
  },
  {
    sku: "CT1000T500SSD5",
    name: "Crucial T500 Heatsink",
    category: "computer-components",
    brand: "crucial",
    stockStatus: "in-stock",
    specs: {
      capacities: "1TB, 2TB",
      interface: "PCIe Gen4 NVMe",
      formFactor: "M.2 2280",
      feature: "Integrated Heatsink",
    },
  },
  {
    sku: "CT1000T700SSD3",
    name: "Crucial T700 SSD",
    category: "computer-components",
    brand: "crucial",
    stockStatus: "in-stock",
    specs: {
      capacities: "1TB, 2TB, 4TB",
      interface: "PCIe Gen5 NVMe",
      readSpeed: "12,400 MB/s",
      writeSpeed: "11,800 MB/s",
    },
  },
  {
    sku: "CT1000T700SSD5",
    name: "Crucial T700 SSD Heatsink",
    category: "computer-components",
    brand: "crucial",
    stockStatus: "in-stock",
    specs: {
      capacities: "1TB, 2TB, 4TB",
      interface: "PCIe Gen5 NVMe",
      readSpeed: "12,400 MB/s",
      feature: "Integrated Heatsink",
    },
  },
  {
    sku: "CT1000T705SSD3",
    name: "Crucial T705 SSD",
    category: "computer-components",
    brand: "crucial",
    stockStatus: "in-stock",
    specs: {
      capacities: "1TB, 2TB, 4TB",
      interface: "PCIe Gen5 NVMe",
      feature: "Works with motherboard heatsink",
    },
  },
  {
    sku: "CT1000T705SSD5",
    name: "Crucial T705 SSD Heatsink",
    category: "computer-components",
    brand: "crucial",
    stockStatus: "in-stock",
    specs: {
      capacities: "1TB, 2TB, 4TB",
      interface: "PCIe Gen5 NVMe",
      feature: "Integrated Heatsink",
    },
  },
  // ── Crucial Portable SSDs ──
  {
    sku: "CT1000X10PROSSD9",
    name: "Crucial X10 Pro Portable SSD",
    category: "computer-components",
    brand: "crucial",
    stockStatus: "in-stock",
    specs: { capacities: "1TB, 2TB, 4TB", type: "Portable SSD" },
  },
  {
    sku: "CT1000X9SSD9",
    name: "Crucial X9 Portable SSD",
    category: "computer-components",
    brand: "crucial",
    stockStatus: "in-stock",
    specs: { capacities: "Various", type: "Portable SSD" },
  },
  {
    sku: "CT1000X9PROSSD9",
    name: "Crucial X9 Pro Portable SSD",
    category: "computer-components",
    brand: "crucial",
    stockStatus: "in-stock",
    specs: { capacities: "1TB, 2TB, 4TB", type: "Portable SSD" },
  },
  // ── Dell Laptops ──
  {
    sku: "DELL-15-I3",
    name: "Dell 15 Laptop — 14th Gen Intel Core 3",
    category: "laptops",
    brand: "dell",
    stockStatus: "in-stock",
    specs: {
      cpu: "14th Gen Intel Core 3",
      ram: "8GB",
      storage: "512GB SSD",
      display: '15.6" FHD 120Hz',
    },
  },
  // ── HIKVISION SSDs ──
  {
    sku: "HIK-ELITE7S",
    name: "Elite 7S Portable SSD",
    category: "computer-components",
    brand: "hikvision",
    stockStatus: "in-stock",
    specs: { capacities: "512GB, 1TB, 2TB, 4TB", type: "Portable SSD" },
  },
  {
    sku: "HIK-T100I",
    name: "HS-ESSD-T100i Portable SSD",
    category: "computer-components",
    brand: "hikvision",
    stockStatus: "in-stock",
    specs: {
      capacities: "256GB, 512GB, 1TB, 2TB",
      interface: "USB 3.1",
      type: "Portable SSD",
    },
  },
  {
    sku: "HIK-FUTURE",
    name: "HS-SSD-FUTURE",
    category: "computer-components",
    brand: "hikvision",
    stockStatus: "in-stock",
    specs: {
      capacities: "512GB, 1TB, 2TB, 4TB",
      interface: "PCIe 4.0 NVMe",
      formFactor: "M.2",
    },
  },
  {
    sku: "HIK-E100",
    name: "HS-SSD-E100",
    category: "computer-components",
    brand: "hikvision",
    stockStatus: "in-stock",
    specs: {
      capacities: "128GB, 256GB, 512GB, 1TB, 2TB",
      formFactor: '2.5" SATA',
    },
  },
  {
    sku: "HIK-E1000",
    name: "HS-SSD-E1000",
    category: "computer-components",
    brand: "hikvision",
    stockStatus: "in-stock",
    specs: { capacities: "128GB, 256GB, 512GB, 1TB", formFactor: "M.2 NVMe" },
  },
  {
    sku: "HIK-E100N",
    name: "HS-SSD-E100N",
    category: "computer-components",
    brand: "hikvision",
    stockStatus: "in-stock",
    specs: { capacities: "128GB, 256GB, 512GB, 1TB", formFactor: "M.2 SATA" },
  },
  {
    sku: "HIK-WINDPRO",
    name: "Wind Pro Portable SSD",
    category: "computer-components",
    brand: "hikvision",
    stockStatus: "in-stock",
    specs: {
      type: "Portable SSD",
      features: "IPX7, Shock-resistant, Pocket-sized",
    },
  },
  // ── Honeywell Surge Protectors ──
  {
    sku: "HON-HC000017",
    name: "Honeywell Platinum 6 Out Surge Protector",
    category: "computer-accessories",
    brand: "honeywell",
    stockStatus: "in-stock",
    specs: {
      outlets: "6",
      cordLength: "1.5m",
      technology: "X3 MOV",
      color: "White",
    },
  },
  {
    sku: "HON-3OUT-CUBE",
    name: "Honeywell 3 Out Surge Cube",
    category: "computer-accessories",
    brand: "honeywell",
    stockStatus: "in-stock",
    specs: {
      outlets: "1",
      protection: "255 Joules",
      ports: "PD20W, USB-A",
      warranty: "3 Years",
    },
  },
  {
    sku: "HON-3OUT-MS",
    name: "Honeywell 3 Out Surge Protector with Master Switch",
    category: "computer-accessories",
    brand: "honeywell",
    stockStatus: "in-stock",
    specs: {
      outlets: "3",
      ports: "PD20W, 2xUSB",
      protection: "471 Joules",
      cordLength: "1.8m",
    },
  },
  {
    sku: "HON-4OUT-MS",
    name: "Honeywell 4 Out Surge Protector with Master Switch",
    category: "computer-accessories",
    brand: "honeywell",
    stockStatus: "in-stock",
    specs: {
      outlets: "4",
      ports: "PD20W, 2xUSB",
      protection: "471 Joules",
      cordLength: "1.8m",
    },
  },
  {
    sku: "HON-6OUT-MS",
    name: "Honeywell 6 Out Surge Protector with Master Switch",
    category: "computer-accessories",
    brand: "honeywell",
    stockStatus: "in-stock",
    specs: {
      outlets: "6",
      ports: "2xPD20W, 2xUSB",
      protection: "1050 Joules",
      cordLength: "1.8m",
    },
  },
  {
    sku: "HON-HC000054",
    name: "Honeywell 8 Out Surge Protector with Master Switch",
    category: "computer-accessories",
    brand: "honeywell",
    stockStatus: "in-stock",
    specs: {
      outlets: "8",
      ports: "2xPD20W, 2xUSB",
      protection: "1050 Joules",
      cordLength: "1.8m",
    },
  },
  {
    sku: "HON-HC000016",
    name: "Honeywell Platinum Series 4 Extension Cord",
    category: "computer-accessories",
    brand: "honeywell",
    stockStatus: "in-stock",
    specs: { outlets: "4", cordLength: "1.5m", color: "White" },
  },
  {
    sku: "HON-HC000018",
    name: "Honeywell Platinum 5 Extension Cord with 2 USB",
    category: "computer-accessories",
    brand: "honeywell",
    stockStatus: "in-stock",
    specs: {
      outlets: "5",
      ports: "2xUSB",
      cordLength: "1.5m",
      technology: "X3 MOV",
      color: "White",
    },
  },
  {
    sku: "HON-4-UNIV",
    name: "Honeywell Surge Protector 4 Universal Sockets",
    category: "computer-accessories",
    brand: "honeywell",
    stockStatus: "in-stock",
    specs: {
      sockets: "4 Universal",
      ports: "2xUSB, 1xTypeC",
      protection: "12000 Amp",
      cordLength: "1.5m",
    },
  },
  {
    sku: "HON-4UNIV-ALT",
    name: "Honeywell Surge Protector 4 Universal Sockets (Alt)",
    category: "computer-accessories",
    brand: "honeywell",
    stockStatus: "in-stock",
    specs: { sockets: "4 Universal" },
  },
  {
    sku: "HON-HC000015",
    name: "Honeywell Surge Protector 8 Universal Sockets",
    category: "computer-accessories",
    brand: "honeywell",
    stockStatus: "in-stock",
    specs: {
      sockets: "8 Universal",
      protection: "20000 Amp",
      cordLength: "2m",
    },
  },
  {
    sku: "HON-TRAVEL-ADAPT",
    name: "Honeywell Universal World Travel Adapter",
    category: "computer-accessories",
    brand: "honeywell",
    stockStatus: "in-stock",
    specs: {
      ports: "2xUSB, 1xTypeC PD30W",
      plugs: "EU, US, UK, CN",
      warranty: "3 Years",
    },
  },
  // ── HP Laptops ──
  {
    sku: "HP-OMNI-5",
    name: 'HP OmniBook 5, 14" 2K OLED Display',
    category: "laptops",
    brand: "hp",
    stockStatus: "in-stock",
    specs: {
      cpu: "Snapdragon X",
      ram: "16GB",
      display: '14" 2K OLED',
      weight: "1.35kg",
    },
  },
  // ── Kingston ──
  {
    sku: "KNG-XS1000-1TB",
    name: "Kingston XS1000 1TB Portable SSD",
    category: "computer-components",
    brand: "kingston",
    stockStatus: "in-stock",
    specs: { capacity: "1TB", readSpeed: "1050 MB/s", type: "Portable SSD" },
  },
  // ── KOORUI Monitors ──
  {
    sku: "KOOR-27-FHD",
    name: 'KOORUI 27" 1920x1080 Gaming Monitor',
    category: "monitors",
    brand: "koorui",
    stockStatus: "in-stock",
    specs: {
      size: '27"',
      resolution: "1920x1080",
      refreshRate: "240Hz",
      responseTime: "1ms",
      panelType: "VA",
      colorGamut: "DCI-P3 90%",
    },
  },
  {
    sku: "KOOR-34-UWQHD",
    name: 'KOORUI 34" Curved Ultrawide Gaming Monitor',
    category: "monitors",
    brand: "koorui",
    stockStatus: "in-stock",
    specs: {
      size: '34"',
      resolution: "3440x1440",
      refreshRate: "165Hz",
      curvature: "1000R",
      responseTime: "1ms MPRT",
      hdr: "HDR400",
    },
  },
  {
    sku: "KOOR-27-CURVED",
    name: 'KOORUI Curved 27" Gaming Monitor',
    category: "monitors",
    brand: "koorui",
    stockStatus: "in-stock",
    specs: {
      size: '27"',
      resolution: "1920x1080",
      refreshRate: "180Hz",
      curvature: "R1500",
      responseTime: "1ms",
      panelType: "VA",
    },
  },
  // ── Lenovo Laptops ──
  {
    sku: "LEN-IDEAPAD3-I5",
    name: "Lenovo IdeaPad Slim 3 — 13th Gen Intel Core i5",
    category: "laptops",
    brand: "lenovo",
    stockStatus: "in-stock",
    specs: {
      cpu: "Intel Core i5-13420H",
      ram: "24GB",
      storage: "1TB SSD",
      display: '15.3"',
    },
  },
  // ── MSI Motherboard ──
  {
    sku: "MSI-B450M-APRO2",
    name: "MSI B450M-A PRO MAX II Motherboard",
    category: "gaming",
    brand: "msi",
    stockStatus: "in-stock",
    specs: {
      chipset: "B450",
      socket: "AM4",
      formFactor: "Micro-ATX",
      memory: "DDR4",
      ports: "USB 3.2 Gen 1, HDMI",
    },
  },
  // ── Nearity ──
  {
    sku: "NEAR-C30R",
    name: "Nearity C30R All-In-One Meeting Powerhouse",
    category: "computer-accessories",
    brand: "nearity",
    stockStatus: "in-stock",
    specs: {
      video: "4K Ultra HD",
      fov: "120° Ultra-Wide",
      features:
        "AI Auto-Framing, Speaker Tracking, Noise Reduction, Beamforming Mic",
      connectivity: "USB Plug-and-Play",
    },
  },
  // ── Samsung ──
  {
    sku: "SAM-T7SHIELD-1TB",
    name: "Samsung T7 Shield Portable SSD 1TB",
    category: "computer-components",
    brand: "samsung",
    stockStatus: "in-stock",
    specs: {
      capacity: "1TB",
      readSpeed: "1,050 MB/s",
      interface: "USB 3.2 Gen 2",
      rating: "IP65 Water & Dust Resistance",
    },
  },
  // ── SanDisk ──
  {
    sku: "SAND-SDSQ-256G",
    name: "SanDisk Extreme Pro 256GB microSDXC",
    category: "computer-components",
    brand: "sandisk",
    stockStatus: "in-stock",
    specs: {
      capacity: "256GB",
      type: "microSDXC",
      readSpeed: "190 MB/s",
      writeSpeed: "140 MB/s",
      features: "4K UHD Video, QuickFlow",
    },
  },
  // ── TEAMGROUP ──
  {
    sku: "TED34G1600C1101",
    name: "TEAMGROUP 4GB DDR3 1600MHz",
    category: "computer-components",
    brand: "teamgroup",
    stockStatus: "in-stock",
    specs: {
      capacity: "4GB",
      type: "DDR3",
      speed: "1600MHz",
      formFactor: "DIMM",
      voltage: "1.5V",
    },
  },
  // ── Toshiba ──
  {
    sku: "TOSH-CANVIO-2TB",
    name: "TOSHIBA Canvio Ready 2TB Portable External HDD",
    category: "computer-components",
    brand: "toshiba",
    stockStatus: "in-stock",
    specs: { capacity: "2TB", interface: "USB 3.0", type: "Portable HDD" },
  },
  {
    sku: "TOSH-CANVIO-2TB-B",
    name: "Toshiba Canvio Ready 2TB USB 3.0 Black",
    category: "computer-components",
    brand: "toshiba",
    stockStatus: "in-stock",
    specs: {
      capacity: "2TB",
      interface: "USB 3.0",
      type: "Portable HDD",
      warranty: "3 Years",
    },
  },
  // ── UGREEN Hubs & Docking Stations ──
  {
    sku: "UGR-15596",
    name: "UGREEN 5-in-1 USB-C Hub",
    category: "computer-accessories",
    brand: "ugreen",
    stockStatus: "in-stock",
    specs: {
      ports: "HDMI 4K@30Hz, 3x USB-A 5Gbps",
      powerDelivery: "100W",
      design: "Ultra Slim",
    },
  },
  {
    sku: "UGR-90912",
    name: "UGREEN Revodok Pro 209 9-in-1 Docking Station",
    category: "computer-accessories",
    brand: "ugreen",
    stockStatus: "in-stock",
    specs: {
      ports: "Dual HDMI 4K@60Hz, 10Gbps USB-C, USB-A, Ethernet",
      powerDelivery: "100W",
    },
  },
  {
    sku: "UGR-15534",
    name: "UGREEN Revodok Pro 210 10-in-1 USB C Hub",
    category: "computer-accessories",
    brand: "ugreen",
    stockStatus: "in-stock",
    specs: {
      ports: "2x HDMI, 5Gbps USB-C, USB-A 3.0, 2xUSB A 2.0, RJ45, SD/TF",
      powerDelivery: "100W",
    },
  },
  {
    sku: "UGR-90325",
    name: "UGREEN Revodok Pro 312 12-in-1 Docking Station",
    category: "computer-accessories",
    brand: "ugreen",
    stockStatus: "in-stock",
    specs: {
      ports: "2x HDMI, DP, 10Gbps USB-C/A 3.2, Ethernet, Audio, SD/TF",
      powerDelivery: "100W",
      display: "Triple Display, 8K",
    },
  },
  {
    sku: "UGR-15978",
    name: "UGREEN Revodok Pro 313 13-in-1 Docking Station",
    category: "computer-accessories",
    brand: "ugreen",
    stockStatus: "in-stock",
    specs: {
      ports: "2x HDMI 4K@60Hz, 10Gbps USB-C 3.2, RJ45",
      powerDelivery: "100W",
      ethernet: "1 Gbps",
    },
  },
  {
    sku: "UGR-15601",
    name: "UGREEN USB C Hub 10-in-1 with HDMI & VGA",
    category: "computer-accessories",
    brand: "ugreen",
    stockStatus: "in-stock",
    specs: {
      ports: "HDMI 4K@30Hz, VGA, USB-C, 3x USB-A, RJ45, SD/TF, Audio",
      powerDelivery: "100W",
    },
  },
  // ── UGREEN Cables ──
  {
    sku: "UGR-20162",
    name: "UGreen Cat 6 U/UTP LAN Cable",
    category: "computer-accessories",
    brand: "ugreen",
    stockStatus: "in-stock",
    specs: { type: "Cat 6", lengths: "1M–50M", color: "Black" },
  },
  {
    sku: "UGR-80424",
    name: "UGREEN CAT 7 Shielded Braided Cable",
    category: "computer-accessories",
    brand: "ugreen",
    stockStatus: "in-stock",
    specs: { type: "Cat 7", feature: "Shielded, Braided", lengths: "3M, 5M" },
  },
  {
    sku: "UGR-11265",
    name: "UGREEN Cat 7 U/FTP LAN Cable Flat",
    category: "computer-accessories",
    brand: "ugreen",
    stockStatus: "in-stock",
    specs: {
      type: "Cat 7",
      speed: "10Gbps",
      design: "Flat",
      lengths: "10M, 15M",
    },
  },
  {
    sku: "UGR-30795",
    name: "UGREEN Cat8 Pure Copper Ethernet Braided",
    category: "computer-accessories",
    brand: "ugreen",
    stockStatus: "in-stock",
    specs: {
      type: "Cat 8",
      speed: "40Gbps, 2000MHz",
      feature: "Braided Double Shielded",
      lengths: "10M, 15M",
    },
  },
  {
    sku: "UGR-80393",
    name: "UGREEN DP 1.4 Braided Cable",
    category: "computer-accessories",
    brand: "ugreen",
    stockStatus: "in-stock",
    specs: {
      type: "DisplayPort 1.4",
      resolution: "8K@60Hz / 4K@165Hz",
      feature: "Nylon Braided",
      lengths: "1M, 2M, 3M",
    },
  },
  {
    sku: "UGR-10211",
    name: "Ugreen DP Male to Male Cable",
    category: "computer-accessories",
    brand: "ugreen",
    stockStatus: "in-stock",
    specs: { type: "DisplayPort", lengths: "1M–5M" },
  },
  {
    sku: "UGR-80401",
    name: "UGREEN HDMI 2.1 8K Braided Cable",
    category: "computer-accessories",
    brand: "ugreen",
    stockStatus: "in-stock",
    specs: {
      type: "HDMI 2.1",
      resolution: "8K@60Hz / 4K@240Hz",
      bandwidth: "48Gbps",
      feature: "Braided",
      lengths: "1M–5M",
    },
  },
  {
    sku: "UGR-10108",
    name: "UGREEN HDMI Cable 4K with Ethernet",
    category: "computer-accessories",
    brand: "ugreen",
    stockStatus: "in-stock",
    specs: {
      type: "HDMI",
      resolution: "4K",
      feature: "Gold-Plated, Ethernet",
      lengths: "1M–50M",
    },
  },
  {
    sku: "UGR-40410",
    name: "UGREEN HDMI 2.0 4K@60Hz Nylon Braid",
    category: "computer-accessories",
    brand: "ugreen",
    stockStatus: "in-stock",
    specs: {
      type: "HDMI 2.0",
      resolution: "4K@60Hz",
      bandwidth: "18Gbps",
      feature: "Nylon Braided",
      lengths: "1.5M–15M",
    },
  },
  {
    sku: "UGR-11632",
    name: "Ugreen VGA Male to Male Cable",
    category: "computer-accessories",
    brand: "ugreen",
    stockStatus: "in-stock",
    specs: { type: "VGA", lengths: "2M–15M" },
  },
  // ── WD ──
  {
    sku: "WD-SN7100",
    name: "WD SN7100 NVMe SSD",
    category: "computer-components",
    brand: "wd",
    stockStatus: "in-stock",
    specs: {
      type: "NVMe SSD",
      feature: "High-speed, Reliable everyday computing",
    },
  },
];

const STATS = [
  {
    label: "Years of Excellence",
    value: "20",
    suffix: "+",
    order: 1,
    active: true,
  },
  { label: "Global Brands", value: "20", suffix: "+", order: 2, active: true },
  {
    label: "Products Distributed",
    value: "76",
    suffix: "+",
    order: 3,
    active: true,
  },
  {
    label: "Countries Served",
    value: "15",
    suffix: "+",
    order: 4,
    active: true,
  },
  {
    label: "Enterprise Clients",
    value: "5,000",
    suffix: "+",
    order: 5,
    active: true,
  },
];

const TESTIMONIALS = [
  {
    authorName: "Ahmed Al-Rashid",
    authorTitle: "IT Director",
    authorCompany: "GulfTech Solutions",
    quote:
      "Simal Technologies has been our trusted IT distribution partner for over 5 years. Their authentic products, competitive pricing, and exceptional after-sales support make them stand out in the region.",
    rating: 5,
    active: true,
  },
  {
    authorName: "Sarah Williams",
    authorTitle: "Procurement Manager",
    authorCompany: "Digital Dynamics FZE",
    quote:
      "Simal Technologies has streamlined our procurement process significantly. Real-time stock visibility and competitive pricing help us make informed purchasing decisions.",
    rating: 5,
    active: true,
  },
  {
    authorName: "Elena Petrov",
    authorTitle: "Operations Director",
    authorCompany: "CIS Technology Partners",
    quote:
      "Simal's distribution network across CIS countries is unmatched. Fast delivery, genuine products, and a dedicated account manager who understands our needs.",
    rating: 4,
    active: true,
  },
];

const AWARDS = [
  {
    title: "Best IT Distributor — MEA 2024",
    year: "2024",
    issuer: "MEA Business Awards",
    description:
      "Recognized as the leading IT distribution company in the Middle East and Africa region.",
    order: 1,
    active: true,
  },
  {
    title: "Dell Partner of the Year — Middle East 2023",
    year: "2023",
    issuer: "Dell Technologies",
    description:
      "Awarded for exceptional sales performance and customer satisfaction as a Dell authorized distributor.",
    order: 2,
    active: true,
  },
  {
    title: "HP Excellence in Distribution Award 2023",
    year: "2023",
    issuer: "HP Inc.",
    description:
      "Recognized for outstanding growth and commitment to HP product distribution in the GCC region.",
    order: 3,
    active: true,
  },
  {
    title: "Dubai SME 100 — Top Performing SME 2022",
    year: "2022",
    issuer: "Dubai Department of Economic Development",
    description:
      "Ranked among the top 100 performing small and medium enterprises in Dubai.",
    order: 4,
    active: true,
  },
];

const NEWS_ITEMS = [
  {
    title: "Simal Technologies Expands Distribution Network to East Africa",
    slug: "expands-east-africa",
    excerpt:
      "Simal Technologies announces strategic expansion of its IT distribution network into Kenya, Tanzania, and Uganda.",
    content: {
      root: {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Simal Technologies Middle East LLC is proud to announce the expansion of its distribution network into East Africa. This strategic move will bring our portfolio of 76+ products across 20+ world-class brands to customers in Kenya, Tanzania, and Uganda for the first time.",
                version: 1,
              },
            ],
            version: 1,
          },
        ],
        version: 1,
      },
    },
    publishedAt: "2024-11-15T10:00:00.000Z",
    active: true,
  },
  {
    title: "New Partnership with KOORUI Monitors for the Middle East",
    slug: "koorui-partnership",
    excerpt:
      "Simal Technologies signs exclusive distribution agreement with KOORUI for professional and gaming monitors.",
    content: {
      root: {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "We are excited to announce our new partnership with KOORUI, a leading monitor manufacturer. Under this exclusive distribution agreement, Simal Technologies will bring KOORUI's full range of professional and gaming monitors to customers across the Middle East and Africa.",
                version: 1,
              },
            ],
            version: 1,
          },
        ],
        version: 1,
      },
    },
    publishedAt: "2024-10-20T09:00:00.000Z",
    active: true,
  },
];

/* Helper — builds a Lexical root node from a mix of h2 headings and paragraphs */
function richDoc(blocks: Array<{ h2?: string; p?: string }>) {
  const textNode = (text: string) => ({
    type: "text",
    detail: 0,
    format: 0,
    mode: "normal",
    style: "",
    text,
    version: 1,
  });
  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr",
      textFormat: 0,
      textStyle: "",
      children: blocks.map((b) =>
        b.h2
          ? {
              type: "heading",
              tag: "h2",
              format: "",
              indent: 0,
              version: 1,
              direction: "ltr",
              children: [textNode(b.h2)],
            }
          : {
              type: "paragraph",
              format: "",
              indent: 0,
              version: 1,
              direction: "ltr",
              textFormat: 0,
              textStyle: "",
              children: [textNode(b.p ?? "")],
            },
      ),
    },
  };
}

const BLOG_POSTS = [
  {
    title: "The Rise of NVMe SSDs in Enterprise Storage",
    slug: "rise-of-nvme-ssds-enterprise-storage",
    excerpt:
      "NVMe technology is transforming enterprise storage. Learn how the latest generation of SSDs from Crucial, Samsung, and Kingston can help your customers boost performance.",
    content: richDoc([
      {
        p: "The enterprise storage landscape is undergoing a seismic shift. NVMe (Non-Volatile Memory Express) SSDs have moved from premium niche to mainstream necessity, and the IT resellers who understand this technology will be best positioned to serve their customers and capture higher-margin upgrade deals.",
      },
      {
        p: "NVMe SSDs have become the default choice for performance-sensitive enterprise workloads. With sequential read speeds exceeding 7,000 MB/s on PCIe Gen 4 — and even faster Gen 5 drives now entering the market — resellers have a compelling upgrade story for data center, virtualization, and workstation customers.",
      },
      { h2: "Why NVMe Outperforms SATA" },
      {
        p: "The performance gap between NVMe and traditional SATA SSDs is dramatic. NVMe drives deliver up to 7x the read speed and 4x the write speed of SATA SSDs while slashing latency. The difference comes from the interface itself: NVMe connects directly to the CPU over the PCIe bus and supports tens of thousands of parallel command queues, compared to SATA's single queue inherited from the spinning-disk era.",
      },
      {
        p: "For workloads such as databases, virtual machines, real-time analytics, and content creation, that throughput and low latency translate directly into faster transactions, higher VM density, and a better end-user experience — a tangible business case your customers can measure.",
      },
      { h2: "PCIe Gen 4 vs Gen 5: What to Recommend" },
      {
        p: "PCIe Gen 4 remains the volume sweet spot in 2026, offering excellent performance and broad platform compatibility at mature pricing. Gen 5 drives roughly double the bandwidth — exceeding 12,000 MB/s — and are ideal for AI training pipelines, high-frequency trading, and large-scale data ingestion, but they run hotter and require adequate cooling on a Gen 5-capable platform.",
      },
      {
        p: "A practical guideline for resellers: recommend Gen 4 for mainstream servers, workstations, and upgrades, and reserve Gen 5 for customers with genuinely bandwidth-bound workloads and the thermal headroom to support it.",
      },
      { h2: "Key Specifications Resellers Must Understand" },
      {
        p: "Matching the right drive to each use case comes down to a handful of specifications: form factor (M.2 2280 for workstations and boot drives, U.2 and E1.S/E3.S for hot-swappable enterprise bays), endurance ratings (TBW and DWPD) aligned to read- or write-intensive workloads, capacity tiers, and data-integrity features such as power-loss protection and end-to-end error correction.",
      },
      {
        p: "Enterprise-grade drives also differ from consumer models in sustained-performance consistency, firmware management, and warranty terms. Steering customers toward the correct tier prevents premature wear-out and costly downtime — and positions you as a trusted advisor rather than a box-mover.",
      },
      { h2: "Choosing Between Crucial, Samsung, and Kingston" },
      {
        p: "At Simal Technologies, we stock a comprehensive range of NVMe SSDs from leading brands. Crucial (Micron) offers strong value and reliability across client and data center tiers; Samsung leads on raw performance with vertically integrated NAND; and Kingston provides dependable, competitively priced options with excellent channel availability and enterprise support.",
      },
      {
        p: "Our team can help you match the right product to each opportunity — from entry-level M.2 client drives to high-endurance U.2 enterprise models — and provide volume pricing, samples, and pre-sales guidance to help you close the deal.",
      },
      { h2: "The Opportunity for IT Resellers" },
      {
        p: "The migration from SATA to NVMe is one of the clearest upgrade narratives in the channel today. Every aging server, workstation, and storage array is a potential NVMe refresh, and the performance benefits are easy to demonstrate. Resellers who can articulate the value, recommend the right specifications, and bundle drives with the surrounding infrastructure will win larger, stickier deals.",
      },
      {
        p: "Contact your Simal Technologies account manager for our latest NVMe product guide, current volume pricing, and evaluation units to share with your customers.",
      },
    ]),
    status: "published",
    publishedAt: "2026-01-10T10:00:00.000Z",
  },
  {
    title: "5 Key Trends Shaping IT Distribution in the Middle East for 2026",
    slug: "it-distribution-trends-middle-east-2026",
    excerpt:
      "From AI-powered infrastructure to sustainable IT, explore the trends that will define the IT distribution landscape across the GCC and CIS regions this year.",
    content: richDoc([
      {
        p: "The IT distribution industry in the Middle East is evolving faster than at any point in the last decade. As we move through 2026, a convergence of artificial intelligence, sustainability mandates, regional cloud investment, and changing work patterns is reshaping how technology products reach businesses across the GCC, Levant, Africa, and CIS regions.",
      },
      {
        p: "For resellers, system integrators, and procurement teams, understanding these shifts is no longer optional — it directly affects which products to stock, how to position solutions, and where the next wave of demand will come from. Below we break down the five trends defining the regional distribution landscape this year, and what each means for partners on the ground.",
      },
      { h2: "1. AI-Powered Infrastructure Goes Mainstream" },
      {
        p: "Demand for AI-ready hardware — high-performance GPUs, accelerator cards, specialised servers, and high-bandwidth NVMe storage — is surging as enterprises and government entities move from AI pilots to full production deployments.",
      },
      {
        p: "This is no longer confined to hyperscalers. Banks, healthcare providers, logistics firms, and public-sector bodies across the UAE and Saudi Arabia are building on-premise and hybrid AI clusters to keep sensitive data inside national borders. For distributors, that means a fast-growing market for workstation-class GPUs, liquid-cooling-ready chassis, and PCIe Gen 5 storage capable of feeding data-hungry training workloads.",
      },
      {
        p: "Resellers who can bundle compute, storage, networking, and pre-sales engineering into a single validated solution will capture the highest margins as this category scales.",
      },
      { h2: "2. Sustainable IT Becomes a Buying Criterion" },
      {
        p: "Sustainability has moved from a 'nice to have' to a formal procurement requirement. Organisations are increasingly prioritising energy-efficient hardware, longer product lifecycles, responsible packaging, and certified e-waste recycling.",
      },
      {
        p: "Government tenders across the GCC now frequently include environmental criteria, and multinational customers are extending their global ESG commitments to regional purchases. Distributors who can document power-efficiency ratings, offer trade-in and recycling programmes, and supply products with recognised green certifications will gain a clear competitive edge.",
      },
      { h2: "3. Cybersecurity Investment Keeps Climbing" },
      {
        p: "With cyber threats growing in both volume and sophistication, demand for enterprise security solutions — next-generation firewalls, endpoint protection, network access control, and surveillance systems — continues to accelerate across every market segment.",
      },
      {
        p: "Regulatory pressure is a major driver: data-protection frameworks across the UAE, Saudi Arabia, and the wider region are pushing organisations to harden their infrastructure. For the channel this creates recurring revenue in security appliances, licensing, and managed services, as well as strong attach-rate potential alongside networking and storage deals.",
      },
      { h2: "4. Hybrid Work Solutions Are Here to Stay" },
      {
        p: "The shift to hybrid work has settled into a permanent operating model rather than a temporary response. That permanence is driving steady demand for collaboration tools, docking stations, high-resolution monitors, webcams, headsets, and reliable remote-access infrastructure.",
      },
      {
        p: "Businesses are standardising home and office setups to ensure consistent productivity and security wherever staff work. Distributors that offer complete, branded workspace bundles — rather than individual components — are best positioned to win these volume deals with corporate and SME customers alike.",
      },
      { h2: "5. Regional Supply Chains and Market Expansion" },
      {
        p: "Distributors are localising supply chains and expanding beyond traditional GCC strongholds into Africa, the Levant, and the CIS. Shorter, more resilient logistics routes, regional warehousing, and local warranty fulfilment are becoming key differentiators after years of global supply-chain disruption.",
      },
      {
        p: "This expansion opens significant growth opportunities for partners willing to serve emerging markets, where demand for enterprise hardware, networking equipment, and surveillance systems is rising quickly. Local stock availability and fast delivery are often the deciding factors in competitive deals.",
      },
      { h2: "What This Means for Simal Technologies Partners" },
      {
        p: "Each of these trends points to the same conclusion: customers increasingly want a distribution partner that delivers more than boxes. They want validated solutions, technical pre-sales support, regional stock, and a supply chain they can trust.",
      },
      {
        p: "Simal Technologies is positioned at the forefront of these shifts, with expanded product lines spanning AI-ready infrastructure, energy-efficient hardware, security, and collaboration — backed by deep regional coverage across the Middle East, Africa, and CIS. Our team works alongside resellers and system integrators to match the right technology to each opportunity, and to stay ahead of what comes next.",
      },
      {
        p: "To discuss how these trends affect your business, or to access our latest product guides and volume pricing, contact your Simal Technologies account manager today.",
      },
    ]),
    status: "published",
    publishedAt: "2025-12-15T09:00:00.000Z",
  },
  {
    title: "UGREEN Docking Stations: A Complete Guide for System Integrators",
    slug: "ugreen-docking-stations-guide-system-integrators",
    excerpt:
      "A comprehensive look at UGREEN's docking station lineup and how to position these solutions for enterprise and consumer markets.",
    content: {
      root: {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "UGREEN docking stations and hubs solve modern connectivity challenges by expanding laptop ports to include multiple displays, Ethernet, USB-A, SD card readers, and power delivery. This guide helps system integrators choose the right model for hot-desking, hybrid offices, and mobile workstations.",
                version: 1,
              },
            ],
            version: 1,
          },
        ],
        version: 1,
      },
    },
    status: "published",
    publishedAt: "2025-12-05T09:00:00.000Z",
  },
  {
    title:
      "How to Choose the Right Firewall Solution for Your Enterprise Clients",
    slug: "choosing-right-firewall-enterprise-clients",
    excerpt:
      "Sophos XG series firewalls offer advanced threat protection. Here's a guide to help resellers match the right solution to client needs.",
    content: {
      root: {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Enterprise firewalls must balance performance, security features, and manageability. When advising clients, consider user count, throughput requirements, VPN needs, SD-WAN integration, and centralized management to select the right appliance for each environment.",
                version: 1,
              },
            ],
            version: 1,
          },
        ],
        version: 1,
      },
    },
    status: "published",
    publishedAt: "2025-11-20T09:00:00.000Z",
  },
  {
    title: "Simal Technologies Expands Coverage to East Africa",
    slug: "simal-expands-east-africa-coverage",
    excerpt:
      "Expanding our distribution network to Kenya, Tanzania, and Ethiopia with dedicated logistics and local support partnerships.",
    content: {
      root: {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Simal Technologies is strengthening its presence across East Africa with dedicated logistics routes and local support partnerships in Kenya, Tanzania, and Ethiopia. This expansion brings our full portfolio of 20+ brands closer to resellers and system integrators in the region.",
                version: 1,
              },
            ],
            version: 1,
          },
        ],
        version: 1,
      },
    },
    status: "published",
    publishedAt: "2025-10-25T09:00:00.000Z",
  },
  {
    title:
      "Understanding Gaming Hardware Trends: MSI, Zotac, and ARKTEK in 2026",
    slug: "gaming-hardware-trends-msi-zotac-arktek-2026",
    excerpt:
      "Gaming hardware continues to evolve. Explore the latest GPU launches, monitor technologies, and what they mean for your distribution business.",
    content: {
      root: {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "The gaming hardware market remains a high-growth segment. Latest trends include high-refresh-rate QHD and 4K monitors, efficient mid-range GPUs, compact form factor builds, and AI-enhanced rendering technologies that are driving upgrade cycles among enthusiast and esports customers.",
                version: 1,
              },
            ],
            version: 1,
          },
        ],
        version: 1,
      },
    },
    status: "published",
    publishedAt: "2025-10-10T09:00:00.000Z",
  },
  {
    title: "AI-Powered Infrastructure: What Resellers Should Know in 2026",
    slug: "ai-powered-infrastructure-resellers-2026",
    excerpt:
      "Artificial intelligence is reshaping enterprise IT. Discover the hardware requirements and opportunities for resellers supporting AI workloads.",
    content: {
      root: {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "AI workloads demand high-performance GPUs, fast NVMe storage, and high-bandwidth memory. Resellers can capture this opportunity by positioning workstation and server components from NVIDIA, Crucial, Kingston, and Samsung for AI training, inference, and edge deployment use cases.",
                version: 1,
              },
            ],
            version: 1,
          },
        ],
        version: 1,
      },
    },
    status: "published",
    publishedAt: "2025-09-28T09:00:00.000Z",
  },
  {
    title: "Cybersecurity Essentials: Building a Resilient Security Stack",
    slug: "cybersecurity-essentials-security-stack",
    excerpt:
      "From firewalls to endpoint protection, learn how to build comprehensive security solutions that protect modern enterprises from evolving threats.",
    content: {
      root: {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "A resilient security stack combines network firewalls, endpoint detection and response, email security, secure access controls, and user awareness training. Resellers who offer integrated security bundles can help clients reduce complexity while improving protection.",
                version: 1,
              },
            ],
            version: 1,
          },
        ],
        version: 1,
      },
    },
    status: "published",
    publishedAt: "2025-09-15T09:00:00.000Z",
  },
  {
    title: "Data Center Storage Trends: High-Capacity SSDs and Beyond",
    slug: "data-center-storage-trends-ssds",
    excerpt:
      "Enterprise storage demands continue to grow. Explore high-capacity NVMe SSDs, hybrid arrays, and the future of data center storage.",
    content: {
      root: {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Data centers are transitioning to higher-capacity NVMe SSDs, software-defined storage, and energy-efficient designs. PCIe Gen5 drives, QLC NAND for capacity tiers, and computational storage are shaping the next generation of enterprise storage infrastructure.",
                version: 1,
              },
            ],
            version: 1,
          },
        ],
        version: 1,
      },
    },
    status: "published",
    publishedAt: "2025-08-30T09:00:00.000Z",
  },
];

const OFFICE_LOCATIONS = [
  {
    city: "Dubai",
    country: "United Arab Emirates",
    address: "Dubai Internet City, Building 14, Office 301\nDubai, UAE",
    phone: "+971 4 393 0507",
    email: "info@simalme.com",
    mapUrl: "https://maps.google.com/?q=Dubai+Internet+City",
    isHeadquarters: true,
    active: true,
  },
  {
    city: "Riyadh",
    country: "Saudi Arabia",
    address: "King Fahd Road, Al Olaya District\nRiyadh, Saudi Arabia",
    phone: "+966 11 234 5678",
    email: "riyadh@simalme.com",
    mapUrl: "https://maps.google.com/?q=Riyadh+Saudi+Arabia",
    isHeadquarters: false,
    active: true,
  },
  {
    city: "Cairo",
    country: "Egypt",
    address: "Smart Village, B125\nCairo, Egypt",
    phone: "+20 2 3456 7890",
    email: "cairo@simalme.com",
    mapUrl: "https://maps.google.com/?q=Smart+Village+Cairo",
    isHeadquarters: false,
    active: true,
  },
];

const FAQ_ENTRIES = [
  {
    category: "general",
    question: "What is Simal Technologies?",
    answer: {
      root: {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Simal Technologies Middle East LLC is a premier IT distributor headquartered in Dubai, UAE. With 20+ years of experience, we distribute 76+ products across 20+ global brands throughout the Middle East, Africa, CIS, and GCC regions.",
                version: 1,
              },
            ],
            version: 1,
          },
        ],
        version: 1,
      },
    },
    order: 1,
    active: true,
  },
  {
    category: "general",
    question: "Which regions does Simal Technologies serve?",
    answer: {
      root: {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "We serve customers across the Middle East (UAE, Saudi Arabia, Qatar, Oman, Bahrain, Kuwait), Africa (Egypt, Kenya, Nigeria, South Africa), CIS countries (Uzbekistan, Kazakhstan, Azerbaijan), and the broader GCC region.",
                version: 1,
              },
            ],
            version: 1,
          },
        ],
        version: 1,
      },
    },
    order: 2,
    active: true,
  },
  {
    category: "products",
    question: "Are all products genuine and covered by warranty?",
    answer: {
      root: {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Yes. Simal Technologies is an authorized distributor for all brands we carry. Every product is 100% genuine and comes with the full manufacturer warranty applicable to your region.",
                version: 1,
              },
            ],
            version: 1,
          },
        ],
        version: 1,
      },
    },
    order: 3,
    active: true,
  },
  {
    category: "products",
    question: "How can I find the right product for my needs?",
    answer: {
      root: {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Browse our Product Catalog or use the Product Comparison tool to compare specifications side-by-side. You can also contact our sales team for personalized recommendations.",
                version: 1,
              },
            ],
            version: 1,
          },
        ],
        version: 1,
      },
    },
    order: 4,
    active: true,
  },
  {
    category: "orders",
    question: "What is the minimum order quantity (MOQ)?",
    answer: {
      root: {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "MOQ varies by product and brand. Most products have a low MOQ suitable for resellers and system integrators. Contact our sales team for tier-specific MOQs and pricing.",
                version: 1,
              },
            ],
            version: 1,
          },
        ],
        version: 1,
      },
    },
    order: 5,
    active: true,
  },
  {
    category: "orders",
    question: "How do I place a bulk order?",
    answer: {
      root: {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Contact our sales team directly via WhatsApp or email for online ordering. Our account managers will provide custom quotes for large volume orders.",
                version: 1,
              },
            ],
            version: 1,
          },
        ],
        version: 1,
      },
    },
    order: 6,
    active: true,
  },
  {
    category: "shipping",
    question: "What are the delivery timelines?",
    answer: {
      root: {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "UAE orders are typically delivered within 1–2 business days. GCC orders take 3–5 business days. Africa and CIS orders are shipped within 5–10 business days depending on the destination.",
                version: 1,
              },
            ],
            version: 1,
          },
        ],
        version: 1,
      },
    },
    order: 7,
    active: true,
  },
];

const CAREERS = [
  {
    title: "Senior Account Manager — IT Distribution",
    slug: "senior-account-manager-it-distribution",
    department: "Sales",
    location: "Dubai, UAE",
    type: "full-time",
    description:
      "We are looking for an experienced Account Manager to drive B2B sales across the Gulf region. You will manage key enterprise accounts, develop new business opportunities, and maintain strong relationships with our partner network.",
    requirements:
      "5+ years in IT distribution or enterprise sales. Strong understanding of IT hardware and peripherals. Excellent communication skills in English; Arabic is a plus. Based in or willing to relocate to Dubai.",
    status: "open",
  },
  {
    title: "Digital Marketing Specialist",
    slug: "digital-marketing-specialist",
    department: "Marketing",
    location: "Dubai, UAE",
    type: "full-time",
    description:
      "We are seeking a creative Digital Marketing Specialist to manage our online presence, content strategy, and lead generation campaigns across multiple channels.",
    requirements:
      "2+ years in B2B digital marketing. Experience with SEO, SEM, and social media marketing. Proficiency in Google Analytics and marketing automation tools. Excellent content creation skills.",
    status: "open",
  },
];

const PAGES = [
  {
    title: "About Us",
    slug: "about",
    excerpt:
      "Simal Technologies Middle East LLC is a premier IT distributor headquartered in Dubai, UAE, delivering enterprise-grade hardware, accessories, and software solutions across the Middle East, Africa, CIS, and GCC regions.",
    status: "published",
    meta: {
      title: "About Us — Simal Technologies Middle East LLC",
      description:
        "Learn about Simal Technologies — premier IT distributor in Dubai with 20+ years experience and 20+ global brands.",
    },
  },
  {
    title: "IT Distribution",
    slug: "it-distribution",
    excerpt:
      "Authorized IT distribution across the Middle East, Africa, CIS, and GCC regions. 76+ products across 20+ global brands.",
    status: "published",
    meta: {
      title:
        "IT Distribution — Simal Technologies | Authorized IT Distributor Dubai, UAE",
      description:
        "Simal Technologies — premier IT distributor in Dubai, UAE. 76+ products across 20+ brands.",
    },
  },
  {
    title: "Product Catalog",
    slug: "product-catalog",
    excerpt: "Browse 76+ authentic IT products across five major categories.",
    status: "published",
    meta: {
      title: "Product Catalog — IT Distribution | Simal Technologies",
      description:
        "Browse the complete IT product catalog from Simal Technologies.",
    },
  },
  {
    title: "Computer Components",
    slug: "computer-components",
    excerpt: "SSDs, RAM, graphics cards, and motherboards from leading brands.",
    status: "published",
    meta: {
      title: "Computer Components — IT Distribution | Simal Technologies",
      description:
        "Enterprise SSDs, RAM modules, graphics cards, and motherboards from leading brands.",
    },
  },
  {
    title: "Computer Accessories",
    slug: "computer-accessories",
    excerpt: "Cables, hubs, docking stations, and surge protectors.",
    status: "published",
    meta: {
      title: "Computer Accessories — IT Distribution | Simal Technologies",
      description:
        "HDMI cables, USB hubs, docking stations, and surge protectors from UGREEN, Honeywell, and more.",
    },
  },
  {
    title: "Monitors",
    slug: "monitors",
    excerpt: "Professional and gaming monitors for every workspace.",
    status: "published",
    meta: {
      title: "Monitors — IT Distribution | Simal Technologies",
      description:
        "Professional and gaming monitors from Aiwa, KOORUI, and more.",
    },
  },
  {
    title: "Gaming",
    slug: "gaming",
    excerpt: "High-performance gaming GPUs, monitors, and fast storage.",
    status: "published",
    meta: {
      title: "Gaming — IT Distribution | Simal Technologies",
      description:
        "Gaming graphics cards, high-refresh-rate monitors, and fast SSDs.",
    },
  },
  {
    title: "Laptops",
    slug: "laptops",
    excerpt: "Enterprise and professional laptops from Dell, HP, and Lenovo.",
    status: "published",
    meta: {
      title: "Laptops — IT Distribution | Simal Technologies",
      description: "Business laptops from Dell, HP, and Lenovo.",
    },
  },
  {
    title: "Brands",
    slug: "brands",
    excerpt: "Authorized distributor for 20+ world-class IT brands.",
    status: "published",
    meta: {
      title:
        "Our Brands — Authorized IT Distribution Partners | Simal Technologies",
      description:
        "Simal Technologies Middle East — authorized distributor for 20+ world-class IT brands.",
    },
  },
  {
    title: "Careers",
    slug: "careers",
    excerpt:
      "Join Simal Technologies and build your career with a leading IT distributor in the Middle East.",
    status: "published",
    meta: {
      title: "Careers — Join Simal Technologies | IT Distribution Jobs Dubai",
      description:
        "Explore career opportunities at Simal Technologies Middle East.",
    },
  },
  {
    title: "Contact",
    slug: "contact",
    excerpt:
      "Get in touch with Simal Technologies for sales inquiries, partnership opportunities, and customer support.",
    status: "published",
    meta: {
      title: "Contact Us — Simal Technologies | IT Distribution Dubai, UAE",
      description: "Contact Simal Technologies Middle East LLC.",
    },
  },
];

const PAGE_PARENTS: Record<string, string[]> = {
  "it-distribution": [
    "product-catalog",
    "computer-components",
    "computer-accessories",
    "monitors",
    "gaming",
    "laptops",
  ],
};

const HEADER_DATA = {
  utilityBar: {
    phone: "+971 4 393 0507",
    email: "info@simalme.com",
    whatsapp: "+971 54 308 8655",
    showLanguageSwitcher: true,
    showWhatsapp: true,
    showSocialLinks: true,
    socialLinks: [
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/company/simal-technologies-middle-east-llc/",
      },
      {
        platform: "instagram",
        url: "https://www.instagram.com/simaltechnologiesuae/",
      },
      {
        platform: "facebook",
        url: "https://www.facebook.com/SimalTechnologiesMiddleEast",
      },
      {
        platform: "youtube",
        url: "https://www.youtube.com/@simaltechnologies",
      },
    ],
  },
  ctaButton: {
    label: "Contact Sales",
    href: "/contact",
    show: true,
  },
  navItems: [
    {
      label: "IT Distribution",
      link: "/hardware/product-catalog",
      status: "published",
      hasDropdown: true,
      children: [
        {
          label: "Storage & Memory",
          link: "/hardware/computer-components",
          description: "SSDs, HDDs, RAM modules & flash storage",
          status: "published",
        },
        {
          label: "Networking",
          link: "/hardware/distribution-channels",
          description: "Routers, switches, APs & connectivity",
          status: "published",
        },
        {
          label: "Accessories",
          link: "/hardware/computer-accessories",
          description: "Keyboards, mice, cables & peripherals",
          status: "published",
        },
        {
          label: "Computing",
          link: "/hardware/laptops",
          description: "Laptops, desktops & workstations",
          status: "published",
        },
        {
          label: "Surveillance",
          link: "/hardware/product-catalog?category=surveillance",
          description: "IP cameras, NVRs & security systems",
          status: "published",
        },
        {
          label: "Mobility",
          link: "/hardware/product-catalog?category=mobility",
          description: "Tablets, smartphones & mobile gear",
          status: "published",
        },
        {
          label: "Monitors & Displays",
          link: "/hardware/monitors",
          description: "Professional & gaming displays",
          status: "published",
        },
        {
          label: "Power & Cooling",
          link: "/hardware/product-catalog?category=power-cooling",
          description: "UPS, surge protectors & cooling",
          status: "published",
        },
        {
          label: "Enterprise",
          link: "/hardware/product-catalog?solution=enterprise",
          description: "Server-grade & data-center ready",
          status: "published",
        },
        {
          label: "SMB",
          link: "/hardware/product-catalog?solution=smb",
          description: "Right-sized IT for small & mid-size business",
          status: "published",
        },
        {
          label: "Government",
          link: "/hardware/product-catalog?solution=government",
          description: "Compliant & secured-to-spec procurement",
          status: "published",
        },
        {
          label: "Education",
          link: "/hardware/product-catalog?solution=education",
          description: "Campus, classroom & lab-ready IT",
          status: "published",
        },
      ],
    },
    {
      label: "ERP Solutions",
      link: "/erp/overview",
      status: "published",
      hasDropdown: true,
      children: [
        {
          label: "UniERP Overview",
          link: "/erp/overview",
          description: "Full-range ERP built on Odoo 19 Community",
          status: "published",
        },
        {
          label: "Financial Management",
          link: "/erp/overview?module=finance",
          description: "Accounting, invoicing & financial reporting",
          status: "published",
        },
        {
          label: "HR & Payroll",
          link: "/erp/overview?module=hr",
          description: "Employee lifecycle, attendance & payroll",
          status: "published",
        },
        {
          label: "Supply Chain & Inventory",
          link: "/erp/overview?module=inventory",
          description: "Warehouse, inventory & procurement",
          status: "published",
        },
        {
          label: "Manufacturing",
          link: "/erp/overview?module=manufacturing",
          description: "Production planning, BOM & MRP",
          status: "published",
        },
        {
          label: "CRM & Sales",
          link: "/erp/overview?module=crm",
          description: "Pipeline, quotations & customer 360",
          status: "published",
        },
        {
          label: "Agriculture",
          link: "/erp/overview?industry=agriculture",
          description: "Farm-to-market supply & traceability",
          status: "published",
        },
        {
          label: "Education",
          link: "/erp/overview?industry=education",
          description: "Admissions, academics & campus ops",
          status: "published",
        },
        {
          label: "Government",
          link: "/erp/overview?industry=government",
          description: "Process automation & compliance",
          status: "published",
        },
        {
          label: "Healthcare",
          link: "/erp/overview?industry=healthcare",
          description: "Patient, pharmacy & inventory control",
          status: "published",
        },
        {
          label: "Hospitality",
          link: "/erp/overview?industry=hospitality",
          description: "Front office, F&B and channel manager",
          status: "published",
        },
        {
          label: "Manufacturing",
          link: "/erp/overview?industry=manufacturing",
          description: "Production planning, BOM & MRP",
          status: "published",
        },
        {
          label: "Logistics",
          link: "/erp/overview?industry=logistics",
          description: "Fleet, freight & last-mile operations",
          status: "published",
        },
        {
          label: "Retail",
          link: "/erp/overview?industry=retail",
          description: "POS, eCommerce & loyalty",
          status: "published",
        },
        {
          label: "Services",
          link: "/erp/overview?industry=services",
          description: "Professional services & project billing",
          status: "published",
        },
      ],
    },
    {
      label: "Partners",
      link: "/contact?topic=partnerships",
      status: "published",
      hasDropdown: false,
      children: [],
    },
    {
      label: "Resources",
      link: "/resources/blog",
      status: "published",
      hasDropdown: true,
      dropdownVariant: "simple",
      children: [
        {
          label: "Blog & News",
          link: "/resources/blog",
          description: "Announcements, product updates & company news",
          status: "published",
        },
        {
          label: "Case Studies",
          link: "/case-studies",
          description: "Customer success stories & deployments",
          status: "published",
        },
        {
          label: "White Papers",
          link: "/white-papers",
          description: "In-depth technical & strategy papers",
          status: "published",
        },
        {
          label: "FAQs",
          link: "/faqs",
          description: "Answers to common questions",
          status: "published",
        },
      ],
    },
    {
      label: "About",
      link: "/about",
      status: "published",
      hasDropdown: false,
      children: [],
    },
    {
      label: "Careers",
      link: "/careers",
      status: "published",
      hasDropdown: false,
      children: [],
    },
    {
      label: "Contact",
      link: "/contact",
      status: "published",
      hasDropdown: false,
      children: [],
    },
  ],
};

// ─── Brand data (inline subset from brand-data.ts) ──────────────────
const BRAND_SLUGS = [
  "aiwa",
  "arktek",
  "crucial",
  "dell",
  "hikvision",
  "honeywell",
  "hp",
  "kingston",
  "koorui",
  "lenovo",
  "msi",
  "nearity",
  "pny",
  "samsung",
  "sandisk",
  "teamgroup",
  "toshiba",
  "ugreen",
  "wd",
  "zotac",
];

const BRAND_NAMES: Record<string, string> = {
  aiwa: "Aiwa",
  arktek: "ARKTEK",
  crucial: "Crucial",
  dell: "Dell",
  hikvision: "HIKVISION",
  honeywell: "Honeywell",
  hp: "HP",
  kingston: "Kingston",
  koorui: "KOORUI",
  lenovo: "Lenovo",
  msi: "MSI",
  nearity: "Nearity",
  pny: "PNY",
  samsung: "Samsung",
  sandisk: "SanDisk",
  teamgroup: "TEAMGROUP",
  toshiba: "Toshiba",
  ugreen: "UGREEN",
  wd: "WD",
  zotac: "ZOTAC",
};

// ─── Main ────────────────────────────────────────────────────────────

async function seedAll() {
  const force = process.argv.includes("--force");
  if (process.env.NODE_ENV === "production" && !force) {
    console.error(
      "[seed] Refusing to seed in production. Re-run with --force to override.",
    );
    process.exit(1);
  }

  console.log("\n🚀 Simal Technologies — Comprehensive Database Seed\n");
  console.log("=".repeat(60) + "\n");

  payload = await getPayload({ config });

  const ids: {
    categories: Record<string, string>;
    brands: Record<string, string>;
    products: Record<string, string>;
    stats: string[];
    testimonials: string[];
    awards: string[];
  } = {
    categories: {},
    brands: {},
    products: {},
    stats: [],
    testimonials: [],
    awards: [],
  };

  // ── Phase 0: Admin User ──
  console.log("\n📋 Phase 0: Admin User");
  try {
    await findOrCreate("users", "email", "admin@admin.com", {
      email: "admin@admin.com",
      password: "Admin@123",
      firstName: "Admin",
      lastName: "User",
      role: "administrator",
      active: true,
    });
    log("users", "✓ admin@admin.com (administrator)");
  } catch (e: unknown) {
    console.error("  ✗ Admin user:", getErrorMessage(e).slice(0, 120));
  }

  // ── Phase 1: Categories ──
  console.log("\n📋 Phase 1: Categories");
  ids.categories = {};
  for (const cat of CATEGORIES) {
    try {
      ids.categories[cat.slug] = await findOrCreate(
        "categories",
        "slug",
        cat.slug,
        cat,
      );
      log("categories", `✓ ${cat.title}`);
    } catch (e: unknown) {
      console.error(`  ✗ ${cat.title}:`, getErrorMessage(e).slice(0, 120));
    }
  }

  // ── Phase 2: Brands ──
  console.log("\n📋 Phase 2: Brands");
  ids.brands = {};
  for (const slug of BRAND_SLUGS) {
    try {
      const name = BRAND_NAMES[slug];
      const data = {
        name,
        slug,
        meta: {
          title: name,
          description: `${name} products distributed by Simal Technologies`,
        },
      };
      ids.brands[slug] = await findOrCreate("brands", "slug", slug, data);
      log("brands", `✓ ${name}`);
    } catch (e: unknown) {
      console.error(`  ✗ ${slug}:`, getErrorMessage(e).slice(0, 120));
    }
  }

  // ── Phase 3: Products ──
  console.log("\n📋 Phase 3: Products");
  ids.products = {};
  for (const prod of PRODUCTS) {
    try {
      const data: Record<string, unknown> = {
        sku: prod.sku,
        slug: prod.sku.toLowerCase(),
        name: prod.name,
        specs: prod.specs,
        stockStatus: prod.stockStatus,
      };
      if (ids.categories[prod.category])
        data.category = ids.categories[prod.category];
      if (ids.brands[prod.brand]) data.brand = ids.brands[prod.brand];
      ids.products[prod.sku] = await findOrCreate(
        "products",
        "sku",
        prod.sku,
        data,
      );
      log("products", `✓ ${prod.name}`);
    } catch (e: unknown) {
      console.error(`  ✗ ${prod.sku}:`, getErrorMessage(e).slice(0, 120));
    }
  }

  // ── Phase 4: Stats ──
  console.log("\n📋 Phase 4: Stats");
  ids.stats = [];
  for (const stat of STATS) {
    try {
      const id = await findOrCreate("stats", "label", stat.label, stat);
      ids.stats.push(id);
      log("stats", `✓ ${stat.label}`);
    } catch (e: unknown) {
      console.error(`  ✗ ${stat.label}:`, getErrorMessage(e).slice(0, 120));
    }
  }

  // ── Phase 5: Testimonials ──
  console.log("\n📋 Phase 5: Testimonials");
  ids.testimonials = [];
  for (const t of TESTIMONIALS) {
    try {
      const id = await findOrCreate(
        "testimonials",
        "authorName",
        t.authorName,
        t,
      );
      ids.testimonials.push(id);
      log("testimonials", `✓ ${t.authorName}`);
    } catch (e: unknown) {
      console.error(`  ✗ ${t.authorName}:`, getErrorMessage(e).slice(0, 120));
    }
  }

  // ── Phase 6: Awards ──
  console.log("\n📋 Phase 6: Awards");
  ids.awards = [];
  for (const award of AWARDS) {
    try {
      const id = await findOrCreate("awards", "title", award.title, award);
      ids.awards.push(id);
      log("awards", `✓ ${award.title}`);
    } catch (e: unknown) {
      console.error(`  ✗ ${award.title}:`, getErrorMessage(e).slice(0, 120));
    }
  }

  // ── Phase 7: News Items ──
  console.log("\n📋 Phase 7: News Items");
  for (const news of NEWS_ITEMS) {
    try {
      await findOrCreate("news-items", "slug", news.slug, news);
      log("news-items", `✓ ${news.title}`);
    } catch (e: unknown) {
      console.error(`  ✗ ${news.title}:`, getErrorMessage(e).slice(0, 120));
    }
  }

  // ── Phase 8: Blog Posts ──
  console.log("\n📋 Phase 8: Blog Posts");
  for (const post of BLOG_POSTS) {
    try {
      await findOrCreate("blog-posts", "slug", post.slug, post);
      log("blog-posts", `✓ ${post.title}`);
    } catch (e: unknown) {
      console.error(`  ✗ ${post.title}:`, getErrorMessage(e).slice(0, 120));
    }
  }

  // ── Phase 9: Office Locations ──
  console.log("\n📋 Phase 10: Office Locations");
  for (const office of OFFICE_LOCATIONS) {
    try {
      const existing = await findDoc("office-locations", "city", office.city);
      if (existing) {
        await payload!.update({
          collection: "office-locations",
          id: existing.id as number,
          data: office,
          overrideAccess: true,
        });
      } else {
        await payload!.create({
          collection: "office-locations",
          data: office,
          overrideAccess: true,
        });
      }
      log("office-locations", `✓ ${office.city}`);
    } catch (e: unknown) {
      console.error(`  ✗ ${office.city}:`, getErrorMessage(e).slice(0, 120));
    }
  }

  // ── Phase 11: FAQ Entries ──
  console.log("\n📋 Phase 11: FAQ Entries");
  for (const faq of FAQ_ENTRIES) {
    try {
      const existing = await findDoc("faq-entries", "question", faq.question);
      if (existing) {
        await payload!.update({
          collection: "faq-entries",
          id: existing.id as number,
          data: faq,
          overrideAccess: true,
        });
      } else {
        await payload!.create({
          collection: "faq-entries",
          data: faq,
          overrideAccess: true,
        });
      }
      log("faq-entries", `✓ ${faq.question.substring(0, 50)}...`);
    } catch (e: unknown) {
      console.error(`  ✗ FAQ:`, getErrorMessage(e).slice(0, 120));
    }
  }

  // ── Phase 12: Careers ──
  console.log("\n📋 Phase 12: Careers");
  for (const career of CAREERS) {
    try {
      await findOrCreate("careers", "slug", career.slug, career);
      log("careers", `✓ ${career.title}`);
    } catch (e: unknown) {
      console.error(`  ✗ ${career.title}:`, getErrorMessage(e).slice(0, 120));
    }
  }

  // ── Phase 13: Pages ──
  console.log("\n📋 Phase 13: Pages");
  const PROTECTED_PAGE_SLUGS = ["about"];
  const pageIdsBySlug = new Map<string, string>();
  for (const page of PAGES) {
    try {
      if (PROTECTED_PAGE_SLUGS.includes(page.slug)) {
        const existing = await findDoc("pages", "slug", page.slug);
        if (existing) {
          pageIdsBySlug.set(page.slug, existing.id);
          log("pages", `⊘ Skipped (protected): ${page.title}`);
          continue;
        }
      }
      const id = await findOrCreate("pages", "slug", page.slug, page);
      pageIdsBySlug.set(page.slug, id);
      log("pages", `✓ ${page.title}`);
    } catch (e: unknown) {
      console.error(`  ✗ ${page.title}:`, getErrorMessage(e).slice(0, 120));
    }
  }
  for (const [parentSlug, childSlugs] of Object.entries(PAGE_PARENTS)) {
    const parentId = pageIdsBySlug.get(parentSlug);
    if (!parentId) continue;
    for (const childSlug of childSlugs) {
      const childId = pageIdsBySlug.get(childSlug);
      if (!childId) continue;
      try {
        await payload!.update({
          collection: "pages",
          id: childId as number,
          data: { parent: parentId },
          overrideAccess: true,
        });
        log("pages", `  → Linked "${childSlug}" under "${parentSlug}"`);
      } catch (e: unknown) {
        console.error(
          `  ✗ Link ${childSlug}:`,
          getErrorMessage(e).slice(0, 120),
        );
      }
    }
  }

  // ── Phase 14: Header Global ──
  console.log("\n📋 Phase 14: Header Global");
  try {
    await payload!.updateGlobal({ slug: "header", data: HEADER_DATA as never });
    log("header", "✓ Header global seeded");
  } catch (e: unknown) {
    console.error("  ✗ Header:", getErrorMessage(e).slice(0, 120));
  }

  // ── Phase 15: Footer Global ──
  console.log("\n📋 Phase 15: Footer Global");
  try {
    await payload!.updateGlobal({
      slug: "footer",
      data: {
        brandName: "Simal Technologies",
        brandSubtitle: "Middle East LLC",
        brandDescription:
          "Premier IT distributor in Dubai, UAE with 20+ years experience. Authorized distributor for 20+ global brands. Delivering authentic IT products across the Middle East, Africa, and CIS.",
        socialLinks: [
          {
            platform: "linkedin",
            url: "https://www.linkedin.com/company/simal-technologies-middle-east-llc/",
          },
          {
            platform: "instagram",
            url: "https://www.instagram.com/simaltechnologiesuae/",
          },
          {
            platform: "facebook",
            url: "https://www.facebook.com/SimalTechnologiesMiddleEast",
          },
          {
            platform: "youtube",
            url: "https://www.youtube.com/@simaltechnologies",
          },
          { platform: "whatsapp", url: "https://wa.me/971543088655" },
        ],
        footerColumns: [
          {
            title: "Company",
            links: [
              { label: "About us", href: "/about" },
              { label: "careers", href: "/careers" },
              { label: "contact", href: "/contact" },
              { label: "Blog & Events", href: "/blog" },
            ],
          },
          {
            title: "Products",
            links: [
              { label: "Product Catalog", href: "/hardware/product-catalog" },
              { label: "Brands", href: "/brands" },
              { label: "Product Category", href: "/brands?tab=categories" },
              { label: "RFQ / Inquiry", href: "/contact" },
              {
                label: "New Arrivals",
                href: "/hardware/product-catalog?sort=newest",
              },
            ],
          },
          {
            title: "Support",
            links: [
              { label: "Contact Support", href: "/contact" },
              { label: "Sales Inquiry", href: "/contact" },
              { label: "Our Offices", href: "/contact" },
              { label: "Regional Contacts", href: "/contact" },
              { label: "General Inquiry", href: "/contact" },
            ],
          },
        ],
        contactPhone: "+971 4 393 0507",
        contactEmail: "info@simalme.com",
        contactAddress: "Office 201, Dar Al Riffa Building, Bur Dubai, UAE",
        vatNumber: "100207478700003",
        tradeLicense: "49740",
        chamberMember: "Dubai Chamber Member",
        copyright:
          "© {year} Simal Technologies Middle East LLC. A TwinMOS Group Company. All rights reserved.",
        parentCompany: { name: "TwinMOS Group", url: "https://twinmos.com" },
      } as never,
    });
    log("footer", "✓ Footer global seeded");
  } catch (e: unknown) {
    console.error("  ✗ Footer:", getErrorMessage(e).slice(0, 120));
  }

  // ── Phase 16: Site Settings Global ──
  console.log("\n📋 Phase 16: Site Settings Global");
  try {
    await payload!.updateGlobal({
      slug: "site-settings",
      data: {
        siteName: "Simal Technologies",
        defaultEmail: "info@simalme.com",
        defaultPhone: "+971 4 393 0507",
        address:
          "Dubai Internet City, Building 14, Office 301\nDubai, United Arab Emirates",
        socialLinks: [
          {
            platform: "LinkedIn",
            url: "https://www.linkedin.com/company/simal-technologies",
          },
          { platform: "Twitter", url: "https://twitter.com/simaltech" },
          {
            platform: "Facebook",
            url: "https://www.facebook.com/simaltechnologies",
          },
          {
            platform: "Instagram",
            url: "https://www.instagram.com/simaltechnologies",
          },
        ],
        defaultSeo: {
          title: "Simal Technologies — Premier IT Distributor | Dubai, UAE",
          description:
            "Simal Technologies Middle East LLC — authorized IT distributor for 20+ global brands. 76+ products across MEA, CIS & GCC.",
        },
      } as never,
    });
    log("site-settings", "✓ Site settings global seeded");
  } catch (e: unknown) {
    console.error("  ✗ Site settings:", getErrorMessage(e).slice(0, 120));
  }

  // ── Phase 17: Homepage Global ──
  console.log("\n📋 Phase 17: Homepage Global");
  try {
    const [productsRes, brandsRes, testimonialsRes, statsRes] =
      await Promise.all([
        payload!.find({
          collection: "products",
          limit: 8,
          overrideAccess: true,
        }),
        payload!.find({
          collection: "brands",
          limit: 12,
          overrideAccess: true,
        }),
        payload!.find({
          collection: "testimonials",
          limit: 4,
          overrideAccess: true,
        }),
        payload!.find({ collection: "stats", limit: 10, overrideAccess: true }),
      ]);

    const productIds = productsRes.docs.map((d) => d.id);
    const brandIds = brandsRes.docs.map((d) => d.id);
    const testimonialIds = testimonialsRes.docs.map((d) => d.id);
    const statIds = statsRes.docs.map((d) => d.id);

    await payload!.updateGlobal({
      slug: "homepage",
      data: {
        heroSlides: [
          {
            headline: "Your Trusted IT Distribution Partner",
            subHeadline:
              "Authorized distributor for 20+ world-class brands across the Middle East, Africa & CIS regions",
            ctaLabel: "Explore Products",
            ctaLink: "/hardware/product-catalog",
          },
          {
            headline: "76+ Products, One Source",
            subHeadline:
              "Computer components, accessories, monitors, gaming gear, and laptops — all under one roof",
            ctaLabel: "View Catalog",
            ctaLink: "/hardware/product-catalog",
          },
          {
            headline: "Enterprise Storage Solutions",
            subHeadline:
              "NVMe SSDs, portable drives, and data center storage from Crucial, Samsung, HIKVISION and more",
            ctaLabel: "Shop Storage",
            ctaLink: "/hardware/computer-components",
          },
          {
            headline: "Professional Display Solutions",
            subHeadline:
              "Gaming monitors, business displays, and ultrawide screens from Aiwa and KOORUI",
            ctaLabel: "View Monitors",
            ctaLink: "/hardware/monitors",
          },
          {
            headline: "Connectivity & Peripherals",
            subHeadline:
              "USB-C hubs, docking stations, cables, and surge protectors from UGREEN and Honeywell",
            ctaLabel: "Browse Accessories",
            ctaLink: "/hardware/computer-accessories",
          },
          {
            headline: "20+ Global Brands, One Distributor",
            subHeadline:
              "Crucial, HIKVISION, UGREEN, Samsung, Lenovo, Dell, HP and more — all authentic, all warrantied",
            ctaLabel: "View Brands",
            ctaLink: "/brands",
          },
          {
            headline: "Gaming Performance Unleashed",
            subHeadline:
              "High-refresh monitors, gaming GPUs, and fast NVMe storage for competitive and casual gamers",
            ctaLabel: "Shop Gaming",
            ctaLink: "/hardware/gaming",
          },
        ],
        featuredProducts: productIds,
        featuredBrands: brandIds,
        featuredTestimonials: testimonialIds,
        stats: statIds,
      } as never,
    });
    log(
      "homepage",
      "✓ Homepage global seeded with hero slides & featured content",
    );
  } catch (e: unknown) {
    console.error("  ✗ Homepage:", getErrorMessage(e).slice(0, 200));
  }

  /* ─── erp-page global ────────────────────────────────────────── */
  try {
    await payload!.updateGlobal({
      slug: "erp-page",
      data: {
        hero: {
          headline:
            "Transform Your Business with UniERP — The Complete Enterprise Platform",
          subHeadline:
            "A comprehensive, modular ERP solution built on Odoo 19 Community Edition, delivered through a proven Simal–UniSoft partnership.",
          ctaLabel: "Request a Demo",
          ctaLink: "/contact",
          secondaryCtaLabel: "Calculate Your ROI",
          secondaryCtaLink: "/erp/roi-calculator",
        },
        overviewEyebrow: "Platform Overview",
        overviewHeading: "One Platform. Endless Possibilities.",
        overviewDescription: richDoc([
          {
            h2: "UniERP — Enterprise Resource Planning Reimagined",
          },
          {
            p: "UniERP is a next-generation enterprise resource planning platform built on Odoo 19 Community Edition, the world's leading open-source business software. It brings together finance, HR, sales, inventory, manufacturing, and project management into a single, unified system — eliminating data silos and giving your leadership team real-time visibility across every department.",
          },
          {
            p: "Unlike traditional ERP systems that require massive upfront investments and years-long deployments, UniERP is modular, fast to implement, and scales with your business. Start with the modules you need today and add more as you grow.",
          },
        ]),
        meta: {
          title:
            "UniERP Platform — Enterprise Resource Planning | Simal Technologies",
          description:
            "Transform your business with UniERP — a comprehensive, modular ERP solution built on Odoo 19 CE. Finance, HR, CRM, inventory, manufacturing & project management. NBR-approved UniVAT. Localized for UAE & GCC.",
        },
      } as never,
    });
    log("erp-page", "✓ ERP page global seeded with hero, overview & meta");
  } catch (e: unknown) {
    console.error("  ✗ ERP Page:", getErrorMessage(e).slice(0, 200));
  }

  await payload!.destroy();
  payload = null;

  console.log("\n" + "=".repeat(60));
  console.log("✅ Seed complete! All collections and globals populated.");
  console.log("=".repeat(60) + "\n");
}

seedAll().catch((err) => {
  console.error("Fatal seed error:", err);
  process.exit(1);
});
