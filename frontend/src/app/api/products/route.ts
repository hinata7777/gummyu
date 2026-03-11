export async function GET(request: Request) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    return Response.json({ error: "NEXT_PUBLIC_API_BASE_URL is not set" }, { status: 500 });
  }

  const url = new URL(request.url, "http://localhost");
  const q = url.searchParams.get("q") ?? "";

  const res = await fetch(`${baseUrl}/api/products?q=${encodeURIComponent(q)}`, { cache: "no-store" });
  const data = await res.json();

  return Response.json(data, { status: res.status });
}

export async function POST(request: Request) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    return Response.json({ error: "NEXT_PUBLIC_API_BASE_URL is not set" }, { status: 500 });
  }

  const body = await request.json();

  const res = await fetch(`${baseUrl}/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return Response.json(data, { status: res.status });
}