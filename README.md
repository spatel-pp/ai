# Modern AI Architecture Site

A modern, interactive website explaining AI fundamentals including embeddings, vector databases, LLMs, and RAG systems.

## Features

- **Interactive Diagrams**: Vector space visualization, transformer attention, and RAG flow
- **Syntax Highlighting**: Python code examples with Prism.js
- **Responsive Design**: Modern CSS with dark/light theme toggle
- **Multi-page Architecture**: Main article + deep dive sections
- **Rich Visualizations**: Mermaid.js diagrams for AI concepts

## Running the Site

```bash
python3 server.py [port]
```

Default port is 8000. The server will automatically find a free port if the requested one is busy.

## Technology Stack

- **Frontend**: HTML5, Modern CSS, Vanilla JavaScript
- **Diagrams**: Mermaid.js for flowcharts
- **Syntax Highlighting**: Prism.js
- **Server**: Python built-in HTTP server
- **Styling**: CSS custom properties, responsive grid

## File Structure

- `index.html` - Main article page
- `embeddings.html` - Deep dive section
- `styles.css` - Modern CSS styling
- `script.js` - Interactive features
- `server.py` - Python static file server
- `test.html`, `code-test.html` - Diagnostic pages

## Author

Sunny Patel - patel.892@gmail.com
