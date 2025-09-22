# Creative Coding Codex

A collection of standalone [p5.js](https://p5js.org/) sketches. Each sketch lives in its own directory so you can tinker freely without build tooling or frameworks.

## Repository layout

```
projects/
  └── template/         # Copy this directory to start a new sketch
```

Add your own project directories under `projects/`. Each project should include at least an `index.html` that loads p5.js (via CDN or locally) and any supporting scripts, styles, or assets.

## Running sketches locally

Because everything is plain HTML, you can open any `index.html` file directly in your browser. For features like `fetch` or loading local assets you may prefer to run a lightweight HTTP server:

```bash
# Python 3
python -m http.server --directory projects/<your-project>
```

Then visit `http://localhost:8000` in your browser.

## Creating a new project

1. Copy the starter template:
   ```bash
   cp -R projects/template projects/my-new-sketch
   ```
2. Rename the copied directory and edit its files (`index.html`, `sketch.js`, `style.css`).
3. Update the `<title>` element and on-page copy so it describes your sketch.
4. Start iterating!

Feel free to add more HTML, JavaScript modules, or assets within your project directory as needed.
