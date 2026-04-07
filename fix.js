const fs = require('fs');
let c = fs.readFileSync('d:/麻园/kejin/merged/js/krypton.js', 'utf8');
c = c.replace(/\/\/ 缩小视图（手机端）：恢复到底部横向排列，不随电脑端变动[\s\S]*?navBar\.style\.flexDirection = 'row';/g, "// 缩小视图（手机端）：完全隐藏\n                        navBar.style.setProperty('display', 'none', 'important');");
fs.writeFileSync('d:/麻园/kejin/merged/js/krypton.js', c, 'utf8');
