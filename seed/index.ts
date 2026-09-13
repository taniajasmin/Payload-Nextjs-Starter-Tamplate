/**
 * Seed script — populates the database with Hi-Tech Farming BD content.
 * Content sourced from https://hitechfarmingbd.com/ (company's own site).
 *
 * Usage:
 *   pnpm seed              # seed example content
 *   pnpm seed -- --force   # allow seeding in production
 *
 * Idempotent: safe to re-run — all operations are upserts.
 * Media uploads are keyed by filename: re-running skips already-uploaded images.
 */

import "dotenv/config";
import { readFile } from "fs/promises";
import path from "path";
import { getPayload } from "payload";
import config from "../payload.config";

// payload.config.ts is CJS under tsx — unwrap interop just in case
const cfg = (config as unknown as { default?: typeof config }).default ?? config;

// ---------------------------------------------------------------------------
// Content constants — Hi-Tech Farming BD
// ---------------------------------------------------------------------------

const COMPANY = {
  name: "Hi-Tech Farming Ltd",
  shortName: "Hi-Tech Farming BD",
  tagline:
    "Hi-Tech Farming Ltd is dedicated to providing modern irrigation, agricultural equipment, and smart farming solutions to farmers across Bangladesh.",
  whoWeAreP1:
    "Hi-Tech Farming BD is a research, development, business and innovation organization that aim to smart agricultural and industrial development in Bangladesh through 4th Industrial revolutionary (4th IR) technology.",
  whoWeAreP2:
    "The 4th IR is an advanced digital technology, change the environment in the agricultural farms and factories through implement of smart technology. The 4th IR concept combines with Internet of Things (IoT), Industrial Internet of Things (IIoT), Artificial Intelligence (AI), Machine Learning (ML), that have done in sensor-based precision agriculture farming and industrial automation.",
  mission:
    "The Primary focus of the company is to develop sensor based smart agricultural farming and industrial automation device in Bangladesh. HiTech Farming has other expertise such as aquaculture mechanization, design and construction of smart agri, aqua and livestock farm, importation of fisheries and agricultural product and agricultural and industrial automation and biomedical instrument.",
  missionMotto:
    "Our aim is to use less input, higher production and income, lower environmental pollution with the motto of smart agricultural farming in Bangladesh.",
  phonePrimary: "+880 17619 09007",
  phoneSecondary: "+880 18101 98204",
  phoneTertiary: "+880 18101 98208",
  emailPrimary: "hitechfarming.bd@gmail.com",
  emailSecondary: "support@hitechfarmingbd.com",
  address:
    "Amanullah Super Market, Tilpapara Road, 290/A, (2nd floor, 121), Khilgaon Railway Gate, Dhaka-1219, Bangladesh.",
  hours: [
    "Sun–Thu: 09:00am – 7:00pm",
    "Sat: 10:00am – 6:00pm",
    "Friday: Closed",
  ],
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Lexical rich-text node builders (kept in one place, used across pages). */
type LexicalNode = Record<string, unknown>;

const textNode = (text: string): LexicalNode => ({
  type: "text",
  text,
  direction: "ltr",
  format: "",
  version: 1,
});

const paragraph = (text: string): LexicalNode => ({
  type: "paragraph",
  children: [textNode(text)],
  direction: "ltr",
  format: "",
  indent: 0,
  version: 1,
});

const heading = (text: string, tag: "h2" | "h3" = "h3"): LexicalNode => ({
  type: "heading",
  tag,
  children: [textNode(text)],
  direction: "ltr",
  format: "",
  indent: 0,
  version: 1,
});

const bulletList = (items: string[]): LexicalNode => ({
  type: "list",
  listType: "bullet",
  // The lexicalToJSX converter renders <node.tag> — omitting this crashes
  // the RichText renderer with "Element type is invalid: got: undefined".
  tag: "ul",
  children: items.map((item) => ({
    type: "listitem",
    children: [textNode(item)],
    direction: "ltr",
    format: "",
    indent: 0,
    version: 1,
  })),
  direction: "ltr",
  format: "",
  indent: 0,
  version: 1,
});

const richText = (...children: LexicalNode[]) => ({
  root: {
    type: "root",
    children,
    direction: "ltr" as const,
    format: "",
    indent: 0,
    version: 1,
  },
});

const MIME: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
};

