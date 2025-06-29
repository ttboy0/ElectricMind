/**
 * Global settings for Playwright automation scripts
 */

// Base URL configuration
export const BASEURL = "https://www.";

// Target URL
export const URL = BASEURL + "electricmind.com/";

// Browser configuration
export const BROWSER = "chromium"; // Options: chromium, firefox, webkit

// Browser options
export const HEADLESS = false; // Set to true for headless mode
export const TIMEOUT = 30000; // Default timeout in milliseconds
export const VIEWPORT = { width: 1280, height: 720 }; // Browser viewport size

// Export all settings as a single object for convenience
export const settings = {
    BASEURL,
    URL,
    BROWSER,
    HEADLESS,
    TIMEOUT,
    VIEWPORT
};

