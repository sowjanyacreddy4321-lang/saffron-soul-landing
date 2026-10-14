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

## Application architecture
- Keep this restaurant experience on the index route with native in-page anchor navigation; the requested single scrolling page needs consistent section scrolling.
- Keep menu, review and gallery sample data in `src/data/restaurant.ts`, reusable sections in `src/components/restaurant`, and validation in `src/lib/reservation.ts`; this separates content, presentation and business rules.
- Preserve TanStack Start and the existing Lovable Vite integration; alternate deployments must not replace the running platform configuration.
- Use shared Button controls and semantic CSS design tokens; this keeps interactive states and styling consistent.
- Load CDN media from committed asset pointers and retain explicit image fallbacks; this avoids hotlinked runtime dependencies and broken images.
