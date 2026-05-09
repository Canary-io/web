const defaultUserAuthServiceBaseUrl = "http://localhost:4001";

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

export function getUserAuthServiceBaseUrl() {
  const configuredBaseUrl = process.env.NEXT_PUBLIC_USER_AUTH_SERVICE;

  if (!configuredBaseUrl) {
    return defaultUserAuthServiceBaseUrl;
  }

  return trimTrailingSlash(configuredBaseUrl);
}

export function getUserAuthServiceUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${getUserAuthServiceBaseUrl()}${normalizedPath}`;
}
