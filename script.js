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

  // 1D Vector Space: Recipe temperature scale
  setupVectorSpace1D() {
    const container = document.querySelector('.vector-space-1d');
    if (!container) return;

    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 120;
    const ctx = canvas.getContext('2d');
    
    // 1D data: cooking temperature concepts
    const cookingTemps = [
      { name: 'Refrigerate', temp: '32°F', value: 0.05, color: '#1e40af' },
      { name: 'Room Temp', temp: '70°F', value: 0.15, color: '#3b82f6' },
      { name: 'Warm', temp: '100°F', value: 0.25, color: '#06b6d4' },
      { name: 'Simmer', temp: '180°F', value: 0.4, color: '#10b981' },
      { name: 'Boil', temp: '212°F', value: 0.55, color: '#f59e0b' },
      { name: 'Sauté', temp: '300°F', value: 0.7, color: '#f97316' },
      { name: 'Bake', temp: '350°F', value: 0.8, color: '#ef4444' },
      { name: 'Broil', temp: '500°F', value: 0.95, color: '#dc2626' }
    ];
    
    let hoveredTemp = null;
    
    const draw1D = () => {
      ctx.clearRect(0, 0, 800, 120);
      
      // Draw white background for entire canvas
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 800, 120);
      
      // Draw temperature gradient scale
      const gradient = ctx.createLinearGradient(40, 60, 760, 60);
      gradient.addColorStop(0, '#1e40af');    // Cold blue
      gradient.addColorStop(0.3, '#06b6d4');  // Cool cyan
      gradient.addColorStop(0.5, '#10b981');  // Medium green
      gradient.addColorStop(0.7, '#f59e0b');  // Warm orange
      gradient.addColorStop(1, '#dc2626');    // Hot red
      
      ctx.fillStyle = gradient;
      ctx.fillRect(40, 45, 720, 30);
      
      // Draw border around gradient
      ctx.strokeStyle = '#d1d5db';
      ctx.lineWidth = 2;
      ctx.strokeRect(40, 45, 720, 30);
      
      // Draw scale labels
      ctx.fillStyle = '#374151';
      ctx.font = '14px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText('Cold', 60, 105);
      ctx.fillText('Hot', 740, 105);
      
      // Draw cooking method points
      cookingTemps.forEach(method => {
        const x = 40 + method.value * 720;
        const y = 60;
        
        // Draw point with white outline for visibility
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(x, y, hoveredTemp === method ? 10 : 7, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.fillStyle = method.color;
        ctx.beginPath();
        ctx.arc(x, y, hoveredTemp === method ? 8 : 5, 0, 2 * Math.PI);
        ctx.fill();
        
        if (hoveredTemp === method) {
          // Draw method label above
          ctx.fillStyle = '#000';
          ctx.font = 'bold 14px system-ui';
          ctx.fillText(method.name, x, y - 20);
          
          // Draw temperature below
          ctx.font = '12px system-ui';
          ctx.fillText(method.temp, x, y + 25);
        }
      });
    };
    
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
      
      hoveredTemp = null;
      cookingTemps.forEach(method => {
        const x = 40 + method.value * 720;
        const distance = Math.abs(mouseX - x);
        if (distance < 25) {
          hoveredTemp = method;
        }
      });
      
      draw1D();
    });
    
    canvas.addEventListener('mouseleave', () => {
      hoveredTemp = null;
      draw1D();
    });
    
    draw1D();
    container.appendChild(canvas);
  }

  // 2D Vector Space: Recipe complexity vs cooking time
  setupVectorSpace2D() {
    const container = document.querySelector('.vector-space-2d');
    if (!container) return;

    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    
    // 2D data: recipes with complexity (x) and cooking time (y)
    const recipes = [
      // Quick & Easy (low complexity, short time)
      { name: 'Scrambled Eggs', x: 0.1, y: 0.1, category: 'breakfast', color: '#f59e0b' },
      { name: 'Toast', x: 0.05, y: 0.05, category: 'breakfast', color: '#f59e0b' },
      { name: 'Cereal', x: 0.02, y: 0.02, category: 'breakfast', color: '#f59e0b' },
      
      // Medium Complexity (medium complexity, medium time)
      { name: 'Pasta Carbonara', x: 0.4, y: 0.3, category: 'dinner', color: '#3b82f6' },
      { name: 'Stir Fry', x: 0.3, y: 0.2, category: 'dinner', color: '#3b82f6' },
      { name: 'Chicken Curry', x: 0.5, y: 0.6, category: 'dinner', color: '#3b82f6' },
      
      // Complex Dishes (high complexity, long time)
      { name: 'Beef Wellington', x: 0.9, y: 0.8, category: 'gourmet', color: '#dc2626' },
      { name: 'Sourdough Bread', x: 0.7, y: 0.95, category: 'gourmet', color: '#dc2626' },
      { name: 'Coq au Vin', x: 0.8, y: 0.7, category: 'gourmet', color: '#dc2626' },
      
      // Desserts
      { name: 'Cookies', x: 0.2, y: 0.4, category: 'dessert', color: '#10b981' },
      { name: 'Tiramisu', x: 0.6, y: 0.5, category: 'dessert', color: '#10b981' },
      { name: 'Crème Brûlée', x: 0.8, y: 0.4, category: 'dessert', color: '#10b981' }
    ];
    
    let hoveredRecipe = null;
    
    const draw2D = () => {
      ctx.clearRect(0, 0, 800, 600);
      
      // Draw white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 800, 600);
      
      // Draw subtle background grid
      ctx.strokeStyle = '#f3f4f6';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 10; i++) {
        const x = i * 70 + 80;
        const y = i * 50 + 50;
        ctx.beginPath();
        ctx.moveTo(x, 50);
        ctx.lineTo(x, 550);
        ctx.moveTo(80, y);
        ctx.lineTo(780, y);
        ctx.stroke();
      }
      
      // Draw main axes with thicker lines
      ctx.strokeStyle = '#d1d5db';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(80, 550);
      ctx.lineTo(780, 550);
      ctx.moveTo(80, 50);
      ctx.lineTo(80, 550);
      ctx.stroke();
      
      // Draw axes labels with better positioning
      ctx.fillStyle = '#374151';
      ctx.font = 'bold 16px system-ui';
      ctx.textAlign = 'center';
      
      // X-axis label
      ctx.fillText('Recipe Complexity →', 430, 585);
      
      // Y-axis label
      ctx.save();
      ctx.translate(25, 300);
      ctx.rotate(-Math.PI/2);
      ctx.fillText('← Cooking Time', 0, 0);
      ctx.restore();
      
      // Add scale markers
      ctx.fillStyle = '#6b7280';
      ctx.font = '12px system-ui';
      
      // X-axis markers
      for (let i = 0; i <= 10; i += 2) {
        const x = 80 + (i/10) * 700;
        ctx.textAlign = 'center';
        ctx.fillText(`${i*10}%`, x, 570);
      }
      
      // Y-axis markers
      ctx.textAlign = 'right';
      for (let i = 0; i <= 10; i += 2) {
        const y = 550 - (i/10) * 500;
        ctx.fillText(`${i*10}%`, 70, y + 5);
      }
      
      // Draw category regions (subtle backgrounds)
      const regions = [
        { name: 'Quick & Easy', x: 80, y: 450, w: 140, h: 100, color: '#f59e0b20' },
        { name: 'Everyday Meals', x: 220, y: 250, w: 280, h: 200, color: '#3b82f620' },
        { name: 'Gourmet', x: 500, y: 50, w: 280, h: 300, color: '#dc262620' }
      ];
      
      regions.forEach(region => {
        ctx.fillStyle = region.color;
        ctx.fillRect(region.x, region.y, region.w, region.h);
        
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px system-ui';
        ctx.textAlign = 'left';
        ctx.fillText(region.name, region.x + 5, region.y + 15);
      });
      
      // Draw recipe points
      recipes.forEach(recipe => {
        const x = 80 + recipe.x * 700;
        const y = 550 - recipe.y * 500;
        
        // Draw white outline for visibility
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(x, y, hoveredRecipe === recipe ? 10 : 7, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.fillStyle = recipe.color;
        ctx.beginPath();
        ctx.arc(x, y, hoveredRecipe === recipe ? 8 : 5, 0, 2 * Math.PI);
        ctx.fill();
        
        if (hoveredRecipe === recipe) {
          // Draw connections to same category
          recipes.forEach(other => {
            if (other !== recipe && other.category === recipe.category) {
              const otherX = 80 + other.x * 700;
              const otherY = 550 - other.y * 500;
              ctx.strokeStyle = recipe.color + '60';
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(otherX, otherY);
              ctx.stroke();
            }
          });
          
          // Draw recipe label
          ctx.fillStyle = '#000';
          ctx.font = 'bold 14px system-ui';
          ctx.textAlign = 'center';
          ctx.fillText(recipe.name, x, y - 20);
          ctx.font = '12px system-ui';
          ctx.fillText(`[${recipe.x.toFixed(2)}, ${recipe.y.toFixed(2)}]`, x, y + 30);
        }
      });
      
      // Draw horizontal legend across the top
      const categories = ['breakfast', 'dinner', 'gourmet', 'dessert'];
      const colors = ['#f59e0b', '#3b82f6', '#dc2626', '#10b981'];
      const labels = ['Breakfast', 'Dinner', 'Gourmet', 'Dessert'];
      
      const legendStartX = 120;
      const legendY = 25;
      const legendSpacing = 140;
      
      categories.forEach((cat, i) => {
        const x = legendStartX + i * legendSpacing;
        
        // Draw colored square
        ctx.fillStyle = colors[i];
        ctx.fillRect(x, legendY, 16, 16);
        
        // Draw label
        ctx.fillStyle = '#374151';
        ctx.font = '14px system-ui';
        ctx.textAlign = 'left';
        ctx.fillText(labels[i], x + 22, legendY + 12);
      });
    };
    
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
      const mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);
      
      hoveredRecipe = null;
      recipes.forEach(recipe => {
        const x = 80 + recipe.x * 700;
        const y = 550 - recipe.y * 500;
        const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
        if (distance < 25) {
          hoveredRecipe = recipe;
        }
      });
      
      draw2D();
    });
    
    canvas.addEventListener('mouseleave', () => {
      hoveredRecipe = null;
      draw2D();
    });
    
    draw2D();
    container.appendChild(canvas);
  }

  // 3D Vector Space: Multi-dimensional recipe attributes
  setupVectorSpace3D() {
    const container = document.querySelector('.vector-space-3d');
    if (!container) return;

    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    
    // 3D data: recipes with complexity, time, and difficulty dimensions
    const recipes3D = [
      // Simple recipes
      { name: 'Instant Noodles', x: 0.05, y: 0.05, z: 0.1, category: 'instant', color: '#22c55e' },
      { name: 'PB&J Sandwich', x: 0.1, y: 0.08, z: 0.05, category: 'instant', color: '#22c55e' },
      { name: 'Microwave Popcorn', x: 0.02, y: 0.03, z: 0.02, category: 'instant', color: '#22c55e' },
      
      // Quick meals
      { name: 'Fried Rice', x: 0.3, y: 0.2, z: 0.25, category: 'quick', color: '#3b82f6' },
      { name: 'Quesadilla', x: 0.2, y: 0.15, z: 0.2, category: 'quick', color: '#3b82f6' },
      { name: 'Grilled Cheese', x: 0.15, y: 0.1, z: 0.15, category: 'quick', color: '#3b82f6' },
      
      // Intermediate dishes
      { name: 'Chicken Stir-fry', x: 0.5, y: 0.4, z: 0.45, category: 'intermediate', color: '#f59e0b' },
      { name: 'Pasta Bolognese', x: 0.6, y: 0.5, z: 0.4, category: 'intermediate', color: '#f59e0b' },
      { name: 'Fish Tacos', x: 0.55, y: 0.35, z: 0.5, category: 'intermediate', color: '#f59e0b' },
      
      // Advanced recipes
      { name: 'Beef Bourguignon', x: 0.85, y: 0.9, z: 0.8, category: 'advanced', color: '#dc2626' },
      { name: 'Homemade Pasta', x: 0.7, y: 0.6, z: 0.75, category: 'advanced', color: '#dc2626' },
      { name: 'Duck Confit', x: 0.9, y: 0.85, z: 0.9, category: 'advanced', color: '#dc2626' },
      
      // Baking/Desserts
      { name: 'Chocolate Cake', x: 0.6, y: 0.7, z: 0.65, category: 'baking', color: '#8b5cf6' },
      { name: 'Croissants', x: 0.95, y: 0.8, z: 0.95, category: 'baking', color: '#8b5cf6' },
      { name: 'Sugar Cookies', x: 0.3, y: 0.4, z: 0.3, category: 'baking', color: '#8b5cf6' }
    ];
    
    let rotation = { x: 0.2, y: 0.3 };
    let isDragging = false;
    let lastMouse = { x: 0, y: 0 };
    let hoveredRecipe = null;
    
    // 3D to 2D projection - centered rotation
    const project3D = (x, y, z) => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const scale = 250;
      
      // Center the coordinates around 0.5 for proper rotation
      const centeredX = x - 0.5;
      const centeredY = y - 0.5;
      const centeredZ = z - 0.5;
      
      // Apply rotation
      const cosX = Math.cos(rotation.x);
      const sinX = Math.sin(rotation.x);
      const cosY = Math.cos(rotation.y);
      const sinY = Math.sin(rotation.y);
      
      // Rotate around Y axis
      const rotatedX = centeredX * cosY - centeredZ * sinY;
      const rotatedZ = centeredX * sinY + centeredZ * cosY;
      
      // Rotate around X axis
      const finalY = centeredY * cosX - rotatedZ * sinX;
      const finalZ = centeredY * sinX + rotatedZ * cosX;
      
      // Project to 2D with perspective
      const perspective = 1 / (1 + finalZ * 0.3);
      return {
        x: centerX + rotatedX * scale * perspective,
        y: centerY - finalY * scale * perspective,
        z: finalZ,
        scale: perspective
      };
    };
    
    const draw3D = () => {
      ctx.clearRect(0, 0, 800, 600);
      
      // Draw white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 800, 600);
      
      // Draw subtle radial gradient background
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 400);
      gradient.addColorStop(0, 'rgba(248, 250, 252, 0.8)');
      gradient.addColorStop(1, 'rgba(241, 245, 249, 0.4)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 800, 600);
      
      // Draw 3D cube wireframe with better styling - centered around origin
      const cubeVertices = [
        [-0.5, -0.5, -0.5], [0.5, -0.5, -0.5], [0.5, 0.5, -0.5], [-0.5, 0.5, -0.5],
        [-0.5, -0.5, 0.5], [0.5, -0.5, 0.5], [0.5, 0.5, 0.5], [-0.5, 0.5, 0.5]
      ];
      
      const cubeEdges = [
        [0,1], [1,2], [2,3], [3,0], // bottom face
        [4,5], [5,6], [6,7], [7,4], // top face
        [0,4], [1,5], [2,6], [3,7]  // vertical edges
      ];
      
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.5;
      cubeEdges.forEach(edge => {
        const start = project3D(...cubeVertices[edge[0]]);
        const end = project3D(...cubeVertices[edge[1]]);
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
      });
      
      // Sort recipes by z-depth for proper rendering
      const sortedRecipes = recipes3D.map(recipe => {
        const projected = project3D(recipe.x, recipe.y, recipe.z);
        return { ...recipe, projected, depth: projected.z };
      }).sort((a, b) => a.depth - b.depth);
      
      // Draw recipes with hover effects
      sortedRecipes.forEach(recipe => {
        const { projected } = recipe;
        const baseRadius = 6;
        const radius = hoveredRecipe === recipe ? 
          baseRadius * projected.scale * 1.5 : 
          baseRadius * projected.scale;
        
        // Draw white outline for visibility
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(projected.x, projected.y, radius + 2, 0, 2 * Math.PI);
        ctx.fill();
        
        // Draw recipe point with hover highlight
        ctx.fillStyle = hoveredRecipe === recipe ? 
          recipe.color : 
          recipe.color;
        ctx.beginPath();
        ctx.arc(projected.x, projected.y, radius, 0, 2 * Math.PI);
        ctx.fill();
        
        // Add glow effect for hovered recipe
        if (hoveredRecipe === recipe) {
          ctx.shadowColor = recipe.color;
          ctx.shadowBlur = 15;
          ctx.fillStyle = recipe.color;
          ctx.beginPath();
          ctx.arc(projected.x, projected.y, radius, 0, 2 * Math.PI);
          ctx.fill();
          ctx.shadowBlur = 0;
          
          // Draw connecting lines to same category
          recipes3D.forEach(other => {
            if (other !== recipe && other.category === recipe.category) {
              const otherProjected = project3D(other.x, other.y, other.z);
              ctx.strokeStyle = recipe.color + '40';
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.moveTo(projected.x, projected.y);
              ctx.lineTo(otherProjected.x, otherProjected.y);
              ctx.stroke();
            }
          });
          
          // Draw detailed info box
          const infoX = projected.x < canvas.width / 2 ? projected.x + 30 : projected.x - 180;
          const infoY = projected.y - 60;
          
          // Draw info background
          ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
          ctx.strokeStyle = recipe.color;
          ctx.lineWidth = 2;
          ctx.fillRect(infoX, infoY, 150, 80);
          ctx.strokeRect(infoX, infoY, 150, 80);
          
          // Draw recipe info
          ctx.fillStyle = '#000';
          ctx.font = 'bold 14px system-ui';
          ctx.textAlign = 'left';
          ctx.fillText(recipe.name, infoX + 8, infoY + 18);
          
          ctx.font = '12px system-ui';
          ctx.fillText(`Complexity: ${(recipe.x * 100).toFixed(0)}%`, infoX + 8, infoY + 35);
          ctx.fillText(`Time: ${(recipe.y * 100).toFixed(0)}%`, infoX + 8, infoY + 50);
          ctx.fillText(`Difficulty: ${(recipe.z * 100).toFixed(0)}%`, infoX + 8, infoY + 65);
        }
      });
      
      // Draw axes labels with proper positioning for centered cube
      const axisLength = 0.8;
      const xAxis = project3D(axisLength, 0, 0);
      const yAxis = project3D(0, axisLength, 0);
      const zAxis = project3D(0, 0, axisLength);
      
      ctx.fillStyle = '#374151';
      ctx.font = 'bold 14px system-ui';
      ctx.textAlign = 'center';
      
      // Draw axis lines and labels
      const origin = project3D(0, 0, 0);
      
      // X-axis (Complexity)
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(origin.x, origin.y);
      ctx.lineTo(xAxis.x, xAxis.y);
      ctx.stroke();
      ctx.fillStyle = '#f59e0b';
      ctx.fillText('Complexity', xAxis.x, xAxis.y - 10);
      
      // Y-axis (Time)
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(origin.x, origin.y);
      ctx.lineTo(yAxis.x, yAxis.y);
      ctx.stroke();
      ctx.fillStyle = '#3b82f6';
      ctx.fillText('Time', yAxis.x, yAxis.y - 10);
      
      // Z-axis (Difficulty)
      ctx.strokeStyle = '#dc2626';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(origin.x, origin.y);
      ctx.lineTo(zAxis.x, zAxis.y);
      ctx.stroke();
      ctx.fillStyle = '#dc2626';
      ctx.fillText('Difficulty', zAxis.x, zAxis.y - 10);
      
      // Draw horizontal legend at the bottom
      const categories = ['instant', 'quick', 'intermediate', 'advanced', 'baking'];
      const colors = ['#22c55e', '#3b82f6', '#f59e0b', '#dc2626', '#8b5cf6'];
      const labels = ['Instant', 'Quick', 'Intermediate', 'Advanced', 'Baking'];
      
      const legendStartX = 80;
      const legendY = 580;
      const legendSpacing = 130;
      
      categories.forEach((cat, i) => {
        const x = legendStartX + i * legendSpacing;
        
        // Draw colored square
        ctx.fillStyle = colors[i];
        ctx.fillRect(x, legendY, 14, 14);
        
        // Draw label
        ctx.fillStyle = '#374151';
        ctx.font = '12px system-ui';
        ctx.textAlign = 'left';
        ctx.fillText(labels[i], x + 20, legendY + 11);
      });
    };
    
    // Mouse interaction
    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      lastMouse.x = e.clientX;
      lastMouse.y = e.clientY;
    });
    
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
      const mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);
      
      if (isDragging) {
        const deltaX = e.clientX - lastMouse.x;
        const deltaY = e.clientY - lastMouse.y;
        rotation.y += deltaX * 0.01;
        rotation.x += deltaY * 0.01;
        lastMouse.x = e.clientX;
        lastMouse.y = e.clientY;
        canvas.style.cursor = 'grabbing';
        draw3D();
      } else {
        // Check for hover - improved detection
        hoveredRecipe = null;
        let minDistance = Infinity;
        let foundHover = false;
        
        recipes3D.forEach(recipe => {
          const projected = project3D(recipe.x, recipe.y, recipe.z);
          const distance = Math.sqrt((mouseX - projected.x) ** 2 + (mouseY - projected.y) ** 2);
          const hitRadius = 15 * projected.scale; // Scale hit radius with perspective
          
          if (distance < hitRadius && distance < minDistance) {
            hoveredRecipe = recipe;
            minDistance = distance;
            foundHover = true;
          }
        });
        
        // Update cursor based on hover state
        canvas.style.cursor = foundHover ? 'pointer' : 'grab';
        draw3D();
      }
    });
    
    canvas.addEventListener('mouseup', () => {
      isDragging = false;
      canvas.style.cursor = 'grab';
    });
    
    canvas.addEventListener('mouseleave', () => {
      isDragging = false;
      hoveredRecipe = null;
      canvas.style.cursor = 'default';
      draw3D();
    });
    
    // Add controls
    const controls = document.createElement('div');
    controls.className = 'controls-3d';
    controls.innerHTML = 'Click and drag to rotate • Hover recipes for details';
    container.appendChild(controls);
    
    draw3D();
    container.appendChild(canvas);
    
    // Auto-rotation for demo effect (slower for recipe theme)
    setInterval(() => {
      if (!isDragging && !hoveredRecipe) {
        rotation.y += 0.003;
        draw3D();
      }
    }, 100);
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
