// Enhanced Simple Vector Demos
console.log('Loading enhanced simple vector demos...');

function setupAllVectorDemos() {
    console.log('Setting up all vector demos...');
    setup1D();
    setup2D();  
    setup3D();
}

function setup1D() {
    const container = document.querySelector('.vector-space-1d');
    if (!container) {
        console.log('No 1D container found');
        return;
    }
    
    console.log('Setting up enhanced 1D demo...');
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 120;
    const ctx = canvas.getContext('2d');
    
    // Enhanced 1D demo with cooking temperatures
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
    
    function draw1D() {
        ctx.clearRect(0, 0, 800, 120);
        
        // White background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 800, 120);
        
        // Temperature gradient
        const gradient = ctx.createLinearGradient(40, 60, 760, 60);
        gradient.addColorStop(0, '#1e40af');
        gradient.addColorStop(0.3, '#06b6d4');
        gradient.addColorStop(0.5, '#10b981');
        gradient.addColorStop(0.7, '#f59e0b');
        gradient.addColorStop(0.9, '#ef4444');
        gradient.addColorStop(1, '#dc2626');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(40, 50, 720, 20);
        
        // Border
        ctx.strokeStyle = '#374151';
        ctx.lineWidth = 2;
        ctx.strokeRect(40, 50, 720, 20);
        
        // Draw points and labels
        cookingTemps.forEach(temp => {
            const x = 40 + temp.value * 720;
            
            // Connection line
            ctx.strokeStyle = temp.color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x, 70);
            ctx.lineTo(x, 85);
            ctx.stroke();
            
            // Point
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(x, 90, 6, 0, 2 * Math.PI);
            ctx.fill();
            
            ctx.fillStyle = temp.color;
            ctx.beginPath();
            ctx.arc(x, 90, 4, 0, 2 * Math.PI);
            ctx.fill();
            
            // Labels - always visible
            ctx.fillStyle = temp.color;
            ctx.font = '11px system-ui';
            ctx.textAlign = 'center';
            ctx.fillText(temp.name, x, 108);
            
            // Temperature always visible
            ctx.font = '10px system-ui';
            ctx.fillText(temp.temp, x, 35);
        });
    }
    
    draw1D();
    container.appendChild(canvas);
    console.log('Enhanced 1D demo added');
}

function setup2D() {
    const container = document.querySelector('.vector-space-2d');
    if (!container) {
        console.log('No 2D container found');
        return;
    }
    
    console.log('Setting up enhanced 2D demo...');
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    
    // Enhanced 2D demo with recipe data
    const recipes = [
        // Quick & Easy
        { name: 'Scrambled Eggs', x: 0.1, y: 0.1, category: 'breakfast', color: '#f59e0b' },
        { name: 'Toast', x: 0.05, y: 0.05, category: 'breakfast', color: '#f59e0b' },
        { name: 'Cereal', x: 0.02, y: 0.02, category: 'breakfast', color: '#f59e0b' },
        
        // Medium Complexity
        { name: 'Pasta Carbonara', x: 0.4, y: 0.3, category: 'dinner', color: '#3b82f6' },
        { name: 'Stir Fry', x: 0.3, y: 0.2, category: 'dinner', color: '#3b82f6' },
        { name: 'Chicken Curry', x: 0.5, y: 0.6, category: 'dinner', color: '#3b82f6' },
        
        // Complex Dishes
        { name: 'Beef Wellington', x: 0.9, y: 0.8, category: 'gourmet', color: '#dc2626' },
        { name: 'Sourdough Bread', x: 0.7, y: 0.95, category: 'gourmet', color: '#dc2626' },
        { name: 'Coq au Vin', x: 0.8, y: 0.7, category: 'gourmet', color: '#dc2626' },
        
        // Desserts
        { name: 'Cookies', x: 0.2, y: 0.4, category: 'dessert', color: '#10b981' },
        { name: 'Tiramisu', x: 0.6, y: 0.5, category: 'dessert', color: '#10b981' },
        { name: 'Crème Brûlée', x: 0.8, y: 0.4, category: 'dessert', color: '#10b981' }
    ];
    
    function draw2D() {
        ctx.clearRect(0, 0, 800, 600);
        
        // White background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 800, 600);
        
        // Grid
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
        
        // Main axes
        ctx.strokeStyle = '#d1d5db';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(80, 550);
        ctx.lineTo(780, 550);
        ctx.moveTo(80, 50);
        ctx.lineTo(80, 550);
        ctx.stroke();
        
        // Axes labels
        ctx.fillStyle = '#374151';
        ctx.font = 'bold 16px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('Recipe Complexity →', 430, 585);
        
        ctx.save();
        ctx.translate(25, 300);
        ctx.rotate(-Math.PI/2);
        ctx.fillText('← Cooking Time', 0, 0);
        ctx.restore();
        
        // Draw recipe points with always visible labels
        recipes.forEach(recipe => {
            const x = 80 + recipe.x * 700;
            const y = 550 - recipe.y * 500;
            
            // White outline
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(x, y, 7, 0, 2 * Math.PI);
            ctx.fill();
            
            ctx.fillStyle = recipe.color;
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fill();
            
            // Always show recipe labels
            ctx.fillStyle = '#000';
            ctx.font = 'bold 12px system-ui';
            ctx.textAlign = 'center';
            ctx.fillText(recipe.name, x, y - 15);
            ctx.font = '10px system-ui';
            ctx.fillText(`[${recipe.x.toFixed(2)}, ${recipe.y.toFixed(2)}]`, x, y + 25);
        });
        
        // Legend
        const categories = ['breakfast', 'dinner', 'gourmet', 'dessert'];
        const colors = ['#f59e0b', '#3b82f6', '#dc2626', '#10b981'];
        const labels = ['Breakfast', 'Dinner', 'Gourmet', 'Dessert'];
        
        categories.forEach((cat, i) => {
            const x = 120 + i * 140;
            
            ctx.fillStyle = colors[i];
            ctx.fillRect(x, 25, 16, 16);
            
            ctx.fillStyle = '#374151';
            ctx.font = '14px system-ui';
            ctx.textAlign = 'left';
            ctx.fillText(labels[i], x + 22, 37);
        });
    }
    
    draw2D();
    container.appendChild(canvas);
    console.log('Enhanced 2D demo added');
}

