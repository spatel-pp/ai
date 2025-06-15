// Modern AI Article Interactive Features
class ModernAIArticle {
  constructor() {
    this.init();
  }

  init() {
    // Wait for external libraries to load
    this.waitForLibraries().then(() => {
      this.setupPrismSyntaxHighlighting();
      this.setupScrollAnimations();
      this.setupDiagramInteractions();
      this.setupThemeToggle();
      this.setupCodeCopyButtons();
      this.setupNavigationHighlight();
      this.setupMermaidDiagrams();
    });
  }

  // Use Prism.js for syntax highlighting
  setupPrismSyntaxHighlighting() {
    // Let Prism handle the syntax highlighting
    if (typeof Prism !== 'undefined') {
      // Ensure all code blocks are properly highlighted
      Prism.highlightAll();
      
      // Re-highlight any dynamically added content
      document.querySelectorAll('pre code:not(.language-*)').forEach(block => {
        // Add language class if missing
        if (block.className.includes('language-')) {
          Prism.highlightElement(block);
        }
      });
    } else {
      // Fallback to basic highlighting
      this.setupBasicSyntaxHighlighting();
    }
  }

  // Basic syntax highlighting fallback
  setupBasicSyntaxHighlighting() {
  async waitForLibraries() {
    // Wait for Prism.js
    let prismLoaded = false;
    let attempts = 0;
    while (!prismLoaded && attempts < 50) {
      if (window.Prism) {
        prismLoaded = true;
      } else {
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
      }
    }
    
    // Initialize Prism if it loaded
    if (window.Prism) {
      window.Prism.highlightAll();
    }
  }

  // Enhanced syntax highlighting setup
  setupSyntaxHighlighting() {
    // Use Prism.js if available, otherwise fall back to custom highlighting
    if (window.Prism) {
      console.log('Using Prism.js for syntax highlighting');
      window.Prism.highlightAll();
    } else {
      console.log('Prism.js not loaded, using fallback highlighting');
      document.querySelectorAll('pre code').forEach(block => {
        this.highlightSyntax(block);
      });
    }
  }

  highlightSyntax(block) {
    let code = block.innerHTML;
    
    // Basic syntax highlighting patterns
    const patterns = [
      { pattern: /(\/\/.*$)/gm, className: 'comment' },
      { pattern: /\b(function|class|const|let|var|if|else|for|while|return|import|export|from|default)\b/g, className: 'keyword' },
      { pattern: /(['"`])((?:(?!\1)[^\\]|\\.)*)(\1)/g, className: 'string' },
      { pattern: /\b\d+\.?\d*\b/g, className: 'number' },
      { pattern: /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g, className: 'function' },
      { pattern: /[+\-*/%=<>!&|]/g, className: 'operator' }
    ];

    patterns.forEach(({ pattern, className }) => {
      code = code.replace(pattern, (match, ...groups) => {
        if (className === 'function') {
          return `<span class="token ${className}">${groups[0]}</span>(`;
        }
        return `<span class="token ${className}">${match}</span>`;
      });
    });

    block.innerHTML = code;
  }

  // Scroll animations
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

  // Interactive diagram features
  setupDiagramInteractions() {
    this.setupVectorSpaceDiagram();
    this.setupTransformerDiagram();
    this.setupRAGFlowDiagram();
  }

  setupVectorSpaceDiagram() {
    const container = document.querySelector('.vector-space-demo');
    if (!container) return;

    // Create interactive vector space visualization
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    canvas.style.border = '1px solid var(--border-color)';
    canvas.style.borderRadius = 'var(--radius)';
    
    const ctx = canvas.getContext('2d');
    
    // Animation state
    let animationFrame;
    let points = [];
    
    // Generate random points
    const generatePoints = () => {
      points = [];
      for (let i = 0; i < 20; i++) {
        points.push({
          x: Math.random() * 360 + 20,
          y: Math.random() * 360 + 20,
          category: Math.floor(Math.random() * 3),
          highlight: false
        });
      }
    };
    
    const drawVisualization = () => {
      ctx.clearRect(0, 0, 400, 400);
      
      // Draw grid
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 400; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 400);
        ctx.moveTo(0, i);
        ctx.lineTo(400, i);
        ctx.stroke();
      }
      
      // Draw points
      const colors = ['#3b82f6', '#10b981', '#f59e0b'];
      points.forEach(point => {
        ctx.fillStyle = colors[point.category];
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.highlight ? 8 : 5, 0, 2 * Math.PI);
        ctx.fill();
        
        if (point.highlight) {
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });
    };
    
    // Mouse interaction
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      points.forEach(point => {
        const distance = Math.sqrt((point.x - mouseX) ** 2 + (point.y - mouseY) ** 2);
        point.highlight = distance < 30;
      });
      
      drawVisualization();
    });
    
    generatePoints();
    drawVisualization();
    
    container.appendChild(canvas);
    
    // Add controls
    const controls = document.createElement('div');
    controls.className = 'diagram-controls';
    controls.innerHTML = `
      <button class="diagram-button" onclick="window.modernAI.regenerateVectorPoints()">New Points</button>
      <button class="diagram-button" onclick="window.modernAI.clusterVectorPoints()">Show Clusters</button>
    `;
    container.appendChild(controls);
    
    // Expose methods globally for button handlers
    window.modernAI = window.modernAI || {};
    window.modernAI.regenerateVectorPoints = () => {
      generatePoints();
      drawVisualization();
    };
    
    window.modernAI.clusterVectorPoints = () => {
      // Simple clustering animation
      points.forEach(point => {
        const clusterCenters = [
          { x: 100, y: 100 },
          { x: 300, y: 150 },
          { x: 200, y: 300 }
        ];
        const target = clusterCenters[point.category];
        
        const animate = () => {
          point.x += (target.x - point.x) * 0.1;
          point.y += (target.y - point.y) * 0.1;
          drawVisualization();
          
          if (Math.abs(point.x - target.x) > 1 || Math.abs(point.y - target.y) > 1) {
            requestAnimationFrame(animate);
          }
        };
        animate();
      });
    };
  }

