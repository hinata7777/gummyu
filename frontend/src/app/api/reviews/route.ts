export async function GET() {
  const res = await fetch("http://localhost:3000/api/reviews", {
    cache: "no-store",
  });

  const data = await res.json();

  return Response.json(data, { status: res.status });
}