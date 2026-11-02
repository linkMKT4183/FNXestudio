<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Area accent is driven by `data-area` (estudio|salud|noticias) setting `--area`; components use `bg-area`/`text-area` tokens, never fixed accent colors — so one accent per section stays automatic.
- Site constants (WhatsApp number, messages, manual URL) live only in `src/config/site.ts`; every WhatsApp CTA goes through `WhatsAppButton`/`buildWhatsAppLink` so the empty-number fallback is consistent.
- News content lives in `src/data/noticias.ts` as plain data so new items are added without touching UI.
- Shared brand primitives (Logo, Pieces, Reveal, TenSeconds, Headline, Section) live in `src/components/fnx/`; reuse them instead of re-styling per page.
- Site photos are registered only in `src/data/imagenes.ts` (webp, sm+lg, Spanish alt) and rendered through `FnxImage` — so sizes, lazy-loading and alt text stay consistent; news photo choice comes from `newsImages()`.
