---
layout: page
mathjax: true
title: Excalidraw
---
[Excalidraw](https://excalidraw.com/) is a virtual collaborative whiteboard tool for sketching hand-drawn like diagrams.

#### Docs
* [Excalidraw Documentation](https://docs.excalidraw.com/)
* [GitHub Repository](https://github.com/excalidraw/excalidraw)

#### Tutorials
* [Getting Started with Excalidraw](https://docs.excalidraw.com/docs/getting-started)
* [React Integration Guide](https://docs.excalidraw.com/docs/@excalidraw/excalidraw/integration) - Integration with React, Next.js (App Router and Pages Router), and browser usage
* YouTube: [Excalidraw React Integration Tutorial](https://www.youtube.com/watch?v=pUv_3UmoGYM)
* YouTube: [Building Collaborative Whiteboard with Excalidraw](https://www.youtube.com/watch?v=LXlE1y5PQsk)
* [CodeSandbox Examples](https://codesandbox.io/s/excalidraw-tutorial-ftv8o) - Interactive examples for experimentation

#### Tools
* **React Integration**:
  * [@excalidraw/excalidraw](https://www.npmjs.com/package/@excalidraw/excalidraw) - React component library
  * Supports Next.js App Router and Pages Router (with dynamic imports)
  * Browser integration via CDN with import maps
* **Libraries**:
  * [Excalidraw Libraries](https://libraries.excalidraw.com/) - Public library directory for reusable components and shapes
  * [excalidraw-libraries](https://github.com/excalidraw/excalidraw-libraries) - GitHub repository for library management
* **Obsidian Integration**:
  * [Obsidian-Excalidraw Plugin](https://github.com/zsviczian/obsidian-excalidraw-plugin) - Full-featured integration with Obsidian
  * Features: LaTeX formulas, OCR, SVG import, custom fonts/pens, drag-and-drop links, script store
* **Utilities**:
  * `convertToExcalidrawElements` - Convert data to Excalidraw-compatible format
  * Type definitions available at `@excalidraw/excalidraw/types`

#### Features
* Hand-drawn style diagrams
* Collaborative editing (real-time)
* Export to PNG, SVG, or Excalidraw format (JSON)
* Open source and self-hostable
* Libraries and templates support
* Customizable color palettes (canvas background, element background, element stroke)
* Markdown embedding support
* LaTeX formula support (via Obsidian plugin)
* SVG import capabilities

#### Data Format
* **.excalidraw**: JSON-based format (editable, human-readable)
* Stores drawing elements, app state, and metadata
* Can be embedded in Markdown files (Obsidian integration)
* Supports decompression for easier editing in Markdown view

#### Integration with Static Sites (Jekyll/GitHub Pages)
* Export diagrams as PNG (for complex visuals) or SVG (for scalable diagrams)
* Place exports in `assets/images/` directory
* Embed in Markdown using standard image syntax or HTML with Tailwind classes
* Can embed interactive Excalidraw via iframe (requires external dependency)
* JSON format allows programmatic manipulation if needed
* Simpler integration than Figma - direct export, smaller file sizes

#### Comparison with Figma
* **Excalidraw**: Lightweight, hand-drawn style, faster for quick sketches. Simpler integration, smaller file sizes. Better for rapid ideation. JSON format is human-readable and editable
* **Figma**: Full-featured design platform, polished UI/UX, better for professional designs and collaboration. More complex, requires export steps for static sites. Proprietary binary format
* Both work well for static site integration (export SVG/PNG and embed)

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
* [Engineering Skills](/engineering_skills)
  * [Diagrams Practice](/engineering_skills/diagrams_practice)
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

