const fs = require('fs');

const stylePath = 'd:/麻园/kejin/merged/css/style.css';
let styleCode = fs.readFileSync(stylePath, 'utf8');

// 1. Swap backToTop position: Left to Right
styleCode = styleCode.replace(
    /left:\s*16px;\s*right:\s*auto;/,
    "right: 16px; left: auto;"
);

// 2. Swap panel-item (Integral Ball) position: Right to Left
styleCode = styleCode.replace(
    /right:\s*16px\s*!important;\s*bottom:\s*20px\s*!important;/,
    "left: 16px !important; right: auto !important; bottom: 20px !important;"
);
// And also for expanded
styleCode = styleCode.replace(
    /right:\s*16px\s*!important;\s*bottom:\s*16px\s*!important;/,
    "left: 16px !important; right: auto !important; bottom: 16px !important;"
);

// 3. Optimize Ziyong Header on mobile (900px block)
styleCode = styleCode.replace(
    /@media\s*\(max-width:\s*900px\)\s*\{/,
    `@media (max-width: 900px) {
            /* Ziyong Header Optimization */
            .ziyong-header { padding: 15px 10px !important; }
            .ziyong-header .title-row { 
                flex-direction: column !important; 
                align-items: center !important; 
                gap: 15px !important; 
            }
            .ziyong-title-group h2 { 
                margin: 0 0 5px 0 !important; 
                font-size: 22px !important; 
                writing-mode: horizontal-tb !important; 
                letter-spacing: 2px !important; 
                text-align: center !important;
            }
            .ziyong-subtitle { text-align: center !important; margin-bottom: 10px !important; }
            
            .ziyong-tabs { 
                width: 100% !important; 
                justify-content: center !important; 
                gap: 8px !important;
                margin-bottom: 5px !important;
            }
            .ziyong-tab { 
                flex: 1 !important; 
                max-width: 120px !important; 
                height: 36px !important; 
                display: flex !important; 
                align-items: center !important; 
                justify-content: center !important; 
                font-size: 13px !important;
                border-radius: 18px !important;
            }

            .ziyong-actions-right { 
                width: 100% !important; 
                justify-content: center !important; 
                gap: 6px !important; 
                flex-wrap: wrap !important;
            }
            .history-btn.mini { 
                height: 34px !important; 
                padding: 0 10px !important; 
                font-size: 11px !important; 
                margin: 0 !important;
                border-radius: 8px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                flex: 1 !important;
                min-width: 80px !important;
            }`
);

fs.writeFileSync(stylePath, styleCode, 'utf8');

// 4. Update index.html cache buster
const htmlPath = 'd:/麻园/kejin/merged/index.html';
let htmlCode = fs.readFileSync(htmlPath, 'utf8');

htmlCode = htmlCode.replace(/css\/style\.css\?v=\d+/, 'css/style.css?v=040745');
htmlCode = htmlCode.replace(/js\/krypton\.js\?v=\d+/, 'js/krypton.js?v=040745');

fs.writeFileSync(htmlPath, htmlCode, 'utf8');

console.log('Ziyong header optimized and floating buttons swapped successfully.');
