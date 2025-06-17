# Modern AI Architecture Site

A modern, interactive website explaining AI fundamentals including embeddings, vector databases, LLMs, and RAG systems with hands-on demos and visualizations.

## Quick Start

After cloning this repository:

1. **Prerequisites**: Ensure you have Python 3.6+ installed
2. **Start the server**: `python3 server.py`
3. **Open your browser**: Navigate to `http://localhost:8000`

That's it! No additional dependencies to install - the site uses CDN resources for external libraries.

## What to Expect

Once you start the server, you'll have access to:

### Interactive Demos
- **Vector Similarity**: Click points to see real-time similarity calculations
- **Chain-of-Thought**: Step through AI reasoning for meal planning (collapsible steps)
- **Transformer Attention**: Visualize how transformers process text
- **RAG Pipeline**: Animated flow showing retrieval-augmented generation

### Educational Content
- **Embeddings**: Understanding vector representations
- **Vector Databases**: Similarity search and storage
- **Large Language Models**: Architecture and capabilities
- **Agentic AI**: Autonomous problem-solving systems

### Navigation
- **Table of Contents**: Docked sidebar for easy navigation
- **Dark/Light Mode**: Theme toggle in the header
- **Responsive Design**: Works on desktop, tablet, and mobile

## Features

- **Interactive Demos**: 
  - Vector space visualization with real-time similarity calculations
  - Chain-of-Thought reasoning walkthrough with collapsible steps
  - Transformer attention mechanism visualization
  - RAG (Retrieval Augmented Generation) flow animation
- **Syntax Highlighting**: Python code examples with Prism.js
- **Responsive Design**: Modern CSS with dark/light theme toggle  
- **Multi-page Architecture**: Main article + deep dive sections
- **Rich Visualizations**: Mermaid.js diagrams for AI concepts

## Running the Site

### Local Development Server

```bash
# Clone the repository
git clone <repository-url>
cd ai

# Start the development server (Python 3.6+ required)
python3 server.py [port]

# Or use the default port (8000)
python3 server.py
```

The server will:
- Automatically find a free port if the requested one is busy
- Serve the site at `http://localhost:8000` (or specified port)
- Provide graceful shutdown with Ctrl+C
- Handle all static files (HTML, CSS, JS, images)

### Alternative: Simple HTTP Server

If you prefer Python's built-in server:
```bash
python3 -m http.server 8000
```

### Browser Compatibility

The site works in all modern browsers. For the best experience:
- **Recommended**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Interactive demos** require JavaScript enabled
- **External libraries** (Mermaid.js, Prism.js) loaded from CDN

## Browser Support

| Feature | Requirement |
|---------|-------------|
| Basic site | Any modern browser |
| Interactive demos | JavaScript enabled |
| Vector visualizations | Canvas support |
| Responsive design | CSS Grid support |
| Theme toggle | CSS custom properties |

## Technology Stack

- **Frontend**: HTML5, Modern CSS, Vanilla JavaScript
- **Diagrams**: Mermaid.js (CDN) for flowcharts and system diagrams
- **Syntax Highlighting**: Prism.js (CDN) for code blocks
- **Server**: Python built-in HTTP server (no external dependencies)
- **Styling**: CSS custom properties, CSS Grid, responsive design
- **Interactivity**: Pure JavaScript (no frameworks)

### External Dependencies (CDN)

All external libraries are loaded via CDN - no local installation required:
- **Mermaid.js v10**: Dynamic diagram generation
- **Prism.js v1.29**: Syntax highlighting for code examples
- **Fonts**: System fonts for optimal performance

## File Structure

```
/
├── index.html              # Main article page with all demos
├── embeddings.html         # Deep dive: Advanced embeddings
├── styles.css              # Complete styling (1800+ lines)
├── server.py               # Python development server
├── js/                     # JavaScript modules
│   ├── main.js            # Core functionality & theme toggle
│   ├── navigation.js      # Page navigation
│   ├── rag-flow.js        # RAG demo animation
│   ├── transformer-demo.js # Transformer visualization
│   ├── vector-demos.js    # Vector space demos
│   ├── simple-vector-demos.js # Simplified vector demos
│   └── utils.js           # Shared utilities
├── css/                   # (Currently unused - styles in styles.css)
├── temp/                  # Development notes (gitignored)
└── test-*.html           # Various test pages
```

### Key Pages

- **`index.html`**: Complete AI architecture guide with interactive demos
- **`embeddings.html`**: Advanced topics and deep-dive content  
- **`server.py`**: Development server with auto-port detection
- **`styles.css`**: All styling including responsive design and animations

## Author

Sunny Patel - patel.892@gmail.com

## License

This project is for educational purposes. External libraries (Mermaid.js, Prism.js) have their own licenses.

## Troubleshooting

### Common Issues

**Port already in use:**
```bash
# The server will automatically find a free port, but you can specify one:
python3 server.py 8080
```

**Python not found:**
- Make sure Python 3.6+ is installed: `python3 --version`
- On some systems, use `python` instead of `python3`

**Interactive demos not working:**
- Ensure JavaScript is enabled in your browser
- Check browser console for any errors (F12 → Console)
- Verify internet connection (external CDN libraries required)

**Styling issues:**
- Clear browser cache (Ctrl+F5 / Cmd+Shift+R)
- Ensure `styles.css` loaded properly in browser dev tools
