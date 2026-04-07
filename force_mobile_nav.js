const fs = require('fs');

const kryptonPath = 'd:/麻园/kejin/merged/js/krypton.js';
let kryptonCode = fs.readFileSync(kryptonPath, 'utf8');

// 1. Force quick nav bar visibility logic in updateNavVisibility
// Remove the rect-based conditional logic for mobile and only keep it for desktop if needed.
kryptonCode = kryptonCode.replace(
    /function\s+updateNavVisibility\(\)\s*\{[\s\S]*?if\s*\(rect\.top\s*<\s*window\.innerHeight\s*-\s*150\s*&&\s*rect\.bottom\s*>\s*100\)\s*\{[\s\S]*?navBar\.style\.setProperty\('display',\s*'flex',\s*'important'\);[\s\S]*?\}\s*else\s*\{[\s\S]*?navBar\.style\.setProperty\('display',\s*'none',\s*'important'\);\s*\}\s*\}/,
    `function updateNavVisibility() {
                var planArea = document.querySelector('.plan-layout');
                if (!planArea) return;
                var rect = planArea.getBoundingClientRect();

                // 手机端：强制显示，不加滚动限制 (只要页面加载了 Ziyong 代码就显示)
                if (window.innerWidth <= 860) {
                    navBar.style.setProperty('display', 'flex', 'important');
                    navBar.style.left = '10px';
                    navBar.style.right = '10px';
                    navBar.style.bottom = '85px';
                    navBar.style.top = 'auto';
                    navBar.style.flexDirection = 'row';
                    navBar.style.gap = '8px';
                    navBar.style.justifyContent = 'center';
                } else {
                    // 电脑端：保持原有的滚动区域显示逻辑
                    if (rect.top < window.innerHeight - 150 && rect.bottom > 100) {
                        navBar.style.setProperty('display', 'flex', 'important');
                        navBar.style.right = '150px';
                        navBar.style.bottom = '30px';
                        navBar.style.left = 'auto';
                        navBar.style.top = 'auto';
                        navBar.style.flexDirection = 'column';
                    } else {
                        navBar.style.setProperty('display', 'none', 'important');
                    }
                }
            }`
);

// 2. Clean up injected CSS to remove display:none on mobile
kryptonCode = kryptonCode.replace(
    /'\s*\.quick-nav-bar\{position:fixed;\s*display:none;?\s*z-index:2500;\s*pointer-events:auto;\}',/,
    "'.quick-nav-bar{position:fixed; display:none; z-index:2500; pointer-events:auto;}',"
);

kryptonCode = kryptonCode.replace(
    /'\s*@media\(max-width:860px\)\{',\s*'\s*\.quick-nav-bar\{gap:8px;?\s*justify-content:center;\}',/,
    "'@media(max-width:860px){', '  .quick-nav-bar{display:flex !important; gap:8px; justify-content:center;}',"
);

fs.writeFileSync(kryptonPath, kryptonCode, 'utf8');

// 3. Update index.html cache buster
const htmlPath = 'd:/麻园/kejin/merged/index.html';
let htmlCode = fs.readFileSync(htmlPath, 'utf8');

htmlCode = htmlCode.replace(/css\/style\.css\?v=\d+/, 'css/style.css?v=040720');
htmlCode = htmlCode.replace(/js\/krypton\.js\?v=\d+/, 'js/krypton.js?v=040720');

fs.writeFileSync(htmlPath, htmlCode, 'utf8');

console.log('Forced mobile quick-nav visibility successfully.');
