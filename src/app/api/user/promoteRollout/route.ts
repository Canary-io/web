import { getServerUserAuthServiceUrl } from "@/lib/userAuthServer";

function buildProxyHeaders(upstreamResponse: Response) {
  const headers = new Headers();
  const contentType = upstreamResponse.headers.get("content-type");
  const setCookie = upstreamResponse.headers.get("set-cookie");

  if (contentType) {
    headers.set("content-type", contentType);
  }

  if (setCookie) {
    headers.set("set-cookie", setCookie);
  }

  return headers;
}

export async function POST(request: Request) {
  try {
    const response = await fetch(
      getServerUserAuthServiceUrl("/user/promoteRollout"),
      {
        method: "POST",
        headers: {
          "content-type":
            request.headers.get("content-type") ?? "application/json",
          cookie: request.headers.get("cookie") ?? "",
        },
        body: await request.text(),
        cache: "no-store",
      },
    );

    return new Response(response.body, {
      status: response.status,
      headers: buildProxyHeaders(response),
    });
  } catch {
    return Response.json(
      { error: "The rollout backend is not reachable right now." },
      { status: 502 },
    );
  }
}
