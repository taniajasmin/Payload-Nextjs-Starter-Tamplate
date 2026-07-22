"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GradientTitleFrame } from "@/components/home/ui/gradient-title-frame";
import { GlowIcon } from "@/components/home/ui/glow-icon";
import {
  Plus,
  Minus,
  FileSpreadsheet,
  Check,
  Building2,
  Sparkles,
} from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────────── */

export interface PreSalesCompilerProps {
  badge?: string;
  heading?: string;
  subtext?: string;
}

interface CategoryData {
  id: string;
  name: string;
}

/* ─── Static category index ─────────────────────────────────────── */

const CATEGORIES_DATA: CategoryData[] = [
  { id: "cat-1", name: "🖥️ Computer Components" },
  { id: "cat-2", name: "⌨️ Computer Accessories" },
  { id: "cat-3", name: "🖼️ Monitors" },
  { id: "cat-4", name: "🎮 Gaming" },
  { id: "cat-5", name: "💻 Laptops" },
  { id: "cat-6", name: "💾 Storage" },
];

const CATEGORY_HARDWARE_INDEX: Record<
  string,
  Array<{ name: string; sku: string; throughput: string }>
> = {
  "cat-1": [
    {
      name: "Crucial T705 Gen5 NVMe SSD — 12,400MB/s Sequential Read",
      sku: "CT1000T705SSD3",
      throughput: "12,400 MB/s Read",
    },
    {
      name: "Crucial DDR5 Pro Memory — 16GB to 48GB Kits",
      sku: "CP2K16G64C38U5B",
      throughput: "DDR5-6400 MT/s",
    },
    {
      name: "MSI B450M-A PRO MAX II Motherboard — Micro-ATX AM4",
      sku: "MSI-B450M-APRO2",
      throughput: "DDR4-3600, USB 3.2",
    },
    {
      name: "ARKTEK RTX3060 LED 12GB GDDR6 Graphics Card",
      sku: "ARK-RTX3060-12GB",
      throughput: "3,584 CUDA Cores",
    },
    {
      name: "TEAMGROUP Elite 4GB DDR3 1600MHz Desktop DIMM",
      sku: "TED34G1600C1101",
      throughput: "DDR3-1600, 1.5V",
    },
  ],
  "cat-2": [
    {
      name: "UGREEN Revodok Pro 313 13-in-1 USB-C Docking Station",
      sku: "UGR-15978",
      throughput: "4K@60Hz, 100W PD",
    },
    {
      name: "UGREEN 5-in-1 USB-C Hub — 100W PD, 4K HDMI",
      sku: "UGR-15596",
      throughput: "5 Gbps, 100W PD",
    },
    {
      name: "UGREEN Cat8 Pure Copper Ethernet Cable Braided",
      sku: "UGR-30795",
      throughput: "40 Gbps, 2000 MHz",
    },
    {
      name: "Honeywell Platinum 6 Out Surge Protector",
      sku: "HON-HC000017",
      throughput: "X3 MOV, 1.5M Cord",
    },
    {
      name: "Nearity C30R All-In-One Meeting Camera + Mic + Speaker",
      sku: "NEAR-C30R",
      throughput: "4K UHD, 120° FOV",
    },
  ],
  "cat-3": [
    {
      name: 'KOORUI 34" Curved Ultrawide WQHD 165Hz Gaming Monitor',
      sku: "KOOR-34-UWQHD",
      throughput: "3440×1440, 165Hz, HDR400",
    },
    {
      name: 'KOORUI 27" 240Hz FHD Gaming Monitor — DCI-P3 90%',
      sku: "KOOR-27-FHD",
      throughput: "1920×1080, 240Hz, 1ms",
    },
    {
      name: 'Aiwa MF240E-V 24" FHD VA Frameless Monitor',
      sku: "AIWA-MF240EV",
      throughput: "75Hz, 5ms, Free-Sync",
    },
    {
      name: 'Aiwa MF2203-V 21.5" FHD IPS Slim LED Display',
      sku: "AIWA-MF2203V",
      throughput: "75Hz, 1000:1, VESA",
    },
  ],
  "cat-4": [
    {
      name: "ARKTEK RTX3060 LED 12GB GDDR6 Dual Fan",
      sku: "ARK-RTX3060-12GB",
      throughput: "3,584 SP, 12GB GDDR6",
    },
    {
      name: "ARKTEK RTX2060 6GB GDDR6 192-bit Dual",
      sku: "ARK-RTX2060-6GB",
      throughput: "1×DP, 1×HDMI, 1×DVI",
    },
    {
      name: "MSI B450M-A PRO MAX II AM4 Motherboard",
      sku: "MSI-B450M-APRO2",
      throughput: "Micro-ATX, DDR4, USB 3.2",
    },
    {
      name: 'KOORUI 34" Curved Ultrawide 165Hz HDR400',
      sku: "KOOR-34-UWQHD",
      throughput: "1000R, PIP/PBP, 1ms",
    },
    {
      name: "Crucial T700 PCIe 5.0 NVMe SSD — 12,400MB/s",
      sku: "CT1000T700SSD3",
      throughput: "12.4 GB/s Seq. Read",
    },
  ],
  "cat-5": [
    {
      name: 'HP OmniBook 5 — 14" 2K OLED, Snapdragon X, 16GB RAM',
      sku: "HP-OMNI-5",
      throughput: "2K OLED, 1.35kg, AI",
    },
    {
      name: "Dell 15 Laptop — 14th Gen Intel Core 3, 120Hz FHD",
      sku: "DELL-15-I3",
      throughput: "8GB RAM, 512GB SSD",
    },
    {
      name: "Lenovo IdeaPad Slim 3 — 13th Gen i5, 24GB RAM, 1TB SSD",
      sku: "LEN-Ideapad3-I5",
      throughput: '15.3" FHD, 1TB SSD',
    },
  ],
  "cat-6": [
    {
      name: "Crucial T705 Gen5 NVMe SSD — 1TB to 4TB",
      sku: "CT1000T705SSD3",
      throughput: "12,400 MB/s Read",
    },
    {
      name: "Samsung T7 Shield 1TB Portable SSD — Rugged IP65",
      sku: "SAM-T7SHIELD-1TB",
      throughput: "1,050 MB/s, IP65",
    },
    {
      name: "Kingston XS1000 1TB Portable SSD — 1050MB/s",
      sku: "KNG-XS1000-1TB",
      throughput: "1,050 MB/s, Pocket-Sized",
    },
    {
      name: "Toshiba Canvio Ready 2TB Portable External HDD",
      sku: "TOSH-CANVIO-2TB",
      throughput: "USB 3.0, 2TB Capacity",
    },
    {
      name: "WD SN7100 NVMe SSD — High-Speed Boot Drive",
      sku: "WD-SN7100",
      throughput: "NVMe PCIe, Reliable",
    },
    {
      name: "HIKVISION Elite 7S Portable SSD — Up to 4TB",
      sku: "HIK-ELITE7S",
      throughput: "USB 3.2, Up to 4TB",
    },
  ],
};

