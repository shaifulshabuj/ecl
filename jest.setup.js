// Add React Testing Library's custom matchers
import '@testing-library/jest-dom';

// Mock matchMedia if not available (needed for responsive components testing)
if (typeof window !== 'undefined') {
  window.matchMedia = window.matchMedia || function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {},
      addEventListener: function() {},
      removeEventListener: function() {},
      dispatchEvent: function() {
        return true;
      },
    };
  };
}
