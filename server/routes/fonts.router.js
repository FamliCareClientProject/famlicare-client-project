const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Define directories for fonts and web fonts
const fontsDir = path.join(__dirname, '../../public/fonts');
const webFontsDir = path.join(__dirname, '../../public/fonts/webFonts');

/**
 * Generates a CSS @font-face rule for a given font.
 * @param {string} fontPath - The path to the font file.
 * @param {string} fontFamily - The font family name.
 * @param {string} [fontStyle='normal'] - The font style (e.g., 'normal', 'italic').
 * @param {string} [fontWeight='normal'] - The font weight (e.g., 'normal', 'bold').
 * @returns {string} The CSS @font-face rule.
 */
function generateFontFaceRule(fontPath, fontFamily, fontStyle = 'normal', fontWeight = 'normal') {
  return `
    @font-face {
      font-family: '${fontFamily}';
      src: url('${fontPath}') format('opentype');
      font-weight: ${fontWeight};
      font-style: ${fontStyle};
    }
  `;
}

/**
 * Lists all font files in a directory and generates CSS content for them.
 * @param {string} dir - The directory to search for font files.
 * @returns {string} The generated CSS content.
 */
function listFontsAndGenerateCSS(dir) {
  let cssContent = '';
  const fontFiles = fs.readdirSync(dir);

  fontFiles.forEach(file => {
    const fullPath = path.join(dir, file);
    const fontNameMatch = file.match(/^(.+?)(?:-(\w+))?(?:-(\w+))?\.otf$/i);
    if (fontNameMatch) {
      const [, fontFamily, fontWeight, fontStyle] = fontNameMatch;
      const webPath = fullPath.replace(__dirname, ''); // Convert to web path
      cssContent += generateFontFaceRule(webPath, fontFamily, fontStyle, fontWeight);
    }
  });

  return cssContent;
}

/**
 * Generates CSS for all fonts in the specified directories and writes it to a file.
 */
function generateFontsCSS() {
  let cssContent = listFontsAndGenerateCSS(fontsDir);
  cssContent += listFontsAndGenerateCSS(webFontsDir);

  // Write the CSS content to a file
  fs.writeFileSync(path.join(__dirname, '../../public/fonts/fonts.css'), cssContent);
}

// Call the function to generate the CSS file
generateFontsCSS();

module.exports = router;