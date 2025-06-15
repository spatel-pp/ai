// Vector Space Demonstrations - Working Implementation
class VectorDemos {
  constructor() {
    console.log('VectorDemos constructor');
  }

  init() {
    console.log('VectorDemos init - setting up demos...');
    this.setupVectorSpace1D();
    this.setupVectorSpace2D();
    this.setupVectorSpace3D();
    console.log('VectorDemos init complete');
  }

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
    console.log('1D demo completed');
  }

  setupVectorSpace2D() {
    console.log('Setting up 2D demo - placeholder');
    // Placeholder for now
  }

  setupVectorSpace3D() {
    console.log('Setting up 3D demo - placeholder');
    // Placeholder for now
  }
}

// Export for use in main.js
window.VectorDemos = VectorDemos;
console.log('VectorDemos class exported to window');
