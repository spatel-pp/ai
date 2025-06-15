/**
 * Main application initialization and theme management
 */
class ModernAI {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    this.applyTheme();
    this.setupEventListeners();
    this.setupCodeCopyButtons();
    this.initializePrism();
    this.initializeMermaid();
    this.setupScrollHighlighting();
    this.setupScrollAnimations();
    this.setupNavigationHighlight();
    // Initialize demos immediately like original script.js
    this.initializeDemos();
  }

  setupEventListeners() {
    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');
    if (menuToggle && nav) {
      menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
      });
    }
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme();
    localStorage.setItem('theme', this.currentTheme);
  }

  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.textContent = this.currentTheme === 'light' ? '🌙' : '☀️';
    }
  }

  setupCodeCopyButtons() {
    document.querySelectorAll('.copy-button').forEach(button => {
      button.addEventListener('click', async () => {
        const codeBlock = button.closest('.code-block').querySelector('code');
        if (codeBlock) {
          try {
            await navigator.clipboard.writeText(codeBlock.textContent);
            button.textContent = 'Copied!';
            setTimeout(() => {
              button.textContent = 'Copy';
            }, 2000);
          } catch (err) {
            console.error('Failed to copy text: ', err);
            button.textContent = 'Error';
            setTimeout(() => {
              button.textContent = 'Copy';
            }, 2000);
          }
        }
      });
    });
  }

  initializePrism() {
    if (typeof Prism !== 'undefined') {
      console.log('Prism.js loaded, highlighting code blocks...');
      Prism.highlightAll();
    } else {
      console.warn('Prism.js not loaded');
    }
  }

  initializeMermaid() {
    if (typeof mermaid !== 'undefined') {
      console.log('Mermaid.js loaded, rendering diagrams...');
      mermaid.initialize({ 
        startOnLoad: true,
        theme: this.currentTheme === 'dark' ? 'dark' : 'default'
      });
    } else {
      console.warn('Mermaid.js not loaded');
    }
  }

  setupScrollHighlighting() {
    // Will be implemented by navigation.js
    if (window.NavigationManager) {
      new NavigationManager();
    }
  }

  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    // Add scroll reveal to sections
    document.querySelectorAll('h2, h3, .example-box, .diagram-container, .table-container').forEach(el => {
      el.classList.add('scroll-reveal');
      observer.observe(el);
    });
  }

  setupNavigationHighlight() {
    // This method should be in NavigationManager, but call it if available
    if (window.NavigationManager) {
      new NavigationManager();
    }
  }

  // Initialize all demo components
  initializeDemos() {
    // Vector space demos
    if (window.VectorDemos) {
      const vectorDemos = new VectorDemos();
      vectorDemos.init();
    }

    // Transformer demo
    if (window.TransformerDemo) {
      const transformerDemo = new TransformerDemo();
      transformerDemo.setup();
    }

    // RAG flow animation is initialized directly in rag-flow.js
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Wait a bit for external scripts to load (matching script.js pattern)
  setTimeout(() => {
    window.modernAI = new ModernAI();
  }, 100);
});

// Export for global access
window.ModernAI = ModernAI;
