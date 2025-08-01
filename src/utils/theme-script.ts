// This script runs immediately when imported to set the initial theme
// before the React app loads, preventing any flash of wrong theme

(() => {
  const getInitialTheme = (): 'light' | 'dark' => {
    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    
    // Check for system preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return systemPrefersDark ? 'dark' : 'light';
  };

  // Apply the theme class to the document element
  document.documentElement.classList.add(getInitialTheme());
})();

export {}; 