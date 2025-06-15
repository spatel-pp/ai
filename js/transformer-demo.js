/**
 * Interactive Self-Attention Demo
 */
class TransformerDemo {
  constructor() {
    this.attentionPatterns = {};
  }

  setup() {
    this.setupTransformerDiagram();
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
        <h4>Interactive Self-Attention Demo</h4>
        <p>Explore how attention heads connect words in: <em>"${sentence}"</em></p>
        <p class="demo-instructions">Click any word to see its attention patterns, or switch between attention heads to explore different types of connections.</p>
      </div>
      
      <div class="attention-explanation">
        <div class="explanation-text">
          <strong>Click a word below to see its attention pattern...</strong>
        </div>
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
          this.showAttentionExplanation(selectedToken, currentHead, tokens, diagram);
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
        attentionCells.forEach(cell => {
          cell.classList.remove('highlighted');
          cell.classList.remove('explained');
        });
        
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
    
    // Remove previous explained highlights
    container.querySelectorAll('.attention-cell.explained').forEach(cell => {
      cell.classList.remove('explained');
    });
    
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
      
      // Highlight the cells mentioned in the explanation
      strongAttentions.forEach(item => {
        const cell = container.querySelector(`.attention-cell[data-from="${tokenPos}"][data-to="${item.index}"]`);
        if (cell) {
          cell.classList.add('explained');
        }
      });
    } else {
      explanation += 'mainly itself (self-attention)';
      
      // Highlight the self-attention cell
      const selfCell = container.querySelector(`.attention-cell[data-from="${tokenPos}"][data-to="${tokenPos}"]`);
      if (selfCell) {
        selfCell.classList.add('explained');
      }
    }
    
    explanationDiv.innerHTML = `<div class="explanation-text">${explanation}</div>`;
  }
}

/**
 * Interactive Self-Attention Demo for Enhanced Transformer Explanation
 */
class InteractiveAttentionDemo {
  constructor() {
    this.selectedWord = null;
    this.currentHead = null;
    this.attentionPatterns = this.defineAttentionPatterns();
  }

  defineAttentionPatterns() {
    // Define realistic attention patterns for our sample sentence
    return {
      semantic: {
        'chef': ['prepared', 'delicious', 'chocolate', 'cake'],
        'prepared': ['chef', 'cake'],
        'delicious': ['chocolate', 'cake'],
        'chocolate': ['delicious', 'cake'],
        'cake': ['chef', 'prepared', 'delicious', 'chocolate'],
        'birthday': ['party', 'cake'],
        'party': ['birthday', 'for']
      },
      syntactic: {
        'the': ['chef', 'birthday'],
        'chef': ['the', 'prepared'],
        'prepared': ['chef', 'a'],
        'a': ['prepared', 'delicious'],
        'delicious': ['a', 'chocolate'],
        'chocolate': ['delicious', 'cake'],
        'cake': ['chocolate', 'for'],
        'for': ['cake', 'the'],
        'birthday': ['the', 'party'],
        'party': ['birthday']
      },
      contextual: {
        'chef': ['birthday', 'party'],
        'prepared': ['birthday', 'party'],
        'cake': ['birthday', 'party'],
        'delicious': ['birthday', 'party'],
        'chocolate': ['birthday', 'party'],
        'birthday': ['chef', 'prepared', 'cake'],
        'party': ['chef', 'prepared', 'cake']
      }
    };
  }

  setup() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    const wordTokens = document.querySelectorAll('.word-token');
    const attentionButtons = document.querySelectorAll('.attention-btn');

    wordTokens.forEach(token => {
      token.addEventListener('click', (e) => {
        this.selectWord(e.target);
      });
    });

    attentionButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (btn.classList.contains('clear-btn')) {
          this.clearSelection();
        } else {
          this.setAttentionHead(e.target.dataset.head);
        }
      });
    });
  }

  selectWord(wordElement) {
    // Clear previous selection
    document.querySelectorAll('.word-token').forEach(token => {
      token.classList.remove('selected');
    });

    // Select the clicked word
    wordElement.classList.add('selected');
    this.selectedWord = wordElement.dataset.word;

    // Update feedback
    this.updateFeedback(`Selected word: "${this.selectedWord}". Now choose an attention type to see relationships.`);

    // If we have a current attention head, show the pattern
    if (this.currentHead) {
      this.showAttentionPattern();
    }
  }

  setAttentionHead(headType) {
    this.currentHead = headType;
    
    // Update button states
    document.querySelectorAll('.attention-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-head="${headType}"]`).classList.add('active');

    if (this.selectedWord) {
      this.showAttentionPattern();
    } else {
      this.updateFeedback(`${this.getHeadName(headType)} attention mode selected. Click on a word to see what it attends to.`);
    }
  }

  showAttentionPattern() {
    if (!this.selectedWord || !this.currentHead) return;

    // Clear previous attention highlights
    document.querySelectorAll('.word-token').forEach(token => {
      token.classList.remove('semantic-attention', 'syntactic-attention', 'contextual-attention');
    });

    const attentionTargets = this.attentionPatterns[this.currentHead][this.selectedWord] || [];
    const headName = this.getHeadName(this.currentHead);
    const className = `${this.currentHead}-attention`;

    // Highlight attention targets
    attentionTargets.forEach(targetWord => {
      const targetElement = document.querySelector(`[data-word="${targetWord}"]`);
      if (targetElement) {
        targetElement.classList.add(className);
      }
    });

    // Update feedback with explanation
    this.updateFeedback(this.getExplanation(this.selectedWord, this.currentHead, attentionTargets));
  }

  getHeadName(headType) {
    const names = {
      semantic: 'Semantic',
      syntactic: 'Syntactic', 
      contextual: 'Contextual'
    };
    return names[headType] || headType;
  }

  getExplanation(word, headType, targets) {
    const headName = this.getHeadName(headType);
    
    if (targets.length === 0) {
      return `"${word}" doesn't have strong ${headType} attention patterns in this sentence.`;
    }

    const targetList = targets.map(t => `"${t}"`).join(', ');
    
    const explanations = {
      semantic: `🔗 ${headName}: "${word}" pays attention to ${targetList} because they're conceptually related in meaning.`,
      syntactic: `🏗️ ${headName}: "${word}" pays attention to ${targetList} due to grammatical relationships and sentence structure.`,
      contextual: `🌐 ${headName}: "${word}" pays attention to ${targetList} to understand the broader context and purpose of the sentence.`
    };

    return explanations[headType] || `"${word}" attends to ${targetList}`;
  }

  clearSelection() {
    // Clear all selections and highlights
    document.querySelectorAll('.word-token').forEach(token => {
      token.classList.remove('selected', 'semantic-attention', 'syntactic-attention', 'contextual-attention');
    });

    document.querySelectorAll('.attention-btn').forEach(btn => {
      btn.classList.remove('active');
    });

    this.selectedWord = null;
    this.currentHead = null;
    this.updateFeedback('Selection cleared. Click on a word and select an attention type to explore relationships!');
  }

  updateFeedback(message) {
    const feedbackElement = document.getElementById('attention-feedback');
    if (feedbackElement) {
      feedbackElement.textContent = message;
    }
  }
}

// Export for global access
window.TransformerDemo = TransformerDemo;
// Make classes available globally
window.InteractiveAttentionDemo = InteractiveAttentionDemo;
