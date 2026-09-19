import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, productBySlug } from "@/lib/data";
import { ProductDetail } from "@/components/ProductDetail";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { Heart } from "@/components/Doodles";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Custom Cake`,
    description: `${product.desc.slice(0, 150)} Order online from Kekki Cakery, Singapore.`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  const sameCat = PRODUCTS.filter((p) => p.category === product.category && p.slug !== slug);
  const others = PRODUCTS.filter((p) => p.category !== product.category && p.slug !== slug);
  const related = [...sameCat, ...others].slice(0, 4);

  return (
    <>
      <ProductDetail product={product} />

      <section className="border-t border-lav-line bg-lav-soft/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-black tracking-tight text-ink">
              Pairs beautifully with
              <Heart className="ml-3 inline size-6 text-blush-deep" />
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.07}>
                <ProductCard product={p} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
