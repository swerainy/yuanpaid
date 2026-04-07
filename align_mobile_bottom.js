const fs = require('fs');

const kryptonPath = 'd:/麻园/kejin/merged/js/krypton.js';
let kryptonCode = fs.readFileSync(kryptonPath, 'utf8');

// 1. Align quick nav bar to bottom row (bottom: 20px)
kryptonCode = kryptonCode.replace(
    /navBar\.style\.bottom\s*=\s*'85px';/,
    "navBar.style.bottom = '20px';"
);

// 2. Adjust injected nav-jump-btn sizes for mobile (more compact)
kryptonCode = kryptonCode.replace(
    /'\s*\.nav-jump-btn\{width:75px;\s*height:40px;\s*font-size:12px;\}',/,
    "'  .nav-jump-btn{width:70px; height:36px; font-size:11px; padding:0 4px;}',"
);

// 3. Ensure quick-nav-bar on mobile has enough side margins to not overlap left/right circles
// We'll set a fixed width if needed or just use flex margins.
kryptonCode = kryptonCode.replace(
    /'\s*\.quick-nav-bar\{display:flex\s*!important;\s*gap:8px;\s*justify-content:center;\}',/,
    "'  .quick-nav-bar{display:flex !important; gap:6px; justify-content:center; width:calc(100vw - 150px); left:75px !important; right:75px !important; bottom:20px !important;}',"
);

fs.writeFileSync(kryptonPath, kryptonCode, 'utf8');

// 4. Update style.css for z-index and background opacity
const stylePath = 'd:/麻园/kejin/merged/css/style.css';
let styleCode = fs.readFileSync(stylePath, 'utf8');

// Inject z-index fix for expanded panel
styleCode = styleCode.replace(
    /\.panel-item\.expanded\s*\{/,
    ".panel-item.expanded {\n                z-index: 3100 !important;"
);

fs.writeFileSync(stylePath, styleCode, 'utf8');

// 5. Update index.html cache buster
const htmlPath = 'd:/麻园/kejin/merged/index.html';
let htmlCode = fs.readFileSync(htmlPath, 'utf8');

htmlCode = htmlCode.replace(/css\/style\.css\?v=\d+/, 'css/style.css?v=040725');
htmlCode = htmlCode.replace(/js\/krypton\.js\?v=\d+/, 'js/krypton.js?v=040725');

fs.writeFileSync(htmlPath, htmlCode, 'utf8');

console.log('Mobile bottom layout alignment and z-index fixes applied successfully.');
