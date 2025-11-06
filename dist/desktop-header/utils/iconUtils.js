/**
 * Utilities for Lucide icon initialization and management
 */

/**
 * Initialize Lucide icons in the DOM
 * Call this after component render or DOM updates
 */
export var initLucideIcons = function initLucideIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
};

/**
 * Check if a string contains emoji
 * @param {string} str - String to check
 * @returns {boolean} True if string contains emoji
 */
export var hasEmoji = function hasEmoji(str) {
  if (!str) return false;
  return /(?:\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\uD83E[\uDC00-\uDDFF])/.test(str);
};
//# sourceMappingURL=iconUtils.js.map