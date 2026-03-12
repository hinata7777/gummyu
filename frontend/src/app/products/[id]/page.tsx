import type { Product, Review } from "@/types/review";
import { ReviewCard } from "@/components/ReviewCard";

async function fetchProduct(id: string): Promise<Product | null> {
  const res = await fetch(`http://localhost:3001/api/products/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

async function fetchReviews(id: string): Promise<Review[]> {
  const res = await fetch(`http://localhost:3001/api/products/${id}/reviews`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await fetchProduct(id);
  const reviews = await fetchReviews(id);

  if (!product) {
    return (
      <main style={{ padding: 16 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>商品が見つかりません</h1>
      </main>
    );
  }

  return (
    <main style={{ padding: 16, display: "grid", gap: 16 }}>
      <section style={{ display: "grid", gap: 8 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>{product.name}</h1>
        {product.product_url && (
          <a
            href={product.product_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 14 }}
          >
            外部の商品ページを見る
          </a>
        )}
      </section>

      <section style={{ display: "grid", gap: 12 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700 }}>この商品のレビュー</h2>
        {reviews.map((r) => (
          <ReviewCard key={r.id} review={r} showProductName={false} />
        ))}
        {reviews.length === 0 && (
          <p style={{ marginTop: 8, opacity: 0.7 }}>この商品にはまだレビューがありません</p>
        )}
      </section>
    </main>
  );
}
