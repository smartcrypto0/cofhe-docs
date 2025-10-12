// Theme fix script to prevent FOUC (Flash of Unstyled Content)
(function() {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') return;
  
  function getTheme() {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return storedTheme || (prefersDark ? 'dark' : 'light');
  }
  
  function updateImages(theme) {
    // Update logo
    const logos = document.querySelectorAll('.fhenix-logo');
    logos.forEach(function(logo) {
      logo.src = theme === 'dark' 
        ? '/img/assets/white-text-logo.svg' 
        : '/img/assets/dark-text-logo.svg';
    });
    
    // Update book image
    const bookImages = document.querySelectorAll('.page-cover-image');
    bookImages.forEach(function(bookImage) {
      bookImage.src = theme === 'dark' 
        ? '/img/BookDark.svg' 
        : '/img/BookLight.svg';
    });
  }
  
  function applyTheme() {
    const theme = getTheme();
    
    // Update images immediately if they exist
    updateImages(theme);
    
    return theme;
  }
  
  // Apply theme immediately
  let currentTheme = applyTheme();
  
  // Reapply when DOM is fully ready (catches images that load during page construction)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      currentTheme = applyTheme();
    });
  }
  
  // Listen for storage changes to sync across tabs
  window.addEventListener('storage', function(e) {
    if (e.key === 'theme') {
      currentTheme = applyTheme();
    }
  });
})();