function setup3D() {
    const container = document.querySelector('.vector-space-3d');
    if (!container) {
        console.log('No 3D container found');
        return;
    }
    
    console.log('Setting up enhanced 3D demo...');
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    
    // Enhanced 3D demo with recipe data
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
    
    // 3D to 2D projection
    function project3D(x, y, z) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const scale = 300;
        
        const cosX = Math.cos(rotation.x);
        const sinX = Math.sin(rotation.x);
        const cosY = Math.cos(rotation.y);
        const sinY = Math.sin(rotation.y);
        
        // Rotate around Y axis first
        const rotatedX = x * cosY - z * sinY;
        const rotatedZ = x * sinY + z * cosY;
        
        // Then rotate around X axis
        const finalY = y * cosX - rotatedZ * sinX;
        const finalZ = y * sinX + rotatedZ * cosX;
        
        const perspective = 1 / (1 + finalZ * 0.2);
        return {
            x: centerX + rotatedX * scale * perspective - 150,
            y: centerY - finalY * scale * perspective + 50,
            z: finalZ,
            scale: perspective
        };
    }
    
    function draw3D() {
        ctx.clearRect(0, 0, 800, 600);
        
        // White background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 800, 600);
        
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
        
        // Draw recipes with labels
        sortedRecipes.forEach(recipe => {
            const { projected } = recipe;
            const radius = 7;
            
            // Draw white outline
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(projected.x, projected.y, radius + 3, 0, 2 * Math.PI);
            ctx.fill();
            
            // Draw recipe point
            ctx.fillStyle = recipe.color;
            ctx.beginPath();
            ctx.arc(projected.x, projected.y, radius, 0, 2 * Math.PI);
            ctx.fill();
            
            // Draw recipe name as label
            ctx.fillStyle = '#000000';
            ctx.font = 'bold 12px system-ui';
            ctx.textAlign = 'left';
            
            const labelX = projected.x + radius + 8;
            const labelY = projected.y + 4;
            
            // Text background
            const textWidth = ctx.measureText(recipe.name).width;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.fillRect(labelX - 2, labelY - 12, textWidth + 4, 16);
            
            // Text border
            ctx.strokeStyle = recipe.color;
            ctx.lineWidth = 1;
            ctx.strokeRect(labelX - 2, labelY - 12, textWidth + 4, 16);
            
            // Recipe name
            ctx.fillStyle = '#000000';
            ctx.fillText(recipe.name, labelX, labelY);
        });
        
        // Draw axes labels
        const axisLength = 1.2;
        const origin = project3D(0, 0, 0);
        const xAxis = project3D(axisLength, 0, 0);
        const yAxis = project3D(0, axisLength, 0);
        const zAxis = project3D(0, 0, axisLength);
        
        ctx.font = 'bold 14px system-ui';
        ctx.textAlign = 'center';
        
        // X-axis (Time) - Red
        ctx.strokeStyle = '#dc2626';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(origin.x, origin.y);
        ctx.lineTo(xAxis.x, xAxis.y);
        ctx.stroke();
        ctx.fillStyle = '#dc2626';
        ctx.fillText('Time →', xAxis.x, xAxis.y - 15);
        
        // Y-axis (Ingredients) - Blue
        ctx.strokeStyle = '#2563eb';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(origin.x, origin.y);
        ctx.lineTo(yAxis.x, yAxis.y);
        ctx.stroke();
        ctx.fillStyle = '#2563eb';
        ctx.fillText('↑ Ingredients', yAxis.x, yAxis.y - 15);
        
        // Z-axis (Temperature) - Orange
        ctx.strokeStyle = '#ea580c';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(origin.x, origin.y);
        ctx.lineTo(zAxis.x, zAxis.y);
        ctx.stroke();
        ctx.fillStyle = '#ea580c';
        ctx.fillText('Temperature', zAxis.x, zAxis.y - 15);
    }
    
    // Enhanced mouse interaction for rotation
    canvas.addEventListener('mousedown', (e) => {
        isDragging = true;
        const rect = canvas.getBoundingClientRect();
        lastMouse.x = e.clientX - rect.left;
        lastMouse.y = e.clientY - rect.top;
        canvas.style.cursor = 'grabbing';
        e.preventDefault();
        console.log('3D rotation started');
    });
    
    canvas.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const rect = canvas.getBoundingClientRect();
            const currentX = e.clientX - rect.left;
            const currentY = e.clientY - rect.top;
            
            const deltaX = currentX - lastMouse.x;
            const deltaY = currentY - lastMouse.y;
            
            // Increase sensitivity for more responsive rotation
            rotation.y += deltaX * 0.015;
            rotation.x += deltaY * 0.015;
            
            // Constrain X rotation to avoid flipping
            rotation.x = Math.max(-Math.PI/3, Math.min(Math.PI/3, rotation.x));
            
            lastMouse.x = currentX;
            lastMouse.y = currentY;
            
            draw3D();
            e.preventDefault();
            console.log(`3D rotation: x=${rotation.x.toFixed(2)}, y=${rotation.y.toFixed(2)}`);
        } else {
            canvas.style.cursor = 'grab';
        }
    });
    
    canvas.addEventListener('mouseup', (e) => {
        isDragging = false;
        canvas.style.cursor = 'grab';
        e.preventDefault();
        console.log('3D rotation stopped');
    });
    
    canvas.addEventListener('mouseleave', (e) => {
        isDragging = false;
        canvas.style.cursor = 'default';
        console.log('3D mouse left canvas');
    });
    
    // Enhanced touch events for mobile
    canvas.addEventListener('touchstart', (e) => {
        isDragging = true;
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        lastMouse.x = touch.clientX - rect.left;
        lastMouse.y = touch.clientY - rect.top;
        e.preventDefault();
        console.log('3D touch rotation started');
    });
    
    canvas.addEventListener('touchmove', (e) => {
        if (isDragging) {
            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];
            const currentX = touch.clientX - rect.left;
            const currentY = touch.clientY - rect.top;
            
            const deltaX = currentX - lastMouse.x;
            const deltaY = currentY - lastMouse.y;
            
            // Increase sensitivity for touch too
            rotation.y += deltaX * 0.015;
            rotation.x += deltaY * 0.015;
            
            // Constrain X rotation
            rotation.x = Math.max(-Math.PI/3, Math.min(Math.PI/3, rotation.x));
            
            lastMouse.x = currentX;
            lastMouse.y = currentY;
            
            draw3D();
            e.preventDefault();
        }
    });
    
    canvas.addEventListener('touchend', (e) => {
        isDragging = false;
        e.preventDefault();
        console.log('3D touch rotation stopped');
    });
    
    // Add enhanced controls with better styling
    const controls = document.createElement('div');
    controls.style.textAlign = 'center';
    controls.style.marginTop = '15px';
    controls.style.padding = '12px';
    controls.style.backgroundColor = '#f8f9fa';
    controls.style.borderRadius = '8px';
    controls.style.color = '#495057';
    controls.style.fontSize = '14px';
    controls.style.border = '2px solid #3b82f6';
    controls.style.fontWeight = '500';
    controls.innerHTML = `
        <div style="margin-bottom: 8px; font-weight: bold; color: #1e40af;">🎮 INTERACTIVE 3D CONTROLS</div>
        <div>🖱️ Click and DRAG to rotate the 3D space • 📱 Touch and drag on mobile</div>
        <div style="margin-top: 4px; font-size: 12px; color: #666;">🔄 Auto-rotation when idle • All recipe labels always visible</div>
    `;
    container.appendChild(controls);
    
    // Set initial cursor style
    canvas.style.cursor = 'grab';
    canvas.style.touchAction = 'none'; // Prevent default touch behaviors
    
    draw3D();
    container.appendChild(canvas);
    
    // Auto-rotation
    setInterval(() => {
        if (!isDragging) {
            rotation.y += 0.003;
            draw3D();
        }
    }, 100);
    
    console.log('Enhanced 3D demo added');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM ready, setting up vector demos...');
    setTimeout(setupAllVectorDemos, 100);
});

console.log('Simple vector demos script loaded');
