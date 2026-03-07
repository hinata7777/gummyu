import type { Review } from "@/types/review";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
      <div style={{ fontWeight: 700 }}>{review.product?.name ?? `product_id=${review.product_id}`}</div>

      <div style={{ marginTop: 6 }}>{review.body}</div>

      <div style={{ marginTop: 8, fontSize: 12, opacity: 0.7 }}>
        味 {review.flavor_rating} / 食感 {review.texture_rating} / 固さ {review.hardness_level}
      </div>

      <div style={{ marginTop: 8, fontSize: 12, opacity: 0.6 }}>
        {new Date(review.created_at).toLocaleString()}
      </div>
    </article>
  );
}