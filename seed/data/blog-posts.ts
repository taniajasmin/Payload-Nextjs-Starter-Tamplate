// seed/data/blog-posts.ts — fixture data

// Inlined helper — kept here so the fixture is self-contained
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

export default BLOG_POSTS;
