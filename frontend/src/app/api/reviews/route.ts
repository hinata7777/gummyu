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