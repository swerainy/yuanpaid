const fs = require('fs');

const kryptonPath = 'd:/麻园/kejin/merged/js/krypton.js';
let kryptonCode = fs.readFileSync(kryptonPath, 'utf8');

// 1. Restore navigation bar visibility logic in updateNavVisibility
kryptonCode = kryptonCode.replace(
    /if\s*\(window\.innerWidth\s*>\s*860\)\s*\{[\s\S]*?navBar\.style\.flexDirection\s*=\s*'column';\s*\}\s*else\s*\{[\s\S]*?navBar\.style\.setProperty\('display',\s*'none',\s*'important'\);\s*\}/,
    `if (window.innerWidth > 860) {
                        // 电脑端：定位至回顶按钮左侧（红框位置）
                        navBar.style.right = '150px';
                        navBar.style.bottom = '30px';
                        navBar.style.left = 'auto';
                        navBar.style.top = 'auto';
                        navBar.style.flexDirection = 'column';
                    } else {
                        // 缩小视图（手机端）：恢复到底部显示，上提位置以防遮挡回顶按钮 (回顶在左下 20px)
                        navBar.style.left = '10px';
                        navBar.style.right = '10px';
                        navBar.style.bottom = '85px';
                        navBar.style.top = 'auto';
                        navBar.style.flexDirection = 'row';
                        navBar.style.gap = '8px';
                        navBar.style.justifyContent = 'center';
                    }`
);

// 2. Adjust injected CSS to remove display:none on mobile quick nav
kryptonCode = kryptonCode.replace(
    /'\s*\.quick-nav-bar\{position:fixed;\s*display:none!important;\s*z-index:2500;\s*pointer-events:auto;\}',/,
    "'.quick-nav-bar{position:fixed; display:none; z-index:2500; pointer-events:auto;}',"
);

kryptonCode = kryptonCode.replace(
    /'\s*@media\(max-width:860px\)\{',\s*'\s*\.quick-nav-bar\{display:none\s*!important;\}',/,
    "'@media(max-width:860px){', '  .quick-nav-bar{gap:8px; justify-content:center;}', '  .nav-jump-btn{width:75px; height:40px; font-size:12px;}',"
);

// 3. Ensure mapping panel uses consistent mobile width check (already 900 in some places, ensuring 900)
kryptonCode = kryptonCode.replace(/innerWidth\s*<=\s*768/g, 'innerWidth <= 900');

fs.writeFileSync(kryptonPath, kryptonCode, 'utf8');

// Update index.html viewport and cache buster
const htmlPath = 'd:/麻园/kejin/merged/index.html';
let htmlCode = fs.readFileSync(htmlPath, 'utf8');

htmlCode = htmlCode.replace(
    /<meta\s+name="viewport"\s+content="[^"]*">/,
    '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no, viewport-fit=cover">'
);

// Bump version for cache busting
htmlCode = htmlCode.replace(/css\/style\.css\?v=\d+/, 'css/style.css?v=040715');
htmlCode = htmlCode.replace(/js\/krypton\.js\?v=\d+/, 'js/krypton.js?v=040715');

fs.writeFileSync(htmlPath, htmlCode, 'utf8');

console.log('Mobile navigation and scaling fixes applied successfully.');
