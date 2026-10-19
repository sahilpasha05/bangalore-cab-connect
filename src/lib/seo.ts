export const SITE = "https://www.bangalorecabrental.com";
export const BUSINESS = {
  name: "Bangalore Cab Rental",
  phone: "+918147260587",
};

export type Crumb = { name: string; path: string };
export type Faq = { q: string; a: string };

export const breadcrumbLd = (crumbs: Crumb[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: SITE + c.path,
  })),
});

export const faqLd = (faqs: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const serviceLd = (name: string, description: string, path: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  url: SITE + path,
  areaServed: { "@type": "City", name: "Bangalore" },
  provider: { "@type": "LocalBusiness", name: BUSINESS.name, telephone: BUSINESS.phone, url: SITE },
});

export function seoHead(opts: {
  title: string;
  description: string;
  path: string;
  ld?: object[];
}) {
  return {
    meta: [
      { title: opts.title },
      { name: "description", content: opts.description },
      { property: "og:title", content: opts.title },
      { property: "og:description", content: opts.description },
      { property: "og:url", content: SITE + opts.path },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: SITE + opts.path }],
    scripts: (opts.ld ?? []).map((o) => ({
      type: "application/ld+json",
      children: JSON.stringify(o),
    })),
  };
}
