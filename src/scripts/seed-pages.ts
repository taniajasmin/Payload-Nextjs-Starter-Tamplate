/** @deprecated Use seed/index.ts instead — the canonical seeder. */
import { getPayload } from 'payload'
import config from '../../payload.config'

const pages = [
  {
    title: 'About Us',
    slug: 'about',
    excerpt:
      'Simal Technologies Middle East LLC is a premier IT distributor headquartered in Dubai, UAE, delivering enterprise-grade hardware, accessories, and software solutions across the Middle East, Africa, CIS, and GCC regions.',
    status: 'published',
    meta: {
      title: 'About Us — Simal Technologies Middle East LLC',
      description:
        'Learn about Simal Technologies — premier IT distributor in Dubai with 20+ years experience, 20+ global brands, and enterprise ERP solutions.',
    },
  },
  {
    title: 'IT Distribution',
    slug: 'it-distribution',
    excerpt:
      'Authorized IT distribution across the Middle East, Africa, CIS, and GCC regions. 76+ products across 20+ global brands.',
    status: 'published',
    meta: {
      title: 'IT Distribution — Simal Technologies | Authorized IT Distributor Dubai, UAE',
      description:
        'Simal Technologies — premier IT distributor in Dubai, UAE. 76+ products across 20+ brands: Crucial, UGREEN, HIKVISION, ARKTEK, KOORUI, Dell, HP, Lenovo.',
    },
  },
  {
    title: 'Product Catalog',
    slug: 'product-catalog',
    excerpt:
      'Browse 76+ authentic IT products across five major categories.',
    status: 'published',
    meta: {
      title: 'Product Catalog — IT Distribution | Simal Technologies',
      description:
        'Browse the complete IT product catalog from Simal Technologies. 76+ products across computer components, accessories, monitors, gaming, and laptops.',
    },
  },
  {
    title: 'Computer Components',
    slug: 'computer-components',
    excerpt:
      'SSDs, RAM, graphics cards, and motherboards from leading brands.',
    status: 'published',
    meta: {
      title: 'Computer Components — IT Distribution | Simal Technologies',
      description:
        'Enterprise SSDs, RAM modules, graphics cards, and motherboards from Crucial, HIKVISION, ARKTEK, MSI, and more.',
    },
  },
  {
    title: 'Computer Accessories',
    slug: 'computer-accessories',
    excerpt:
      'Cables, hubs, docking stations, and surge protectors.',
    status: 'published',
    meta: {
      title: 'Computer Accessories — IT Distribution | Simal Technologies',
      description:
        'HDMI cables, USB hubs, docking stations, and surge protectors from UGREEN, Honeywell, and more.',
    },
  },
  {
    title: 'Monitors',
    slug: 'monitors',
    excerpt:
      'Professional and gaming monitors for every workspace.',
    status: 'published',
    meta: {
      title: 'Monitors — IT Distribution | Simal Technologies',
      description:
        'Professional and gaming monitors from Aiwa, KOORUI, and more. FHD, QHD, and ultrawide options.',
    },
  },
  {
    title: 'Gaming',
    slug: 'gaming',
    excerpt:
      'High-performance gaming GPUs, monitors, and fast storage.',
    status: 'published',
    meta: {
      title: 'Gaming — IT Distribution | Simal Technologies',
      description:
        'Gaming graphics cards, high-refresh-rate monitors, and fast SSDs for competitive and immersive gaming.',
    },
  },
  {
    title: 'Laptops',
    slug: 'laptops',
    excerpt:
      'Enterprise and professional laptops from Dell, HP, and Lenovo.',
    status: 'published',
    meta: {
      title: 'Laptops — IT Distribution | Simal Technologies',
      description:
        'Business laptops from Dell, HP, and Lenovo. 14" to 15.6" options with latest Intel processors.',
    },
  },
  {
    title: 'Brands',
    slug: 'brands',
    excerpt:
      'Authorized distributor for 20+ world-class IT brands across the Middle East, Africa, CIS, and GCC regions.',
    status: 'published',
    meta: {
      title: 'Our Brands — Authorized IT Distribution Partners | Simal Technologies',
      description:
        'Simal Technologies Middle East — authorized distributor for 20+ world-class IT brands across the Middle East, Africa, CIS, and GCC.',
    },
  },
  {
    title: 'Careers',
    slug: 'careers',
    excerpt:
      'Join Simal Technologies and build your career with a leading IT distributor in the Middle East.',
    status: 'published',
    meta: {
      title: 'Careers — Join Simal Technologies | IT Distribution Jobs Dubai',
      description:
        'Explore career opportunities at Simal Technologies Middle East. Join a leading IT distributor with 20+ years of excellence in Dubai, UAE.',
    },
  },
  {
    title: 'Contact',
    slug: 'contact',
    excerpt:
      'Get in touch with Simal Technologies for sales inquiries, partnership opportunities, and customer support.',
    status: 'published',
    meta: {
      title: 'Contact Us — Simal Technologies | IT Distribution Dubai, UAE',
      description:
        'Contact Simal Technologies Middle East LLC. Sales inquiries, partnership opportunities, and customer support across Middle East, Africa, CIS & GCC.',
    },
  },
]

const itDistributionSubPageSlugs = [
  'product-catalog',
  'computer-components',
  'computer-accessories',
  'monitors',
  'gaming',
  'laptops',
]

async function seedPages() {
  const payload = await getPayload({ config })
  const pageIdsBySlug = new Map<string, number>()

  // Pages that should NOT be overwritten if they already exist
  const PROTECTED_SLUGS = ['about']

  // Pass 1: Create or update all pages and collect IDs
  for (const page of pages) {
    try {
      const existing = await payload.find({
        collection: 'pages',
        where: {
          slug: {
            equals: page.slug,
          },
        },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        const id = (existing.docs[0] as unknown as { id: number }).id
        if (PROTECTED_SLUGS.includes(page.slug)) {
          // Skip overwrite — just collect the ID for parent linking
          pageIdsBySlug.set(page.slug, id)
          console.log(`⊘ Skipped (protected): ${page.title}`)
          continue
        }
        await payload.update({
          collection: 'pages',
          id,
          data: page,
        })
        pageIdsBySlug.set(page.slug, id)
        console.log(`✓ Updated page: ${page.title}`)
      } else {
        const created = await payload.create({
          collection: 'pages',
          data: page,
        })
        pageIdsBySlug.set(page.slug, (created as unknown as { id: number }).id)
        console.log(`✓ Created page: ${page.title}`)
      }
    } catch (error) {
      console.error(`✗ Failed to seed page "${page.title}":`, error)
    }
  }

  // Pass 2: Link IT Distribution sub-pages to IT Distribution parent
  const itDistributionId = pageIdsBySlug.get('it-distribution')
  if (itDistributionId) {
    for (const slug of itDistributionSubPageSlugs) {
      const subPageId = pageIdsBySlug.get(slug)
      if (subPageId) {
        try {
          await payload.update({
            collection: 'pages',
            id: subPageId,
            data: { parent: itDistributionId },
          })
          console.log(`✓ Linked sub-page "${slug}" to IT Distribution`)
        } catch (error) {
          console.error(`✗ Failed to link sub-page "${slug}":`, error)
        }
      }
    }
  }

  console.log('\nPage seeding complete!')
  process.exit(0)
}

seedPages()
