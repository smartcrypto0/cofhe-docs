// Theme fix script to prevent FOUC (Flash of Unstyled Content)
(function() {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') return;
  
  function applyTheme() {
    // Get the stored theme preference (Docusaurus uses 'theme' key)
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Determine the theme to apply
    let theme = 'light'; // default
    if (storedTheme) {
      theme = storedTheme;
    } else if (prefersDark) {
      theme = 'dark';
    }
    
    // Apply the theme immediately to prevent FOUC
    document.documentElement.setAttribute('data-theme', theme);
    
    // Also apply to body for additional compatibility
    if (document.body) {
      document.body.setAttribute('data-theme', theme);
    }
    
    return theme;
  }
  
  // Apply theme immediately
  const currentTheme = applyTheme();
  
  // Also apply when DOM is ready (for additional safety)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyTheme);
  }
  
  // Listen for storage changes to sync across tabs
  window.addEventListener('storage', function(e) {
    if (e.key === 'theme') {
      applyTheme();
    }
  });
})();
