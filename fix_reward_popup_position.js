const fs = require('fs');

const jsPath = 'd:/麻园/kejin/merged/js/krypton.js';
let jsCode = fs.readFileSync(jsPath, 'utf8');

// Update Reward Popup Positioning Logic
// We're looking for the block between lines 1420-1440
jsCode = jsCode.replace(
    /var\s+rect\s*=\s*btn\.getBoundingClientRect\(\);\s*var\s+popupHeight\s*=\s*gp\.offsetHeight;([\s\S]*?)gp\.style\.left\s*=\s*leftPos\s*\+\s*'px';/,
    `var rect = btn.getBoundingClientRect();
                var popupHeight = gp.offsetHeight;
                var popupWidth = gp.offsetWidth || 260;

                // 1. 水平定位：手机端居中，电脑端侧边
                var leftPos;
                if (window.innerWidth < 800) {
                    leftPos = (window.innerWidth - popupWidth) / 2;
                } else {
                    leftPos = rect.left - popupWidth - 20;
                    if (leftPos < 20) leftPos = rect.right + 20;
                }

                // 2. 最终视口安全检查 (防止超出左右边界)
                var edgePadding = 10;
                if (leftPos < edgePadding) leftPos = edgePadding;
                if (leftPos + popupWidth > window.innerWidth - edgePadding) {
                    leftPos = window.innerWidth - popupWidth - edgePadding;
                }

                // 3. 垂直自适应：尝试居中对齐勋章，但确保不超出视口上下界
                var topPos = rect.top + (rect.height / 2) - (popupHeight / 2);
                var margin = 20;
                if (topPos < margin) topPos = margin;
                if (topPos + popupHeight > window.innerHeight - margin) {
                    topPos = window.innerHeight - popupHeight - margin;
                }

                gp.style.left = leftPos + 'px';`
);

fs.writeFileSync(jsPath, jsCode, 'utf8');

// Update index.html cache buster
const htmlPath = 'd:/麻园/kejin/merged/index.html';
let htmlCode = fs.readFileSync(htmlPath, 'utf8');
htmlCode = htmlCode.replace(/js\/krypton\.js\?v=\d+/, 'js/krypton.js?v=040775');
fs.writeFileSync(htmlPath, htmlCode, 'utf8');

console.log('Reward popup mobile positioning logic fixed segments updated.');
