import type { Review } from "@/types/review";
import { ReviewCard } from "@/components/ReviewCard";

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
          <ReviewCard key={r.id} review={r} />
        ))}

        {reviews.length === 0 && <p style={{ marginTop: 16, opacity: 0.7 }}>レビューがまだありません</p>}
      </div>
    </main>
  );
}