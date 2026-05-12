const defaultUserAuthServiceBaseUrl = "http://localhost:4001";

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

export function getServerUserAuthServiceBaseUrl() {
  const configuredBaseUrl =
    process.env.USER_AUTH_SERVICE ?? process.env.NEXT_PUBLIC_USER_AUTH_SERVICE;

  if (!configuredBaseUrl) {
    return defaultUserAuthServiceBaseUrl;
  }

  return trimTrailingSlash(configuredBaseUrl);
}

export function getServerUserAuthServiceUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${getServerUserAuthServiceBaseUrl()}${normalizedPath}`;
}
