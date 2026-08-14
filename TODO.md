# TODO

Roadmap for WEB-Startr.site. Newest decisions at the top of each section.

## 🔥 Blockers

- [ ] **Settle the Startr Swap licence before anyone depends on this repo.** `src/assets/js/startr-swap.js` is vendored from `WEB-AI--Sage-is-AI-UI` and carries **no licence header**. The source repo gives three conflicting answers — `LICENSE` says AGPL-3.0, `LICENSE.txt` says MIT (© 2023 OpenCo and Startr, © 2020 ciar4n), `package.json` says ISC. A stylesheet survives that ambiguity; a script meant to be dropped into other people's sites does not. AGPL rules out the use it was written for, MIT permits it. Pick one, add the header, and add a `LICENSE` to this repo to match. #licence #critical

## 📦 Next

- [ ] **Add a `LICENSE` file.** `package.json` currently claims MIT with nothing backing it. Resolve alongside the blocker above.
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
