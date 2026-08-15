# WEB-Startr.site

A small starter for the stack we keep rebuilding: **Eleventy + Decap CMS + startr.style + Startr Swap**, deployed on Cloudflare Pages.

Clone it, change the config, and you have a static site with a real CMS behind it.

## TLDR

```bash
bun install
bun run start     # site at localhost:8080
bun run admin     # site + CMS editor together
```

## What is in the box

| Piece | What it does | Where |
|---|---|---|
| [Eleventy](https://11ty.dev) | Markdown and Nunjucks in, static HTML out | `src/` |
| [Decap CMS](https://decapcms.org) | Forms at `/admin`, every save a git commit | `src/admin/` |
| [startr.style](https://startr.style) | Layout through inline `--prop` attributes | `src/_includes/base.njk` |
| Startr Swap | Links swap in place, no page reload | `src/assets/js/startr-swap.js` |
| OAuth handlers | GitHub login for the CMS | `functions/api/` |

No client framework. No database. No build step for the CSS or the JS.

## Getting started

1. **Point it at your repo.** In `src/admin/config.yml`, set `repo` to `your-org/your-repo` and `base_url` to your domain. In `src/_data/site.yaml`, set the title, description, and URL.
2. **Set up GitHub OAuth.** The CMS signs in with a GitHub OAuth app — the handlers in `functions/api/` run the flow, and Cloudflare Pages supplies the credentials. One-time setup:

   **Create the GitHub OAuth app** — [Settings → Developer settings → OAuth Apps](https://github.com/settings/developers) → New OAuth App:
   - Homepage URL: `https://your-domain.com`
   - **Redirect URI: `https://your-domain.com`** — the plain domain. GitHub accepts any redirect beneath it, so the handler's `/api/callback` (hardcoded in `functions/api/auth.js`) is covered without pinning the exact path. Don't tick "Allow wildcard matching" unless you control every subdomain.
   - Copy the **Client ID**, generate a **Client Secret**.

   **Add the credentials to Cloudflare Pages** — Settings → Environment variables: `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`. Add them to Production; also Preview if you want login on preview deploys.

   **Wire the config** — in `src/admin/config.yml`, set `repo` to `your-org/your-repo`, `branch` to `main`, and `base_url` to the same domain as above. `auth_endpoint: /api/auth` already matches the handler.

   Login then flows: `/admin` → "Login with GitHub" → `/api/auth` → github.com → `/api/callback` → token handed to the CMS in your browser, never stored server-side.

   Local `bun run admin` never hits this flow — decap-server writes to your working copy directly. To exercise the handlers locally, `bun run wrangler:dev` with a `.dev.vars` file holding the two variables. And the signing-in GitHub account needs write access to the repo, since the handlers request the `repo` scope. Full walkthrough: [`functions/install.md`](functions/install.md).
3. **Deploy.** Point Cloudflare Pages at the repo with build command `bun run build` and output directory `dist`.
4. **Write.** Open `/admin`, or edit the markdown in `src/posts/` directly. Both do the same thing.

## Startr Swap

Same-origin links and forms swap in place instead of reloading, wrapped in a CSS View Transition. The integration is one script tag and one attribute:

```html
<script defer src="/assets/js/startr-swap.js"></script>
<main data-swap> … </main>
```

Three attributes are the whole API:

- `data-swap` on a region marks it. A value narrows link takeover to a path prefix, and nested regions inherit it.
- `data-swap-target` on a control updates *that* region instead of the one the control sits in — for a search form above its own results, say.
- `data-swap-off` on a control means never.

Four events fire on the region, all bubbling and cancelable: `swap:before`, `swap:navigate`, `swap:after`, `swap:error`. Cancel `swap:navigate` to take the address bar back.

Its lineage is [htmz](https://leanrada.com/htmz/) (MIT, © Lean Rada), whose hash-names-the-target convention it keeps. The hidden iframe does not survive — an iframe performs a real navigation, so scripts in the response execute in the wrong document and every swap re-requests the page's stylesheets. `fetch` plus `DOMParser` parses inert.

If no `[data-swap]` exists in the document, the script does nothing and every link navigates. That is the correct answer, not a degraded one.

Size is held by a ratchet:

```bash
make swap_check    # fails if gzipped size exceeds half of htmx gzipped
```

## Make targets

```bash
make help          # list everything
make verify        # resolve variables, check tooling, enumerate targets
make swap_check    # Startr Swap size ratchet
make build         # static build into dist/
make deploy        # CapRover, if you use it
```

Release flow is git-flow-next: `develop` is where work happens, `master` is the distributable cut. `make minor_release`, then `make release_finish`.

## Layout

```
functions/api/       GitHub OAuth handlers (Cloudflare Pages Functions)
src/_data/           Site-wide data, exposed to templates
src/_includes/       Layouts
src/admin/           Decap CMS
src/assets/js/       Startr Swap
src/posts/           Markdown content
src/eleventy.config.js
```

## Notes

- The startr.style link is unversioned (`https://startr.style/style.css`). Pin a version before you depend on it in production.
- `src/admin/config.yml` is served publicly once deployed. No secrets in it.
- Docker and `captain-definition` are here for CapRover or a VPS. Cloudflare Pages needs neither.

## Other hosting and auth

This starter targets Cloudflare Pages + GitHub OAuth because it's the least setup for the most capability — not the only way we run these sites.

**Hosting:** the repo ships a `Dockerfile` and `captain-definition` for [CapRover](https://caprover.com) or any VPS (`make deploy`). Netlify and other static hosts work too. And hosting is coming to [startr.cloud](https://startr.cloud) soon — one-click deploys for starters like this one, so nobody has to touch Cloudflare's dashboard unless they want to.

**Auth:** Netlify Identity, other Git providers, or a self-hosted gate in front of `/admin`.

We use this starter ourselves — a part of our team builds sites for people, and this is what we reach for on every one. If you're in that same boat, tell us your stack and we'll wire the deploy and login that fits. Ping us at [startr.cloud](https://startr.cloud).

---

Built by [Startr](https://startr.cloud).
