const fs = require('fs');

const stylePath = 'd:/麻园/kejin/merged/css/style.css';
let styleCode = fs.readFileSync(stylePath, 'utf8');

// 1. Remove the old 768px media query block entirely (it's between line 777 and roughly 860)
// We'll replace it with a comment and move its logic later.
styleCode = styleCode.replace(/@media\s*\(max-width:\s*768px\)\s*\{[\s\S]*?\n\s{8}#backToTop\s*\{[\s\S]*?\}\n\s*\}/, "/* 原 768px 适配已合并至底部 900px 统一处理 */");

// 2. Update the final 900px media query to include Zentering and Header/Calendar logic
styleCode = styleCode.replace(
    /@media\s*\(max-width:\s*900px\)\s*\{/,
    `@media (max-width: 900px) {
            /* 全局居中与防缩放布局锁定 */
            body { 
                max-width: 100vw; 
                overflow-x: hidden; 
                display: flex; 
                flex-direction: column; 
                align-items: center; 
            }

            .header-wrapper, #calendar-wrapper, .ziyong-wrapper.modern-ancient {
                width: calc(100vw - 20px) !important;
                max-width: 900px !important;
                margin-left: auto !important;
                margin-right: auto !important;
                box-sizing: border-box !important;
            }

            .header-wrapper { padding: 10px 10px 0; }
            .header { flex-wrap: wrap; gap: 8px; }
            .header h1 { font-size: 16px; letter-spacing: 1px; }
            .filters-container { gap: 6px; }
            .filters { gap: 5px; }
            .filter-tag { padding: 3px 8px; font-size: 11px; }
            .filter-actions { padding-left: 6px; }
            .filter-action-btn { padding: 3px 8px; font-size: 11px; }

            #calendar-wrapper { margin-top: 10px; margin-bottom: 30px; border-radius: 6px; }
            #calendar-inner { padding: 10px 6px; }
            .fc .fc-toolbar { flex-wrap: wrap; gap: 6px; justify-content: center !important; }
            .fc .fc-toolbar-chunk:nth-child(2) { position: static; transform: none; }
            .fc .fc-toolbar-title { font-size: 1.1em; }
            .fc .fc-button-primary { padding: 3px 6px; font-size: 11px; }
            .fc-daygrid-day-number { font-size: 13px !important; }
            .simplified-lunar-marker { font-size: 9px; }`
);

fs.writeFileSync(stylePath, styleCode, 'utf8');

// 3. Update index.html viewport and cache buster
const htmlPath = 'd:/麻园/kejin/merged/index.html';
let htmlCode = fs.readFileSync(htmlPath, 'utf8');

htmlCode = htmlCode.replace(
    /<meta\s+name="viewport"\s+content="[^"]*">/,
    '<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no, viewport-fit=cover">'
);

// Bump version for cache busting
htmlCode = htmlCode.replace(/css\/style\.css\?v=\d+/, 'css/style.css?v=040740');
htmlCode = htmlCode.replace(/js\/krypton\.js\?v=\d+/, 'js/krypton.js?v=040740');

fs.writeFileSync(htmlPath, htmlCode, 'utf8');

console.log('Mobile centering, scaling lock, and layout consolidation applied successfully.');
