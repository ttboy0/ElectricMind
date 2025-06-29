# Electric Mind Playwright Automation Scripts

This project contains both **Python** and **TypeScript** Playwright automation scripts for testing the Electric Mind website (https://www.electricmind.com/). Both versions provide identical functionality and validate the presence of 4 key elements on the website.

## 🎯 What These Scripts Do

1. **Opens Browser**: Launches a Chromium browser instance
2. **Navigates to URL**: Goes to https://www.electricmind.com/
3. **Validates Elements**: Checks for 4 key elements:
   - What We Do navigation link
   - Who We Are navigation link  
   - Contact navigation link
   - Careers navigation link
4. **Reports Results**: Provides detailed success/failure reporting
5. **Cleanup**: Properly closes browser and resources

## 📁 Project Structure

```
electricmind_playwright_scripts/
├── electricmind_scripts_python/          # Python implementation
│   ├── common/
│   │   └── lib.py                        # Python automation library
│   ├── settings/
│   │   └── settings.py                   # Python configuration
│   ├── Locators/
│   │   └── locator.yaml                  # Element locators (shared)
│   ├── main_script.py                    # Python main script
│   ├── requirements.txt                  # Python dependencies
│   └── README.md                         # Python-specific instructions
│
├── electricmind_scripts_typescript/      # TypeScript implementation
│   ├── common/
│   │   └── lib.ts                        # TypeScript automation library
│   ├── settings/
│   │   └── settings.ts                   # TypeScript configuration
│   ├── Locators/
│   │   └── locator.yaml                  # Element locators (shared)
│   ├── main_script.ts                    # TypeScript main script
│   ├── package.json                      # Node.js dependencies
│   ├── tsconfig.json                     # TypeScript configuration
│   └── README.md                         # TypeScript-specific instructions
│
└── README.md                             # This common guide
```

## 🤔 Which Version Should You Choose?

### Python Version
**Choose Python if:**
- You're more comfortable with Python syntax
- Your team primarily uses Python
- You want to integrate with existing Python testing frameworks
- You prefer pip and virtual environments

**Prerequisites:**
- Python 3.7 or higher
- pip (Python package installer)

### TypeScript Version
**Choose TypeScript if:**
- You're more comfortable with JavaScript/TypeScript
- Your team primarily uses Node.js
- You want strong typing and modern JavaScript features
- You prefer npm and Node.js ecosystem

**Prerequisites:**
- Node.js 16.0 or higher
- npm (Node Package Manager)

### Both Versions Are Identical In:
- ✅ Functionality and test coverage
- ✅ Element validation logic
- ✅ Error handling and reporting
- ✅ Browser support (Chromium, Firefox, WebKit)
- ✅ Configuration options

## 🚀 Quick Start Guide

### Option 1: Python Version

```bash
# Navigate to Python project
cd electricmind_scripts_python

# Create virtual environment
python -m venv playwright_env

# Activate virtual environment
# On Windows:
playwright_env\Scripts\activate
# On macOS/Linux:
source playwright_env/bin/activate

# Install dependencies
pip install -r requirements.txt

# Install Playwright browsers
playwright install chromium

# Run the script
python main_script.py
```

### Option 2: TypeScript Version

```bash
# Navigate to TypeScript project
cd electricmind_scripts_typescript

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium

# Run the script
npm start
```

## 📊 Expected Output (Both Versions)

```
🚀 Starting Playwright Automation Test for Electric Mind
============================================================
Target URL: https://www.electricmind.com/
Browser: chromium
============================================================

📖 Step 1: Opening browser and navigating to URL...
Navigating to: https://www.electricmind.com/
Successfully navigated to: https://www.electricmind.com/

🔍 Step 2: Validating elements from locator data...

Validating 4 elements...

Validating: What We Do navigation link
  Locator: div:has-text('What We Do'):not(:has(div))
  Expected text: 'What We Do'
  ✅ SUCCESS: Text matches - 'What We Do'

Validating: Who We Are navigation link
  Locator: div:has-text('Who We Are'):not(:has(div))
  Expected text: 'Who We Are'
  ✅ SUCCESS: Text matches - 'Who We Are'

Validating: Contact navigation link
  Locator: a:has-text('Contact')
  Expected text: 'Contact'
  ✅ SUCCESS: Text matches - 'Contact'

Validating: Careers navigation link
  Locator: div:has-text('Careers'):not(:has(div))
  Expected text: 'Careers'
  ✅ SUCCESS: Text matches - 'Careers'

==================================================
🎉 All element validations PASSED!
==================================================

📊 Step 3: Final Results
============================================================
🎉 TEST PASSED: All elements validated successfully!
============================================================

🧹 Step 4: Cleaning up resources...
Browser closed successfully.

✅ Test execution completed.
```

## ⚙️ Configuration (Both Versions)

### Changing Target URL

**Python** (`electricmind_scripts_python/settings/settings.py`):
```python
BASEURL = "https://www."
URL = BASEURL + "your-target-site.com/"
```

**TypeScript** (`electricmind_scripts_typescript/settings/settings.ts`):
```typescript
export const BASEURL = "https://www.";
export const URL = BASEURL + "your-target-site.com/";
```

### Changing Browser

**Python** (`electricmind_scripts_python/settings/settings.py`):
```python
BROWSER = "firefox"  # Options: chromium, firefox, webkit
```

**TypeScript** (`electricmind_scripts_typescript/settings/settings.ts`):
```typescript
export const BROWSER = "firefox"; // Options: chromium, firefox, webkit
```

### Modifying Elements to Test

Both versions share the same YAML file (`Locators/locator.yaml`):
```yaml
elements:
  your_element:
    locator: "css=.your-css-selector"
    expected_text: "Expected Text"
    description: "Description of your element"
```

## 🧪 Running Tests

### Python Commands
```bash
# Basic execution
python main_script.py

# With virtual environment
source playwright_env/bin/activate && python main_script.py
```

### TypeScript Commands
```bash
# Using npm scripts (recommended)
npm start
npm test

# Manual compilation and execution
npm run build
node main_script.js

# Clean compiled files
npm run clean
```

### Installing Additional Browsers

**Python:**
```bash
playwright install firefox
playwright install webkit
```

**TypeScript:**
```bash
npx playwright install firefox
npx playwright install webkit
```

## 🐛 Troubleshooting

### Common Issues (Both Versions)

1. **Browser not found**
   ```bash
   # Python
   playwright install
   
   # TypeScript
   npx playwright install
   ```

2. **Permission errors (Linux/macOS)**
   ```bash
   # Python
   playwright install-deps
   
   # TypeScript
   npx playwright install-deps
   ```

3. **Element not found**
   - Check if website structure has changed
   - Update locators in `Locators/locator.yaml`
   - Use browser developer tools to inspect elements

### Python-Specific Issues

4. **Import errors**
   - Ensure virtual environment is activated
   - Verify dependencies: `pip list`

5. **Virtual environment issues**
   ```bash
   # Recreate virtual environment
   rm -rf playwright_env
   python -m venv playwright_env
   source playwright_env/bin/activate
   pip install -r requirements.txt
   ```

### TypeScript-Specific Issues

6. **TypeScript compilation errors**
   ```bash
   # Check compilation
   npx tsc --noEmit
   
   # Reinstall dependencies
   rm -rf node_modules package-lock.json
   npm install
   ```

7. **Module not found errors**
   - Ensure dependencies are installed: `npm list`
   - Check TypeScript compilation: `npm run build`

## 🔧 Advanced Configuration

### Headless Mode

**Python** (`electricmind_scripts_python/common/lib.py`):
```python
# Change headless=False to headless=True
self.browser = self.playwright.chromium.launch(headless=True)
```

**TypeScript** (`electricmind_scripts_typescript/common/lib.ts`):
```typescript
// Change headless: false to headless: true
this.browser = await chromium.launch({ headless: true });
```

### Custom Timeouts

**Python** (`electricmind_scripts_python/settings/settings.py`):
```python
TIMEOUT = 60000  # 60 seconds
```

**TypeScript** (`electricmind_scripts_typescript/settings/settings.ts`):
```typescript
export const TIMEOUT = 60000; // 60 seconds
```

### Custom Viewport

**Python** (`electricmind_scripts_python/settings/settings.py`):
```python
VIEWPORT = {"width": 1920, "height": 1080}
```

**TypeScript** (`electricmind_scripts_typescript/settings/settings.ts`):
```typescript
export const VIEWPORT = { width: 1920, height: 1080 };
```

## 📝 Customization

### Adding New Elements

1. Open `Locators/locator.yaml` in either project
2. Add new element following the existing pattern:

```yaml
elements:
  new_element:
    locator: "text=Your Element Text"
    expected_text: "Your Element Text"
    description: "Description of your element"
```

### Custom Validation Logic

**Python**: Modify `electricmind_scripts_python/common/lib.py` in the `validate_element_from_data` method

**TypeScript**: Modify `electricmind_scripts_typescript/common/lib.ts` in the `validateElementFromData` method

## 🔍 Element Locators Used

The following locators have been tested and validated on electricmind.com:

| Element | Locator | Expected Text | Description |
|---------|---------|---------------|-------------|
| What We Do | `div:has-text('What We Do'):not(:has(div))` | "What We Do" | Navigation link |
| Who We Are | `div:has-text('Who We Are'):not(:has(div))` | "Who We Are" | Navigation link |
| Contact | `a:has-text('Contact')` | "Contact" | Navigation link |
| Careers | `div:has-text('Careers'):not(:has(div))` | "Careers" | Navigation link |

## 📊 Exit Codes

- `0`: All tests passed successfully
- `1`: One or more tests failed or error occurred

## 🔄 Development Workflow

### For Python Development
```bash
# Setup
cd electricmind_scripts_python
python -m venv playwright_env
source playwright_env/bin/activate
pip install -r requirements.txt
playwright install chromium

# Development cycle
# 1. Edit code
# 2. Run tests
python main_script.py

# 3. Debug if needed
# Add breakpoints or print statements
```

### For TypeScript Development
```bash
# Setup
cd electricmind_scripts_typescript
npm install
npx playwright install chromium

# Development cycle
# 1. Edit TypeScript code
# 2. Compile and run
npm start

# 3. Debug if needed
# Use TypeScript debugging features
npm run build
node --inspect main_script.js
```

## 🤝 Contributing

When modifying either version:

1. **Keep both versions in sync**: If you add features to one version, add them to the other
2. **Update shared files**: The `locator.yaml` file is shared between both versions
3. **Test both versions**: Ensure changes work in both Python and TypeScript implementations
4. **Update documentation**: Update both version-specific READMEs and this common README

## 📄 License

This project is provided as-is for educational and testing purposes.

## 🆘 Support

For issues or questions:

1. **Check troubleshooting section** above for your specific version
2. **Verify prerequisites** are met for your chosen version
3. **Ensure dependencies** are installed correctly
4. **Check that browsers** are installed via Playwright
5. **Validate website accessibility** - ensure electricmind.com is reachable

## 🎉 Success Criteria

Both scripts are considered successful when:
- ✅ All 4 elements are found and validated
- ✅ Browser opens and navigates to electricmind.com
- ✅ No errors during execution
- ✅ Clean browser shutdown
- ✅ Exit code 0 returned

Choose the version that best fits your development environment and team preferences. Both provide identical functionality and reliability!

