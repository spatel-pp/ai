/**
 * Lightweight SPA Router for AI Architecture Guide
 * Handles navigation and dynamic content loading without dependencies
 */

class AIArchitectureRouter {
    constructor() {
        this.routes = {
            'introduction': {
                title: 'Introduction',
                content: 'content/introduction.html',
                toc: []
            },
            'fundamentals': {
                title: 'AI Architecture Guide',
                content: 'content/fundamentals.html',
                toc: [
                    { id: 'embeddings', title: 'Embeddings: The Language of Machines', number: '1' },
                    { id: 'vector-databases', title: 'Vector Databases: Semantic Storage', number: '2' },
                    { id: 'llms', title: 'LLMs: Generative Powerhouses', number: '3' },
                    { id: 'rag', title: 'RAG: Retrieval Augmented Generation', number: '4' },
                    { id: 'agentic', title: 'Agentic AI: Autonomous Systems', number: '5' }
                ]
            },
            'advanced-topics': {
                title: 'Advanced Topics',
                content: 'content/advanced-topics.html',
                toc: [
                    { id: 'mathematics', title: 'Mathematical Foundations', number: '1' },
                    { id: 'applications', title: 'Real-World Applications', number: '2' },
                    { id: 'implementation', title: 'Implementation Guide', number: '3' }
                ]
            }
        };
        
        this.currentRoute = null;
        this.contentCache = new Map();
        
        this.init();
    }
    
