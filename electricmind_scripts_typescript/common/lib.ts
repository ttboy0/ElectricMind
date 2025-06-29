/**
 * Common library functions for Playwright automation
 */

import * as yaml from 'js-yaml';
import * as fs from 'fs';
import { chromium, firefox, webkit, Browser, Page, BrowserContext } from 'playwright';

interface ElementData {
    locator: string;
    expected_text: string;
    description?: string;
}

interface LocatorData {
    elements: { [key: string]: ElementData };
}

export class PlaywrightManager {
    private browser: Browser | null = null;
    private context: BrowserContext | null = null;
    private page: Page | null = null;

    /**
     * Opens a URL in the specified browser and returns the page object.
     * 
     * @param url - The URL to navigate to
     * @param browserType - Browser type (chromium, firefox, webkit)
     * @returns Promise<Page> - Playwright page object
     */
    async openUrl(url: string, browserType: string = "chromium"): Promise<Page> {
        try {
            // Launch browser based on type
            switch (browserType.toLowerCase()) {
                case "chromium":
                    this.browser = await chromium.launch({ headless: false });
                    break;
                case "firefox":
                    this.browser = await firefox.launch({ headless: false });
                    break;
                case "webkit":
                    this.browser = await webkit.launch({ headless: false });
                    break;
                default:
                    throw new Error(`Unsupported browser type: ${browserType}`);
            }

            // Create context and page
            this.context = await this.browser.newContext({
                viewport: { width: 1280, height: 720 }
            });
            this.page = await this.context.newPage();

            // Navigate to URL
            console.log(`Navigating to: ${url}`);
            await this.page.goto(url, { timeout: 30000 });

            // Wait for page to load
            await this.page.waitForLoadState("networkidle");

            // Assert current URL matches expected URL
            const currentUrl = this.page.url();
            if (!currentUrl.startsWith(url.replace(/\/$/, ''))) {
                console.log(`Warning: Current URL (${currentUrl}) doesn't match expected URL (${url})`);
            } else {
                console.log(`Successfully navigated to: ${currentUrl}`);
            }

            return this.page;

        } catch (error) {
            console.error(`Error opening URL ${url}: ${error}`);
            await this.teardown();
            throw error;
        }
    }

    /**
     * Validates elements on the page based on data from YAML file.
     * 
     * @param yamlFilePath - Path to the YAML file containing element data
     * @returns Promise<boolean> - True if all validations pass, False otherwise
     */
    async validateElementFromData(yamlFilePath: string): Promise<boolean> {
        if (!this.page) {
            throw new Error("Page not initialized. Call openUrl first.");
        }

        try {
            // Load YAML data
            const fileContent = fs.readFileSync(yamlFilePath, 'utf8');
            const data = yaml.load(fileContent) as LocatorData;

            if (!data.elements) {
                throw new Error("YAML file must contain 'elements' key");
            }

            const elements = data.elements;
            let allPassed = true;
            const elementCount = Object.keys(elements).length;

            console.log(`\\nValidating ${elementCount} elements...`);

            for (const [elementName, elementData] of Object.entries(elements)) {
                try {
                    const locator = elementData.locator;
                    const expectedText = elementData.expected_text;
                    const description = elementData.description || elementName;

                    console.log(`\\nValidating: ${description}`);
                    console.log(`  Locator: ${locator}`);
                    console.log(`  Expected text: '${expectedText}'`);

                    // Find element using locator
                    const element = this.page.locator(locator).first();

                    // Check if element is visible
                    const isVisible = await element.isVisible();
                    if (!isVisible) {
                        console.log(`  ❌ ERROR: Element '${description}' is not visible on the page`);
                        allPassed = false;
                        continue;
                    }

                    // Get actual text from element
                    const actualText = (await element.textContent())?.trim() || '';

                    // Compare expected vs actual text
                    if (actualText === expectedText) {
                        console.log(`  ✅ SUCCESS: Text matches - '${actualText}'`);
                    } else {
                        console.log(`  ❌ ERROR: Text mismatch for '${description}'`);
                        console.log(`     Expected: '${expectedText}'`);
                        console.log(`     Actual: '${actualText}'`);
                        allPassed = false;
                    }

                } catch (error) {
                    console.log(`  ❌ ERROR: Failed to validate '${elementData.description || elementName}': ${error}`);
                    allPassed = false;
                }
            }

            console.log(`\\n${'='.repeat(50)}`);
            if (allPassed) {
                console.log("🎉 All element validations PASSED!");
            } else {
                console.log("❌ Some element validations FAILED!");
            }
            console.log(`${'='.repeat(50)}`);

            return allPassed;

        } catch (error) {
            console.error(`Error validating elements: ${error}`);
            return false;
        }
    }

    /**
     * Closes the browser and cleans up resources.
     */
    async teardown(): Promise<void> {
        try {
            if (this.page) {
                await this.page.close();
                this.page = null;
            }

            if (this.context) {
                await this.context.close();
                this.context = null;
            }

            if (this.browser) {
                await this.browser.close();
                this.browser = null;
            }

            console.log("Browser closed successfully.");

        } catch (error) {
            console.error(`Error during teardown: ${error}`);
        }
    }
}

/**
 * Utility function to load locator data from YAML file.
 * 
 * @param yamlFilePath - Path to the YAML file
 * @returns LocatorData - Loaded YAML data
 */
export function loadLocatorData(yamlFilePath: string): LocatorData {
    try {
        const fileContent = fs.readFileSync(yamlFilePath, 'utf8');
        return yaml.load(fileContent) as LocatorData;
    } catch (error) {
        console.error(`Error loading YAML file ${yamlFilePath}: ${error}`);
        throw error;
    }
}

