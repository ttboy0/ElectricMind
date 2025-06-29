#!/usr/bin/env python3
"""
Main Playwright automation script for Electric Mind website testing.

This script:
1. Opens the Electric Mind website
2. Validates 4 specified elements are present on the page
3. Provides detailed reporting of validation results
"""

import os
import sys
from pathlib import Path

# Add project root to Python path
project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

# Import project modules
from settings import settings
from common.lib import PlaywrightManager


def main():
    """
    Main function that orchestrates the Playwright automation test.
    """
    print("🚀 Starting Playwright Automation Test for Electric Mind")
    print("=" * 60)
    print(f"Target URL: {settings.URL}")
    print(f"Browser: {settings.BROWSER}")
    print("=" * 60)
    
    # Initialize Playwright manager
    manager = PlaywrightManager()
    
    try:
        # Step 1: Open URL with specified browser
        print("\\n📖 Step 1: Opening browser and navigating to URL...")
        page = manager.open_url(settings.URL, settings.BROWSER)
        
        # Step 2: Validate elements from YAML data
        print("\\n🔍 Step 2: Validating elements from locator data...")
        locator_file = os.path.join(project_root, "Locators", "locator.yaml")
        
        if not os.path.exists(locator_file):
            raise FileNotFoundError(f"Locator file not found: {locator_file}")
        
        validation_result = manager.validate_element_from_data(locator_file)
        
        # Step 3: Report final results
        print("\\n📊 Step 3: Final Results")
        print("=" * 60)
        
        if validation_result:
            print("🎉 TEST PASSED: All elements validated successfully!")
            exit_code = 0
        else:
            print("❌ TEST FAILED: Some element validations failed!")
            exit_code = 1
            
        print("=" * 60)
        
    except Exception as e:
        print(f"\\n💥 CRITICAL ERROR: {str(e)}")
        print("Test execution failed!")
        exit_code = 1
        
    finally:
        # Step 4: Cleanup
        print("\\n🧹 Step 4: Cleaning up resources...")
        manager.teardown()
        
    print("\\n✅ Test execution completed.")
    sys.exit(exit_code)


if __name__ == "__main__":
    main()

