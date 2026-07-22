// seed/data/office-locations.ts — fixture data extracted from seed-all.ts
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

export default OFFICE_LOCATIONS;
