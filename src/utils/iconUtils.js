let lucideLoaded = false;

export const initLucideIcons = () => {
  // If script is already loaded, just replace icons
  if (lucideLoaded && window.lucide) {
    window.lucide.createIcons();
    return;
  }

  // Load Lucide from CDN if not already loaded
  if (!document.getElementById('lucide-script')) {
    const script = document.createElement('script');
    script.id = 'lucide-script';
    script.src = 'https://unpkg.com/lucide@latest';
    script.onload = () => {
      lucideLoaded = true;
      if (window.lucide) {
        window.lucide.createIcons();
      }
    };
    document.head.appendChild(script);
  } else if (window.lucide) {
    lucideLoaded = true;
    window.lucide.createIcons();
  }
};

// Auto-initialize on module load
if (typeof window !== 'undefined') {
  // Initialize after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLucideIcons);
  } else {
    initLucideIcons();
  }
}
