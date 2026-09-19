// Database-free health check — this deployment runs entirely on
// curated dummy data, so there is no external dependency to probe.
export const dynamic = "force-static";

export function GET() {
  return Response.json({
    ok: true,
    service: "cakecraft-commerce",
    mode: "dummy-data",
    timestamp: new Date().toISOString(),
  });
}
