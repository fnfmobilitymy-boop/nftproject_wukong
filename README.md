# WUKONG
Journey to the West inspired concept landing page. Wallet and mint are demonstrations only.

## Development
Node.js 24, then `npm ci` and `npm run dev`.

## GitHub Pages
In repository Settings → Pages → Build and deployment, select GitHub Actions.
Push to main or run the Deploy WUKONG to GitHub Pages workflow.
Expected URL after successful deployment: https://fnfmobilitymy-boop.github.io/nftproject_wukong/

`npm run build` generates dist with relative asset paths for GitHub Pages.

## Artwork and interactions
English-only interface inspired by a stylized fantasy character-collection site.
Ten original concept portraits: five 3D-style renders and five 2D illustrations.
The Modern & Mecha filter highlights four streetwear, biker, robot, and mecha designs.
The hero uses transparent character artwork over a separate environment, with floating,
pointer parallax, scroll zoom, cloud particles and click bursts. These effects do not
constitute a rigged 3D model. Reduced-motion preferences and the FX toggle are supported.
Filter art styles, swipe/scroll the collection, and select a character to view its story.

The hero now features a cloud-riding pose, a separate golden Somersault Cloud,
a one-time fly-in entrance, cloud wake, and Replay Flight control. The camera,
entrance and hover effects use separate transform layers to avoid conflicts.
FX OFF and reduced-motion preferences show the rider directly without a fly-in.
