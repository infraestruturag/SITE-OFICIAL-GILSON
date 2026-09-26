// Shared JSON-LD LocalBusiness payload for all pages
export const LOCAL_BUSINESS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Dr. Gilson Carvalho Advocacia",
  legalName: "Gilson Carvalho Advocacia",
  description:
    "Dr. Gilson Carvalho é Mestre em Direito, Professor Universitário, inscrito na OAB/TO 2.591 e na OAB/RJ 256.131. Advocacia estratégica com atuação em Gurupi/TO, Rio de Janeiro/RJ e em todo o Brasil.",
  image: "https://gilsoncarvalho.com/og-gilson.jpg",
  logo: "https://gilsoncarvalho.com/logo_gilson.png",
  url: "https://gilsoncarvalho.com",
  telephone: "+5563984474070",
  email: "profgilsonfilho@gmail.com",
  priceRange: "$$$",
  areaServed: "BR",
  founder: {
    "@type": "Person",
    name: "Gilson Carvalho",
    jobTitle: "Advogado",
    identifier: ["OAB/TO 2.591", "OAB/RJ 256.131"],
    memberOf: {
      "@type": "Organization",
      name: "Ordem dos Advogados do Brasil",
    },
  },
  knowsAbout: [
    "Divórcio",
    "Guarda e Pensão Alimentícia",
    "Inventário e Partilha de Bens",
    "União Estável",
    "Direito de Família",
    "Direito das Sucessões",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Guanabara, nº 1669",
    addressLocality: "Gurupi",
    addressRegion: "TO",
    postalCode: "77403-080",
    addressCountry: "BR",
  },
  location: [
    {
      "@type": "Place",
      name: "Matriz — Gurupi/TO",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Av. Guanabara, nº 1669, Centro",
        addressLocality: "Gurupi",
        addressRegion: "TO",
        postalCode: "77403-080",
        addressCountry: "BR",
      },
    },
    {
      "@type": "Place",
      name: "Filial — Rio de Janeiro/RJ",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Av. Rio Branco, 131, 17º andar, Sala 1703, Centro",
        addressLocality: "Rio de Janeiro",
        addressRegion: "RJ",
        postalCode: "20040-006",
        addressCountry: "BR",
      },
    },
  ],
  geo: {
    "@type": "GeoCoordinates",
    latitude: -11.7292,
    longitude: -49.0686,
  },
  hasMap: "https://maps.google.com/?q=Av.+Guanabara,+1669,+Centro+-+Gurupi,+TO",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  sameAs: ["https://www.instagram.com/gilsoncarvalho.adv/"],
};

export const jsonLdScript = (extra?: Record<string, unknown>) => ({
  type: "application/ld+json",
  children: JSON.stringify(extra ? { ...LOCAL_BUSINESS_JSONLD, ...extra } : LOCAL_BUSINESS_JSONLD),
});
