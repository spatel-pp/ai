// Neural Network Visualization Demo
class NeuralNetworkDemo {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        this.weights = [];
        this.activations = [];
        this.isAnimating = false;
    }

    setup() {
        console.log('NeuralNetworkDemo setup() called');
        const container = document.querySelector('.neural-network-demo');
        console.log('Neural network container:', container);
        if (!container) {
            console.log('No neural network container found!');
            return;
        }

        // Add visible indicator that setup was called
        const statusDiv = document.createElement('div');
        statusDiv.innerHTML = '<strong>🔧 Neural Network Demo: Setup called, creating canvas...</strong>';
        statusDiv.style.cssText = 'background: #e3f2fd; padding: 10px; margin: 10px 0; border-left: 4px solid #2196f3; border-radius: 4px;';
        container.appendChild(statusDiv);

        console.log('Creating neural network canvas...');
        
        try {
            // Create canvas
            this.canvas = document.createElement('canvas');
            this.canvas.width = 800;
            this.canvas.height = 500;
            this.canvas.style.cssText = 'border: 1px solid #ddd; display: block; margin: 10px auto;';
            this.ctx = this.canvas.getContext('2d');
            
            statusDiv.innerHTML = '<strong>✅ Neural Network Demo: Canvas created, initializing network...</strong>';
            
            // Initialize network structure (5 layers: input, 3 hidden, output)
            this.layers = [4, 6, 8, 6, 3]; // neurons per layer
            this.initializeWeights();
            this.initializeActivations();
            
            statusDiv.innerHTML = '<strong>✅ Neural Network Demo: Network initialized, adding canvas...</strong>';
            
            // Add canvas to container first
            container.appendChild(this.canvas);
            
            // Then create controls (which will be inserted before the canvas)
            this.createControls(container);
            
            statusDiv.innerHTML = '<strong>📊 How to Use:</strong> Click "▶️ Forward Pass" to see data flow through the network. Thicker lines show stronger connections (weights). Brighter neurons have higher activation values. The network processes 4 inputs through 3 hidden layers to produce 3 outputs.';
            statusDiv.style.backgroundColor = '#e8f5e8';
            statusDiv.style.borderLeftColor = '#4caf50';
            
            // Start visualization
            console.log('Starting neural network visualization...');
            this.draw();
            console.log('Neural network demo setup complete!');
            
        } catch (error) {
            statusDiv.innerHTML = '<strong>❌ Neural Network Demo: Setup failed - ' + error.message + '</strong>';
            statusDiv.style.backgroundColor = '#ffebee';
            statusDiv.style.borderLeftColor = '#f44336';
            console.error('Neural network demo setup error:', error);
        }
    }

    initializeWeights() {
        this.weights = [];
        for (let i = 0; i < this.layers.length - 1; i++) {
            const layerWeights = [];
            for (let j = 0; j < this.layers[i]; j++) {
                const neuronWeights = [];
                for (let k = 0; k < this.layers[i + 1]; k++) {
                    neuronWeights.push((Math.random() - 0.5) * 2); // -1 to 1
                }
                layerWeights.push(neuronWeights);
            }
            this.weights.push(layerWeights);
        }
    }

    initializeActivations() {
        this.activations = [];
        for (let i = 0; i < this.layers.length; i++) {
            const layerActivations = [];
            for (let j = 0; j < this.layers[i]; j++) {
                layerActivations.push(Math.random());
            }
            this.activations.push(layerActivations);
        }
    }

    createControls(container) {
        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'neural-controls';
        controlsDiv.style.cssText = `
            margin: 20px 0;
            display: flex;
            gap: 15px;
            align-items: center;
            flex-wrap: wrap;
        `;

        // Forward pass button
        const forwardBtn = document.createElement('button');
        forwardBtn.textContent = '▶️ Forward Pass';
        forwardBtn.style.cssText = `
            padding: 10px 20px;
            background: #3b82f6;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
        `;
        forwardBtn.onclick = () => this.animateForwardPass();

        // Reset button
        const resetBtn = document.createElement('button');
        resetBtn.textContent = '🔄 Reset';
        resetBtn.style.cssText = `
            padding: 10px 20px;
            background: #6b7280;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
        `;
        resetBtn.onclick = () => this.reset();

        // Layer info
        const infoDiv = document.createElement('div');
        infoDiv.innerHTML = `
            <span style="font-size: 14px; color: #6b7280;">
                <strong>Network:</strong> 4 inputs → 6 → 8 → 6 → 3 outputs
                <br><strong>Connections:</strong> ${this.getTotalConnections()} weights (parameters)
            </span>
        `;

        controlsDiv.appendChild(forwardBtn);
        controlsDiv.appendChild(resetBtn);
        controlsDiv.appendChild(infoDiv);
        
        container.insertBefore(controlsDiv, this.canvas);
    }

    getTotalConnections() {
        let total = 0;
        for (let i = 0; i < this.layers.length - 1; i++) {
            total += this.layers[i] * this.layers[i + 1];
        }
        return total;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // White background
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawConnections();
        this.drawNeurons();
        this.drawLabels();
    }

    drawConnections() {
        const layerSpacing = (this.canvas.width - 100) / (this.layers.length - 1);
        
        for (let l = 0; l < this.layers.length - 1; l++) {
            const currentX = 50 + l * layerSpacing;
            const nextX = 50 + (l + 1) * layerSpacing;
            
            const currentLayerHeight = this.layers[l] * 60;
            const nextLayerHeight = this.layers[l + 1] * 60;
            // Use same positioning as in drawNeurons - move network higher
            const currentStartY = (this.canvas.height - currentLayerHeight) / 2 + 10;
            const nextStartY = (this.canvas.height - nextLayerHeight) / 2 + 10;

            for (let i = 0; i < this.layers[l]; i++) {
                for (let j = 0; j < this.layers[l + 1]; j++) {
                    const weight = this.weights[l][i][j];
                    const currentY = currentStartY + i * 60 + 30;
                    const nextY = nextStartY + j * 60 + 30;

                    // Color and thickness based on weight strength
                    const absWeight = Math.abs(weight);
                    const alpha = Math.min(absWeight, 1);
                    const thickness = Math.max(0.5, absWeight * 3);
                    
                    this.ctx.strokeStyle = weight > 0 
                        ? `rgba(34, 197, 94, ${alpha})` 
                        : `rgba(239, 68, 68, ${alpha})`;
                    this.ctx.lineWidth = thickness;
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(currentX + 15, currentY);
                    this.ctx.lineTo(nextX - 15, nextY);
                    this.ctx.stroke();
                }
            }
        }
    }

    drawNeurons() {
        const layerSpacing = (this.canvas.width - 100) / (this.layers.length - 1);
        
        for (let l = 0; l < this.layers.length; l++) {
            const x = 50 + l * layerSpacing;
            const layerHeight = this.layers[l] * 60;
            // Move network higher - leave space for top labels and bottom labels
            const startY = (this.canvas.height - layerHeight) / 2 + 10;

            for (let i = 0; i < this.layers[l]; i++) {
                const y = startY + i * 60 + 30;
                const activation = this.activations[l][i];
                
                // Neuron circle
                this.ctx.fillStyle = '#ffffff';
                this.ctx.beginPath();
                this.ctx.arc(x, y, 15, 0, 2 * Math.PI);
                this.ctx.fill();
                
                // Activation level (inner circle)
                const intensity = Math.max(0.1, activation);
                this.ctx.fillStyle = `rgba(59, 130, 246, ${intensity})`;
                this.ctx.beginPath();
                this.ctx.arc(x, y, 12, 0, 2 * Math.PI);
                this.ctx.fill();
                
                // Border
                this.ctx.strokeStyle = '#cbd5e1';
                this.ctx.lineWidth = 2;
                this.ctx.beginPath();
                this.ctx.arc(x, y, 15, 0, 2 * Math.PI);
                this.ctx.stroke();

                // Activation value text
                this.ctx.fillStyle = '#000000';
                this.ctx.font = '10px system-ui';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(activation.toFixed(2), x, y + 3);
            }
        }
    }

    drawLabels() {
        this.ctx.fillStyle = '#374151';
        this.ctx.font = 'bold 14px system-ui';
        this.ctx.textAlign = 'center';

        const layerSpacing = (this.canvas.width - 100) / (this.layers.length - 1);
        const labels = ['🥕 Ingredients', 'Hidden\nLayer 1', 'Hidden\nLayer 2', 'Hidden\nLayer 3', '🍽️ Dish Types'];
        
        for (let l = 0; l < this.layers.length; l++) {
            const x = 50 + l * layerSpacing;
            const labelLines = labels[l].split('\n');
            
            // Move labels higher to avoid overlap with network
            labelLines.forEach((line, index) => {
                this.ctx.fillText(line, x, 20 + (index * 16));
            });
            
            // Layer size info - move further down to avoid overlap with neurons
            this.ctx.font = '12px system-ui';
            this.ctx.fillStyle = '#6b7280';
            this.ctx.fillText(`(${this.layers[l]} neurons)`, x, this.canvas.height - 5);
        }

        // Weight legend - move higher to make room for neuron count labels
        this.ctx.font = '12px system-ui';
        this.ctx.textAlign = 'left';
        this.ctx.fillText('Connection strength:', 20, this.canvas.height - 70);
        
        // Positive weight example
        this.ctx.strokeStyle = 'rgba(34, 197, 94, 0.8)';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(20, this.canvas.height - 55);
        this.ctx.lineTo(50, this.canvas.height - 55);
        this.ctx.stroke();
        this.ctx.fillText('Positive', 55, this.canvas.height - 51);
        
        // Negative weight example
        this.ctx.strokeStyle = 'rgba(239, 68, 68, 0.8)';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(120, this.canvas.height - 55);
        this.ctx.lineTo(150, this.canvas.height - 55);
        this.ctx.stroke();
        this.ctx.fillText('Negative', 155, this.canvas.height - 51);
    }

    animateForwardPass() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        let layerIndex = 0;
        
        const animateLayer = () => {
            if (layerIndex >= this.layers.length - 1) {
                this.isAnimating = false;
                return;
            }
            
            // Calculate activations for next layer
            const nextActivations = [];
            for (let j = 0; j < this.layers[layerIndex + 1]; j++) {
                let sum = 0;
                for (let i = 0; i < this.layers[layerIndex]; i++) {
                    sum += this.activations[layerIndex][i] * this.weights[layerIndex][i][j];
                }
                // Apply sigmoid activation
                nextActivations.push(1 / (1 + Math.exp(-sum)));
            }
            
            // Animate the transition
            let progress = 0;
            const animateTransition = () => {
                progress += 0.1;
                
                if (progress >= 1) {
                    this.activations[layerIndex + 1] = nextActivations;
                    this.draw();
                    layerIndex++;
                    setTimeout(animateLayer, 500);
                    return;
                }
                
                // Interpolate activations
                for (let j = 0; j < this.layers[layerIndex + 1]; j++) {
                    const oldVal = this.activations[layerIndex + 1][j];
                    const newVal = nextActivations[j];
                    this.activations[layerIndex + 1][j] = oldVal + (newVal - oldVal) * progress;
                }
                
                this.draw();
                this.animationId = requestAnimationFrame(animateTransition);
            };
            
            animateTransition();
        };
        
        // Start with new random input
        for (let i = 0; i < this.layers[0]; i++) {
            this.activations[0][i] = Math.random();
        }
        
        animateLayer();
    }

    reset() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.isAnimating = false;
        this.initializeWeights();
        this.initializeActivations();
        this.draw();
    }
}

// Export for use in router
window.NeuralNetworkDemo = NeuralNetworkDemo;
console.log('NeuralNetworkDemo class loaded and exported to window');

// Failsafe: Initialize after a delay if not already done
setTimeout(() => {
    const container = document.querySelector('.neural-network-demo');
    if (container && !container.querySelector('canvas') && !container.querySelector('.neural-demo-initialized')) {
        console.log('Failsafe: Initializing neural network demo...');
        try {
            const demo = new NeuralNetworkDemo();
            demo.setup();
            // Mark as initialized
            container.classList.add('neural-demo-initialized');
        } catch (error) {
            console.error('Failsafe neural network demo initialization failed:', error);
        }
    }
}, 2000);