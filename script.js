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
    this.setupVectorSpace1D();
    this.setupVectorSpace2D();
    this.setupVectorSpace3D();
    this.setupTransformerDiagram();
    this.setupRAGFlowDiagram();
  }

  // 1D Vector Space: Simple linear relationships
  setupVectorSpace1D() {
    const container = document.querySelector('.vector-space-1d');
    if (!container) return;

    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 120;
    const ctx = canvas.getContext('2d');
    
    // 1D data: temperature concepts
    const concepts1D = [
      { name: 'Freezing', value: 0.1, color: '#3b82f6' },
      { name: 'Cold', value: 0.25, color: '#1d4ed8' },
      { name: 'Cool', value: 0.4, color: '#06b6d4' },
      { name: 'Warm', value: 0.6, color: '#10b981' },
      { name: 'Hot', value: 0.75, color: '#f59e0b' },
      { name: 'Scorching', value: 0.9, color: '#ef4444' }
    ];
    
    let hoveredConcept = null;
    
    const draw1D = () => {
      ctx.clearRect(0, 0, 800, 120);
      
      // Draw temperature gradient background
      const gradient = ctx.createLinearGradient(50, 0, 750, 0);
      gradient.addColorStop(0, '#3b82f6');
      gradient.addColorStop(0.5, '#10b981');
      gradient.addColorStop(1, '#f59e0b');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(50, 40, 700, 40);
      
      // Draw scale
      ctx.fillStyle = '#666';
      ctx.font = '12px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText('Cold', 50, 100);
      ctx.fillText('Hot', 750, 100);
      
      // Draw concept points
      concepts1D.forEach(concept => {
        const x = 50 + concept.value * 700;
        const y = 60;
        
        // Draw point
        ctx.fillStyle = concept.color;
        ctx.beginPath();
        ctx.arc(x, y, hoveredConcept === concept ? 8 : 5, 0, 2 * Math.PI);
        ctx.fill();
        
        if (hoveredConcept === concept) {
          // Draw label
          ctx.fillStyle = '#000';
          ctx.font = 'bold 14px system-ui';
          ctx.fillText(concept.name, x, y - 15);
          ctx.fillText(`Vector: [${concept.value.toFixed(2)}]`, x, y + 25);
        }
      });
    };
    
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
      
      hoveredConcept = null;
      concepts1D.forEach(concept => {
        const x = 50 + concept.value * 700;
        const distance = Math.abs(mouseX - x);
        if (distance < 20) {
          hoveredConcept = concept;
        }
      });
      
      draw1D();
    });
    
    canvas.addEventListener('mouseleave', () => {
      hoveredConcept = null;
      draw1D();
    });
    
    draw1D();
    container.appendChild(canvas);
  }

  // 2D Vector Space: Enhanced version of the original
  setupVectorSpace2D() {
    const container = document.querySelector('.vector-space-2d');
    if (!container) return;

    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    
    // 2D data: words with formality (x) and emotion (y) dimensions
    const concepts2D = [
      { name: 'Hello', x: 0.3, y: 0.7, category: 'greeting', color: '#3b82f6' },
      { name: 'Greetings', x: 0.8, y: 0.5, category: 'greeting', color: '#3b82f6' },
      { name: 'Hey', x: 0.1, y: 0.9, category: 'greeting', color: '#3b82f6' },
      { name: 'Love', x: 0.4, y: 0.9, category: 'emotion', color: '#10b981' },
      { name: 'Adore', x: 0.7, y: 0.8, category: 'emotion', color: '#10b981' },
      { name: 'Hate', x: 0.4, y: 0.1, category: 'emotion', color: '#10b981' },
      { name: 'Cat', x: 0.5, y: 0.6, category: 'animal', color: '#f59e0b' },
      { name: 'Feline', x: 0.9, y: 0.6, category: 'animal', color: '#f59e0b' },
      { name: 'Kitty', x: 0.2, y: 0.8, category: 'animal', color: '#f59e0b' }
    ];
    
    let hoveredConcept = null;
    
    const draw2D = () => {
      ctx.clearRect(0, 0, 600, 400);
      
      // Draw grid
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 10; i++) {
        const x = i * 50 + 50;
        const y = i * 30 + 50;
        ctx.beginPath();
        ctx.moveTo(x, 50);
        ctx.lineTo(x, 350);
        ctx.moveTo(50, y);
        ctx.lineTo(550, y);
        ctx.stroke();
      }
      
      // Draw axes labels
      ctx.fillStyle = '#666';
      ctx.font = '14px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText('Formality →', 300, 380);
      ctx.save();
      ctx.translate(20, 200);
      ctx.rotate(-Math.PI/2);
      ctx.fillText('Emotion →', 0, 0);
      ctx.restore();
      
      // Draw points
      concepts2D.forEach(concept => {
        const x = 50 + concept.x * 500;
        const y = 350 - concept.y * 300;
        
        ctx.fillStyle = concept.color;
        ctx.beginPath();
        ctx.arc(x, y, hoveredConcept === concept ? 8 : 5, 0, 2 * Math.PI);
        ctx.fill();
        
        if (hoveredConcept === concept) {
          // Draw connections to same category
          concepts2D.forEach(other => {
            if (other !== concept && other.category === concept.category) {
              const otherX = 50 + other.x * 500;
              const otherY = 350 - other.y * 300;
              ctx.strokeStyle = concept.color + '40';
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(otherX, otherY);
              ctx.stroke();
            }
          });
          
          // Draw label
          ctx.fillStyle = '#000';
          ctx.font = 'bold 14px system-ui';
          ctx.textAlign = 'center';
          ctx.fillText(concept.name, x, y - 15);
          ctx.fillText(`[${concept.x.toFixed(2)}, ${concept.y.toFixed(2)}]`, x, y + 25);
        }
      });
      
      // Draw legend
      const categories = ['greeting', 'emotion', 'animal'];
      const colors = ['#3b82f6', '#10b981', '#f59e0b'];
      categories.forEach((cat, i) => {
        ctx.fillStyle = colors[i];
        ctx.fillRect(450, 60 + i * 25, 15, 15);
        ctx.fillStyle = '#000';
        ctx.font = '12px system-ui';
        ctx.textAlign = 'left';
        ctx.fillText(cat, 470, 72 + i * 25);
      });
    };
    
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
      const mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);
      
      hoveredConcept = null;
      concepts2D.forEach(concept => {
        const x = 50 + concept.x * 500;
        const y = 350 - concept.y * 300;
        const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
        if (distance < 20) {
          hoveredConcept = concept;
        }
      });
      
      draw2D();
    });
    
    canvas.addEventListener('mouseleave', () => {
      hoveredConcept = null;
      draw2D();
    });
    
    draw2D();
    container.appendChild(canvas);
  }

  // 3D Vector Space: Interactive 3D visualization
  setupVectorSpace3D() {
    const container = document.querySelector('.vector-space-3d');
    if (!container) return;

    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 500;
    const ctx = canvas.getContext('2d');
    
    // 3D data: words with size, formality, and emotion dimensions
    const concepts3D = [
      { name: 'Tiny', x: 0.1, y: 0.3, z: 0.5, category: 'size', color: '#3b82f6' },
      { name: 'Small', x: 0.3, y: 0.4, z: 0.5, category: 'size', color: '#3b82f6' },
      { name: 'Large', x: 0.7, y: 0.6, z: 0.5, category: 'size', color: '#3b82f6' },
      { name: 'Huge', x: 0.9, y: 0.7, z: 0.5, category: 'size', color: '#3b82f6' },
      { name: 'Happy', x: 0.5, y: 0.3, z: 0.9, category: 'emotion', color: '#10b981' },
      { name: 'Joyful', x: 0.5, y: 0.8, z: 0.9, category: 'emotion', color: '#10b981' },
      { name: 'Sad', x: 0.5, y: 0.3, z: 0.1, category: 'emotion', color: '#10b981' },
      { name: 'Melancholy', x: 0.5, y: 0.8, z: 0.1, category: 'emotion', color: '#10b981' },
      { name: 'Quick', x: 0.8, y: 0.2, z: 0.7, category: 'speed', color: '#f59e0b' },
      { name: 'Rapid', x: 0.8, y: 0.9, z: 0.7, category: 'speed', color: '#f59e0b' },
      { name: 'Slow', x: 0.2, y: 0.2, z: 0.3, category: 'speed', color: '#f59e0b' },
      { name: 'Leisurely', x: 0.2, y: 0.9, z: 0.3, category: 'speed', color: '#f59e0b' }
    ];
    
    let rotation = { x: 0, y: 0 };
    let isDragging = false;
    let lastMouse = { x: 0, y: 0 };
    let hoveredConcept = null;
    
    // 3D to 2D projection
    const project3D = (x, y, z) => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const scale = 200;
      
      // Apply rotation
      const cosX = Math.cos(rotation.x);
      const sinX = Math.sin(rotation.x);
      const cosY = Math.cos(rotation.y);
      const sinY = Math.sin(rotation.y);
      
      // Rotate around Y axis
      const rotatedX = x * cosY - z * sinY;
      const rotatedZ = x * sinY + z * cosY;
      
      // Rotate around X axis
      const finalY = y * cosX - rotatedZ * sinX;
      const finalZ = y * sinX + rotatedZ * cosX;
      
      // Project to 2D
      const perspective = 1 / (1 + finalZ * 0.5);
      return {
        x: centerX + rotatedX * scale * perspective,
        y: centerY - finalY * scale * perspective,
        z: finalZ
      };
    };
    
    const draw3D = () => {
      ctx.clearRect(0, 0, 600, 500);
      
      // Draw 3D cube wireframe
      const cubeVertices = [
        [0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0],
        [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]
      ];
      
      const cubeEdges = [
        [0,1], [1,2], [2,3], [3,0], // bottom face
        [4,5], [5,6], [6,7], [7,4], // top face
        [0,4], [1,5], [2,6], [3,7]  // vertical edges
      ];
      
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      cubeEdges.forEach(edge => {
        const start = project3D(...cubeVertices[edge[0]]);
        const end = project3D(...cubeVertices[edge[1]]);
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
      });
      
      // Sort concepts by z-depth for proper rendering
      const sortedConcepts = concepts3D.map(concept => {
        const projected = project3D(concept.x, concept.y, concept.z);
        return { ...concept, projected, depth: projected.z };
      }).sort((a, b) => a.depth - b.depth);
      
      // Draw concepts
      sortedConcepts.forEach(concept => {
        const { projected } = concept;
        const radius = hoveredConcept === concept ? 8 : 5;
        
        ctx.fillStyle = concept.color;
        ctx.beginPath();
        ctx.arc(projected.x, projected.y, radius, 0, 2 * Math.PI);
        ctx.fill();
        
        if (hoveredConcept === concept) {
          // Draw label
          ctx.fillStyle = '#000';
          ctx.font = 'bold 14px system-ui';
          ctx.textAlign = 'center';
          ctx.fillText(concept.name, projected.x, projected.y - 15);
          ctx.fillText(`[${concept.x.toFixed(1)}, ${concept.y.toFixed(1)}, ${concept.z.toFixed(1)}]`, projected.x, projected.y + 25);
        }
      });
      
      // Draw axes labels
      const xAxis = project3D(1.2, 0, 0);
      const yAxis = project3D(0, 1.2, 0);
      const zAxis = project3D(0, 0, 1.2);
      
      ctx.fillStyle = '#666';
      ctx.font = '12px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText('Size', xAxis.x, xAxis.y);
      ctx.fillText('Formality', yAxis.x, yAxis.y);
      ctx.fillText('Emotion', zAxis.x, zAxis.y);
    };
    
    // Mouse interaction
    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      lastMouse.x = e.clientX;
      lastMouse.y = e.clientY;
    });
    
    canvas.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const deltaX = e.clientX - lastMouse.x;
        const deltaY = e.clientY - lastMouse.y;
        rotation.y += deltaX * 0.01;
        rotation.x += deltaY * 0.01;
        lastMouse.x = e.clientX;
        lastMouse.y = e.clientY;
        draw3D();
      } else {
        // Check for hover
        const rect = canvas.getBoundingClientRect();
        const mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
        const mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);
        
        hoveredConcept = null;
        concepts3D.forEach(concept => {
          const projected = project3D(concept.x, concept.y, concept.z);
          const distance = Math.sqrt((mouseX - projected.x) ** 2 + (mouseY - projected.y) ** 2);
          if (distance < 20) {
            hoveredConcept = concept;
          }
        });
        draw3D();
      }
    });
    
    canvas.addEventListener('mouseup', () => {
      isDragging = false;
    });
    
    canvas.addEventListener('mouseleave', () => {
      isDragging = false;
      hoveredConcept = null;
      draw3D();
    });
    
    // Add controls
    const controls = document.createElement('div');
    controls.className = 'controls-3d';
    controls.innerHTML = 'Click and drag to rotate';
    container.appendChild(controls);
    
    draw3D();
    container.appendChild(canvas);
    
    // Auto-rotation for demo effect
    setInterval(() => {
      if (!isDragging && !hoveredConcept) {
        rotation.y += 0.005;
        draw3D();
      }
    }, 50);
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

  // Enhanced navigation with scroll-based highlighting for docked TOC
  setupNavigationHighlight() {
    const tocLinks = document.querySelectorAll('.toc-link[data-section]');
    const sections = document.querySelectorAll('section[id]');
    const tocToggle = document.querySelector('.toc-toggle');
    const toc = document.querySelector('.table-of-contents.docked');
    
    if (!tocLinks.length || !sections.length) return;

    // TOC collapse/expand functionality
    let tocCollapsed = false;
    if (tocToggle && toc) {
      tocToggle.addEventListener('click', () => {
        tocCollapsed = !tocCollapsed;
        toc.classList.toggle('collapsed', tocCollapsed);
        tocToggle.textContent = tocCollapsed ? '⌄' : '⌄';
      });
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
        const navSections = document.querySelectorAll('.nav-section');
        navSections.forEach(section => {
          // Mark "Fundamentals" as active when on main page sections
          if (section.dataset.section === 'fundamentals') {
            section.classList.add('active');
          } else {
            section.classList.remove('active');
          }
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
          // Calculate offset for docked TOC
          const tocHeight = toc ? toc.offsetHeight : 0;
          const targetPosition = section.offsetTop - tocHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
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
