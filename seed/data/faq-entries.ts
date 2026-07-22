// seed/data/faq-entries.ts — fixture data extracted from seed-all.ts
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

export default FAQ_ENTRIES;
