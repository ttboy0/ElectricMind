#!/usr/bin/env node
/**
 * Main Playwright automation script for Electric Mind website testing.
 * 
 * This script:
 * 1. Opens the Electric Mind website
 * 2. Validates 4 specified elements are present on the page
 * 3. Provides detailed reporting of validation results
 */

import * as path from 'path';
import { settings } from './settings/settings';
import { PlaywrightManager } from './common/lib';

/**
 * Main function that orchestrates the Playwright automation test.
 */
async function main(): Promise<void> {
    console.log("🚀 Starting Playwright Automation Test for Electric Mind");
    console.log("=".repeat(60));
    console.log(`Target URL: ${settings.URL}`);
    console.log(`Browser: ${settings.BROWSER}`);
    console.log("=".repeat(60));

    // Initialize Playwright manager
    const manager = new PlaywrightManager();
    let exitCode = 0;

    try {
        // Step 1: Open URL with specified browser
        console.log("\\n📖 Step 1: Opening browser and navigating to URL...");
        await manager.openUrl(settings.URL, settings.BROWSER);

        // Step 2: Validate elements from YAML data
        console.log("\\n🔍 Step 2: Validating elements from locator data...");
        const locatorFile = path.join(__dirname, "Locators", "locator.yaml");

        const validationResult = await manager.validateElementFromData(locatorFile);

        // Step 3: Report final results
        console.log("\\n📊 Step 3: Final Results");
        console.log("=".repeat(60));

        if (validationResult) {
            console.log("🎉 TEST PASSED: All elements validated successfully!");
            exitCode = 0;
        } else {
            console.log("❌ TEST FAILED: Some element validations failed!");
            exitCode = 1;
        }

        console.log("=".repeat(60));

    } catch (error) {
        console.error(`\\n💥 CRITICAL ERROR: ${error}`);
        console.error("Test execution failed!");
        exitCode = 1;

    } finally {
        // Step 4: Cleanup
        console.log("\\n🧹 Step 4: Cleaning up resources...");
        await manager.teardown();
    }

    console.log("\\n✅ Test execution completed.");
    process.exit(exitCode);
}

// Execute main function
if (require.main === module) {
    main().catch((error) => {
        console.error("Unhandled error:", error);
        process.exit(1);
    });
}

