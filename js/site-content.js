/*
 * Shared website content
 * ----------------------
 * company
 *   name, tagline, description, email: displayed company text.
 *   logo: { src, alt }. `src` may point to an SVG or raster image.
 *   links: [{ label, url }]. Use "#" or an empty URL to show a disabled link.
 *   partners: [{ name, role, url }]. `role` is optional; disabled URLs work as above.
 *
 * games[]
 *   name: full display name. shortName: compact game-tab label.
 *   platform, status, description: displayed game information.
 *   theme: a theme name defined in theme-config.js; invalid/missing names use activeTheme.
 *   tags: array of short labels. links: [{ label, url }], using the same URL rules above.
 *
 *   visuals
 *     style: "default" | "phones" | "photographs" | "filmstrip" | "contact-sheet" | "postcards" | "polaroids".
 *       "default" always shows one screenshot per page; grouped styles use screenshotsPerPage.
 *     screenshotsPerPage: positive integer used by every grouped style.
 *     layout: "clean" | "fan" | "stagger" | "hero" | "custom".
 *     rotationStep, maxRotation, offsetStep: optional numeric layout tuning values.
 *     custom layout only: rotations: number[], offsets: [{ x, y }], scales: number[].
 *
 *   screenshots[]
 *     Each entry may be a path string or { src, alt, fit, orientation, caption }.
 *     fit: "contain" (default) | "cover"; used by the default visual style.
 *     orientation: "portrait" (default) | "landscape"; used by phone frames.
 */
window.siteContent = {
  company: {
    name: "BitMoksha Games",
    tagline: "Free the bit",
    description: "Games that are fun to play.",
    email: "contact@bitmoksha.com",
    logo: { src: "images/bitmoksha_logo.svg", alt: "PGC" },
    links: [
      { label: "Steam", url: "#" },
      { label: "Instagram", url: "#" },
      { label: "YouTube", url: "#" }
    ],
    partners: [
      { name: "Creative.Labs", role: "Development partner", url: "https://creative-ls.com/" },
      { name: "Amey", role: "Art and animation", url: "https://www.linkedin.com/in/ameynaikartist/" }
    ]
  },
  games: [
    {
      name: "Dottraction",
      shortName: "Dottraction",
      theme: "arcaneNocturne",
      visuals: { style: "phones", screenshotsPerPage: 2, layout: "stagger" }, 
      platform: "Mobile",
      status: "In development",
      description: "Survive the hordes and collect resources for the survival of your planet.",
      tags: ["Space", "Single player"],
      links: [
        // { label: "Google Play", url: "https://www.google.com/" },
        // { label: "App Store", url: "https://www.apple.com" }
      ],
      screenshots: [
        { src: "games/dottraction/scr00_mainmenu.png", alt: "Dottraction MainMenu", fit: "contain", orientation: "landscape" }, 
        { src: "games/dottraction/scr03_gamescene_01.png", alt: "Dottraction GameScene", fit: "contain", orientation: "landscape" },
        { src: "games/dottraction/scr01_mainmenu.png", alt: "Dottraction MainMeny", fit: "contain", orientation: "landscape"  }, 
        { src: "games/dottraction/scr02_gamescene_01.png", alt: "Dottraction GameScene", fit: "contain", orientation: "landscape" }
      ]
    },
    {
      name: "Minefield Mayhem",
      shortName: "Minefield Mayhem",
      theme: "forestBlack",
      visuals: { style: "phones", screenshotsPerPage: 4, layout: "stagger" },
      platform: "Mobile",
      status: "In development",
      description: "Find the mines.",
      tags: ["Strategy", "Puzzle", "Mobile first"],
      links: [
        { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.bitmoksha.minefieldmayhempvp" },
        // { label: "App Store", url: "https://www.apple.com" }
      ],
      screenshots: [
        { src: "games/minefieldmayhem/scr00_loading.png", alt: "Minefield Mayhem loading", fit: "contain", orientation: "portrait" }, 
        { src: "games/minefieldmayhem/scr01_homescreen.png", alt: "Minefield Mayhem HomeScreen", fit: "contain", orientation: "portrait" }, 
        { src: "games/minefieldmayhem/scr02_gamescene.png", alt: "Minefield Mayhem GameScene", fit: "contain", orientation: "portrait" }, 
        { src: "games/minefieldmayhem/scr03_gameresult_win.png", alt: "Minefield Mayhem Game Win Scene", fit: "contain", orientation: "portrait" }
      ]
    },
    {
      name: "AYLI",
      shortName: "AYLI",
      theme: "emberDusk",
      visuals: { style: "default", screenshotsPerPage: 1 }, 
      platform: "Steam",
      status: "Ideation / prototype",
      description: "Take the drive of your life.",
      tags: ["Driving Simulator", "Atmospheric", "PC"],
      links: [{ label: "Steam", url: "https://store.steampowered.com/" }],
      screenshots: [
        { src: "images/scr_ayli.png", alt: "Placeholder for a Project Signal prototype screenshot", fit: "contain", orientation: "landscape" }, 
        { src: "images/scr_ayli.png", alt: "Placeholder for a Project Signal prototype screenshot", fit: "contain", orientation: "landscape" }, 
        { src: "images/scr_ayli.png", alt: "Placeholder for a Project Signal prototype screenshot", fit: "contain", orientation: "landscape" }, 
        { src: "images/scr_ayli.png", alt: "Placeholder for a Project Signal prototype screenshot", fit: "contain", orientation: "landscape" }, 
      ]
    }
  ], 
  debug_tests: [
    {
      name: "AYLI Tests",
      shortName: "AYLI tests",
      theme: "emberDusk",
      visuals: { style: "polaroids", screenshotsPerPage: 3, layout: "fan", rotationStep: 12 }, 
      platform: "Steam",
      status: "Ideation / prototype",
      description: "Take the drive of your life.",
      tags: ["Driving Simulator", "Atmospheric", "PC"],
      links: [{ label: "Steam", url: "https://store.steampowered.com/" }],
      screenshots: [
        { src: "images/scr_ayli.png", alt: "Placeholder for a Project Signal prototype screenshot", fit: "contain", orientation: "landscape" }, 
        { src: "images/scr_ayli.png", alt: "Placeholder for a Project Signal prototype screenshot", fit: "contain", orientation: "landscape" }, 
        { src: "images/scr_ayli.png", alt: "Placeholder for a Project Signal prototype screenshot", fit: "contain", orientation: "landscape" }, 
        { src: "images/scr_ayli.png", alt: "Placeholder for a Project Signal prototype screenshot", fit: "contain", orientation: "landscape" }, 
        { src: "images/scr_ayli.png", alt: "Placeholder for a Project Signal prototype screenshot", fit: "contain", orientation: "landscape" }, 
        { src: "images/scr_ayli.png", alt: "Placeholder for a Project Signal prototype screenshot", fit: "contain", orientation: "landscape" }, 
        { src: "images/scr_ayli.png", alt: "Placeholder for a Project Signal prototype screenshot", fit: "contain", orientation: "landscape" }, 
        { src: "images/scr_ayli.png", alt: "Placeholder for a Project Signal prototype screenshot", fit: "contain", orientation: "landscape" }, 
      ]
    }
  ]
};
