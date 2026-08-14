---
layout: base.njk
title: Hello World
date: 2026-08-14
summary: The one post that ships with the starter. Delete it once yours exist.
---

This file is plain markdown with front matter on top. The CMS at `/admin`
edits exactly these fields — `title`, `date`, `summary`, and the body you
are reading — and saves the result straight back here as a git commit.

Nothing else is involved. No database, no export step, no lock-in. If you
prefer your editor, open the file. If you prefer a form, open `/admin`.
Both write the same thing.

## Try the swap

Click back to the [home page](/). The content changes, the address bar
updates, but the page never reloads and the stylesheet is never re-fetched.
That is Startr Swap, and the entire integration is one `<script defer>` tag
plus `data-swap` on the region that changes.

Turn it off for any link by adding `data-swap-off`. Turn it off everywhere
by deleting the script tag. Nothing else in this site depends on it.
