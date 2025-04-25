/**
 * Visual Regression Testing Script for ECL
 * 
 * This script captures screenshots of all Storybook stories and compares them
 * against baseline images to detect visual regressions.
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

// Configuration
const STORYBOOK_URL = 'http://localhost:6006';
const SCREENSHOT_DIR = path.join(__dirname, '../.reg/actual');
const BASELINE_DIR = path.join(__dirname, '../.reg/expected');
const DIFF_DIR = path.join(__dirname, '../.reg/diff');
const REPORT_PATH = path.join(__dirname, '../.reg/report.json');

// Ensure directories exist
[SCREENSHOT_DIR, BASELINE_DIR, DIFF_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Initialize report
const report = {};

async function captureScreenshots() {
  console.log('Starting visual regression tests...');
  
  // Launch browser
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  const page = await context.newPage();
  
  try {
    // Navigate to Storybook
    await page.goto(STORYBOOK_URL);
    console.log('Loaded Storybook');
    
    // Wait for Storybook to load
    await page.waitForSelector('#storybook-explorer-tree');
    
    // Get all story IDs
    const storyIds = await page.evaluate(() => {
      // This function runs in the browser context
      return Object.keys(window.__STORYBOOK_STORY_STORE__.getStoriesForManager());
    });
    
    console.log(`Found ${storyIds.length} stories to test`);
    
    // Capture screenshots for each story
    for (const storyId of storyIds) {
      const storyUrl = `${STORYBOOK_URL}/iframe.html?id=${storyId}&viewMode=story`;
      const sanitizedId = storyId.replace(/[^a-zA-Z0-9]/g, '-');
      const screenshotPath = path.join(SCREENSHOT_DIR, `${sanitizedId}.png`);
      
      console.log(`Capturing: ${storyId}`);
      
      await page.goto(storyUrl);
      await page.waitForTimeout(1000); // Wait for story to render
      await page.screenshot({ path: screenshotPath, fullPage: true });
      
      // Check if baseline exists
      const baselinePath = path.join(BASELINE_DIR, `${sanitizedId}.png`);
      if (fs.existsSync(baselinePath)) {
        // Compare with baseline using pixelmatch or other tool
        const diffPath = path.join(DIFF_DIR, `${sanitizedId}.png`);
        
        try {
          // Use ImageMagick's compare command if available
          execSync(`compare -metric AE "${baselinePath}" "${screenshotPath}" "${diffPath}" 2>/dev/null`);
          report[storyId] = { name: storyId, status: 'pass' };
          console.log(`✅ ${storyId}: No visual differences`);
        } catch (error) {
          report[storyId] = { name: storyId, status: 'fail' };
          console.log(`❌ ${storyId}: Visual differences detected`);
        }
      } else {
        // No baseline exists, create one
        fs.copyFileSync(screenshotPath, baselinePath);
        report[storyId] = { name: storyId, status: 'new' };
        console.log(`🆕 ${storyId}: New baseline created`);
      }
    }
  } catch (error) {
    console.error('Error during visual testing:', error);
    process.exit(1);
  } finally {
    // Save report
    fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));
    
    // Close browser
    await browser.close();
    
    // Print summary
    const passed = Object.values(report).filter(r => r.status === 'pass').length;
    const failed = Object.values(report).filter(r => r.status === 'fail').length;
    const newTests = Object.values(report).filter(r => r.status === 'new').length;
    
    console.log('\nVisual Regression Test Summary:');
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`🆕 New baselines: ${newTests}`);
    
    if (failed > 0) {
      console.log('\nFailed tests:');
      Object.entries(report)
        .filter(([_, r]) => r.status === 'fail')
        .forEach(([id, _]) => console.log(`- ${id}`));
      
      process.exit(1);
    }
  }
}

// Run the tests
captureScreenshots().catch(console.error);