    init() {
        // Handle initial page load
        window.addEventListener('DOMContentLoaded', () => {
            this.handleInitialRoute();
        });
        
        // Handle navigation clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-page]')) {
                e.preventDefault();
                const page = e.target.getAttribute('data-page');
                this.navigateTo(page);
            }
        });
        
        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.page) {
                this.loadPage(e.state.page, false);
            } else {
                this.handleInitialRoute();
            }
        });
    }
    
    handleInitialRoute() {
        const hash = window.location.hash.slice(1); // Remove #
        const page = hash || 'introduction';
        this.loadPage(page, true);
    }
    
    navigateTo(page) {
        if (this.routes[page]) {
            // Update URL
            window.history.pushState({ page }, '', `#${page}`);
            this.loadPage(page, false);
        }
    }
    
    async loadPage(page, isInitial = false) {
        if (!this.routes[page]) {
            console.warn(`Route not found: ${page}`);
            page = 'introduction';
        }
        
        const route = this.routes[page];
        this.currentRoute = page;
        
        // Update navigation state
        this.updateNavigation(page);
        
        // Update page title
        document.title = `${route.title} | Modern AI Architecture`;
        
        // Update TOC
        this.updateTOC(route.toc);
        
        // Load content
        await this.loadContent(route.content);
        
        // Scroll to top for new pages (but not initial load)
        if (!isInitial) {
            document.getElementById('main-content').scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    updateNavigation(activePage) {
        const navLinks = document.querySelectorAll('.nav-section');
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('data-page');
            if (linkPage === activePage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    updateTOC(tocItems) {
        const tocList = document.getElementById('toc-list');
        const tocContainer = document.getElementById('toc');
        if (!tocList || !tocContainer) return;
        
        // Hide TOC if no items (like on introduction page)
        if (!tocItems || tocItems.length === 0) {
            tocContainer.style.display = 'none';
            return;
        } else {
            tocContainer.style.display = 'block';
        }
        
        tocList.innerHTML = '';
        
        tocItems.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <a href="#${item.id}" class="toc-link" data-section="${item.id}">
                    <span class="toc-number">${item.number}</span>
                    <span class="toc-title">${item.title}</span>
                </a>
            `;
            tocList.appendChild(li);
        });
    }
    
    async loadContent(contentPath) {
        const mainContent = document.getElementById('main-content');
        
        // Show loading indicator
        mainContent.innerHTML = `
            <div class="loading-indicator">
                <div class="spinner"></div>
                <p>Loading content...</p>
            </div>
        `;
        
        try {
            // Check cache first
            if (this.contentCache.has(contentPath)) {
                mainContent.innerHTML = this.contentCache.get(contentPath);
                
                // Initialize features for cached content too
                setTimeout(() => {
                    this.initializePageFeatures();
                    console.log(`Cached page loaded: ${contentPath}, initializing features...`);
                }, 100);  // Increased delay for cached content too
                return;
            }
            
            // Fetch content
            const response = await fetch(contentPath);
            if (!response.ok) {
                throw new Error(`Failed to load content: ${response.status}`);
            }
            
            const content = await response.text();
            
            // Cache the content
            this.contentCache.set(contentPath, content);
            
            // Update DOM
            mainContent.innerHTML = content;
            
            // Small delay to ensure content is rendered before initializing
            setTimeout(() => {
                // Initialize page-specific functionality
                this.initializePageFeatures();
                
                console.log(`Page loaded: ${contentPath}, initializing features...`);
            }, 100);  // Increased delay to ensure scripts are ready
            
        } catch (error) {
            console.error('Error loading content:', error);
            mainContent.innerHTML = `
                <div class="error-message">
                    <h2>Error Loading Content</h2>
                    <p>Sorry, we couldn't load the content. Please try refreshing the page.</p>
                    <button onclick="location.reload()" class="retry-button">Retry</button>
                </div>
            `;
        }
    }
    
    initializePageFeatures() {
        // Re-initialize Prism syntax highlighting first
        this.initializePrismHighlighting();
        
        // Re-initialize Mermaid diagrams
        if (typeof mermaid !== 'undefined') {
            console.log('Re-initializing Mermaid diagrams...');
            try {
                mermaid.init();
            } catch (error) {
                console.log('Mermaid initialization failed:', error);
            }
        }
        
        // Re-initialize all interactive demos
        this.initializeInteractiveFeatures();
        
        // Re-initialize vector demos and other components
        this.initializeDemos();
        
        // Update TOC active states based on scroll
        this.setupTOCScrollTracking();
    }
    
    initializeInteractiveFeatures() {
        // Initialize copy buttons
        const copyButtons = document.querySelectorAll('.copy-button');
        copyButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const codeBlock = e.target.closest('.code-block').querySelector('code');
                if (codeBlock) {
                    navigator.clipboard.writeText(codeBlock.textContent).then(() => {
                        const originalText = button.textContent;
                        button.textContent = 'Copied!';
                        setTimeout(() => {
                            button.textContent = originalText;
                        }, 2000);
                    });
                }
            });
        });
        
        // Initialize any page-specific demos
        if (this.currentRoute === 'fundamentals') {
            this.initializeFundamentalsFeatures();
        } else if (this.currentRoute === 'advanced-topics') {
            this.initializeAdvancedTopicsFeatures();
        }
    }
    
    initializeFundamentalsFeatures() {
        // Initialize RAG animation
        const ragAnimation = document.getElementById('play-rag-animation');
        if (ragAnimation) {
            ragAnimation.addEventListener('click', () => {
                // RAG animation logic here
                console.log('RAG animation started');
            });
        }
        
        // Initialize Chain-of-Thought demo
        const cotControls = document.querySelectorAll('.cot-controls .control-btn');
        cotControls.forEach(button => {
            button.addEventListener('click', (e) => {
                const action = e.target.textContent.trim();
                if (action.includes('Show All')) {
                    // Expand all steps logic
                } else if (action.includes('Collapse')) {
                    // Collapse all steps logic
                }
            });
        });
    }
    
    initializeAdvancedTopicsFeatures() {
        // Initialize any advanced topics specific features
        console.log('Advanced topics features initialized');
    }
    
    initializeDemos() {
        // Initialize vector space demos
        if (window.VectorDemos) {
            try {
                console.log('VectorDemos class found, creating instance...');
                // Only create instance if we don't already have one or if demos need reinit
                if (!window.currentVectorDemos) {
                    window.currentVectorDemos = new VectorDemos();
                }
                window.currentVectorDemos.init();
                console.log('Vector demos initialized successfully');
            } catch (error) {
                console.log('Vector demos not available or failed to initialize:', error);
            }
        } else {
            console.log('VectorDemos class not found on window object');
        }

        // Initialize transformer demo
        if (window.TransformerDemo) {
            try {
                const transformerDemo = new TransformerDemo();
                transformerDemo.setup();
                console.log('Transformer demo initialized');
            } catch (error) {
                console.log('Transformer demo not available or failed to initialize:', error);
            }
        }

        // Initialize RAG flow animation
        if (window.RAGFlowAnimation) {
            try {
                const ragFlow = new RAGFlowAnimation();
                ragFlow.init();
                console.log('RAG flow animation initialized');
            } catch (error) {
                console.log('RAG flow animation not available or failed to initialize:', error);
            }
        }
        
        // Re-run any global demo initialization if available
        if (window.modernAI && typeof window.modernAI.initializeDemos === 'function') {
            try {
                window.modernAI.initializeDemos();
                console.log('Global demos re-initialized');
            } catch (error) {
                console.log('Global demo re-initialization failed:', error);
            }
        }
    }
    
    setupTOCScrollTracking() {
        // Track which section is currently visible
        const sections = document.querySelectorAll('section[id]');
        const tocLinks = document.querySelectorAll('.toc-link');
        
        if (sections.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Remove active class from all TOC links
                    tocLinks.forEach(link => link.classList.remove('active'));
                    
                    // Add active class to current section's TOC link
                    const activeLink = document.querySelector(`[data-section="${entry.target.id}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }, {
            rootMargin: '-20% 0px -70% 0px' // Trigger when section is roughly in the middle
        });
        
        sections.forEach(section => observer.observe(section));
    }
    
    initializePrismHighlighting() {
        if (typeof Prism === 'undefined') {
            console.warn('Prism is not loaded, skipping syntax highlighting');
            return;
        }
        
        try {
            // Find all code blocks that need highlighting
            const codeBlocks = document.querySelectorAll('pre code:not([class*="language-"])');
            const languageCodeBlocks = document.querySelectorAll('pre code[class*="language-"]');
            
            console.log(`Found ${codeBlocks.length} unlabeled code blocks and ${languageCodeBlocks.length} language-specific code blocks`);
            
            // Auto-detect language for unlabeled blocks
            codeBlocks.forEach(block => {
                const text = block.textContent.trim();
                if (text.startsWith('import ') || text.includes('def ') || text.includes('print(')) {
                    block.className = 'language-python';
                } else if (text.startsWith('const ') || text.startsWith('function ') || text.includes('=>')) {
                    block.className = 'language-javascript';
                } else if (text.startsWith('# ') || text.includes('$')) {
                    block.className = 'language-bash';
                } else {
                    block.className = 'language-none';
                }
            });
            
            // Force re-highlight all code blocks
            Prism.highlightAll();
            
            console.log('Prism syntax highlighting completed');
            
        } catch (error) {
            console.error('Error during Prism highlighting:', error);
        }
    }
    
    // Alias for easier access from HTML onclick handlers
    navigate(page) {
        this.navigateTo(page);
    }
}

// Initialize the router when the script loads
const router = new AIArchitectureRouter();
