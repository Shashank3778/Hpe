/**
 * Utilities for Lucide icon initialization and management
 */

/**
 * Initialize Lucide icons in the DOM
 * Call this after component render or DOM updates
 */
export const initLucideIcons = () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
};

/**
 * Check if a string contains emoji
 * @param {string} str - String to check
 * @returns {boolean} True if string contains emoji
 */
export const hasEmoji = (str) => {
  if (!str) return false;
  return /[\u{1F300}-\u{1F9FF}]/u.test(str);
};
