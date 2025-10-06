app_name = "custom_theme_v15"
app_title = "Custom Theme v15"
app_publisher = "ChatGPT"
app_description = "A customizable theme scaffold for ERPNext v15"
app_icon = "octicon octicon-color-mode"
app_color = "green"
app_email = "you@example.com"
app_license = "MIT"

# Desk includes (order matters: your material_theme should load after base custom_theme)
app_include_css = [
    "/assets/custom_theme_v15/css/custom_theme.css",
    "/assets/custom_theme_v15/css/material_theme.css"
]
app_include_js = [
    "/assets/custom_theme_v15/js/custom_theme.js",
    "/assets/custom_theme_v15/js/material_theme.js"
]

# Website (public) includes - optional
web_include_css = "/assets/custom_theme_v15/css/material_theme.css"
web_include_js = "/assets/custom_theme_v15/js/material_theme.js"

# Build
# build.json already contains the primary assets; ensure bench build picks them up
