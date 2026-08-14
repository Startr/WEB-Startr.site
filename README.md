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
2. **Set up GitHub OAuth.** Create an OAuth app, then add `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` to your Cloudflare Pages environment variables. Steps in [`functions/install.md`](functions/install.md).
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

---

Built by [Startr](https://startr.cloud).
