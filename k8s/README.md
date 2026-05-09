# Kubernetes manifests

These manifests deploy the Next.js web app and expose it at `http://www.orcademo.com`.

## Before applying

1. Build and push the app image, then replace `REPLACE_WITH_YOUR_IMAGE` in [deployment.yaml](/Users/josephjophy/Downloads/canary-io/web/k8s/deployment.yaml:1).
2. Copy [secret.example.yaml](/Users/josephjophy/Downloads/canary-io/web/k8s/secret.example.yaml:1) to `secret.yaml` and fill in your real `DATABASE_URL`.
3. Update [configmap.yaml](/Users/josephjophy/Downloads/canary-io/web/k8s/configmap.yaml:1) so `NEXT_PUBLIC_USER_AUTH_SERVICE` points at the auth/API service your browser should call.
4. Make sure `www.orcademo.com` DNS points at your ingress controller.

## Apply

```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/secret.yaml
kubectl apply -k k8s
```

## Notes

- The Ingress assumes an NGINX ingress controller via `ingressClassName: nginx`.
- The web app listens on container port `3000` and is exposed internally through a ClusterIP service on port `80`.
- The app still needs the separate auth/API backend to be reachable at the URL you place in `NEXT_PUBLIC_USER_AUTH_SERVICE`.
