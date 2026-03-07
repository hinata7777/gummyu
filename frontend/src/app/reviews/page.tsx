import type { Review } from "@/types/review";

async function fetchReviews(): Promise<Review[]> {
  const res = await fetch("http://localhost:3001/api/reviews", { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default async function ReviewsPage() {
  const reviews = await fetchReviews();

  return (
    <main style={{ padding: 16 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>最新レビュー</h1>

      <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
        {reviews.map((r) => (
          <article key={r.id} style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
            <div style={{ fontWeight: 700 }}>{r.product?.name ?? `product_id=${r.product_id}`}</div>
            <div style={{ marginTop: 6 }}>{r.body}</div>
            <div style={{ marginTop: 8, fontSize: 12, opacity: 0.7 }}>
              味 {r.flavor_rating} / 食感 {r.texture_rating} / 固さ {r.hardness_level}
            </div>
            <div style={{ marginTop: 8, fontSize: 12, opacity: 0.6 }}>
              {new Date(r.created_at).toLocaleString()}
            </div>
          </article>
        ))}

        {reviews.length === 0 && <p style={{ marginTop: 16, opacity: 0.7 }}>レビューがまだありません</p>}
      </div>
    </main>
  );
}