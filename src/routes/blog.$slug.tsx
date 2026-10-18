import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Section, FaqList, Breadcrumbs, TableBox, HubLinks } from "@/components/site/Seo";
import { Button } from "@/components/ui/button";
import { openBooking } from "@/lib/booking-dialog";
import { getPost, posts, type Block } from "@/data/posts";
import { getRoute } from "@/data/routes";
import { breadcrumbLd, faqLd, seoHead, SITE, BUSINESS } from "@/lib/seo";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const p = getPost(params.slug);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => {
    const p = loaderData!;
    const path = `/blog/${p.slug}`;
    return seoHead({
      title: p.title,
      description: p.description,
      path,
      ld: [
        breadcrumbLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: p.title, path }]),
        faqLd(p.faqs),
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: p.title,
          description: p.description,
          datePublished: p.date,
          dateModified: p.date,
          mainEntityOfPage: SITE + path,
          author: { "@type": "Organization", name: BUSINESS.name },
          publisher: { "@type": "Organization", name: BUSINESS.name, logo: { "@type": "ImageObject", url: SITE + "/logo.png" } },
          image: SITE + "/og-image.png",
        },
      ],
    });
  },
  component: PostPage,
});

function render(b: Block, i: number) {
  switch (b.t) {
    case "h2":
      return <h2 key={i} className="mt-10 text-2xl font-bold tracking-tight">{b.text}</h2>;
    case "p":
      return <p key={i} className="mt-4 leading-relaxed text-foreground/90">{b.text}</p>;
    case "ul":
      return (
        <ul key={i} className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-foreground/90">
          {b.items.map((x) => <li key={x}>{x}</li>)}
        </ul>
      );
    case "note":
      return <p key={i} className="mt-4 rounded-xl bg-secondary p-4 text-sm text-muted-foreground">{b.text}</p>;
    case "table":
      return (
        <div key={i} className="mt-4">
          <TableBox>
            <table className="w-full min-w-[480px] text-left text-sm tabular-nums">
              <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
                <tr>{b.head.map((h) => <th key={h} className="px-4 py-3">{h}</th>)}</tr>
              </thead>
              <tbody>
                {b.rows.map((r, ri) => (
                  <tr key={ri} className="border-t border-border/60">
                    {r.map((c, ci) => <td key={ci} className={`px-4 py-3 ${ci === 0 ? "font-medium" : ""}`}>{c}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </TableBox>
        </div>
      );
  }
}

function PostPage() {
  const p = Route.useLoaderData();
  const path = `/blog/${p.slug}`;
  const more = posts.filter((x) => x.slug !== p.slug);
  return (
    <>
      <section className="gradient-hero text-white">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-14">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: "Guide", path }]} />
          <h1 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">{p.title}</h1>
          <p className="mt-3 text-sm text-white/75">By Bangalore Cab Rental · {p.date} · {p.readMins} min read</p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 pb-6 pt-8 sm:px-6">
        {p.body.map(render)}

        <div className="mt-10 rounded-2xl gradient-hero p-6 text-white">
          <p className="text-lg font-semibold">Planning this trip? Share your dates and pickup point and we confirm the fare.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button onClick={() => openBooking(p.route ? { drop: getRoute(p.route)?.to } : {})} className="gradient-cta border-0 font-semibold text-whatsapp-foreground">Book this trip</Button>
            {p.route && (
              <Link to="/routes/$slug" params={{ slug: p.route }} className="inline-flex items-center rounded-md border border-white/30 px-4 text-sm font-semibold hover:bg-white/10">
                See full rates for this route
              </Link>
            )}
          </div>
        </div>
      </article>

      <Section title="Frequently asked questions"><FaqList faqs={p.faqs} /></Section>

      {more.length > 0 && (
        <Section title="More guides">
          <div className="flex flex-wrap gap-2">
            {more.map((m) => (
              <Link key={m.slug} to="/blog/$slug" params={{ slug: m.slug }} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium hover:border-foreground/40">{m.title}</Link>
            ))}
          </div>
        </Section>
      )}
      <Section title="Explore more"><HubLinks /></Section>
    </>
  );
}
