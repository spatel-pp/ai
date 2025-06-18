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
- **Main Navigation**: Top navigation bar for switching between main sections (AI Architecture Guide, Advanced Topics)
- **Table of Contents**: Fixed right-side panel for quick navigation within each section
- **Responsive Design**: TOC moves to bottom on mobile, content adjusts automatically

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

## Deployment

This is a **static site** with no backend requirements - perfect for free hosting services! No build process or compilation needed.

### 🌟 GitHub Pages (Recommended)

Since you're already using Git, this is the simplest option:

1. **Push your code to GitHub** (if not already there)
2. **Go to repository Settings → Pages**
3. **Select source**: Deploy from branch → `main`
4. **Wait 2-3 minutes for deployment**
5. **Your site will be live at**: `https://yourusername.github.io/repository-name`

**Benefits:**
- ✅ Free forever with custom domain support
- ✅ HTTPS by default
- ✅ Automatic deploys from Git
- ✅ Global CDN for fast loading
- ✅ Perfect for educational content

### 🚀 Netlify

Drag & drop deployment or Git integration:

1. **Go to [netlify.com](https://netlify.com)**
2. **Option A**: Drag & drop your project folder to the deploy area
3. **Option B**: Connect your GitHub repo for automatic deployments
4. **Optional**: Add custom domain in site settings

**Benefits:**
- ✅ Instant preview deployments
- ✅ Form handling (if you add contact forms later)
- ✅ Edge functions support
- ✅ Excellent performance analytics

### ⚡ Vercel

Fast global deployment:

1. **Go to [vercel.com](https://vercel.com)**
2. **Import your GitHub repository**
3. **Deploy with default settings**
4. **Optional**: Install Vercel CLI for command-line deployments

```bash
# Optional: CLI deployment
npm i -g vercel
vercel --prod
```

**Benefits:**
- ✅ Lightning fast global CDN
- ✅ Automatic HTTPS
- ✅ Built-in analytics
- ✅ Perfect for performance-critical sites

### 📁 What Gets Deployed

Your site is **production-ready as-is** - no build step required:

```
✅ index.html              # Main page
✅ embeddings.html         # Deep dive page
✅ styles.css              # All styling (already optimized)
✅ js/                     # JavaScript modules
✅ README.md               # Documentation
❌ server.py               # Only for local development
❌ temp/                   # Development files (gitignored)
❌ *.backup                # Backup files (optional to exclude)
```

### 🎯 Why No Build Process?

Unlike React/Vue/Angular projects, this site uses:
- **Vanilla JavaScript** - Runs directly in browsers
- **Modern CSS** - No compilation needed
- **CDN Libraries** - External dependencies loaded at runtime
- **Static Assets** - Everything is already optimized

Just push your files and they're ready to serve! 🚀

### 📋 Deployment Checklist

Before deploying, ensure:
- ✅ All changes committed to your `main` branch
- ✅ Site works locally with `python3 server.py`
- ✅ Interactive demos function properly
- ✅ No broken links between pages
- ✅ External CDN resources loading (check browser dev tools)

**Ready to deploy?** Choose GitHub Pages for the simplest setup!

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
