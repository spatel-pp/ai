/**
 * RAG Flow Animation Controller
 * Manages the interactive demonstration of the RAG pipeline
 */

class RAGAnimation {
    constructor() {
        this.currentStep = 0;
        this.totalSteps = 6;
        this.isPlaying = false;
        this.animationSpeed = 2000; // ms between steps (slightly slower for better readability)
        this.animationTimer = null;
        
        this.init();
    }

    init() {
        this.bindControls();
        this.resetAnimation();
    }

    bindControls() {
        const playBtn = document.getElementById('play-rag-animation');
        const resetBtn = document.getElementById('reset-rag-animation');
        const stepBtn = document.getElementById('step-through-rag');

        if (playBtn) {
            playBtn.addEventListener('click', () => this.togglePlayPause());
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetAnimation());
        }

        if (stepBtn) {
            stepBtn.addEventListener('click', () => this.stepForward());
        }
    }

    togglePlayPause() {
        if (this.isPlaying) {
            this.pauseAnimation();
        } else {
            this.playAnimation();
        }
    }

    playAnimation() {
        this.isPlaying = true;
        this.updatePlayButton();
        
        // If we're at the end, reset first
        if (this.currentStep >= this.totalSteps) {
            this.resetAnimation();
        }
        
        this.animationTimer = setInterval(() => {
            this.stepForward();
            
            if (this.currentStep >= this.totalSteps) {
                this.pauseAnimation();
            }
        }, this.animationSpeed);
    }

    pauseAnimation() {
        this.isPlaying = false;
        this.updatePlayButton();
        
        if (this.animationTimer) {
            clearInterval(this.animationTimer);
            this.animationTimer = null;
        }
    }

    stepForward() {
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.showStep(this.currentStep);
            this.updateControls();
        }
    }

    resetAnimation() {
        this.pauseAnimation();
        this.currentStep = 0;
        
        // Hide all steps
        for (let i = 1; i <= this.totalSteps; i++) {
            const step = document.getElementById(`step-${i}`);
            if (step) {
                step.classList.remove('active');
            }
        }
        
        this.updateControls();
    }

    showStep(stepNumber) {
        const step = document.getElementById(`step-${stepNumber}`);
        if (step) {
            step.classList.add('active');
            
            // Add special animations for certain steps
            this.addStepSpecificEffects(stepNumber);
            
            // Scroll step into view if needed
            step.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest',
                inline: 'nearest'
            });
        }
    }

    addStepSpecificEffects(stepNumber) {
        switch (stepNumber) {
            case 2:
                // Animate keywords appearance
                this.animateKeywords();
                break;
            case 3:
                // Animate source documents
                this.animateSourceDocs();
                break;
            case 5:
                // Start thinking animation
                this.startThinkingAnimation();
                break;
        }
    }

    animateKeywords() {
        const keywords = document.querySelectorAll('#step-2 .keyword');
        keywords.forEach((keyword, index) => {
            setTimeout(() => {
                keyword.style.opacity = '0';
                keyword.style.transform = 'translateY(10px)';
                keyword.style.transition = 'all 0.3s ease';
                
                setTimeout(() => {
                    keyword.style.opacity = '1';
                    keyword.style.transform = 'translateY(0)';
                }, 50);
            }, index * 100);
        });
    }

    animateSourceDocs() {
        const sourceDocs = document.querySelectorAll('#step-3 .source-doc');
        sourceDocs.forEach((doc, index) => {
            setTimeout(() => {
                doc.style.opacity = '0';
                doc.style.transform = 'translateX(-20px)';
                doc.style.transition = 'all 0.4s ease';
                
                setTimeout(() => {
                    doc.style.opacity = '1';
                    doc.style.transform = 'translateX(0)';
                }, 50);
            }, index * 200);
        });
    }

    startThinkingAnimation() {
        const dots = document.querySelectorAll('#step-5 .thinking-indicator .dot');
        dots.forEach(dot => {
            dot.style.animation = 'thinking 1.4s infinite ease-in-out both';
        });
    }

    updateControls() {
        const playBtn = document.getElementById('play-rag-animation');
        const stepBtn = document.getElementById('step-through-rag');
        
        if (stepBtn) {
            stepBtn.disabled = this.currentStep >= this.totalSteps;
        }
        
        this.updatePlayButton();
    }

    updatePlayButton() {
        const playBtn = document.getElementById('play-rag-animation');
        if (playBtn) {
            if (this.isPlaying) {
                playBtn.textContent = '⏸️ Pause';
                playBtn.disabled = false;
            } else if (this.currentStep >= this.totalSteps) {
                playBtn.textContent = '🔄 Replay';
                playBtn.disabled = false;
            } else {
                playBtn.textContent = '▶️ Play';
                playBtn.disabled = false;
            }
        }
    }
}

// Initialize RAG animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if we're on a page with RAG content and not already initialized
    if (document.getElementById('play-rag-animation') && !window.ragAnimationInstance) {
        window.ragAnimationInstance = new RAGAnimation();
    }
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RAGAnimation;
}
