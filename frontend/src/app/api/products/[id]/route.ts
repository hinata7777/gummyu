export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    return Response.json({ error: "NEXT_PUBLIC_API_BASE_URL is not set" }, { status: 500 });
  }

  const { id } = await context.params;

  const res = await fetch(`${baseUrl}/api/products/${id}`, { cache: "no-store" });
  const data = await res.json();

  return Response.json(data, { status: res.status });
}