  setupTransformerDiagram() {
    const container = document.querySelector('.transformer-demo');
    if (!container) return;

    const diagram = document.createElement('div');
    diagram.className = 'transformer-visualization';
    diagram.innerHTML = `
      <div class="transformer-layer">
        <div class="attention-heads">
          <div class="attention-head" data-head="1">Head 1</div>
          <div class="attention-head" data-head="2">Head 2</div>
          <div class="attention-head" data-head="3">Head 3</div>
          <div class="attention-head" data-head="4">Head 4</div>
        </div>
        <div class="token-sequence">
          <div class="token" data-token="The">The</div>
          <div class="token" data-token="cat">cat</div>
          <div class="token" data-token="sat">sat</div>
          <div class="token" data-token="on">on</div>
          <div class="token" data-token="the">the</div>
          <div class="token" data-token="mat">mat</div>
        </div>
      </div>
    `;

    // Add CSS for transformer visualization
    const style = document.createElement('style');
    style.textContent = `
      .transformer-visualization {
        padding: var(--space-6);
        background: var(--bg-tertiary);
        border-radius: var(--radius-lg);
        margin: var(--space-4) 0;
      }
      
      .attention-heads {
        display: flex;
        gap: var(--space-2);
        margin-bottom: var(--space-4);
      }
      
      .attention-head {
        padding: var(--space-2) var(--space-3);
        background: var(--accent-blue);
        color: white;
        border-radius: var(--radius);
        cursor: pointer;
        transition: var(--transition);
        font-size: 0.875rem;
      }
      
      .attention-head:hover {
        background: var(--accent-purple);
        transform: translateY(-2px);
      }
      
      .token-sequence {
        display: flex;
        gap: var(--space-2);
        flex-wrap: wrap;
      }
      
      .token {
        padding: var(--space-3) var(--space-4);
        background: var(--bg-primary);
        border: 2px solid var(--border-color);
        border-radius: var(--radius);
        cursor: pointer;
        transition: var(--transition);
        position: relative;
      }
      
      .token:hover {
        border-color: var(--accent-blue);
        transform: scale(1.05);
      }
      
      .token.attending {
        border-color: var(--accent-purple);
        background: rgba(139, 92, 246, 0.1);
      }
      
      .attention-line {
        position: absolute;
        height: 2px;
        background: var(--accent-purple);
        pointer-events: none;
        opacity: 0.7;
        z-index: 10;
      }
    `;
    document.head.appendChild(style);

    container.appendChild(diagram);

    // Add interactivity
    const tokens = diagram.querySelectorAll('.token');
    const attentionHeads = diagram.querySelectorAll('.attention-head');

    tokens.forEach(token => {
      token.addEventListener('click', () => {
        // Clear previous attention
        tokens.forEach(t => t.classList.remove('attending'));
        document.querySelectorAll('.attention-line').forEach(line => line.remove());

        // Show attention pattern
        token.classList.add('attending');
        
        // Simulate attention to related words
        const word = token.dataset.token.toLowerCase();
        const attentionPatterns = {
          'cat': ['the', 'sat'],
          'sat': ['cat', 'on', 'mat'],
          'mat': ['the', 'on']
        };

        if (attentionPatterns[word]) {
          attentionPatterns[word].forEach(targetWord => {
            const targetToken = Array.from(tokens).find(t => 
              t.dataset.token.toLowerCase() === targetWord
            );
            if (targetToken) {
              targetToken.classList.add('attending');
            }
          });
        }
      });
    });
  }

