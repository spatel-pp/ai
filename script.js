// Modern AI Article Interactive Features
class ModernAIArticle {
  constructor() {
    // Only initialize if not already initialized
    if (!window.modernAIInitialized) {
      window.modernAIInitialized = true;
      this.init();
    }
  }

  init() {
    // Initialize after DOM is ready
    this.setupSyntaxHighlighting();
    this.setupScrollAnimations();
    this.setupDiagramInteractions();
    this.setupThemeToggle();
    this.setupCodeCopyButtons();
    this.setupNavigationHighlight();
    this.setupMermaidDiagrams();
  }

  // Enhanced syntax highlighting with Prism.js support
  setupSyntaxHighlighting() {
    // Check if Prism is available and working
    if (typeof Prism !== 'undefined' && Prism.highlightAll) {
      try {
        console.log('Using Prism.js for syntax highlighting');
        // Use Prism's manual highlighting to avoid conflicts
        document.querySelectorAll('pre code[class*="language-"]').forEach((block) => {
          Prism.highlightElement(block);
        });
      } catch (error) {
        console.warn('Prism.js error, falling back to custom highlighting:', error);
        this.fallbackHighlighting();
      }
    } else {
      console.log('Prism.js not available, using fallback highlighting');
      this.fallbackHighlighting();
    }
  }

  // Fallback highlighting method
  fallbackHighlighting() {
    document.querySelectorAll('pre code').forEach(block => {
      this.highlightSyntax(block);
    });
  }

