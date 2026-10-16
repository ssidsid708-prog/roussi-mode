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

## Architecture
- Keep product entities and demo catalog in a browser-safe data module so future data services can replace the demo source without changing views.
- Share cart and order state through the store provider; session storage is only a frontend-preview adapter, not a real order system.
- Use leaf TanStack routes for storefront pages and global semantic CSS tokens for the monochrome RTL design.
