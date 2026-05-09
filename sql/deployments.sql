CREATE TABLE IF NOT EXISTS deployments (
  id BIGSERIAL PRIMARY KEY,
  github_id TEXT NOT NULL,
  deployment_name TEXT NOT NULL,
  repo_url TEXT,
  tag TEXT,
  status TEXT NOT NULL,
  deployment_url TEXT,
  metric_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE deployments
  ADD COLUMN IF NOT EXISTS repo_url TEXT;

ALTER TABLE deployments
  ADD COLUMN IF NOT EXISTS tag TEXT;

INSERT INTO deployments (
  github_id,
  deployment_name,
  repo_url,
  tag,
  status,
  deployment_url,
  metric_url
) VALUES
  (
    '123456789',
    'orca-test',
    'https://github.com/Canary-io/Test-Docker-Build',
    'v2',
    'Running',
    'https://orca-test.example.com',
    'https://grafana.example.com/orca-test'
  ),
  (
    '987654321',
    'payments-api',
    'https://github.com/Canary-io/payments-api',
    'v1.4.0',
    'Pending',
    'https://payments.example.com',
    NULL
  );