  highlightSyntax(block) {
    let code = block.innerHTML;
    
    // Basic syntax highlighting patterns
    const patterns = [
      { pattern: /(#.*$)/gm, className: 'comment' },
      { pattern: /\b(def|class|import|from|if|else|elif|for|while|return|try|except|with|as)\b/g, className: 'keyword' },
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
    canvas.style.cursor = 'crosshair';
    
    const ctx = canvas.getContext('2d');
    
    // Animation state
    let points = [];
    let hoveredPoint = null;
    
    // Category labels and colors
    const categories = [
      { name: 'Animals', color: '#3b82f6', examples: ['cat', 'dog', 'bird', 'fish'] },
      { name: 'Food', color: '#10b981', examples: ['apple', 'bread', 'pizza', 'cake'] },
      { name: 'Objects', color: '#f59e0b', examples: ['chair', 'book', 'phone', 'car'] }
    ];
    
    // Generate semantic points
    const generatePoints = () => {
      points = [];
      categories.forEach((category, categoryIndex) => {
        category.examples.forEach((example, i) => {
          // Cluster points by category with some natural spread
          const baseX = 80 + categoryIndex * 120;
          const baseY = 100 + categoryIndex * 80;
          points.push({
            x: baseX + (Math.random() - 0.5) * 80,
            y: baseY + (Math.random() - 0.5) * 80,
            category: categoryIndex,
            label: example,
            highlight: false
          });
        });
      });
    };
    
    const drawVisualization = () => {
      ctx.clearRect(0, 0, 400, 400);
      
      // Draw grid
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= 400; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 400);
        ctx.moveTo(0, i);
        ctx.lineTo(400, i);
        ctx.stroke();
      }
      
      // Draw category regions (subtle background)
      categories.forEach((category, index) => {
        ctx.fillStyle = category.color + '10'; // Very transparent
        ctx.fillRect(20 + index * 120, 20 + index * 80, 100, 100);
      });
      
      // Draw points
      points.forEach(point => {
        const category = categories[point.category];
        ctx.fillStyle = category.color;
        
        // Draw point
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.highlight ? 8 : 5, 0, 2 * Math.PI);
        ctx.fill();
        
        if (point.highlight) {
          // Highlight outline
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.stroke();
          
          // Draw label
          ctx.fillStyle = '#000000';
          ctx.font = 'bold 12px system-ui';
          ctx.textAlign = 'center';
          ctx.fillText(point.label, point.x, point.y - 15);
          
          // Draw similarity connections to same category
          points.forEach(otherPoint => {
            if (otherPoint !== point && otherPoint.category === point.category) {
              ctx.strokeStyle = category.color + '40';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(point.x, point.y);
              ctx.lineTo(otherPoint.x, otherPoint.y);
              ctx.stroke();
            }
          });
        }
      });
      
      // Draw legend
      ctx.fillStyle = '#000000';
      ctx.font = '12px system-ui';
      ctx.textAlign = 'left';
      categories.forEach((category, index) => {
        const y = 20 + index * 20;
        ctx.fillStyle = category.color;
        ctx.fillRect(10, y - 8, 12, 12);
        ctx.fillStyle = '#000000';
        ctx.fillText(category.name, 30, y);
      });
    };
    
    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'vector-tooltip';
    tooltip.style.cssText = `
      position: absolute;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 12px;
      pointer-events: none;
      display: none;
      z-index: 1000;
      max-width: 200px;
    `;
    container.appendChild(tooltip);
    
    // Mouse interaction
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      hoveredPoint = null;
      points.forEach(point => {
        const distance = Math.sqrt((point.x - mouseX) ** 2 + (point.y - mouseY) ** 2);
        point.highlight = distance < 20;
        if (point.highlight) {
          hoveredPoint = point;
        }
      });
      
      // Show tooltip
      if (hoveredPoint) {
        const category = categories[hoveredPoint.category];
        tooltip.innerHTML = `
          <strong>${hoveredPoint.label}</strong><br>
          Category: ${category.name}<br>
          <small>Similar items cluster together in vector space</small>
        `;
        tooltip.style.display = 'block';
        tooltip.style.left = (e.clientX + 10) + 'px';
        tooltip.style.top = (e.clientY - 10) + 'px';
      } else {
        tooltip.style.display = 'none';
      }
      
      drawVisualization();
    });
    
    canvas.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
      points.forEach(point => point.highlight = false);
      drawVisualization();
    });
    
    generatePoints();
    drawVisualization();
    
    container.appendChild(canvas);
    
    // Add controls
    const controls = document.createElement('div');
    controls.className = 'diagram-controls';
    controls.style.cssText = `
      margin-top: 10px;
      text-align: center;
    `;
    controls.innerHTML = `
      <button class="diagram-button" style="margin: 5px; padding: 8px 16px; background: var(--primary-color); color: white; border: none; border-radius: 4px; cursor: pointer;">Shuffle Points</button>
      <button class="diagram-button" style="margin: 5px; padding: 8px 16px; background: var(--secondary-color); color: white; border: none; border-radius: 4px; cursor: pointer;">Show Clusters</button>
    `;
    container.appendChild(controls);
    
    // Add event listeners to buttons
    const buttons = controls.querySelectorAll('.diagram-button');
    buttons[0].addEventListener('click', () => {
      generatePoints();
      drawVisualization();
    });
    
    buttons[1].addEventListener('click', () => {
      // Enhanced clustering animation
      const clusterCenters = [
        { x: 80, y: 120 },   // Animals cluster
        { x: 200, y: 200 },  // Food cluster  
        { x: 320, y: 120 }   // Objects cluster
      ];
      
      points.forEach(point => {
        const target = clusterCenters[point.category];
        
        const animate = () => {
          point.x += (target.x - point.x) * 0.08;
          point.y += (target.y - point.y) * 0.08;
          drawVisualization();
          
          if (Math.abs(point.x - target.x) > 2 || Math.abs(point.y - target.y) > 2) {
            requestAnimationFrame(animate);
          }
        };
        animate();
      });
    });
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

    container.appendChild(diagram);

    // Add interactivity
    const tokens = diagram.querySelectorAll('.token');

    tokens.forEach(token => {
      token.addEventListener('click', () => {
        // Clear previous attention
        tokens.forEach(t => t.classList.remove('attending'));

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

  // Enhanced navigation with scroll-based highlighting
  setupNavigationHighlight() {
    const tocLinks = document.querySelectorAll('.toc-link[data-section]');
    const sections = document.querySelectorAll('section[id]');
    const tocToggle = document.querySelector('.toc-toggle');
    const toc = document.querySelector('.table-of-contents');
    
    if (!tocLinks.length || !sections.length) return;

    // TOC toggle functionality
    let tocCollapsed = false;
    if (tocToggle && toc) {
      tocToggle.addEventListener('click', () => {
        tocCollapsed = !tocCollapsed;
        toc.classList.toggle('collapsed', tocCollapsed);
        tocToggle.textContent = tocCollapsed ? '☰' : '≡';
      });

      // Auto-show on larger screens
      const checkScreenSize = () => {
        if (window.innerWidth >= 1200) {
          toc.classList.add('visible');
        } else {
          toc.classList.remove('visible');
        }
      };
      
      checkScreenSize();
      window.addEventListener('resize', checkScreenSize);

      // Mobile toggle
      if (window.innerWidth <= 1200) {
        toc.addEventListener('click', (e) => {
          if (e.target === toc || e.target.closest('.toc-header')) {
            toc.classList.toggle('visible');
          }
        });
      }
    }

    // Scroll tracking with improved logic
    const observerOptions = {
      rootMargin: '-20% 0px -60% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    };

    const observer = new IntersectionObserver((entries) => {
      let activeSection = null;
      let maxRatio = 0;

      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          activeSection = entry.target.id;
        }
      });

      if (activeSection) {
        // Update TOC highlighting
        tocLinks.forEach(link => {
          const isActive = link.dataset.section === activeSection;
          link.classList.toggle('active', isActive);
        });

        // Update main nav highlighting
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
        navLinks.forEach(link => {
          const href = link.getAttribute('href').substring(1);
          link.classList.toggle('active', href === activeSection);
        });
      }
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => {
      observer.observe(section);
    });

    // Smooth scroll for TOC links
    tocLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.dataset.section;
        const section = document.getElementById(sectionId);
        
        if (section) {
          section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
          
          // Update URL without jumping
          history.pushState(null, null, `#${sectionId}`);
        }
      });
    });
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
  // Wait a bit for external scripts to load
  setTimeout(() => {
    new ModernAIArticle();
  }, 100);
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
