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
    
    // 3D data: recipes with truly orthogonal dimensions
    // X-axis: Cooking Time (minutes)
    // Y-axis: Number of Ingredients 
    // Z-axis: Serving Temperature (cold to hot)
    const recipes3D = [
      // Quick & Cold
      { name: 'Caesar Salad', x: 0.15, y: 0.6, z: 0.1, category: 'salads', color: '#22c55e' },
      { name: 'Fruit Smoothie', x: 0.1, y: 0.3, z: 0.15, category: 'beverages', color: '#06b6d4' },
      { name: 'Gazpacho', x: 0.2, y: 0.7, z: 0.05, category: 'soups', color: '#8b5cf6' },
      
      // Quick & Hot
      { name: 'Scrambled Eggs', x: 0.1, y: 0.2, z: 0.8, category: 'breakfast', color: '#f59e0b' },
      { name: 'Grilled Cheese', x: 0.15, y: 0.25, z: 0.85, category: 'sandwiches', color: '#3b82f6' },
      { name: 'Instant Ramen', x: 0.05, y: 0.15, z: 0.9, category: 'noodles', color: '#ef4444' },
      
      // Medium Time & Ingredients
      { name: 'Chicken Curry', x: 0.6, y: 0.8, z: 0.9, category: 'mains', color: '#dc2626' },
      { name: 'Pasta Carbonara', x: 0.3, y: 0.4, z: 0.85, category: 'pasta', color: '#f97316' },
      { name: 'Beef Stir-fry', x: 0.25, y: 0.5, z: 0.8, category: 'mains', color: '#dc2626' },
      
      // Long Time, Many Ingredients
      { name: 'Beef Bourguignon', x: 0.9, y: 0.9, z: 0.95, category: 'stews', color: '#7c2d12' },
      { name: 'Paella', x: 0.7, y: 0.95, z: 0.9, category: 'rice', color: '#f59e0b' },
      { name: 'Coq au Vin', x: 0.8, y: 0.85, z: 0.9, category: 'mains', color: '#dc2626' },
      
      // Cold Desserts
      { name: 'Ice Cream', x: 0.05, y: 0.3, z: 0.05, category: 'desserts', color: '#ec4899' },
      { name: 'Tiramisu', x: 0.4, y: 0.6, z: 0.1, category: 'desserts', color: '#ec4899' },
      
      // Hot Desserts
      { name: 'Apple Pie', x: 0.8, y: 0.7, z: 0.75, category: 'baking', color: '#a855f7' },
      { name: 'Chocolate Soufflé', x: 0.5, y: 0.5, z: 0.8, category: 'desserts', color: '#ec4899' }
    ];
    
    let rotation = { x: 0.2, y: 0.3 };
    let isDragging = false;
    let lastMouse = { x: 0, y: 0 };
    
    // 3D to 2D projection - adjusted for proper cube containment
    const project3D = (x, y, z) => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const scale = 300; // Increased scale for zoom
      
      // Use raw coordinates [0,1] without centering for cube edge rotation
      const rawX = x;
      const rawY = y;
      const rawZ = z;
      
      // Apply rotation around the origin (0,0,0) so cube rotates around edge
      const cosX = Math.cos(rotation.x);
      const sinX = Math.sin(rotation.x);
      const cosY = Math.cos(rotation.y);
      const sinY = Math.sin(rotation.y);
      
      // Rotate around Y axis first
      const rotatedX = rawX * cosY - rawZ * sinY;
      const rotatedZ = rawX * sinY + rawZ * cosY;
      
      // Then rotate around X axis
      const finalY = rawY * cosX - rotatedZ * sinX;
      const finalZ = rawY * sinX + rotatedZ * cosX;
      
      // Project to 2D with minimal perspective for better zoom view
      const perspective = 1 / (1 + finalZ * 0.2);
      return {
        x: centerX + rotatedX * scale * perspective - 150, // Offset to center the view
        y: centerY - finalY * scale * perspective + 50,
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
      
      // Draw 3D cube wireframe - positioned from origin (0,0,0) to (1,1,1)
      const cubeVertices = [
        [0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0],
        [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]
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
      
      // Draw recipes with text labels
      sortedRecipes.forEach(recipe => {
        const { projected } = recipe;
        const radius = 7;
        
        // Draw shadow for depth
        if (projected.z < 0.5) {
          ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
          ctx.beginPath();
          ctx.arc(projected.x + 3, projected.y + 3, radius, 0, 2 * Math.PI);
          ctx.fill();
        }
        
        // Draw white outline for visibility
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(projected.x, projected.y, radius + 3, 0, 2 * Math.PI);
        ctx.fill();
        
        // Draw recipe point
        ctx.fillStyle = recipe.color;
        ctx.beginPath();
        ctx.arc(projected.x, projected.y, radius, 0, 2 * Math.PI);
        ctx.fill();
        
        // Always draw recipe name as label
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 12px system-ui';
        ctx.textAlign = 'left';
        
        // Position label to avoid overlapping with point
        const labelX = projected.x + radius + 8;
        const labelY = projected.y + 4;
        
        // Draw text background for better readability
        const textWidth = ctx.measureText(recipe.name).width;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillRect(labelX - 2, labelY - 12, textWidth + 4, 16);
        
        // Draw border around text background
        ctx.strokeStyle = recipe.color;
        ctx.lineWidth = 1;
        ctx.strokeRect(labelX - 2, labelY - 12, textWidth + 4, 16);
        
        // Draw the recipe name
        ctx.fillStyle = '#000000';
        ctx.fillText(recipe.name, labelX, labelY);
      });
      
      // Draw axes labels starting from origin (0,0,0)
      const axisLength = 1.2;
      const origin = project3D(0, 0, 0);
      const xAxis = project3D(axisLength, 0, 0);
      const yAxis = project3D(0, axisLength, 0);
      const zAxis = project3D(0, 0, axisLength);
      
      ctx.font = 'bold 14px system-ui';
      ctx.textAlign = 'center';
      
      // X-axis (Cooking Time) - Red line
      ctx.strokeStyle = '#dc2626';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(origin.x, origin.y);
      ctx.lineTo(xAxis.x, xAxis.y);
      ctx.stroke();
      ctx.fillStyle = '#dc2626';
      ctx.fillText('Time →', xAxis.x, xAxis.y - 15);
      ctx.font = '11px system-ui';
      ctx.fillText('(5min → 2hrs)', xAxis.x, xAxis.y - 2);
      
      // Y-axis (Number of Ingredients) - Blue line  
      ctx.strokeStyle = '#2563eb';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(origin.x, origin.y);
      ctx.lineTo(yAxis.x, yAxis.y);
      ctx.stroke();
      ctx.fillStyle = '#2563eb';
      ctx.font = 'bold 14px system-ui';
      ctx.fillText('↑ Ingredients', yAxis.x, yAxis.y - 15);
      ctx.font = '11px system-ui';
      ctx.fillText('(3 → 18)', yAxis.x, yAxis.y - 2);
      
      // Z-axis (Serving Temperature) - Orange line
      ctx.strokeStyle = '#ea580c';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(origin.x, origin.y);
      ctx.lineTo(zAxis.x, zAxis.y);
      ctx.stroke();
      ctx.fillStyle = '#ea580c';
      ctx.font = 'bold 14px system-ui';
      ctx.fillText('Temperature', zAxis.x, zAxis.y - 15);
      ctx.font = '11px system-ui';
      ctx.fillText('(Cold → Hot)', zAxis.x, zAxis.y - 2);
      
      // Draw horizontal legend at the bottom
      const categories = ['salads', 'beverages', 'breakfast', 'mains', 'desserts', 'baking'];
      const colors = ['#22c55e', '#06b6d4', '#f59e0b', '#dc2626', '#ec4899', '#a855f7'];
      const labels = ['Salads', 'Beverages', 'Breakfast', 'Main Dishes', 'Desserts', 'Baking'];
      
      const legendStartX = 50;
      const legendY = 580;
      const legendSpacing = 115;
      
      categories.forEach((cat, i) => {
        const x = legendStartX + i * legendSpacing;
        
        // Draw colored square
        ctx.fillStyle = colors[i];
        ctx.fillRect(x, legendY, 12, 12);
        
        // Draw label
        ctx.fillStyle = '#374151';
        ctx.font = '11px system-ui';
        ctx.textAlign = 'left';
        ctx.fillText(labels[i], x + 18, legendY + 10);
      });
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
        canvas.style.cursor = 'grabbing';
        draw3D();
      } else {
        canvas.style.cursor = 'grab';
      }
    });
    
    canvas.addEventListener('mouseup', () => {
      isDragging = false;
      canvas.style.cursor = 'grab';
    });
    
    canvas.addEventListener('mouseleave', () => {
      isDragging = false;
      canvas.style.cursor = 'default';
    });
    
    // Add controls
    const controls = document.createElement('div');
    controls.className = 'controls-3d';
    controls.innerHTML = 'Click and drag to rotate • Recipe names shown as labels';
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

    // Recipe-themed transformer demo
    const sentence = "The chef prepared delicious chocolate soufflé";
    const tokens = sentence.split(' ');
    
    // Create the visualization container
    const diagram = document.createElement('div');
    diagram.className = 'transformer-visualization';
    
    // Set CSS custom property for grid layout
    diagram.style.setProperty('--token-count', tokens.length);
    
    // Create attention matrix visualization
    diagram.innerHTML = `
      <div class="transformer-header">
        <h5>Self-Attention Mechanism</h5>
        <p>Click any word to see how it "attends" to other words in the sentence</p>
      </div>
      
      <div class="attention-controls">
        <div class="attention-heads">
          <button class="head-btn active" data-head="0">Semantic Head</button>
          <button class="head-btn" data-head="1">Syntactic Head</button>
          <button class="head-btn" data-head="2">Context Head</button>
        </div>
      </div>
      
      <div class="attention-matrix">
        <div class="token-row token-labels">
          ${tokens.map((token, i) => `
            <div class="token-label" data-pos="${i}">${token}</div>
          `).join('')}
        </div>
        
        ${tokens.map((token, i) => `
          <div class="attention-row" data-row="${i}">
            <div class="row-label">${token}</div>
            ${tokens.map((_, j) => `
              <div class="attention-cell" 
                   data-from="${i}" 
                   data-to="${j}"
                   style="opacity: ${this.getAttentionWeight(i, j, 0)}">
              </div>
            `).join('')}
          </div>
        `).join('')}
      </div>
      
      <div class="attention-explanation">
        <div class="explanation-text">
          <strong>How it works:</strong> Each word creates a "query" and looks at all other words' "keys" to determine relevance. 
          The brighter the cell, the stronger the attention connection.
        </div>
      </div>
    `;

    container.appendChild(diagram);

    // Store attention patterns for different heads
    this.attentionPatterns = {
      0: this.generateSemanticAttention(tokens),  // Semantic relationships
      1: this.generateSyntacticAttention(tokens), // Grammatical relationships  
      2: this.generateContextualAttention(tokens) // Contextual relationships
    };

    let currentHead = 0;
    let selectedToken = null;

    // Add event listeners
    const headButtons = diagram.querySelectorAll('.head-btn');
    const attentionCells = diagram.querySelectorAll('.attention-cell');
    const tokenLabels = diagram.querySelectorAll('.token-label');
    const rowLabels = diagram.querySelectorAll('.row-label');

    // Head switching
    headButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        headButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentHead = parseInt(btn.dataset.head);
        this.updateAttentionMatrix(attentionCells, currentHead);
        if (selectedToken !== null) {
          this.highlightAttentions(selectedToken, currentHead, attentionCells, tokens);
        }
      });
    });

    // Token clicking
    [...tokenLabels, ...rowLabels].forEach(label => {
      label.addEventListener('click', () => {
        const pos = label.dataset.pos || label.closest('.attention-row').dataset.row;
        selectedToken = parseInt(pos);
        
        // Remove previous highlights
        [...tokenLabels, ...rowLabels].forEach(l => l.classList.remove('selected'));
        attentionCells.forEach(cell => cell.classList.remove('highlighted'));
        
        // Add new highlights
        label.classList.add('selected');
        tokenLabels[selectedToken]?.classList.add('selected');
        rowLabels[selectedToken]?.classList.add('selected');
        
        this.highlightAttentions(selectedToken, currentHead, attentionCells, tokens);
        this.showAttentionExplanation(selectedToken, currentHead, tokens, diagram);
      });
    });

    // Initialize with first token selected
    tokenLabels[0].click();
  }

  getAttentionWeight(from, to, head) {
    // Simple attention weight calculation for demo
    if (from === to) return 0.9; // Self-attention
    
    const distance = Math.abs(from - to);
    if (head === 0) { // Semantic head
      const semanticPairs = [[1,3], [1,5], [3,4], [4,5]]; // chef-delicious, chef-soufflé, delicious-chocolate, chocolate-soufflé
      if (semanticPairs.some(([a,b]) => (from === a && to === b) || (from === b && to === a))) {
        return 0.8;
      }
    }
    
    // Distance-based fallback
    return Math.max(0.1, 0.6 - distance * 0.1);
  }

  generateSemanticAttention(tokens) {
    // Generate semantic attention patterns
    const matrix = tokens.map(() => tokens.map(() => 0.1));
    
    // Chef -> delicious, prepared, soufflé
    matrix[1][3] = 0.9; // chef -> delicious
    matrix[1][2] = 0.8; // chef -> prepared
    matrix[1][5] = 0.7; // chef -> soufflé
    
    // Delicious -> chocolate, soufflé
    matrix[3][4] = 0.9; // delicious -> chocolate
    matrix[3][5] = 0.8; // delicious -> soufflé
    
    // Chocolate -> soufflé (related ingredients)
    matrix[4][5] = 0.9; // chocolate -> soufflé
    
    // Add self-attention
    tokens.forEach((_, i) => matrix[i][i] = 1.0);
    
    return matrix;
  }

  generateSyntacticAttention(tokens) {
    // Generate syntactic attention patterns
    const matrix = tokens.map(() => tokens.map(() => 0.1));
    
    // Articles to nouns
    matrix[0][1] = 0.9; // The -> chef
    
    // Adjectives to nouns
    matrix[3][4] = 0.9; // delicious -> chocolate
    matrix[4][5] = 0.8; // chocolate -> soufflé
    
    // Verb to object
    matrix[2][5] = 0.8; // prepared -> soufflé
    
    // Add self-attention
    tokens.forEach((_, i) => matrix[i][i] = 1.0);
    
    return matrix;
  }

  generateContextualAttention(tokens) {
    // Generate contextual attention patterns
    const matrix = tokens.map(() => tokens.map(() => 0.1));
    
    // Broader context connections
    matrix[2][1] = 0.8; // prepared -> chef (who did the action)
    matrix[2][5] = 0.7; // prepared -> soufflé (what was prepared)
    matrix[1][5] = 0.6; // chef -> soufflé (chef's creation)
    
    // Add self-attention
    tokens.forEach((_, i) => matrix[i][i] = 1.0);
    
    return matrix;
  }

  updateAttentionMatrix(cells, head) {
    cells.forEach(cell => {
      const from = parseInt(cell.dataset.from);
      const to = parseInt(cell.dataset.to);
      const attention = this.attentionPatterns[head][from][to];
      cell.style.opacity = attention;
      cell.style.backgroundColor = `rgba(59, 130, 246, ${attention})`;
    });
  }

  highlightAttentions(tokenPos, head, cells, tokens) {
    cells.forEach(cell => {
      const from = parseInt(cell.dataset.from);
      const to = parseInt(cell.dataset.to);
      
      if (from === tokenPos) {
        const attention = this.attentionPatterns[head][from][to];
        if (attention > 0.5) {
          cell.classList.add('highlighted');
        }
      }
    });
  }

  showAttentionExplanation(tokenPos, head, tokens, container) {
    const explanationDiv = container.querySelector('.attention-explanation');
    const token = tokens[tokenPos];
    const headNames = ['Semantic', 'Syntactic', 'Contextual'];
    
    let explanation = `<strong>"${token}"</strong> in the ${headNames[head]} head attends to: `;
    
    const attentions = this.attentionPatterns[head][tokenPos];
    const strongAttentions = attentions
      .map((weight, i) => ({ token: tokens[i], weight, index: i }))
      .filter(item => item.weight > 0.5 && item.index !== tokenPos)
      .sort((a, b) => b.weight - a.weight)
      .slice(0, 3);
    
    if (strongAttentions.length > 0) {
      explanation += strongAttentions
        .map(item => `<span class="attention-word">"${item.token}" (${(item.weight * 100).toFixed(0)}%)</span>`)
        .join(', ');
    } else {
      explanation += 'mainly itself (self-attention)';
    }
    
    explanationDiv.innerHTML = `<div class="explanation-text">${explanation}</div>`;
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