  setupRAGFlowDiagram() {
    const container = document.querySelector('.rag-flow-demo');
    if (!container) return;

    // Enhanced RAG flow with animation
    const steps = [
      { id: 'query', text: 'User Query', description: 'User asks a question' },
      { id: 'embed', text: 'Embed Query', description: 'Convert to vector' },
      { id: 'search', text: 'Vector Search', description: 'Find similar documents' },
      { id: 'retrieve', text: 'Retrieve Docs', description: 'Get relevant content' },
      { id: 'augment', text: 'Augment Context', description: 'Combine query + docs' },
      { id: 'generate', text: 'Generate Response', description: 'LLM creates answer' }
    ];

    const flowDiagram = document.createElement('div');
    flowDiagram.className = 'rag-flow-diagram';
    
    let currentStep = -1;
    
    const createStepElement = (step, index) => {
      const stepEl = document.createElement('div');
      stepEl.className = 'rag-step';
      stepEl.dataset.step = index;
      stepEl.innerHTML = `
        <div class="step-content">
          <h4>${step.text}</h4>
          <p>${step.description}</p>
        </div>
      `;
      return stepEl;
    };

    const createArrow = () => {
      const arrow = document.createElement('div');
      arrow.className = 'rag-arrow';
      arrow.innerHTML = '↓';
      return arrow;
    };

    // Build the flow
    steps.forEach((step, index) => {
      flowDiagram.appendChild(createStepElement(step, index));
      if (index < steps.length - 1) {
        flowDiagram.appendChild(createArrow());
      }
    });

    // Add controls
    const controls = document.createElement('div');
    controls.className = 'diagram-controls';
    controls.innerHTML = `
      <button class="diagram-button" onclick="window.modernAI.animateRAGFlow()">Animate Flow</button>
      <button class="diagram-button" onclick="window.modernAI.resetRAGFlow()">Reset</button>
    `;

    container.appendChild(flowDiagram);
    container.appendChild(controls);

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .rag-flow-diagram {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-2);
        padding: var(--space-6);
      }
      
