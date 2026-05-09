import { Deployment } from "@/components/deploymentstable";
import { getPool } from "@/lib/db";

interface DeploymentRow {
  id: number | string;
  name: string;
  status: string;
  url: unknown;
  metrics_url: string | null;
}

function toLabel(value: string, index: number) {
  const normalized = value
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!normalized) {
    return `App URL ${index + 1}`;
  }

  return normalized.replace(/\b\w/g, (char) => char.toUpperCase());
}

function getDefaultUrlLabel(index: number) {
  const defaultLabels = ["Application URL", "Canary URL", "Stable URL"];

  return defaultLabels[index] ?? `App URL ${index + 1}`;
}

function normalizeParsedDeploymentUrls(parsed: unknown) {
  if (Array.isArray(parsed)) {
    return parsed
      .flatMap((entry, index) => {
        if (typeof entry === "string") {
          return [{ label: getDefaultUrlLabel(index), href: entry }];
        }

        if (
          entry &&
          typeof entry === "object" &&
          "url" in entry &&
          typeof entry.url === "string"
          ) {
            const label =
              "name" in entry && typeof entry.name === "string"
                ? entry.name
                : getDefaultUrlLabel(index);

            return [{ label, href: entry.url }];
          }

        return [];
      })
      .filter((entry) => entry.href.trim());
  }

  if (parsed && typeof parsed === "object") {
    return Object.entries(parsed)
      .flatMap(([key, value], index) => {
        if (typeof value === "string") {
          return [{ label: toLabel(key, index), href: value }];
        }

        if (
          value &&
          typeof value === "object" &&
          "url" in value &&
          typeof value.url === "string"
        ) {
          const label =
            "name" in value && typeof value.name === "string"
              ? value.name
              : toLabel(key, index);

          return [{ label, href: value.url }];
        }

        return [];
      })
      .filter((entry) => entry.href.trim());
  }

  return [];
}

function parseDeploymentUrls(rawUrl: unknown) {
  if (!rawUrl) {
    return [];
  }

  if (Array.isArray(rawUrl) || typeof rawUrl === "object") {
    return normalizeParsedDeploymentUrls(rawUrl);
  }

  if (typeof rawUrl !== "string") {
    return [];
  }

  const trimmedUrl = rawUrl.trim();

  if (!trimmedUrl) {
    return [];
  }

  try {
    return normalizeParsedDeploymentUrls(JSON.parse(trimmedUrl) as unknown);
  } catch {
    // Fall through to plain text parsing for legacy values.
  }

  return trimmedUrl
    .split(/\s*[\n,]\s*/)
    .map((value) => value.trim())
    .filter(Boolean)
    .map((href, index) => ({
      label: getDefaultUrlLabel(index),
      href,
    }));
}

export async function fetchDeployments(): Promise<Deployment[]> {
  const pool = getPool();
  const result = await pool.query<DeploymentRow>(`
    SELECT
      id,
      deployment_name AS name,
      status,
      deployment_url AS url,
      metric_url AS metrics_url
    FROM deployments
    ORDER BY id DESC
  `);

  return result.rows.map((row) => ({
    id: row.id,
    name: row.name,
    status: row.status,
    deploymentUrls: parseDeploymentUrls(row.url),
    metricsUrl: row.metrics_url ?? undefined,
  }));
}
