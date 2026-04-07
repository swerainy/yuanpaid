const fs = require('fs');

const stylePath = 'd:/麻园/kejin/merged/css/style.css';
let styleCode = fs.readFileSync(stylePath, 'utf8');

// 1. Inject floating-panels z-index at the start of the mobile media query
styleCode = styleCode.replace(
    /@media\s*\(max-width:\s*900px\)\s*\{\s*body\s*\{/,
    `@media (max-width: 900px) {
            .floating-panels { z-index: 5000 !important; }
            body {`
);

// 2. Ensure expanded mapping panel has even higher z-index and hide navigation buttons when expanded
styleCode = styleCode.replace(
    /\.panel-item\.expanded\s*\{/,
    `.panel-item.expanded {
                z-index: 5100 !important;`
);

// 3. Add rule to hide quick-nav when panel is expanded
styleCode += "\n\n/* 强制隐藏冲突元素：当积分对照表展开时，隐藏导航按钮 */\n@media (max-width: 900px) {\n    body:has(#panelMapping.expanded) #ziyongQuickNav {\n        display: none !important;\n    }\n}\n";

fs.writeFileSync(stylePath, styleCode, 'utf8');

// 4. Update index.html cache buster
const htmlPath = 'd:/麻园/kejin/merged/index.html';
let htmlCode = fs.readFileSync(htmlPath, 'utf8');

htmlCode = htmlCode.replace(/css\/style\.css\?v=\d+/, 'css/style.css?v=040730');
htmlCode = htmlCode.replace(/js\/krypton\.js\?v=\d+/, 'js/krypton.js?v=040730');

fs.writeFileSync(htmlPath, htmlCode, 'utf8');

console.log('Final obstruction fixes and auto-hide logic applied successfully.');
