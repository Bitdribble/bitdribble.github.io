---
layout: page
mathjax: true
title: Figma
---
[Figma](https://www.figma.com/) is a collaborative web application for interface design and prototyping.

#### Docs
* [Figma Documentation](https://help.figma.com/)
* [Figma Community](https://www.figma.com/community)

#### Tutorials
* [Figma 101: Getting Started](https://help.figma.com/hc/en-us/articles/360041003114)
* [Figma for Beginners](https://www.figma.com/resource-library/figma-for-beginners/)

#### UI Kits
* [Vuetify UI Kit for Figma](https://store.vuetifyjs.com/collections/ui-kits/products/vuetify-ui-kit-figma)
* [Ultimate Figma UiKit For Vuetify](https://store.vuetifyjs.com/products/ultimate-figma-uikit-for-vuetify-1?variant=43418187366622)

#### Tools
* [figma-linux](https://snapcraft.io/install/figma-linux/fedora): Unofficial Electron wrapper for Linux (Fedora, Ubuntu, etc.). Available via Snap, Flatpak, RPM, or AppImage. Requires Figma account. Provides desktop app experience but is a wrapper around the web version, not a native app. Mixed reviews on performance.
* [Figma API](https://www.figma.com/developers/api): REST API for programmatically exporting frames as PNG/SVG, accessing file data, and automating workflows. Requires personal access token.
* [Figma Make: Create with AI-Powered Design Tools](https://www.figma.com/make/)
* [Export Plugins](https://www.figma.com/community): Community plugins for batch exporting (PNG/SVG) and automation
* Conversion Tools:
  * Built-in export panel in Figma (PNG/SVG/PDF)
  * ImageMagick for command-line conversion
  * Online converters (CloudConvert, Convertio) for batch processing

#### Blog Posts
* [Evan Wallace](https://madebyevan.com/) (Figma co-founder, former CTO)
  * [Figma](https://madebyevan.com/figma/)
  * [WebAssembly cut Figma's load time by 3x](https://madebyevan.com/figma/webassembly-cut-figmas-load-time-by-3x/) (2017)
  * [Building a professional design tool on the web](https://madebyevan.com/figma/building-a-professional-design-tool-on-the-web/)
  * Created [kiwi](https://github.com/evanw/kiwi) library for binary serialization (used in .fig format)
  * Also created [esbuild](https://github.com/evanw/esbuild) (fast JavaScript bundler), [Skew](https://github.com/evanw/skew) (programming language), and many WebGL/graphics projects
* Easy Logic: [Figma Inside — .fig file analysis](https://easylogic.medium.com/figma-inside-fig-%ED%8C%8C%EC%9D%BC-%EB%B6%84%EC%84%9D-7252bef141da)
* [Claude Code + Figma MCP Server](https://www.builder.io/blog/claude-code-figma-mcp-server)
* [Using Claude Code to create designs from screenshots in Figma](https://www.reddit.com/r/ClaudeAI/comments/1lc577c/using_claude_code_to_create_designs_from/)
* **Vibe Coding with Claude Code**: Can integrate with Figma via MCP server to convert designs to code (React, HTML/CSS, Tailwind). Share Figma URL or screenshot, describe adjustments, and generate production-ready code

#### Integration with Static Sites (Jekyll/GitHub Pages)
* Export diagrams as PNG (for complex visuals) or SVG (for scalable diagrams)
* Place exports in `assets/images/` directory
* Embed in Markdown using standard image syntax or HTML with Tailwind classes
* No external dependencies required for static integration
* For interactive prototypes, can use iframes (adds external dependencies)

#### Data Formats
* **.fig**: Proprietary binary format (undocumented, internal use only). Reverse-engineered by community using kiwi library
* **Export Formats**: PNG (raster, supports transparency), SVG (vector, scalable), PDF (multi-page), JSON (via API)
* **Reverse Engineering**: 
  * [kiwi](https://github.com/evanw/kiwi) library by Evan Wallace (Figma's former CTO) - binary serialization library
  * [fig-file-parser](https://madebyevan.com/figma/fig-file-parser/) - Public parser for .fig files
  * [figma-fig-tools](https://github.com/mikesimons/figma-fig-tools) - Tools to unpack .fig files
  * Format is a ZIP archive with compressed binary chunks (schema + data) using DEFLATE or ZSTD

#### Comparison with Excalidraw
* **Figma**: Full-featured design platform, polished UI/UX, better for professional designs and collaboration. More complex, requires export steps for static sites
* **Excalidraw**: Lightweight, hand-drawn style, faster for quick sketches. Simpler integration, smaller file sizes. Better for rapid ideation
* Both work well for static site integration (export SVG/PNG and embed)

#### Features
* Collaborative design in real-time
* Vector graphics editing
* Prototyping and animations
* Component libraries
* Design systems
* Developer handoff tools
* WebAssembly-powered rendering engine (3x faster load times)

#### Other
* [Artificial Intelligence](/artificial_intelligence)
* [AI Agents](/ai_agents)
* [Cognitive Science](/cognitive_science)
* [Computation Theory](/computation_theory)
* [Language Models](/language_models)
* [Meta Learning](/meta_learning)
* [Probabilities and Statistics](/probabilities_and_statistics)
* [Robotics](/robotics)
* [Self Driving Cars](/self_driving_cars)
* [Computational Topology](/computational_topology)
* [Webdev](/webdev)
  * [Dash](/webdev/dash)
  * [Excalidraw](/webdev/excalidraw)
  * [Figma](/webdev/figma)
  * [Gradio](/webdev/gradio)
  * [LabelStudio](/webdev/label_studio)
  * [Next.js](/webdev/next_js)
  * [Remix](/webdev/remix)
  * [Streamlit](/webdev/streamlit)
  * [SVG](/webdev/svg)
  * [Tailwind](/webdev/tailwind)
  * [Vercel](/webdev/vercel)
  * [Vue](/webdev/vue)