async function main(): Promise<void> {
  const force = process.argv.includes("--force");
  if (process.env.NODE_ENV === "production" && !force) {
    console.error("[seed] Refusing to seed in production. Re-run with --force to override.");
    process.exit(1);
  }

  console.log("\n🚀 Hi-Tech Farming BD — Database Seed\n");
  console.log("=".repeat(50) + "\n");

  const payload = await getPayload({ config: cfg });

  // ── Media ────────────────────────────────────────────────────────────
  console.log("🖼️  Uploading media (skips files already present)...");

  const mediaCache = new Map<string, number>();

  async function media(filename: string, alt: string): Promise<number> {
    if (mediaCache.has(filename)) return mediaCache.get(filename)!;

    const existing = await payload.find({
      collection: "media",
      where: { filename: { equals: filename } },
      limit: 1,
    });
    if (existing.docs.length > 0) {
      const id = existing.docs[0].id as number;
      mediaCache.set(filename, id);
      return id;
    }

    const filePath = path.join(__dirname, "assets", filename);
    const data = await readFile(filePath);
    const ext = path.extname(filename).toLowerCase();
    const doc = await payload.create({
      collection: "media",
      data: { alt },
      file: {
        data,
        mimetype: MIME[ext] ?? "image/png",
        name: filename,
        size: data.length,
      },
    });
    mediaCache.set(filename, doc.id as number);
    return doc.id as number;
  }

  const [
    logoId,
    heroFarmId,
    heroAgriTechId,
    heroSolarId,
    heroApurboId,
    imgFarmAutomationId,
    imgHydroponicId,
    imgAquacultureId,
    imgHitechFarmingId,
    imgFishFarmingId,
    imgIstockId,
    logoA2iId,
    logoWorldfishId,
    logoAquaBanglaId,
    photoJahedaId,
    photoAlamgirId,
    photoInanId,
    photoShubrotoId,
    photoNishatId,
    photoFariaId,
    photoTaniaId,
    photoTeamId,
    photoAdvisorId,
  ] = await Promise.all([
    media("logo.png", "Hi-Tech Farming BD logo"),
    media("smart-farming.jpg", "Smart farming with IoT sensors in a green field"),
    media("agriculture-tech.jpg", "Agricultural technology in the field"),
    media("solar-energy-powerplant-farming.jpg", "Solar energy powering a farm"),
    media("apurbo-device.png", "Apurbo — generic automation device by Hi-Tech Farming"),
    media("Farm-automation.png", "Automated farm machinery"),
    media("Hydroponic-Farming.jpg", "Hydroponic farming system"),
    media("aquaculture.jpg", "Aquaculture fish farming"),
    media("hitechfarming.jpg", "Hi-tech farming in practice"),
    media("cropped-fish-farming-2.jpg", "Fish farming pond"),
    media("istockphoto-1311492607-612x612-1.jpg", "Modern agriculture technology"),
    media("a2i.png", "a2i — trusted partner logo"),
    media("worldfish.png", "WorldFish — trusted partner logo"),
    media("aquabangla.png", "AquaBangla — trusted partner logo"),
    media("WhatsApp-Image-2024-03-09-at-6.01.56-PM-212x300.jpeg", "Jaheda Hossain — Chairman"),
    media("Mr-Alamgir.png", "Dr. Muhammad Alamgir Hossain Sarker — Managing Director"),
    media("Inan.jpg", "Engr. Kaizar Tariq Inan — Director & Team Leader"),
    media("Shubroto.png", "Subarata Hawlader — Development Professional"),
    media("Nishat.png", "Engr. Nishat Sharmin — Development Professional"),
    media("Faria.png", "Faria Nasrin — Development Professional"),
    media("Tania.png", "Tania Jasmin — Development Professional"),
    media("Team-300x300.jpg", "Hi-Tech Farming BD team"),
    media("advisor-2.png", "Engr. Md Abu Tahir — Advisor"),
  ]);
  console.log("  ✓ 23 media files available");

  // ── 1. Admin User ────────────────────────────────────────────────────
  console.log("\n📋 Seeding admin user...");
  try {
    const existing = await payload.find({
      collection: "users",
      where: { email: { equals: "admin@example.com" } },
      limit: 1,
    });
    if (existing.docs.length > 0) {
      await payload.update({
        collection: "users",
        id: existing.docs[0].id,
        data: {
          email: "admin@example.com",
          password: "admin123",
          role: "administrator",
        },
      });
    } else {
      await payload.create({
        collection: "users",
        data: {
          email: "admin@example.com",
          password: "admin123",
          role: "administrator",
        },
      });
    }
    console.log("  ✓ admin@example.com / admin123");
  } catch (e) {
    console.error("  ✗ Failed to seed admin user:", e);
  }

  // ── 2. Header Global ─────────────────────────────────────────────────
  console.log("\n📋 Seeding Header...");
  try {
    await payload.updateGlobal({
      slug: "header",
      data: {
        logo: logoId,
        utilityBar: {
          phone: COMPANY.phonePrimary,
          email: COMPANY.emailPrimary,
          whatsapp: COMPANY.phonePrimary,
          showWhatsapp: true,
          showSocialLinks: true,
          socialLinks: [],
        },
        ctaButton: {
          label: "Contact Us",
          href: "/contact",
          show: true,
        },
        navItems: [
          { label: "Home", link: "/", status: "published", hasDropdown: false },
          { label: "About", link: "/about", status: "published", hasDropdown: false },
          { label: "Services", link: "/services", status: "published", hasDropdown: false },
          { label: "Products", link: "/portfolio", status: "published", hasDropdown: false },
          {
            label: "Team",
            link: "/team",
            status: "published",
            hasDropdown: true,
            dropdownVariant: "simple",
            children: [
              { label: "Our Team", link: "/team" },
              { label: "Advisors", link: "/advisors" },
            ],
          },
          { label: "Gallery", link: "/gallery", status: "published", hasDropdown: false },
          { label: "Contact", link: "/contact", status: "published", hasDropdown: false },
        ],
      },
    });
    console.log("  ✓ Header (logo, 7 nav items, Team dropdown)");
  } catch (e) {
    console.error("  ✗ Failed to seed header:", e);
  }

  // ── 3. Footer Global ─────────────────────────────────────────────────
  console.log("\n📋 Seeding Footer...");
  try {
    await payload.updateGlobal({
      slug: "footer",
      data: {
        brandName: COMPANY.name,
        brandDescription:
          "A research, development, business and innovation organization driving smart agricultural and industrial development in Bangladesh through 4th Industrial Revolution (4IR) technology.",
        logo: logoId,
        footerColumns: [
          {
            title: "Company",
            links: [
              { label: "About Us", href: "/about" },
              { label: "Our Team", href: "/team" },
              { label: "Advisors", href: "/advisors" },
              { label: "Contact", href: "/contact" },
            ],
          },
          {
            title: "What We Do",
            links: [
              { label: "Services", href: "/services" },
              { label: "Products", href: "/portfolio" },
              { label: "Gallery", href: "/gallery" },
            ],
          },
        ],
        socialLinks: [],
        copyright: `© {year} ${COMPANY.name}. All rights reserved.`,
      },
    });
    console.log("  ✓ Footer (2 columns)");
  } catch (e) {
    console.error("  ✗ Failed to seed footer:", e);
  }

  // ── 4. Site Settings Global ──────────────────────────────────────────
  console.log("\n📋 Seeding Site Settings...");
  try {
    await payload.updateGlobal({
      slug: "site-settings",
      data: {
        siteName: COMPANY.shortName,
        defaultEmail: COMPANY.emailPrimary,
        defaultPhone: COMPANY.phonePrimary,
        typography: {
          heroHeadingSize: 24,
          headingSize: 20,
          bodyTextSize: 15,
          buttonTextSize: 13,
          navItemSize: 15,
          badgeSize: 12,
          sectionLabelSize: 13,
          captionSize: 11,
        },
      },
    });
    console.log("  ✓ Site Settings");
  } catch (e) {
    console.error("  ✗ Failed to seed site settings:", e);
  }

  // ── 5. Theme Global (Simal pink preset) ──────────────────────────────
  console.log("\n📋 Seeding Theme (Simal pink preset)...");
  try {
    await payload.updateGlobal({
      slug: "theme",
      data: {
        preset: "simal",
        radius: 8,
        lightMode: {
          background: "#ffffff",
          foreground: "#0f172a",
          card: "#ffffff",
          cardForeground: "#0f172a",
          popover: "#ffffff",
          popoverForeground: "#0f172a",
          primary: "#DF4C73",
          primaryForeground: "#ffffff",
          secondary: "#f1f5f9",
          secondaryForeground: "#0f172a",
          muted: "#f1f5f9",
          mutedForeground: "#6b7280",
          accent: "#f1f5f9",
          accentForeground: "#0f172a",
          destructive: "#dc2626",
          destructiveForeground: "#ffffff",
          border: "#e5e7eb",
          input: "#e5e7eb",
          ring: "#DF4C73",
        },
        darkMode: {
          background: "#0b1120",
          foreground: "#f8fafc",
          card: "#111827",
          cardForeground: "#f8fafc",
          popover: "#111827",
          popoverForeground: "#f8fafc",
          primary: "#E86F92",
          primaryForeground: "#ffffff",
          secondary: "#1f2937",
          secondaryForeground: "#f8fafc",
          muted: "#1f2937",
          mutedForeground: "#94a3b8",
          accent: "#1f2937",
          accentForeground: "#f8fafc",
          destructive: "#dc2626",
          destructiveForeground: "#ffffff",
          border: "#1f2937",
          input: "#1f2937",
          ring: "#E86F92",
        },
      } as Record<string, unknown>,
    });
    console.log("  ✓ Theme (Simal pink, light + dark)");
  } catch (e) {
    console.error("  ✗ Failed to seed theme:", e);
  }

  // ── 6. Pages ─────────────────────────────────────────────────────────
  console.log("\n📋 Seeding Pages...");

  // Helper to upsert a page by slug
  async function upsertPage(
    slug: string,
    title: string,
    data: Record<string, unknown>,
  ): Promise<void> {
    const existing = await payload.find({
      collection: "pages",
      where: { slug: { equals: slug } },
      limit: 1,
    });
    if (existing.docs.length > 0) {
      await payload.update({
        collection: "pages",
        id: existing.docs[0].id,
        data: { title, slug, status: "published", ...data },
      });
    } else {
      await payload.create({
        collection: "pages",
        data: { title, slug, status: "published", ...data },
      });
    }
  }

  try {
    // ── Homepage ───────────────────────────────────────────────────────
    await upsertPage("home", "Home", {
      layout: [
        {
          blockType: "heroBlock",
          backgroundImage: heroFarmId,
          headline: COMPANY.name,
          subHeadline: COMPANY.tagline,
          ctaLabel: "Contact Us",
          ctaLink: "/contact",
        },
        {
          blockType: "imageGalleryBlock",
          heading: "Trusted By",
          images: [
            { image: logoA2iId, caption: "a2i" },
            { image: logoWorldfishId, caption: "WorldFish" },
            { image: logoAquaBanglaId, caption: "AquaBangla" },
          ],
        },
        {
          blockType: "richTextBlock",
          heading: "Who We Are",
          content: richText(
            paragraph(COMPANY.whoWeAreP1),
            paragraph(COMPANY.whoWeAreP2),
          ),
        },
        {
          blockType: "statsCounterBlock",
          heading: "Our Impact in Numbers",
          stats: [
            {
              value: "24",
              suffix: "+",
              label: "Years of fish farming experience",
            },
            {
              value: "6",
              label: "Consultancy services",
            },
            {
              value: "10",
              suffix: "+",
              label: "Team members & advisors",
            },
            {
              value: "3",
              suffix: "+",
              label: "Trusted partner organizations",
            },
          ],
        },
        {
          blockType: "featureCardsBlock",
          heading: "Why Choose Us?",
          cards: [
            {
              icon: "Smartphone",
              title: "GSM-Based IoT Devices",
              description:
                "We are the only company in Bangladesh providing GSM-based IoT devices, which can be managed over the internet through the web and apps.",
            },
            {
              icon: "Globe",
              title: "3-Way Communication",
              description:
                "Our device is very easy to use and maintain, with 3-way communication: GSM, WiFi, and remote control.",
            },
            {
              icon: "DollarSign",
              title: "Affordable Technology",
              description:
                "We provide industry-leading technological equipment at a very affordable price.",
            },
            {
              icon: "Headphones",
              title: "Expert Support Team",
              description:
                "We have very effective team members and a support team to ensure your fastest solution with expert opinions.",
            },
          ],
        },
        {
          blockType: "imageGalleryBlock",
          heading: "Image Gallery",
          images: [
            { image: imgHydroponicId, caption: "Hydroponic farming" },
            { image: imgAquacultureId, caption: "Aquaculture" },
            { image: heroSolarId, caption: "Solar energy for farming" },
            { image: imgFarmAutomationId, caption: "Farm automation" },
            { image: heroApurboId, caption: "Apurbo device" },
            { image: imgHitechFarmingId, caption: "Hi-tech farming" },
          ],
        },
        {
          blockType: "ctaBlock",
          heading: "Get in Touch",
          description: `Location: ${COMPANY.address}`,
          phoneLabel: "Call Us",
          phoneNumber: COMPANY.phonePrimary,
          emailLabel: "Email Us",
          emailAddress: COMPANY.emailPrimary,
          demoLinkLabel: "Send Us a Message",
          demoLinkUrl: "/contact",
        },
      ],
      meta: {
        title: "Hi-Tech Farming BD — Smart Farming & IoT Solutions in Bangladesh",
        description: COMPANY.tagline,
      },
    });
    console.log("  ✓ Homepage (hero + about + features + galleries + CTA)");

    // ── About ──────────────────────────────────────────────────────────
    await upsertPage("about", "About Us", {
      layout: [
        {
          blockType: "heroBlock",
          backgroundImage: heroAgriTechId,
          headline: "About Us",
          subHeadline: `Smart agricultural and industrial development in Bangladesh through 4th Industrial Revolution (4IR) technology.`,
        },
        {
          blockType: "richTextBlock",
          heading: "Who We Are",
          content: richText(
            paragraph(COMPANY.whoWeAreP1),
            paragraph(COMPANY.whoWeAreP2),
          ),
        },
        {
          blockType: "richTextBlock",
          heading: "Our Mission & Vision",
          content: richText(
            paragraph(COMPANY.mission),
            paragraph(COMPANY.missionMotto),
          ),
        },
        {
          blockType: "ctaBlock",
          heading: "Interested to know more about our projects and works?",
          description: "Get in touch with our team — we would love to hear from you.",
          phoneLabel: "Call Us",
          phoneNumber: COMPANY.phonePrimary,
          emailLabel: "Email Us",
          emailAddress: COMPANY.emailPrimary,
          demoLinkLabel: "Contact Us",
          demoLinkUrl: "/contact",
        },
      ],
      meta: {
        title: "About Us — Hi-Tech Farming BD",
        description:
          "A research, development, business and innovation organization driving smart agricultural development in Bangladesh through 4IR technology.",
      },
    });
    console.log("  ✓ About (hero + who we are + mission + CTA)");

    // ── Services ───────────────────────────────────────────────────────
    await upsertPage("services", "Services", {
      layout: [
        {
          blockType: "heroBlock",
          backgroundImage: heroSolarId,
          headline: "Our Services",
          subHeadline:
            "Smart farming, automation and consultancy services for agriculture, fisheries and industry across Bangladesh.",
        },
        {
          blockType: "featureCardsBlock",
          heading: "What We Do",
          cards: [
            {
              icon: "Leaf",
              title: "Smart Agriculture, Fisheries And Livestock Farm Mechanization",
              description:
                "Sensor-based mechanization solutions for smart agriculture, fisheries and livestock farms.",
            },
            {
              icon: "Zap",
              title: "Solar Energy and Powerplant Consultancy",
              description:
                "Consultancy for solar energy systems and solar powerplants for farms and industry.",
            },
            {
              icon: "Factory",
              title: "Industrial Automation And Consultancy",
              description:
                "Industrial automation solutions and consultancy for smart factories.",
            },
            {
              icon: "Flask",
              title: "Aquaponic System Consultancy",
              description:
                "Design and consultancy for aquaponic systems combining fish and plant farming.",
            },
            {
              icon: "HeartPulse",
              title: "Aquaculture Consultancy",
              description:
                "Consultancy for modern aquaculture and fish farm development.",
            },
            {
              icon: "Globe",
              title: "Hydroponic System Consultancy",
              description:
                "Design and consultancy for soil-less hydroponic farming systems.",
            },
          ],
        },
        {
          blockType: "ctaBlock",
          heading: "Interested to know more about our projects and works?",
          description: "Get in touch with our team — we would love to hear from you.",
          phoneLabel: "Call Us",
          phoneNumber: COMPANY.phonePrimary,
          emailLabel: "Email Us",
          emailAddress: COMPANY.emailPrimary,
          demoLinkLabel: "Contact Us",
          demoLinkUrl: "/contact",
        },
      ],
      meta: {
        title: "Our Services — Hi-Tech Farming BD",
        description:
          "Smart farm mechanization, solar energy consultancy, industrial automation, aquaponic, aquaculture and hydroponic system consultancy.",
      },
    });
    console.log("  ✓ Services (hero + 6 service cards + CTA)");

    // ── Portfolio / Products ───────────────────────────────────────────
    await upsertPage("portfolio", "Portfolio", {
      layout: [
        {
          blockType: "heroBlock",
          backgroundImage: heroApurboId,
          headline: "Our Products",
          subHeadline:
            "IoT devices designed and built in Bangladesh for smart farming and industrial automation.",
        },
        {
          blockType: "richTextBlock",
          heading: "“Apurbo” — Generic Automation Device",
          content: richText(
            paragraph(
              "Apurbo is a generic automation device, which has the ability to collect data from sensors, analyze the sensor data and run the machine.",
            ),
            heading("Features"),
            bulletList([
              "GSM/WiFi/IR based sensor network and machine controller",
              "Interface for different types of sensors",
              "Realtime sensor-based monitoring",
              "Sensor-based Artificial Intelligence",
            ]),
            heading("Application"),
            bulletList([
              "Integrated with online sensors such as temperature, humidity, moisture, pH, turbidity",
              "High power machine controller for industrial automation",
            ]),
          ),
        },
        {
          blockType: "richTextBlock",
          heading: "Upcoming Project: “Online Real Time Thermostat”",
          content: richText(
            paragraph(
              "Online real time thermostat for Tilapia, Crab and Golda hatchery in Bangladesh.",
            ),
            paragraph(
              "Crab and Golda hatchery is very important for the fisheries sector of Bangladesh. For crab culture in Bangladesh, the country totally depends on natural sources of crablet, which destroys our crab resource. For this purpose, the Department of Fisheries, Bangladesh established a crab hatchery for artificial breeding of crab. For the successful operation of the crab hatchery, temperature maintenance is the most important factor. Currently crab hatcheries maintain the water temperature manually.",
            ),
            bulletList([
              "Real time temperature data of the water and environment of the hatchery",
              "Monitor and control the temperature of crab and golda hatchery through the internet",
              "Cloud-based operating system — all data is stored on a cloud server and can generate reports",
              "Control the hatchery water temperature by controlling the water heater",
              "Set the optimum temperature through the IoT device",
              "Operation method: Wi-Fi / GSM / Infra-Red",
            ]),
            heading("Required Equipment"),
            bulletList([
              "Micro controller based controlling device",
              "Web server",
              "Heat sensor",
              "Water heater",
              "Internet connectivity through Wi-Fi/GSM",
              "After-installation support",
            ]),
            heading("Power Source"),
            paragraph(
              "Power source from hatchery: 220 Volt, 50~60 Hz. For device operation, power is taken from the hatchery at AC 220 volt, then converted to DC 5 volt to operate the micro controller and relay by DC current. The relay controls the single-phase heating device; it can be changed to 3 phases if required. Golda hatchery internal electricity in Bangladesh is single phase, so the single-phase power source is used.",
            ),
            heading("Uses"),
            paragraph(
              "The online realtime thermostat can control the hatchery water temperature automatically. It can also store the data and generate reports based on the stored data. It reduces the risk of hatchery operation failure due to temperature.",
            ),
            paragraph(
              "For the operation of a Tilapia hatchery, it is a very useful device. Tilapia hatchery operation needs 28°C water temperature. In the early breeding season, especially in February, the environmental temperature is below 28°C — at which the success rate of tilapia egg hatching is lower. By controlling the water temperature, tilapia hatchling production can be increased in the early season, when hatchling price and demand are higher, bringing good income and profit for a tilapia hatchery.",
            ),
          ),
        },
        {
          blockType: "ctaBlock",
          heading: "Interested to know more about our products?",
          description: "Our team will happily walk you through Apurbo and upcoming devices.",
          phoneLabel: "Call Us",
          phoneNumber: COMPANY.phonePrimary,
          emailLabel: "Email Us",
          emailAddress: COMPANY.emailPrimary,
          demoLinkLabel: "Contact Us",
          demoLinkUrl: "/contact",
        },
      ],
      meta: {
        title: "Our Products — Hi-Tech Farming BD",
        description:
          "Apurbo — a generic GSM/WiFi/IR based automation device — and the upcoming Online Real Time Thermostat for Tilapia, Crab and Golda hatcheries.",
      },
    });
    console.log("  ✓ Portfolio (hero + Apurbo + thermostat + CTA)");

    // ── Team ───────────────────────────────────────────────────────────
    await upsertPage("team", "Our Team", {
      layout: [
        {
          blockType: "heroBlock",
          headline: "Our Team",
          subHeadline:
            "A dedicated team of engineers, developers and professionals driving smart farming in Bangladesh.",
        },
        {
          blockType: "highlightBlock",
          heading: "Founding Members",
          description: richText(
            paragraph(
              "Hi-Tech Farming BD is led by experienced founders from fisheries, agriculture, medical and software engineering backgrounds.",
            ),
          ),
          highlights: [
            {
              icon: "Award",
              title: "Jaheda Hossain — Chairman",
              description:
                "Jaheda Hossain is a fisheries entrepreneur with 24 years of fish farming experience. Initially she started as a school teacher, after which she engaged in fish and livestock farming. Now she is engaged in fisheries farm mechanization, agricultural machinery importation, agricultural farm design and automation technology.",
            },
            {
              icon: "Star",
              title: "Dr. Muhammad Alamgir Hossain Sarker — Managing Director",
              description:
                "Dr. Muhammad Alamgir Hossain is an innovative fish farmer, highly engaged in the agricultural sector of Bangladesh. He has good experience in agricultural and fish farming, and sound business knowledge of biomedical instruments, medical equipment and accessories, fisheries mechanization, and the agricultural mechanization and automation sector of Bangladesh. He is a physician who obtained his MBBS and Diploma in Gynecology and Obstetrics (DGO) from Sylhet Medical College, Bangladesh, and a Diploma in Medical Ultrasound (DMU) from Chittagong University.",
            },
            {
              icon: "Rocket",
              title: "Engr. Kaizar Tariq Inan — Director & Team Leader",
              description:
                "Kaizar Tariq Inan is an IT professional with 8 years of experience in software development, server maintenance, project management and IoT device development. In his early career as a software developer he contributed to property management software and various customized CRM software including RMR Cloud, My Rug Tracker, iEatery, On Express, PREPERP and Automated Fish Farm. He is presently working as Sr. Software Engineer and Team Lead at PIISTECH LTD, working with ASP.NET, JavaScript, C++, C#, Microsoft SQL Server, Windows and Linux servers, and Arduino. He obtained his B.Sc. in Software Engineering (Hons.), specializing in software development and project management, from the Faculty of Computer Science, American International University Bangladesh.",
            },
          ],
        },
        {
          blockType: "highlightBlock",
          heading: "Team Members",
          description: richText(
            paragraph(
              "Young, energetic engineers and professionals building and supporting our devices every day.",
            ),
          ),
          highlights: [
            {
              icon: "Users",
              title: "Subarata Hawlader — Development Professional",
              description:
                "A young, very hard-working professional with very good knowledge of computer hardware and IoT devices. He completed his Bachelor's degree in biological science and is a full-time employee of the company.",
            },
            {
              icon: "Code",
              title: "Nazifa Tasnim — Software Engineer",
              description:
                "Software engineer on the Hi-Tech Farming BD development team.",
            },
            {
              icon: "Settings",
              title: "Engr. Nishat Sharmin — Development Professional",
              description:
                "Nishat Sharmin is an energetic and dynamic mechanical engineer. She is skilled in innovative development of different mechanical machineries used in the agricultural sector and is an expert in equipment maintenance. She works on planning, design and development, improving the machineries' capacity and longevity to make them cost effective and user friendly. She obtained her B.Sc. Engineering degree from Bangladesh University of Engineering and Technology in Mechanical Engineering, and has working experience as a procurement engineer in a renowned equipment manufacturing company in Bangladesh.",
            },
            {
              icon: "Flask",
              title: "Faria Nasrin — Development Professional",
              description:
                "A young and energetic part-time employee who leads the working force of the company. She is a 4th-year student of Bangladesh University of Engineering and Technology in the Mechanical Engineering Department, and will join full-time after completing her engineering degree. She helps in planning and designing smart machineries and is always looking to create and improve equipment.",
            },
            {
              icon: "Cpu",
              title: "Tania Jasmin — Development Professional",
              description:
                "A young and energetic part-time employee who leads the working force of the company. She is a 4th-year student of East West University in the CSE Department, and will join full-time after completing her engineering degree. She helps in planning and designing smart machineries and is always looking to create and improve equipment.",
            },
            {
              icon: "Zap",
              title: "Mahmudul Hasan — Development Professional",
              description:
                "A young professional and expert in data processing, store management and book-keeping, with strong knowledge of solar-based system operation. He completed his B.Sc. in Electrical and Electronic Engineering from East West University, Dhaka, Bangladesh.",
            },
          ],
        },
        {
          blockType: "imageGalleryBlock",
          heading: "Team Photos",
          images: [
            { image: photoJahedaId, caption: "Jaheda Hossain — Chairman" },
            { image: photoAlamgirId, caption: "Dr. Muhammad Alamgir Hossain Sarker — Managing Director" },
            { image: photoInanId, caption: "Engr. Kaizar Tariq Inan — Director & Team Leader" },
            { image: photoShubrotoId, caption: "Subarata Hawlader" },
            { image: photoNishatId, caption: "Engr. Nishat Sharmin" },
            { image: photoFariaId, caption: "Faria Nasrin" },
            { image: photoTaniaId, caption: "Tania Jasmin" },
          ],
        },
      ],
      meta: {
        title: "Our Team — Hi-Tech Farming BD",
        description:
          "Meet the founders, engineers and professionals of Hi-Tech Farming BD.",
      },
    });
    console.log("  ✓ Team (hero + founders + members + photos)");

    // ── Advisors ───────────────────────────────────────────────────────
    await upsertPage("advisors", "Advisors", {
      layout: [
        {
          blockType: "heroBlock",
          headline: "Our Advisors",
          subHeadline:
            "Experienced engineers and leaders guiding Hi-Tech Farming BD.",
        },
        {
          blockType: "highlightBlock",
          heading: "Advisors",
          highlights: [
            {
              icon: "GraduationCap",
              title: "Dr. Muhammad Jahangir Hossain Sarker — Advisor",
              description:
                "Dr. Muhammad Jahangir Hossain Sarker is a Registered Professional Engineer (P.Eng.) in the province of Ontario, Canada. He has research experience in areas of Electrical Engineering such as communications; digital systems including advanced computer architectures and embedded systems; autonomous systems including intelligent systems; circuit design including VLSIC; biomedical instrumentation and robotics. He obtained his B.Sc. in Electrical and Electronics Engineering from Bangladesh Engineering University, and his M.Sc. (Tech.), Lic.Sc. (Tech.) and D.Sc. (Tech.) in Electrical and Communication Engineering from Aalto University (former Helsinki University of Technology), Finland.",
            },
            {
              icon: "Landmark",
              title: "Engr. Md Abu Tahir — Advisor",
              description:
                "Engr. Md Abu Tahir is a former Member (Distribution) of the Bangladesh Power Development Board (BPDB). He has technical and administrative managerial experience of more than 35 years, including more than 8 years in senior management positions in government organizations, and worked about 3 years as Deputy Team Leader of an international consulting team in the power sector. He has intense exposure to the technical aspects of project planning, design and development. He obtained his B.Sc. Engineering in Mechanical from BUET, and has burst innovative capability and experience in erection, testing and commissioning of newly developed projects, with the best performance in training organizational officers and staff and demonstrating knowledge of labour law and corporate governance.",
            },
          ],
        },
        {
          blockType: "imageGalleryBlock",
          heading: "Advisor Photos",
          images: [
            { image: photoAdvisorId, caption: "Engr. Md Abu Tahir — Advisor" },
          ],
        },
      ],
      meta: {
        title: "Advisors — Hi-Tech Farming BD",
        description: "Meet the advisors of Hi-Tech Farming BD.",
      },
    });
    console.log("  ✓ Advisors (hero + advisor profiles)");

    // ── Gallery ────────────────────────────────────────────────────────
    await upsertPage("gallery", "Gallery", {
      layout: [
        {
          blockType: "heroBlock",
          backgroundImage: imgHitechFarmingId,
          headline: "Gallery",
          subHeadline: "Photos from our projects, devices and farms.",
        },
        {
          blockType: "imageGalleryBlock",
          heading: "Photos",
          images: [
            { image: imgFarmAutomationId, caption: "Farm automation" },
            { image: imgHydroponicId, caption: "Hydroponic farming" },
            { image: imgAquacultureId, caption: "Aquaculture" },
            { image: heroSolarId, caption: "Solar energy for farming" },
            { image: heroFarmId, caption: "Smart farming" },
            { image: heroApurboId, caption: "Apurbo device" },
            { image: imgFishFarmingId, caption: "Fish farming" },
            { image: imgIstockId, caption: "Agriculture technology" },
          ],
        },
      ],
      meta: {
        title: "Gallery — Hi-Tech Farming BD",
        description: "Photos from Hi-Tech Farming BD projects, devices and farms.",
      },
    });
    console.log("  ✓ Gallery (hero + 8 photos)");

    // ── Contact ────────────────────────────────────────────────────────
    await upsertPage("contact", "Contact", {
      layout: [
        {
          blockType: "heroBlock",
          backgroundImage: imgFishFarmingId,
          headline: "Get in Touch",
          subHeadline:
            "Have questions or want to work with us? We would love to hear from you.",
        },
        {
          blockType: "ctaBlock",
          heading: "Contact Information",
          description: `Office: ${COMPANY.address}`,
          phoneLabel: "Call Us",
          phoneNumber: COMPANY.phonePrimary,
          emailLabel: "Email Us",
          emailAddress: COMPANY.emailPrimary,
          demoLinkLabel: "Email Support",
          demoLinkUrl: `mailto:${COMPANY.emailSecondary}`,
        },
        {
          blockType: "richTextBlock",
          heading: "Phone & Email",
          content: richText(
            heading("Phone"),
            bulletList([
              COMPANY.phonePrimary,
              COMPANY.phoneSecondary,
              COMPANY.phoneTertiary,
            ]),
            heading("Email"),
            bulletList([COMPANY.emailPrimary, COMPANY.emailSecondary]),
          ),
        },
        {
          blockType: "richTextBlock",
          heading: "Our Hours",
          content: richText(bulletList(COMPANY.hours)),
        },
      ],
      meta: {
        title: "Contact Us — Hi-Tech Farming BD",
        description: `Contact Hi-Tech Farming BD — ${COMPANY.address}`,
      },
    });
    console.log("  ✓ Contact (hero + contact info + hours)");
  } catch (e) {
    console.error("  ✗ Failed to seed pages:", e);
  }

  console.log("\n" + "=".repeat(50));
  console.log("✅ Seed complete!");
  console.log("   Admin:  http://localhost:3000/admin");
  console.log("   Email:  admin@example.com");
  console.log("   Pass:   admin123");
  console.log("=".repeat(50) + "\n");

  // Payload keeps the DB pool open — exit explicitly so the script terminates
  process.exit(0);
}

main().catch((err) => {
  console.error("Fatal seed error:", err);
  process.exit(1);
});
