# CMS

The content manager for this site. Edit pages and posts without touching code.

Built on [Decap CMS](https://decapcms.org).

## TLDR

Open `/admin`, sign in, fill in forms, press save. The site rebuilds and publishes itself.

## How saving works

No database. Every field maps to a plain text file in this repo, and every save is a normal git commit with your name on it. You get full history, easy undo, and one source of truth.

## Setting it up

1. Edit `config.yml` — set `repo` to your GitHub repo and `base_url` to your domain.
2. Create a GitHub OAuth app, then add `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` to your Cloudflare Pages environment variables. Full steps in [`functions/install.md`](../../functions/install.md).
3. Deploy. The OAuth handlers in `functions/api/` do the rest.

`config.yml` ships annotated. It defines two collection shapes — `files` for global data in `src/_data/`, `folder` for markdown content — which between them cover most of what a site needs.

## Local preview

```bash
bun install
bun run admin
```

Runs the site and editor together against files on your own machine. Nothing touches the live repo.

## Spinning things up with bunx

`bunx` runs a package straight from the registry, no install and no entry in `package.json`. Handy when you want one piece at a time.

Two moving parts. Run each in its own terminal:

```bash
# 1. The editor backend — lets the CMS write to your working copy
bunx decap-server --port 8081 --cors

# 2. The site itself, with live reload
cd src && bunx @11ty/eleventy --serve --output=../dist
```

Then open `http://localhost:8080/admin/`.

Eleventy serves on 8080 and the editor backend listens on 8081. The `cd src` matters — Eleventy's input directory is the folder it runs from.

A few more that need no install:

```bash
bunx @11ty/eleventy --serve --incremental   # rebuild only what changed
bunx @11ty/eleventy --dryrun                # build without writing files
bunx @11ty/eleventy --help                  # every flag
```

Add `@latest` to any of them to skip a cached copy.

## One thing to know

Everything in this folder is published with the site. `config.yml` is readable at `/admin/config.yml` once deployed. Never put a secret in it.
