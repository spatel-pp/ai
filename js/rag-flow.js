/**
 * RAG Flow Diagram Interactive Demo
 */
class RAGFlowDemo {
  constructor() {
    this.currentStep = 0;
  }

  setup() {
    this.setupRAGFlowDiagram();
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
      <button class="diagram-button" onclick="window.ragDemo?.animateFlow()">Animate Flow</button>
      <button class="diagram-button" onclick="window.ragDemo?.resetFlow()">Reset</button>
    `;

    container.appendChild(flowDiagram);
    container.appendChild(controls);

    // Global reference for button callbacks
    window.ragDemo = this;
  }

  animateFlow() {
    const steps = document.querySelectorAll('.rag-step');
    const arrows = document.querySelectorAll('.rag-arrow');
    
    // Reset all steps
    steps.forEach(step => {
      step.classList.remove('active', 'completed');
    });
    arrows.forEach(arrow => {
      arrow.classList.remove('active');
    });

    let currentStep = 0;
    
    const animateStep = () => {
      if (currentStep < steps.length) {
        // Activate current step
        steps[currentStep].classList.add('active');
        
        // Mark previous steps as completed
        for (let i = 0; i < currentStep; i++) {
          steps[i].classList.remove('active');
          steps[i].classList.add('completed');
          if (arrows[i]) {
            arrows[i].classList.add('active');
          }
        }
        
        currentStep++;
        setTimeout(animateStep, 1000);
      }
    };

    animateStep();
  }

  resetFlow() {
    const steps = document.querySelectorAll('.rag-step');
    const arrows = document.querySelectorAll('.rag-arrow');
    
    steps.forEach(step => {
      step.classList.remove('active', 'completed');
    });
    arrows.forEach(arrow => {
      arrow.classList.remove('active');
    });
  }
}

// Export for global access
window.RAGFlowDemo = RAGFlowDemo;
