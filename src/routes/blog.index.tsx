import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Seo";
import { posts } from "@/data/posts";
import { breadcrumbLd, seoHead } from "@/lib/seo";

export const Route = createFileRoute("/blog/")({
  head: () =>
    seoHead({
      title: "Travel Guides and Taxi Fares from Bangalore | Blog",
      description: "Practical guides for trips from Bangalore: taxi fares, distances, best time to travel and sample itineraries.",
      path: "/blog",
      ld: [breadcrumbLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }])],
    }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]}
        eyebrow="Guides"
        title="Travel guides from Bangalore"
        lead="Fares, distances and trip plans for the routes customers ask about most."
      />
      <Section title="Latest guides">
        <div className="grid gap-4 sm:grid-cols-2">
          {posts.map((p) => (
            <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="rounded-2xl border border-border/70 bg-card p-5 shadow-card transition-smooth hover:-translate-y-0.5 hover:shadow-elegant">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{p.date} · {p.readMins} min read</div>
              <h3 className="mt-2 text-lg font-bold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
