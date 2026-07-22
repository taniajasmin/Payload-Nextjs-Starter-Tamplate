// seed/data/news-items.ts — fixture data extracted from seed-all.ts
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

export default NEWS_ITEMS;
