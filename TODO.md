# TODO

Roadmap for WEB-Startr.site. Newest decisions at the top of each section.

## 🔥 Blockers

- [ ] **Settle the Startr Swap licence upstream to match this repo.** Decided MIT here on 2026-08-14, but `WEB-AI--Sage-is-AI-UI` still carries three conflicting answers — `LICENSE` says AGPL-3.0, `LICENSE.txt` says MIT (© 2023 OpenCo and Startr, © 2020 ciar4n), `package.json` says ISC. Until that is resolved, this repo's MIT and the source repo's AGPL disagree about the same file. Fix upstream, then confirm the two match. Related: `WEB-Startr.Style/TODO.md` carries the same item, and `WEB-AI--Sage-is-AI-UI/docs/decisions/2026-08-09-startr-swap-link-swapping.md` has the reasoning. #licence #critical

## 📦 Next

- [ ] **Pin the startr.style version.** `src/_includes/base.njk` links `https://startr.style/style.css` unversioned, so an upstream change lands in every consumer without warning. Pin once the framework ships versioned URLs.
- [ ] **Publish Startr Swap properly** at `/v1/swap.js` and `/swap.js` with SRI, then decide whether this starter vendors it or points at the CDN. Vendoring means zero third-party requests and air-gapped deploys behaving the same; the CDN means one fix reaches every consumer.
- [ ] **Port the Startr Swap self-test.** `make swap_check` enforces the size ceiling but nothing proves the gate can fail. The AI-UI repo has a self-test for exactly this — port it.
- [ ] **Port the swap fixture pages** from AI-UI (`cypress/fixtures/swap/a.html`, `b.html`, plus `none.html` which loads the script, declares no region, and carries a `<main>` on purpose). The third one is the interesting case.

## 🌱 Later

- [ ] **Decide whether the CMS ships behind a password wall.** Sage.is wraps `/admin` in StatiCrypt. This starter does not — GitHub OAuth is the only gate, which is the honest default. Document the trade-off rather than adding the wall by reflex.
- [ ] **Add an OG image generator.** Every Startr site ends up wanting one.
- [ ] **Sample form for `data-swap-target`.** The search-form-above-its-results case is the one people ask about, and nothing here demonstrates it.
- [ ] **Consider a `--dry-run` for `make deploy`.** CapRover deploys are hard to take back.

## ✅ Done

- [x] **Scaffold the repo** (2026-08-14): Eleventy config, base layout, sample post, CMS, OAuth handlers, Docker, CapRover, house Makefile and gitignore.
- [x] **Licence this repo MIT** (2026-08-14): `LICENSE` at root, SPDX + copyright header on the vendored `startr-swap.js`, htmz attribution preserved in both. MIT was chosen because the script exists to be dropped into other people's static sites, which copyleft would forbid. Upstream still disagrees — see the blocker.
