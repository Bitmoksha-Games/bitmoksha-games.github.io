/*
 * Choose the theme used by all website iterations.
 * Set activeTheme to one of the names in themes, or add another palette.
 * Shared theme configuration
 * --------------------------
 * activeTheme: fallback theme name; it must match a key in `themes`.
 * A game can override it with its `theme` field in site-content.js.
 *
 * Each themes entry supports:
 *   background: page background.
 *   panel: navigation, information panel, and visual-stage surface.
 *   text: primary text. muted: secondary text.
 *   line: borders and dividers; accepts any CSS color, including rgba().
 *   accent: active tabs, headings, and primary highlights.
 *   secondary: prototype states and secondary highlights.
 *   lightSurface: contrasting light surface.
 *   lightText: text placed on the accent/light surface.
 *
 * All values must be valid CSS colors. Add another named object to `themes`
 * to create a palette; no CSS or JavaScript changes are required.
 */
window.siteThemeConfig = {
  activeTheme: "emberDusk",

  themes: {
    nightMoss: {
      background: "#0b1014",
      panel: "#11181d",
      text: "#eef2e8",
      muted: "#9da69f",
      line: "rgba(238, 242, 232, 0.14)",
      accent: "#c9f55d",
      secondary: "#ef745e",
      lightSurface: "#eef2e8",
      lightText: "#111619"
    },

    emberDusk: {
      background: "#171011",
      panel: "#211719",
      text: "#f5eee7",
      muted: "#b5a39c",
      line: "rgba(245, 238, 231, 0.15)",
      accent: "#ffb35c",
      secondary: "#ee6579",
      lightSurface: "#f3e7da",
      lightText: "#241719"
    },

    deepOcean: {
      background: "#071419",
      panel: "#0d2026",
      text: "#e7f3f1",
      muted: "#91aaa9",
      line: "rgba(231, 243, 241, 0.14)",
      accent: "#58e0c2",
      secondary: "#ff8d70",
      lightSurface: "#e4f0ed",
      lightText: "#092026"
    },

    galleryCharcoal: {
      background: "#0d0f12",
      panel: "#191c21",
      text: "#f1f2f3",
      muted: "#949aa3",
      line: "#30343b",
      accent: "#d8df62",
      secondary: "#df6f78",
      lightSurface: "#eceeef",
      lightText: "#171a1e"
    },

    midnightNavy: {
      background: "#101826",
      panel: "#192538",
      text: "#edf3fa",
      muted: "#91a0b4",
      line: "#314057",
      accent: "#65d7c0",
      secondary: "#ef8569",
      lightSurface: "#e8eef5",
      lightText: "#152235"
    },

    warmInk: {
      background: "#171311",
      panel: "#241d19",
      text: "#f4ede4",
      muted: "#ad9e91",
      line: "#3c3029",
      accent: "#dda85c",
      secondary: "#d56f72",
      lightSurface: "#efe6dc",
      lightText: "#261d19"
    },

    softConcrete: {
      background: "#e9e8e2",
      panel: "#f5f4ef",
      text: "#1d2321",
      muted: "#67706d",
      line: "#c7cbc5",
      accent: "#295f55",
      secondary: "#b55355",
      lightSurface: "#232b28",
      lightText: "#f1f3ee"
    },

    forestBlack: {
      background: "#121915",
      panel: "#1d2721",
      text: "#edf1e9",
      muted: "#96a298",
      line: "#344139",
      accent: "#d6b76c",
      secondary: "#d97862",
      lightSurface: "#e8ede6",
      lightText: "#19221c"
    }, 
    
    arcaneNocturne: {
      background: "#0c0b16",
      panel: "#171329",
      text: "#eeeaf7",
      muted: "#9c94b2",
      line: "rgba(190, 173, 226, 0.18)",
      accent: "#8de4d1",
      secondary: "#bd72e8",
      lightSurface: "#e9e2f1",
      lightText: "#21172d"
    }
  }
};

window.applySiteTheme = function applySiteTheme(themeName) {
  const config = window.siteThemeConfig;
  const selectedName = config.themes[themeName] ? themeName : config.activeTheme;
  const theme = config.themes[selectedName] || config.themes.nightMoss;
  const root = document.documentElement;
  root.dataset.theme = selectedName;
  Object.entries(theme).forEach(([name, value]) => {
    const cssName = name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
    root.style.setProperty(`--theme-${cssName}`, value);
  });
};