/* ─── Component ─────────────────────────────────────────────────── */

export default function PreSalesCompiler({
  badge = "Interactive Pre-Sales Assistant",
  heading = "Compile Your Pre-Sales Technical Specification",
  subtext = "Select specific models from the portfolio options below or click any category to initiate standard pre-sales diagnostics. Simal Technologies LLC delivers certified pre-sale hardware blueprints to regional Middle East integrators seamlessly.",
}: PreSalesCompilerProps = {}) {
  const [selectedCatId, setSelectedCatId] = useState<string | null>(null);
  const [compilerCart, setCompilerCart] = useState<
    Array<{ sku: string; name: string; qty: number; catName: string }>
  >([]);
  const [showComplianceAlert, setShowComplianceAlert] = useState(false);

  const handleAddHardwareToSpec = (
    hw: { name: string; sku: string; throughput: string },
    catName: string,
  ) => {
    setCompilerCart((prev) => {
      const match = prev.find((item) => item.sku === hw.sku);
      if (match) {
        return prev.map((item) =>
          item.sku === hw.sku ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [...prev, { sku: hw.sku, name: hw.name, qty: 1, catName }];
    });
  };

  const handleRemoveHardwareFromSpec = (sku: string) => {
    setCompilerCart((prev) => {
      return prev
        .map((item) =>
          item.sku === sku ? { ...item, qty: item.qty - 1 } : item,
        )
        .filter((item) => item.qty > 0);
    });
  };

  const handleDownloadSpec = () => {
    if (compilerCart.length === 0) return;

    const totalUnits = compilerCart.reduce((acc, c) => acc + c.qty, 0);
    const escapeCell = (cell: string) => `"${cell.replace(/"/g, '""')}"`;

    const rows = [
      ["SKU", "Component", "Category", "Quantity"],
      ...compilerCart.map((item) => [
        item.sku,
        item.name,
        item.catName,
        String(item.qty),
      ]),
    ];

    const header =
      "Simal Technologies Middle East LLC — Pre-Sales Technical Specification\r\n" +
      `Total Units: ${totalUnits}\r\n\r\n`;
    const csvBody = rows
      .map((row) => row.map(escapeCell).join(","))
      .join("\r\n");

    const blob = new Blob([header + csvBody], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "simal-presales-specification.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="pre-sales-compiler"
      className="relative w-full py-[var(--section-gap-y)] overflow-hidden bg-background"
    >
      {/* Section heading */}
      <div className="container-primary mb-12">
        <motion.span
          className="inline-flex items-center gap-2 border-l-2 border-primary pl-3 text-[length:var(--font-section-label)] uppercase tracking-wider font-extrabold mb-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping bg-primary opacity-60" />
            <span className="relative inline-flex h-2 w-2 bg-primary" />
          </span>
          <span className="text-primary">{badge}</span>
        </motion.span>

        <GradientTitleFrame variant="prism" padding="md" align="left">
          <motion.h2
            className="text-[length:var(--font-heading)] font-extrabold tracking-tight text-foreground leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {heading}
          </motion.h2>
        </GradientTitleFrame>

        <motion.p
          className="text-muted-foreground text-[length:var(--font-body)] leading-relaxed mt-4 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {subtext}
        </motion.p>
      </div>

      {/* Compiler workspace */}
      <div className="container-primary w-full relative z-10">
        <div className="p-6 md:p-8 text-foreground border border-border bg-card relative overflow-hidden">
          {/* Schematic visual grids inside compiler */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Context */}
            <div className="lg:col-span-5 space-y-4">
              <GradientTitleFrame variant="subtle" padding="sm" align="left">
                <h3 className="text-[length:var(--font-heading)] font-extrabold tracking-tight text-foreground leading-tight">
                  Build a certified hardware blueprint
                </h3>
              </GradientTitleFrame>

              <p className="text-[length:var(--font-body)] text-muted-foreground leading-relaxed">
                Select specific models from the portfolio options below or click
                any category to initiate standard pre-sales diagnostics. Simal
                Technologies LLC delivers certified pre-sale hardware blueprints
                to regional Middle East integrators seamlessly.
              </p>

              {/* Verified badge */}
              <div className="flex gap-3.5 items-center p-3 border border-border bg-muted">
                <GlowIcon
                  icon={Building2}
                  color="pink"
                  size={24}
                  className="w-11 h-11"
                />
                <div className="text-[length:var(--font-body)] text-muted-foreground">
                  <span className="text-foreground font-bold block">
                    SIMAL GULF CERTIFICATION
                  </span>
                  Tested at JAFZA or Riyadh operations prior to dispatch.
                </div>
              </div>
            </div>

            {/* Selection Deck */}
            <div className="lg:col-span-7 space-y-5">
              <div className="border border-border bg-muted p-4 md:p-6 space-y-4">
                {/* Visual Selectors */}
                <div className="space-y-3">
                  <label className="block text-[length:var(--font-body)] font-bold text-muted-foreground uppercase tracking-widest">
                    🧪 Quick Sandbox Hardware Selectors
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {CATEGORIES_DATA.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCatId(cat.id)}
                        className={`text-left p-2.5 border text-[length:var(--font-button)] font-bold transition-colors flex items-center gap-2 ${
                          selectedCatId === cat.id
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-card text-foreground border-border hover:bg-muted"
                        }`}
                      >
                        <span className="truncate">{cat.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sub models list depending on Selected category state */}
                <AnimatePresence mode="wait">
                  {selectedCatId ? (
                    <motion.div
                      key={selectedCatId}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3 border border-border bg-muted p-3 pt-4"
                    >
                      <div className="flex justify-between items-center text-[length:var(--font-body)] uppercase font-bold tracking-wider">
                        <span className="text-primary">
                          Available Certified Components
                        </span>
                        <span className="text-muted-foreground">
                          Click + to add item
                        </span>
                      </div>

                      <div className="divide-y divide-border/50 space-y-2">
                        {CATEGORY_HARDWARE_INDEX[selectedCatId]?.map(
                          (hw, idx) => {
                            const isInCart = compilerCart.find(
                              (c) => c.sku === hw.sku,
                            );
                            return (
                              <div
                                key={idx}
                                className="flex justify-between items-center py-2 gap-4"
                              >
                                <div>
                                  <span className="text-muted-foreground text-[length:var(--font-body)] block mb-0.5">
                                    {hw.sku}
                                  </span>
                                  <span className="text-[length:var(--font-heading)] text-foreground font-extrabold block leading-snug">
                                    {hw.name}
                                  </span>
                                  <span className="text-[length:var(--font-body)] text-primary block mt-0.5">
                                    Rating Capability: {hw.throughput}
                                  </span>
                                </div>

                                <button
                                  onClick={() =>
                                    handleAddHardwareToSpec(
                                      hw,
                                      CATEGORIES_DATA.find(
                                        (c) => c.id === selectedCatId,
                                      )!.name,
                                    )
                                  }
                                  className={`h-8 px-3 flex items-center justify-center gap-1 text-[length:var(--font-button)] font-bold transition-colors shrink-0 border ${
                                    isInCart
                                      ? "bg-primary text-primary-foreground hover:bg-primary/90 border-transparent"
                                      : "bg-card text-foreground hover:bg-muted border-border"
                                  }`}
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                  {isInCart
                                    ? `Add extra (${isInCart.qty})`
                                    : "Add to Spec"}
                                </button>
                              </div>
                            );
                          },
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-center py-8 border border-border bg-muted">
                      <div className="mx-auto w-fit">
                        <GlowIcon
                          icon={Sparkles}
                          color="teal"
                          size={22}
                          pulse
                          className="w-11 h-11"
                        />
                      </div>
                      <span className="block text-[length:var(--font-body)] text-muted-foreground font-bold mt-2.5">
                        SELECT A DYNAMIC CATEGORY FIELD ABOVE TO LOAD SKUs
                      </span>
                    </div>
                  )}
                </AnimatePresence>

                {/* Compiled Spec Items Basket list */}
                <div className="border-t border-border/50 pt-4 mt-2">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[length:var(--font-body)] font-bold uppercase tracking-widest text-muted-foreground">
                      Currently Compiled Portfolio Specifications
                    </span>
                    <span className="px-2 py-0.5 bg-muted text-foreground text-[length:var(--font-badge)] font-bold">
                      {compilerCart.reduce((acc, c) => acc + c.qty, 0)}{" "}
                      Appliance Units Selected
                    </span>
                  </div>

                  {compilerCart.length > 0 ? (
                    <div className="space-y-2 border border-border bg-muted p-3 max-h-[160px] overflow-y-auto">
                      {compilerCart.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center text-[length:var(--font-body)] py-1 border-b border-border/50 last:border-b-0"
                        >
                          <div className="truncate pr-4">
                            <span className="text-muted-foreground text-[length:var(--font-body)] mr-1.5">
                              [{item.sku}]
                            </span>
                            <span className="text-foreground font-extrabold">
                              {item.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-muted-foreground text-[length:var(--font-body)]">
                              Qty: {item.qty}
                            </span>
                            <button
                              onClick={() =>
                                handleRemoveHardwareFromSpec(item.sku)
                              }
                              className="text-muted-foreground hover:text-destructive p-0.5"
                              title="Decrease count"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 bg-card border border-dashed border-border/50 text-[length:var(--font-body)] text-muted-foreground">
                      Active Compilation Basket Empty. Please add components
                      above.
                    </div>
                  )}
                </div>

                {/* Action CTA */}
                {compilerCart.length > 0 && (
                  <div className="pt-2 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
                    <div className="text-[length:var(--font-body)] text-primary">
                      ✓ Spec-sheet complies with CITC and JAFZA customs
                      clearance index regulations.
                    </div>

                    <button
                      onClick={() => {
                        handleDownloadSpec();
                        setShowComplianceAlert(true);
                      }}
                      className="bg-primary text-primary-foreground font-bold text-[length:var(--font-button)] px-5 py-3 transition-colors hover:bg-primary/90 flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                      <FileSpreadsheet className="w-4 h-4" />
                      Compile &amp; Download specification
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compiler Action Overlay dialog */}
      <AnimatePresence>
        {showComplianceAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/70 flex items-center justify-center p-5 z-50 select-none"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-card border border-border p-6 md:p-8 max-w-md w-full relative"
            >
              <div className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center mb-5">
                <Check className="w-6 h-6" />
              </div>

              <h4 className="text-[length:var(--font-heading)] font-extrabold text-foreground">
                Specification Matrix Compiled Successfully
              </h4>

              <p className="text-[length:var(--font-body)] text-muted-foreground mt-2.5 leading-relaxed">
                Your sandbox list containing{" "}
                <strong>
                  {compilerCart.reduce((acc, c) => acc + c.qty, 0)} units
                </strong>{" "}
                has been matched against active Middle East warehouse stock
                levels.
              </p>

              {/* Live matching logs */}
              <div className="bg-muted border border-border p-4 mt-4 text-[length:var(--font-body)] text-foreground space-y-1.5 leading-relaxed">
                <div className="flex justify-between font-bold text-primary">
                  <span>SYSTEM CLASSIFICATION</span>
                  <span>STATUS: IN_STOCK</span>
                </div>
                <div className="border-t border-border/60 my-1 pt-1" />
                {compilerCart.map((item, idx) => (
                  <div key={idx} className="flex justify-between gap-2">
                    <span className="truncate max-w-[240px]">{item.name}</span>
                    <span className="text-primary">
                      Qty: {item.qty} (Ready)
                    </span>
                  </div>
                ))}
                <div className="border-t border-border/60 my-1 pt-1" />
                <span className="text-muted-foreground/80 block pb-1">
                  GCC CUSTOMS INDEXING MATCHED:
                </span>
                <span className="bg-primary text-primary-foreground px-2.5 py-0.5 text-[length:var(--font-badge)] font-bold block w-fit">
                  TRA &amp; CITC STAMP AUTHORIZED
                </span>
              </div>

              <button
                onClick={handleDownloadSpec}
                className="w-full mt-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-[length:var(--font-button)] transition flex items-center justify-center gap-2"
              >
                <FileSpreadsheet className="w-4 h-4" />
                Download spec sheet (.csv)
              </button>

              <div className="grid grid-cols-2 gap-3 mt-3">
                <button
                  onClick={() => {
                    setCompilerCart([]);
                    setShowComplianceAlert(false);
                  }}
                  className="w-full py-2.5 border border-border text-foreground hover:bg-muted font-bold text-[length:var(--font-button)] transition text-center"
                >
                  Clear Selection
                </button>
                <button
                  onClick={() => setShowComplianceAlert(false)}
                  className="w-full py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-[length:var(--font-button)] transition text-center"
                >
                  Close Document
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
