/**
 * Navigation and scroll highlighting management
 */
class NavigationManager {
  constructor() {
    this.setupScrollHighlighting();
    this.setupTOCToggle();
  }

  setupScrollHighlighting() {
    const tocLinks = document.querySelectorAll('.toc-link');
    const sections = document.querySelectorAll('section[id]');
    
    if (!tocLinks.length || !sections.length) return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          
          // Remove active class from all TOC links
          tocLinks.forEach(link => {
            link.classList.remove('active');
          });
          
          // Add active class to current section's TOC link
          const activeLink = document.querySelector(`.toc-link[href="#${id}"]`);
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      observer.observe(section);
    });

    // Add smooth scrolling to TOC links
    tocLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  setupTOCToggle() {
    const tocToggle = document.querySelector('.toc-toggle');
    const toc = document.getElementById('toc');
    
    if (tocToggle && toc) {
      tocToggle.addEventListener('click', () => {
        toc.classList.toggle('collapsed');
        tocToggle.textContent = toc.classList.contains('collapsed') ? '▼' : '▲';
      });
    }
  }
}

// Export for global access
window.NavigationManager = NavigationManager;