      .rag-step {
        background: var(--bg-primary);
        border: 2px solid var(--border-color);
        border-radius: var(--radius-lg);
        padding: var(--space-4);
        min-width: 300px;
        text-align: center;
        transition: var(--transition-slow);
        opacity: 0.3;
        transform: scale(0.95);
      }
      
      .rag-step.active {
        opacity: 1;
        transform: scale(1);
        border-color: var(--accent-blue);
        background: rgba(59, 130, 246, 0.05);
      }
      
      .rag-step h4 {
        margin: 0 0 var(--space-2) 0;
        color: var(--accent-blue);
      }
      
      .rag-step p {
        margin: 0;
        font-size: 0.875rem;
        color: var(--text-secondary);
      }
      
      .rag-arrow {
        font-size: 1.5rem;
        color: var(--accent-blue);
        opacity: 0.3;
        transition: var(--transition);
      }
      
      .rag-arrow.active {
        opacity: 1;
        animation: pulse 1s infinite;
      }
      
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
      }
    `;
    document.head.appendChild(style);

    // Animation functions
    window.modernAI = window.modernAI || {};
    window.modernAI.animateRAGFlow = () => {
      const steps = flowDiagram.querySelectorAll('.rag-step');
      const arrows = flowDiagram.querySelectorAll('.rag-arrow');
      
      // Reset
      steps.forEach(step => step.classList.remove('active'));
      arrows.forEach(arrow => arrow.classList.remove('active'));
      
      let currentStep = 0;
      
      const animateStep = () => {
        if (currentStep < steps.length) {
          steps[currentStep].classList.add('active');
          
          if (currentStep < arrows.length) {
            setTimeout(() => {
              arrows[currentStep].classList.add('active');
            }, 500);
          }
          
          currentStep++;
          setTimeout(animateStep, 1000);
        }
      };
      
      animateStep();
    };
    
    window.modernAI.resetRAGFlow = () => {
      const steps = flowDiagram.querySelectorAll('.rag-step');
      const arrows = flowDiagram.querySelectorAll('.rag-arrow');
      steps.forEach(step => step.classList.remove('active'));
      arrows.forEach(arrow => arrow.classList.remove('active'));
    };
  }

  // Theme toggle functionality
  setupThemeToggle() {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;

    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    toggle.addEventListener('click', () => {
      const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      toggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });
    
    toggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
  }

  // Code copy functionality
  setupCodeCopyButtons() {
    document.querySelectorAll('.copy-button').forEach(button => {
      button.addEventListener('click', () => {
        const codeBlock = button.closest('.code-block').querySelector('code');
        const text = codeBlock.textContent;
        
        navigator.clipboard.writeText(text).then(() => {
          button.textContent = 'Copied!';
          setTimeout(() => {
            button.textContent = 'Copy';
          }, 2000);
        });
      });
    });
  }

  // Navigation highlight
  setupNavigationHighlight() {
    const sections = document.querySelectorAll('h2[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, { threshold: 0.7 });
    
    sections.forEach(section => observer.observe(section));
  }

  // Mermaid diagrams setup
  setupMermaidDiagrams() {
    // Load Mermaid if available
    if (typeof mermaid !== 'undefined') {
      mermaid.initialize({ 
        theme: 'default',
        startOnLoad: true,
        flowchart: {
          useMaxWidth: true,
          htmlLabels: true
        }
      });
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Small delay to ensure all external scripts are loaded
  setTimeout(() => {
    new ModernAIArticle();
  }, 500);
});

// Also initialize when window is fully loaded (fallback)
window.addEventListener('load', () => {
  // Check if already initialized
  if (!window.modernAIInitialized) {
    new ModernAIArticle();
    window.modernAIInitialized = true;
  }
});

// Utility functions for interactive features
window.modernAI = window.modernAI || {
  // Add utility methods here
  scrollToSection: (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  },
  
  highlightCode: (language) => {
    // Dynamic code highlighting based on language
    console.log(`Highlighting ${language} code`);
  }
};
