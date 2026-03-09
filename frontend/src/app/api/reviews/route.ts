export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    return Response.json(
      { error: "NEXT_PUBLIC_API_BASE_URL is not set" },
      { status: 500 }
    );
  }

  const res = await fetch(`${baseUrl}/api/reviews`, { cache: "no-store" });
  const data = await res.json();

  return Response.json(data, { status: res.status });
}

export async function POST(request: Request) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    return Response.json({ error: "NEXT_PUBLIC_API_BASE_URL is not set" }, { status: 500 });
  }

  const payload = await request.json();
  // 期待する形: { product_id: number, review: { body, flavor_rating, texture_rating, hardness_level } }
  const productId = payload?.product_id;
  const review = payload?.review;

  if (!productId || !review) {
    return Response.json({ error: "product_id and review are required" }, { status: 400 });
  }

  const res = await fetch(`${baseUrl}/api/products/${productId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({ review }),
  });

  const data = await res.json();
  return Response.json(data, { status: res.status });
}