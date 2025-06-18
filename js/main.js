/**
 * Main application initialization and management
 */
class ModernAI {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupCodeCopyButtons();
    this.initializePrism();
    this.initializeMermaid();
    this.setupScrollHighlighting();
    this.setupScrollAnimations();
    this.setupNavigationHighlight();
    // Don't initialize demos immediately in SPA - let router handle it
    // this.initializeDemos();
  }

  setupEventListeners() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');
    if (menuToggle && nav) {
      menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
      });
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
    // Note: All demos are now initialized by the router when content loads
    // This prevents duplicate initialization and ensures demos work with dynamic content
    console.log('Demo initialization is handled by the router for SPA compatibility');
  }
}

// Initialize when DOM is loaded - but skip demo init for SPA
document.addEventListener('DOMContentLoaded', () => {
  // Wait a bit for external scripts to load (matching script.js pattern)
  setTimeout(() => {
    window.modernAI = new ModernAI();
    // Don't run demo initialization here - let the router handle it
    // when content is actually loaded
  }, 100);
});

// Export for global access
window.ModernAI = ModernAI;
