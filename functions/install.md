# GitHub OAuth on Cloudflare Pages

The CMS signs in through a GitHub OAuth app. Two Cloudflare Pages Functions — `functions/api/auth.js` and `functions/api/callback.js` — run the flow, and Cloudflare Pages supplies the credentials.

## 1. Create the GitHub OAuth app

Go to Settings → Developer settings → OAuth Apps and create a new OAuth App.

- **Application name:** anything you like.
- **Homepage URL:** your site's URL, e.g. `https://example.com`.
- **Redirect URI:** your site's URL too — the plain domain, e.g. `https://example.com`. GitHub accepts any redirect URI that is a subdirectory of a registered one, and the handler redirects to `https://example.com/api/callback`, so the plain domain is enough. No wildcard matching needed.
- **Application description:** optional.

GitHub gives you a **Client ID** and lets you generate a **Client Secret**. You need both.

## 2. Add the credentials to Cloudflare Pages

In your Cloudflare Pages project, go to Settings → Environment variables and add:

- `GITHUB_CLIENT_ID` — the Client ID above
- `GITHUB_CLIENT_SECRET` — the Client Secret above

Add them to Production. Add them to the Preview environment too if you want to sign in on preview deploys.

## 3. Wire the CMS config

The files are already in this repo:

- `functions/api/` — the two OAuth handlers, mounted at `/api/auth` and `/api/callback`.
- `src/admin/` — the CMS. `config.yml` is a starter: set `repo` to `your-org/your-repo`, `branch` to `main`, and `base_url` to your site URL — the same domain you registered above. `auth_endpoint: /api/auth` already matches the handler's path, so you can leave it alone.

Never put a secret in `config.yml` — it's served publicly once deployed.

## 4. Sign in

Publish your site and open `/admin/`. You should see a "Login with GitHub" button. The account signing in needs write access to the repo — the handlers request the `repo` scope.

## Testing the handlers locally

`bun run admin` uses decap-server's local backend and writes to your working copy, so it never exercises the OAuth flow. To run the handlers against local Functions, use Wrangler:

```bash
bun run wrangler:dev   # wrangler pages dev dist
```

Put the two variables in a `.dev.vars` file in the repo root; Wrangler reads it for local dev. Don't commit it.
