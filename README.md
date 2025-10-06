# custom_theme_v15

A scaffold Frappe theme app tailored for **ERPNext v15**. This app injects CSS/JS and provides a modular structure
so you can add theme *variants*, CSS variables, and optional JS behavior.

## Features included in scaffold
- `public/css/custom_theme.css` — base CSS with CSS variables and example variants (light/dark/compact).
- `public/js/custom_theme.js` — lightweight JS to toggle variants from `window.customTheme`.
- `templates/includes/custom_head.html` — included head snippet to load a theme settings JSON if needed.
- `hooks.py` — registers CSS/JS assets to the Desk.
- `build.json` — asset bundling stub.
- `README` with install & extend instructions.

## Install (on your bench)
1. From your bench directory:
   ```bash
   bench get-app /path/to/this/custom_theme_v15
   bench --site your-site install-app custom_theme_v15
   bench build
   bench restart
   ```
2. After install, open the Desk and verify styles load. Use `window.customTheme.setVariant('dark')` in console to switch.

## Extend
- Add more CSS variables in `custom_theme_v15/public/css/custom_theme.css`.
- Create a DocType `Theme Settings` to store company palettes and load via `frappe.db.get_single("Theme Settings")`.
- Add server-side hooks, API endpoints, and build scripts as needed.

## Notes
This is a scaffold (starter). You should test on staging and adapt DOM selectors if ERPNext updates change markup.
