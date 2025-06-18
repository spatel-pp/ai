# AI Architecture Interactive Guide

An interactive educational website that teaches modern AI fundamentals through hands-on demos and visualizations. Learn about embeddings, vector databases, Large Language Models (LLMs), RAG systems, and agentic AI using a practical recipe assistant analogy.

🌐 **[Live Demo](https://spatel-pp.github.io/ai)** | 📚 **Educational Resource** | 🎯 **Interactive Learning**

---

## For Learners 👨‍🎓

### Quick Start (2 minutes)

1. **Download the project**:
   ```bash
   git clone https://github.com/your-username/ai.git
   cd ai
   ```

2. **Start the local server** (requires Python 3.6+):
   ```bash
   python3 server.py
   ```
   
3. **Open in your browser**: http://localhost:8000

That's it! No installations, no dependencies - just start learning.

### What You'll Learn

- 🧠 **How AI Really Works**: Understand the core technologies behind ChatGPT, Claude, and modern AI systems
- 🔢 **Vector Embeddings**: How AI converts words and concepts into mathematical representations
- 🗃️ **Vector Databases**: How AI systems store and search through semantic knowledge
- ⚡ **Large Language Models**: The Transformer architecture that powers modern AI
- 🔍 **RAG Systems**: How AI combines training with real-time information
- 🤖 **Agentic AI**: How AI systems can reason, plan, and take autonomous actions

### Learning Path

The site has three main sections:

1. **Introduction** - Start here! Motivating overview and learning roadmap
2. **AI Fundamentals** - Core concepts with interactive demos
3. **Advanced Topics** - Deep dives and implementation details

---

## For Developers 👨‍💻

### Project Architecture

This is a **modern static website** with SPA (Single Page Application) capabilities:

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Architecture**: Single Page Application with client-side routing
- **Server**: Python built-in HTTP server for development
- **Dependencies**: Self-contained with all libraries included locally
- **Deployment**: Static files ready for any web server or GitHub Pages

### Development Setup

**Prerequisites**:
- Python 3.6+ (for development server)
- Modern web browser

**Local Development**:
```bash
# Clone and enter directory
git clone https://github.com/your-username/ai.git
cd ai

# Start development server
python3 server.py

# Optional: Specify custom port
python3 server.py 8080
```

### Project Structure

```
ai/
├── index.html                    # SPA shell and entry point
├── content/                      # Dynamic content (loaded by router)
│   ├── introduction.html         # Landing page content
│   ├── fundamentals.html         # Core AI concepts
│   └── advanced-topics.html      # Advanced content
├── js/                          # JavaScript modules
│   ├── libs/                    # Local vendor libraries (formerly CDN)
│   │   ├── prism-tomorrow.min.css    # Syntax highlighting theme
│   │   ├── prism-core.min.js         # Prism core library
│   │   ├── prism-python.min.js       # Python syntax support
│   │   ├── prism-javascript.min.js   # JavaScript syntax support
│   │   ├── prism-bash.min.js         # Bash syntax support
│   │   └── mermaid.min.js            # Diagram generation
│   ├── router.js                # SPA router and content loader
│   ├── main.js                  # Core app initialization
│   ├── vector-demos.js          # Interactive vector visualizations
│   ├── transformer-demo.js      # Transformer attention demo
│   ├── rag-flow.js             # RAG pipeline animation
│   └── utils.js                # Shared utilities
├── styles.css                   # Complete styling (responsive)
├── server.py                    # Development server
└── README.md                    # This file
```

### Key Technologies

- **SPA Router**: Custom vanilla JS router (`js/router.js`)
- **Interactive Demos**: Canvas-based visualizations
- **Syntax Highlighting**: Prism.js (local)
- **Diagrams**: Mermaid.js (local)
- **Styling**: Modern CSS with custom properties and Grid
- **Self-Contained**: All dependencies included, no external CDN calls

### Benefits of Local Dependencies

Moving from CDN to local dependencies provides several advantages:

- 🔒 **No External Dependencies**: Site works completely offline and in restricted networks
- ⚡ **Faster Loading**: No additional DNS lookups or external server requests
- 🛡️ **Enhanced Security**: No risk of CDN compromise or supply chain attacks
- 📦 **Self-Contained Deployment**: Everything needed is in the repository
- 🌍 **Global Accessibility**: Works in regions where CDNs might be blocked
- 🔄 **Version Consistency**: Libraries won't change unexpectedly
- 📱 **Better Mobile Experience**: Fewer network requests improve mobile performance

### Dependency Verification

To verify all local dependencies are properly downloaded and working:

```bash
# Run the dependency verification script
python3 verify_deps.py

# If successful, you'll see:
# ✅ prism-tomorrow.min.css (1KB)
# ✅ prism-core.min.js (7KB)
# ... etc
# 🎉 All dependencies verified successfully!
```

### Production Deployment

#### Option 1: GitHub Pages (Recommended)
1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Set source to main branch
4. Your site will be available at `https://username.github.io/repository-name`

#### Option 2: Static File Server
Deploy the entire directory to any static file server:
```bash
# All files are production-ready as-is
scp -r . user@server:/var/www/html/ai/
```

#### Option 3: CDN/Object Storage
Upload all files to AWS S3, Cloudflare Pages, Netlify, or Vercel.



### Development Notes

**Content Management**: 
- Edit `.html` files in `/content/` directory
- Main shell is in `index.html`
- Router automatically handles content loading

**Adding New Pages**:
1. Create new `.html` file in `/content/`
2. Add route to `js/router.js`
3. Update navigation in `index.html`

**Styling**:
- All CSS in single `styles.css` file
- Uses CSS custom properties for theming
- Mobile-first responsive design

**JavaScript Architecture**:
- ES6+ modules loaded via script tags
- No build process or transpilation
- Clean separation of concerns

### Browser Support

- **Modern browsers**: Chrome 60+, Firefox 60+, Safari 12+, Edge 79+
- **Required features**: ES6, CSS Grid, Canvas API
- **Progressive enhancement**: Basic content works without JavaScript

### Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test locally
4. Commit with descriptive messages
5. Push and create a Pull Request

### License

MIT License - feel free to use for educational purposes.

---

## Troubleshooting

**Server won't start**:
```bash
# Check Python version
python3 --version

# Try different port
python3 server.py 8080

# Check if port is in use
lsof -i :8000
```

**Interactive demos not working**:
- Enable JavaScript in your browser
- Check browser console for errors
- Ensure you're running from `http://localhost:8000` (not `file://`)
- Run `python3 verify_deps.py` to check all local libraries are present

**Local libraries not loading**:
```bash
# Verify all dependencies are present
python3 verify_deps.py

# If files are missing, re-download them:
cd js/libs
curl -o prism-tomorrow.min.css "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css"
curl -o prism-core.min.js "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js"
# ... etc
```
- Ensure you're running from `http://localhost:8000` (not `file://`)

**GitHub Pages deployment issues**:
- Ensure repository is public or you have GitHub Pro
- Check that `index.html` is in the root directory
- Verify all relative paths start with `./` or `/`

---

**Questions?** Open an issue or reach out to [patel.892@gmail.com](mailto:patel.892@gmail.com)
