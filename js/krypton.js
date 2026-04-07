// ============================================================
//  广陵资用案 · krypton.js  (merged 版本)
//  数据来源：yuanpaid/src/data.ts + rewards.ts
//  功能：礼包购物车、汇率换算、每抽单价、累充里程碑悬浮面板、导出图片
// ============================================================

(function injectHtml2Canvas() {
    if (document.getElementById('html2canvas-lib')) return;
    var s = document.createElement('script');
    s.id = 'html2canvas-lib';
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    document.head.appendChild(s);
})();

var KRYPTON_DATA = {
    // ---------- 积分/金额映射表 ----------
    usdMapping: [
        { price: 0.99, pts: 60 }, { price: 1.99, pts: 120 }, { price: 2.99, pts: 180 },
        { price: 3.99, pts: 240 }, { price: 4.99, pts: 300 }, { price: 5.99, pts: 360 },
        { price: 9.99, pts: 600 }, { price: 11.99, pts: 720 }, { price: 12.99, pts: 780 },
        { price: 14.99, pts: 900 }, { price: 19.99, pts: 1200 }, { price: 23.99, pts: 1440 },
        { price: 25.99, pts: 1560 }, { price: 29.99, pts: 1800 }, { price: 39.99, pts: 2400 },
        { price: 49.99, pts: 3000 }, { price: 54.99, pts: 3300 }, { price: 74.99, pts: 4500 },
        { price: 99.99, pts: 6000 }
    ],
    rmbMapping: [
        { price: 6, pts: 60 }, { price: 12, pts: 120 }, { price: 18, pts: 180 },
        { price: 30, pts: 300 }, { price: 68, pts: 680 }, { price: 78, pts: 780 },
        { price: 88, pts: 880 }, { price: 98, pts: 980 }, { price: 128, pts: 1280 },
        { price: 148, pts: 1480 }, { price: 168, pts: 1680 }, { price: 198, pts: 1980 },
        { price: 328, pts: 3280 }, { price: 648, pts: 6480 }
    ],

    // ---------- 代号鸢礼包（USD计价，101个） ----------
    packsDaihao: [
        { id: 1, name: "年卡", pts: 2280, limit: 1, draws: 180, priceUsd: 37.99, category: "超值", sortId: 10 },
        { id: 2, name: "半年卡", pts: 1200, limit: 1, draws: 90, priceUsd: 19.99, category: "超值", sortId: 10 },
        { id: 3, name: "季卡", pts: 720, limit: 1, draws: 45, priceUsd: 11.99, category: "超值", sortId: 10 },
        { id: 4, name: "广陵金库", pts: 600, limit: 1, draws: 34, priceUsd: 9.99, category: "超值", sortId: 10 },
        { id: 5, name: "天机符传体验包", pts: 60, limit: 2, draws: 2, priceUsd: 0.99, category: "待贤", sortId: 30 },
        { id: 6, name: "天机符传超值礼包", pts: 60, limit: 1, draws: 2, priceUsd: 0.99, category: "卡池", sortId: 20 },
        { id: 7, name: "天机符传精选包", pts: 120, limit: 2, draws: 4, priceUsd: 1.99, category: "待贤", sortId: 30 },
        { id: 8, name: "天机符传初阶包", pts: 180, limit: 3, draws: 5, priceUsd: 2.99, category: "待贤", sortId: 30 },
        { id: 9, name: "天机符传成长包", pts: 300, limit: 3, draws: 8, priceUsd: 4.99, category: "待贤", sortId: 30 },
        { id: 10, name: "天机符传进阶包", pts: 600, limit: 3, draws: 12, priceUsd: 9.99, category: "待贤", sortId: 30 },
        { id: 11, name: "天机符传特惠礼包", pts: 300, limit: 1, draws: 5, priceUsd: 4.99, category: "卡池", sortId: 20 },
        { id: 12, name: "天机符传初级礼包", pts: 600, limit: 1, draws: 10, priceUsd: 9.99, category: "卡池", sortId: 20 },
        { id: 13, name: "天机符传高阶包", pts: 900, limit: 3, draws: 15, priceUsd: 14.99, category: "待贤", sortId: 30 },
        { id: 14, name: "天机符传丰盈包", pts: 1200, limit: 5, draws: 16, priceUsd: 19.99, category: "待贤", sortId: 30 },
        { id: 15, name: "天机符传助力礼包", pts: 780, limit: 3, draws: 10, priceUsd: 12.99, category: "卡池", sortId: 20 },
        { id: 16, name: "天机符传中级礼包", pts: 1200, limit: 1, draws: 14, priceUsd: 19.99, category: "卡池", sortId: 20 },
        { id: 17, name: "天机符传至尊包", pts: 1800, limit: 5, draws: 20, priceUsd: 29.99, category: "待贤", sortId: 30 },
        { id: 18, name: "首充双倍60", pts: 60, limit: 1, draws: 0.6, priceUsd: 0.99, category: "其他", sortId: 50 },
        { id: 19, name: "天机符传高级礼包", pts: 1800, limit: 1, draws: 18, priceUsd: 29.99, category: "卡池", sortId: 20 },
        { id: 20, name: "天机符传典藏包", pts: 3000, limit: 5, draws: 28, priceUsd: 49.99, category: "待贤", sortId: 30 },
        { id: 21, name: "天机符传特级礼包", pts: 3000, limit: 1, draws: 25, priceUsd: 49.99, category: "卡池", sortId: 20 },
        { id: 22, name: "待贤礼包3.5", pts: 6000, limit: 10, draws: 45, priceUsd: 99.99, category: "待贤", sortId: 30 },
        { id: 23, name: "天机符传终极礼包", pts: 6000, limit: 1, draws: 40, priceUsd: 99.99, category: "卡池", sortId: 20 },
        { id: 24, name: "天机符传豪华礼包", pts: 6000, limit: 2, draws: 40, priceUsd: 99.99, category: "卡池", sortId: 20 },
        { id: 25, name: "首充双倍300", pts: 300, limit: 1, draws: 3, priceUsd: 4.99, category: "其他", sortId: 50 },
        { id: 26, name: "首充双倍900", pts: 900, limit: 1, draws: 9, priceUsd: 14.99, category: "其他", sortId: 50 },
        { id: 27, name: "首充双倍1800", pts: 1800, limit: 1, draws: 18, priceUsd: 29.99, category: "其他", sortId: 50 },
        { id: 28, name: "首充双倍3000", pts: 3000, limit: 1, draws: 30, priceUsd: 49.99, category: "其他", sortId: 50 },
        { id: 29, name: "首充双倍6000", pts: 6000, limit: 1, draws: 60, priceUsd: 99.99, category: "其他", sortId: 50 },
        // 恋念
        { id: 30, name: "孙策·金窗绣户恋念礼包 1", pts: 900, limit: 1, draws: 0, priceUsd: 14.99, category: "恋念", extra: "40 阴文·金窗", sortId: 45 },
        { id: 31, name: "孙策·金窗绣户恋念礼包 2", pts: 600, limit: 6, draws: 0, priceUsd: 9.99, category: "恋念", extra: "20 阴文·金窗", sortId: 45 },
        { id: 32, name: "孙策·金窗绣户恋念礼包 3", pts: 1200, limit: 999, draws: 0, priceUsd: 19.99, category: "恋念", extra: "20 阴文·金窗", sortId: 45 },
        { id: 33, name: "左慈·乌飞恋念礼包 1", pts: 900, limit: 1, draws: 0, priceUsd: 14.99, category: "恋念", extra: "40 阴文·乌飞", sortId: 44 },
        { id: 34, name: "左慈·乌飞恋念礼包 2", pts: 600, limit: 6, draws: 0, priceUsd: 9.99, category: "恋念", extra: "20 阴文·乌飞", sortId: 44 },
        { id: 35, name: "左慈·乌飞恋念礼包 3", pts: 1200, limit: 999, draws: 0, priceUsd: 19.99, category: "恋念", extra: "20 阴文·乌飞", sortId: 44 },
        { id: 36, name: "袁基·若书之说恋念礼包 1", pts: 900, limit: 1, draws: 0, priceUsd: 14.99, category: "恋念", extra: "40 阴文·若书", sortId: 43 },
        { id: 37, name: "袁基·若书之说恋念礼包 2", pts: 600, limit: 6, draws: 0, priceUsd: 9.99, category: "恋念", extra: "20 阴文·若书", sortId: 43 },
        { id: 38, name: "袁基·若书之说恋念礼包 3", pts: 1200, limit: 999, draws: 0, priceUsd: 19.99, category: "恋念", extra: "20 阴文·若书", sortId: 43 },
        { id: 39, name: "傅融·乌云白云恋念礼包 1", pts: 900, limit: 1, draws: 0, priceUsd: 14.99, category: "恋念", extra: "40 阴文·乌云", sortId: 42 },
        { id: 40, name: "傅融·乌云白云恋念礼包 2", pts: 600, limit: 6, draws: 0, priceUsd: 9.99, category: "恋念", extra: "20 阴文·乌云", sortId: 42 },
        { id: 41, name: "傅融·乌云白云恋念礼包 3", pts: 1200, limit: 999, draws: 0, priceUsd: 19.99, category: "恋念", extra: "20 阴文·乌云", sortId: 42 },
        { id: 42, name: "刘辩·浮白与离光恋念礼包 1", pts: 900, limit: 1, draws: 0, priceUsd: 14.99, category: "恋念", extra: "40 阴文·浮白", sortId: 41 },
        { id: 43, name: "刘辩·浮白与离光恋念礼包 2", pts: 600, limit: 6, draws: 0, priceUsd: 9.99, category: "恋念", extra: "20 阴文·浮白", sortId: 41 },
        { id: 44, name: "刘辩·浮白与离光恋念礼包 3", pts: 1200, limit: 999, draws: 0, priceUsd: 19.99, category: "恋念", extra: "20 阴文·浮白", sortId: 41 },
        { id: 45, name: "孙策·狐截尾恋念礼包 1", pts: 900, limit: 1, draws: 0, priceUsd: 14.99, category: "恋念", extra: "40 阴文·截尾", sortId: 45 },
        { id: 46, name: "孙策·狐截尾恋念礼包 2", pts: 600, limit: 6, draws: 0, priceUsd: 9.99, category: "恋念", extra: "20 阴文·截尾", sortId: 45 },
        { id: 47, name: "孙策·狐截尾恋念礼包 3", pts: 1200, limit: 999, draws: 0, priceUsd: 19.99, category: "恋念", extra: "20 阴文·截尾", sortId: 45 },
        { id: 48, name: "傅融·神游览念礼包 1", pts: 900, limit: 1, draws: 0, priceUsd: 14.99, category: "恋念", extra: "40 阴文·神游", sortId: 42 },
        { id: 49, name: "傅融·神游览念礼包 2", pts: 600, limit: 6, draws: 0, priceUsd: 9.99, category: "恋念", extra: "20 阴文·神游", sortId: 42 },
        { id: 50, name: "傅融·神游览念礼包 3", pts: 1200, limit: 999, draws: 0, priceUsd: 19.99, category: "恋念", extra: "20 阴文·神游", sortId: 42 },
        { id: 51, name: "左慈·紫藤醉日恋念礼包 1", pts: 900, limit: 1, draws: 0, priceUsd: 14.99, category: "恋念", extra: "40 阴文·紫藤", sortId: 44 },
        { id: 52, name: "左慈·紫藤醉日恋念礼包 2", pts: 600, limit: 6, draws: 0, priceUsd: 9.99, category: "恋念", extra: "20 阴文·紫藤", sortId: 44 },
        { id: 53, name: "左慈·紫藤醉日恋念礼包 3", pts: 1200, limit: 999, draws: 0, priceUsd: 19.99, category: "恋念", extra: "20 阴文·紫藤", sortId: 44 },
        { id: 54, name: "袁基·却扇歌恋念礼包 1", pts: 900, limit: 1, draws: 0, priceUsd: 14.99, category: "恋念", extra: "40 阴文·却扇", sortId: 43 },
        { id: 55, name: "袁基·却扇歌恋念礼包 2", pts: 600, limit: 6, draws: 0, priceUsd: 9.99, category: "恋念", extra: "20 阴文·却扇", sortId: 43 },
        { id: 56, name: "袁基·却扇歌恋念礼包 3", pts: 1200, limit: 999, draws: 0, priceUsd: 19.99, category: "恋念", extra: "20 阴文·却扇", sortId: 43 },
        { id: 57, name: "刘辩·极乐之宴恋念礼包 1", pts: 900, limit: 1, draws: 0, priceUsd: 14.99, category: "恋念", extra: "40 阴文·极乐", sortId: 41 },
        { id: 58, name: "刘辩·极乐之宴恋念礼包 2", pts: 600, limit: 6, draws: 0, priceUsd: 9.99, category: "恋念", extra: "20 阴文·极乐", sortId: 41 },
        { id: 59, name: "刘辩·极乐之宴恋念礼包 3", pts: 1200, limit: 999, draws: 0, priceUsd: 19.99, category: "恋念", extra: "20 阴文·极乐", sortId: 41 },
        { id: 60, name: "孙策·师子狻猊恋念礼包 1", pts: 900, limit: 1, draws: 0, priceUsd: 14.99, category: "恋念", extra: "40 阴文·狻猊", sortId: 45 },
        { id: 61, name: "孙策·师子狻猊恋念礼包 2", pts: 600, limit: 6, draws: 0, priceUsd: 9.99, category: "恋念", extra: "20 阴文·狻猊", sortId: 45 },
        { id: 62, name: "孙策·师子狻猊恋念礼包 3", pts: 1200, limit: 999, draws: 0, priceUsd: 19.99, category: "恋念", extra: "20 阴文·狻猊", sortId: 45 },
        { id: 63, name: "左慈·璃魂月魄恋念礼包 1", pts: 900, limit: 1, draws: 0, priceUsd: 14.99, category: "恋念", extra: "40 阴文·璃魂", sortId: 44 },
        { id: 64, name: "左慈·璃魂月魄恋念礼包 2", pts: 600, limit: 6, draws: 0, priceUsd: 9.99, category: "恋念", extra: "20 阴文·璃魂", sortId: 44 },
        { id: 65, name: "左慈·璃魂月魄恋念礼包 3", pts: 1200, limit: 999, draws: 0, priceUsd: 19.99, category: "恋念", extra: "20 阴文·璃魂", sortId: 44 },
        { id: 66, name: "傅融·湖心之梦恋念礼包 1", pts: 900, limit: 1, draws: 0, priceUsd: 14.99, category: "恋念", extra: "40 阴文·湖心", sortId: 42 },
        { id: 67, name: "傅融·湖心之梦恋念礼包 2", pts: 600, limit: 6, draws: 0, priceUsd: 9.99, category: "恋念", extra: "20 阴文·湖心", sortId: 42 },
        { id: 68, name: "傅融·湖心之梦恋念礼包 3", pts: 1200, limit: 999, draws: 0, priceUsd: 19.99, category: "恋念", extra: "20 阴文·湖心", sortId: 42 },
        { id: 69, name: "孙策·围城恋念礼包 1", pts: 900, limit: 1, draws: 0, priceUsd: 14.99, category: "恋念", extra: "40 阴文·围城", sortId: 45 },
        { id: 70, name: "孙策·围城恋念礼包 2", pts: 600, limit: 6, draws: 0, priceUsd: 9.99, category: "恋念", extra: "20 阴文·围城", sortId: 45 },
        { id: 71, name: "孙策·围城恋念礼包 3", pts: 1200, limit: 999, draws: 0, priceUsd: 19.99, category: "恋念", extra: "20 阴文·围城", sortId: 45 },
        { id: 72, name: "袁基·盛宴恋念礼包 1", pts: 900, limit: 1, draws: 0, priceUsd: 14.99, category: "恋念", extra: "40 阴文·盛宴", sortId: 43 },
        { id: 73, name: "袁基·盛宴恋念礼包 2", pts: 600, limit: 6, draws: 0, priceUsd: 9.99, category: "恋念", extra: "20 阴文·盛宴", sortId: 43 },
        { id: 74, name: "袁基·盛宴恋念礼包 3", pts: 1200, limit: 999, draws: 0, priceUsd: 19.99, category: "恋念", extra: "20 阴文·盛宴", sortId: 43 },
        { id: 75, name: "刘辩·灯之国恋念礼包 1", pts: 900, limit: 1, draws: 0, priceUsd: 14.99, category: "恋念", extra: "40 阴文·灯之国", sortId: 41 },
        { id: 76, name: "刘辩·灯之国恋念礼包 2", pts: 600, limit: 6, draws: 0, priceUsd: 9.99, category: "恋念", extra: "20 阴文·灯之国", sortId: 41 },
        { id: 77, name: "刘辩·灯之国恋念礼包 3", pts: 1200, limit: 999, draws: 0, priceUsd: 19.99, category: "恋念", extra: "20 阴文·灯之国", sortId: 41 },
        { id: 78, name: "左慈·欲追日影恋念礼包 1", pts: 900, limit: 1, draws: 0, priceUsd: 14.99, category: "恋念", extra: "40 阴文·日影", sortId: 44 },
        { id: 79, name: "左慈·欲追日影恋念礼包 2", pts: 600, limit: 6, draws: 0, priceUsd: 9.99, category: "恋念", extra: "20 阴文·日影", sortId: 44 },
        { id: 80, name: "左慈·欲追日影恋念礼包 3", pts: 1200, limit: 999, draws: 0, priceUsd: 19.99, category: "恋念", extra: "20 阴文·日影", sortId: 44 },
        { id: 81, name: "傅融·梦中雪恋念礼包 1", pts: 900, limit: 1, draws: 0, priceUsd: 14.99, category: "恋念", extra: "40 阴文·梦中雪", sortId: 42 },
        { id: 82, name: "傅融·梦中雪恋念礼包 2", pts: 600, limit: 6, draws: 0, priceUsd: 9.99, category: "恋念", extra: "20 阴文·梦中雪", sortId: 42 },
        { id: 83, name: "傅融·梦中雪恋念礼包 3", pts: 1200, limit: 999, draws: 0, priceUsd: 19.99, category: "恋念", extra: "20 阴文·梦中雪", sortId: 42 },
        { id: 84, name: "刘辩·魇恋念礼包 1", pts: 900, limit: 1, draws: 0, priceUsd: 14.99, category: "恋念", extra: "40 阴文·魇", sortId: 41 },
        { id: 85, name: "刘辩·魇恋念礼包 2", pts: 600, limit: 6, draws: 0, priceUsd: 9.99, category: "恋念", extra: "20 阴文·魇", sortId: 41 },
        { id: 86, name: "刘辩·魇恋念礼包 3", pts: 1200, limit: 999, draws: 0, priceUsd: 19.99, category: "恋念", extra: "20 阴文·魇", sortId: 41 },
        { id: 87, name: "密探特训37期", pts: 780, limit: 1, draws: 0, priceUsd: 12.99, category: "超值", sortId: 50 },
        { id: 88, name: "密探特训38期", pts: 780, limit: 1, draws: 0, priceUsd: 12.99, category: "超值", sortId: 50 },
        { id: 89, name: "善恶簿体验包", pts: 60, limit: 2, draws: 0, priceUsd: 0.99, category: "待贤", extra: "10 善恶簿", sortId: 31 },
        { id: 90, name: "善恶簿精选包", pts: 120, limit: 2, draws: 0, priceUsd: 1.99, category: "待贤", extra: "18 善恶簿", sortId: 31 },
        { id: 91, name: "善恶簿高阶包", pts: 360, limit: 2, draws: 0, priceUsd: 5.99, category: "待贤", extra: "35 善恶簿", sortId: 31 },
        { id: 92, name: "善恶簿丰盈包", pts: 1200, limit: 5, draws: 0, priceUsd: 19.99, category: "待贤", extra: "80 善恶簿", sortId: 31 },
        { id: 93, name: "功过格体验包", pts: 120, limit: 2, draws: 0, priceUsd: 1.99, category: "待贤", extra: "10 功过格", sortId: 32 },
        { id: 94, name: "功过格精选包", pts: 300, limit: 2, draws: 0, priceUsd: 4.99, category: "待贤", extra: "18 功过格", sortId: 32 },
        { id: 95, name: "功过格高阶包", pts: 600, limit: 2, draws: 0, priceUsd: 9.99, category: "待贤", extra: "28 功过格", sortId: 32 },
        { id: 96, name: "功过格丰盈包", pts: 1440, limit: 5, draws: 0, priceUsd: 23.99, category: "待贤", extra: "50 功过格", sortId: 32 },
        { id: 97, name: "地宫秘宝", pts: 900, limit: 1, draws: 22, priceUsd: 14.99, category: "超值", sortId: 40 },
        { id: 98, name: "体力体验包", pts: 60, limit: 2, draws: 0, priceUsd: 0.99, category: "待贤", extra: "4 体力", sortId: 33 },
        { id: 99, name: "体力精选包", pts: 180, limit: 2, draws: 0, priceUsd: 2.99, category: "待贤", extra: "8 体力", sortId: 33 },
        { id: 100, name: "体力高阶包", pts: 300, limit: 5, draws: 0, priceUsd: 4.99, category: "待贤", extra: "11 体力", sortId: 33 },
        { id: 101, name: "主线助力", pts: 1200, limit: 2, draws: 0, priceUsd: 19.99, category: "其他", sortId: 50 }
    ],

    // ---------- 如鸢礼包（CNY计价，40个） ----------
    packsRuyuan: [
        { id: 1, name: "年卡", pts: 2480, limit: 1, draws: 180, priceCny: 248, category: "超值", sortId: 10 },
        { id: 3, name: "季卡", pts: 720, limit: 1, draws: 45, priceCny: 72, category: "超值", sortId: 10 },
        { id: 4, name: "广陵金库", pts: 680, limit: 1, draws: 34, priceCny: 68, category: "超值", sortId: 10 },
        { id: 6, name: "卡池超值", pts: 60, limit: 1, draws: 2, priceCny: 6, category: "卡池", sortId: 20 },
        { id: 11, name: "卡池特惠", pts: 300, limit: 1, draws: 5, priceCny: 30, category: "卡池", sortId: 20 },
        { id: 12, name: "卡池初级", pts: 680, limit: 1, draws: 10, priceCny: 68, category: "卡池", sortId: 20 },
        { id: 15, name: "卡池助力", pts: 780, limit: 3, draws: 10, priceCny: 78, category: "卡池", sortId: 20 },
        { id: 16, name: "卡池中级", pts: 1280, limit: 1, draws: 14, priceCny: 128, category: "卡池", sortId: 20 },
        { id: 19, name: "卡池高级", pts: 1980, limit: 1, draws: 18, priceCny: 198, category: "卡池", sortId: 20 },
        { id: 21, name: "卡池特级", pts: 3280, limit: 1, draws: 25, priceCny: 328, category: "卡池", sortId: 20 },
        { id: 23, name: "卡池终极", pts: 6480, limit: 1, draws: 40, priceCny: 648, category: "卡池", sortId: 20 },
        { id: 24, name: "卡池豪华", pts: 6480, limit: 2, draws: 40, priceCny: 648, category: "卡池", sortId: 20 },
        { id: 5, name: "待贤礼包 1", pts: 60, limit: 2, draws: 2, priceCny: 6, category: "待贤", sortId: 30 },
        { id: 7, name: "待贤礼包 1.2", pts: 120, limit: 2, draws: 4, priceCny: 12, category: "待贤", sortId: 30 },
        { id: 8, name: "待贤礼包 2", pts: 180, limit: 3, draws: 5, priceCny: 18, category: "待贤", sortId: 30 },
        { id: 9, name: "待贤礼包 2.1", pts: 300, limit: 3, draws: 8, priceCny: 30, category: "待贤", sortId: 30 },
        { id: 10, name: "待贤礼包 3", pts: 680, limit: 3, draws: 12, priceCny: 68, category: "待贤", sortId: 30 },
        { id: 13, name: "待贤礼包 3.1", pts: 980, limit: 3, draws: 15, priceCny: 98, category: "待贤", sortId: 30 },
        { id: 14, name: "待贤礼包 3.2", pts: 1280, limit: 5, draws: 16, priceCny: 128, category: "待贤", sortId: 30 },
        { id: 17, name: "待贤礼包 3.3", pts: 1980, limit: 5, draws: 20, priceCny: 198, category: "待贤", sortId: 30 },
        { id: 20, name: "待贤礼包 3.4", pts: 3280, limit: 5, draws: 28, priceCny: 328, category: "待贤", sortId: 30 },
        { id: 22, name: "待贤礼包 3.5", pts: 6480, limit: 10, draws: 45, priceCny: 648, category: "待贤", sortId: 30 },
        { id: 31, name: "地宫秘宝", pts: 980, limit: 1, draws: 22, priceCny: 98, category: "超值", sortId: 40 },
        { id: 30, name: "密探特训", pts: 780, limit: 1, draws: 0, priceCny: 78, category: "超值", sortId: 50 },
        { id: 89, name: "善恶簿体验包", pts: 60, limit: 2, draws: 0, priceCny: 6, category: "待贤", extra: "10 善恶簿", sortId: 31 },
        { id: 90, name: "善恶簿精选包", pts: 120, limit: 2, draws: 0, priceCny: 12, category: "待贤", extra: "18 善恶簿", sortId: 31 },
        { id: 91, name: "善恶簿高阶包", pts: 360, limit: 2, draws: 0, priceCny: 36, category: "待贤", extra: "35 善恶簿", sortId: 31 },
        { id: 92, name: "善恶簿丰盈包", pts: 1280, limit: 5, draws: 0, priceCny: 128, category: "待贤", extra: "80 善恶簿", sortId: 31 },
        { id: 93, name: "功过格体验包", pts: 120, limit: 2, draws: 0, priceCny: 12, category: "待贤", extra: "10 功过格", sortId: 32 },
        { id: 94, name: "功过格精选包", pts: 300, limit: 2, draws: 0, priceCny: 30, category: "待贤", extra: "18 功过格", sortId: 32 },
        { id: 95, name: "功过格高阶包", pts: 680, limit: 2, draws: 0, priceCny: 68, category: "待贤", extra: "28 功过格", sortId: 32 },
        { id: 96, name: "功过格丰盈包", pts: 1580, limit: 5, draws: 0, priceCny: 158, category: "待贤", extra: "50 功过格", sortId: 32 },
        { id: 98, name: "体力体验包", pts: 60, limit: 2, draws: 0, priceCny: 6, category: "待贤", extra: "4 体力", sortId: 33 },
        { id: 99, name: "体力精选包", pts: 180, limit: 2, draws: 0, priceCny: 18, category: "待贤", extra: "8 体力", sortId: 33 },
        { id: 100, name: "体力高阶包", pts: 300, limit: 5, draws: 0, priceCny: 30, category: "待贤", extra: "11 体力", sortId: 33 },
        { id: 18, name: "首充双倍 60", pts: 60, limit: 1, draws: 0.6, priceCny: 6, category: "其他", sortId: 50 },
        { id: 25, name: "首充双倍 300", pts: 300, limit: 1, draws: 3, priceCny: 30, category: "其他", sortId: 50 },
        { id: 26, name: "首充双倍 900", pts: 980, limit: 1, draws: 9, priceCny: 98, category: "其他", sortId: 50 },
        { id: 27, name: "首充双倍 1800", pts: 1980, limit: 1, draws: 18, priceCny: 198, category: "其他", sortId: 50 },
        { id: 28, name: "首充双倍 3000", pts: 3280, limit: 1, draws: 30, priceCny: 328, category: "其他", sortId: 50 },
        { id: 29, name: "首充双倍 6000", pts: 6480, limit: 1, draws: 60, priceCny: 648, category: "其他", sortId: 50 }
    ],

    // ---------- 周年限时累充 Track1（14档，截止2026-04-29） ----------
    track1: [
        { pts: 100, rewards: [{ name: '符传', count: 1 }, { name: '五铢钱', count: 100000 }] },
        { pts: 300, rewards: [{ name: '善恶簿', count: 10 }, { name: '兵书残卷', count: 100 }] },
        { pts: 500, rewards: [{ name: '符传', count: 2 }, { name: '白金币', count: 200 }] },
        { pts: 1000, rewards: [{ name: '符传', count: 2 }, { name: '解谪瓶', count: 30 }, { name: '白金币', count: 300 }] },
        { pts: 2400, rewards: [{ name: '功过格', count: 10 }, { name: '防务情报', count: 10 }, { name: '市井情报', count: 10 }] },
        { pts: 5000, rewards: [{ name: '符传', count: 3 }, { name: '节气情报', count: 10 }] },
        { pts: 10000, rewards: [{ name: '符传', count: 3 }, { name: '豪门情报', count: 10 }, { name: '地脉情报', count: 10 }] },
        { pts: 16000, rewards: [{ name: '善恶簿', count: 20 }, { name: '功过格', count: 10 }] },
        { pts: 20000, rewards: [{ name: '符传', count: 5 }, { name: '善恶簿', count: 20 }, { name: '五铢钱', count: 500000 }] },
        { pts: 25000, rewards: [{ name: '密探自选·金蟾', count: 1 }, { name: '善恶簿', count: 20 }, { name: '星图箱', count: 1 }] },
        { pts: 35000, rewards: [{ name: '符传', count: 10 }, { name: '装金玻璃', count: 1 }] },
        { pts: 45000, rewards: [{ name: '符传', count: 10 }, { name: '功过格', count: 10 }, { name: '六韬兵书', count: 10 }] },
        { pts: 55000, rewards: [{ name: '骨算筹', count: 2 }, { name: '金算筹', count: 2 }, { name: '善恶簿', count: 20 }] },
        { pts: 60000, rewards: [{ name: '密探自选·金蟾', count: 1 }, { name: '云中殿（背景）', count: 1 }, { name: '星图箱', count: 2 }] }
    ],

    // ---------- 男主限时累充 Track2（14档，截止联动日历） ----------
    track2: [
        { pts: 150, rewards: [{ name: '符传', count: 1 }, { name: '蒹葭', count: 2 }, { name: '兵书残卷', count: 30 }] },
        { pts: 450, rewards: [{ name: '符传', count: 1 }, { name: '蒹葭', count: 3 }, { name: '兵书残卷', count: 50 }] },
        { pts: 700, rewards: [{ name: '符传', count: 2 }, { name: '五铢钱', count: 30000 }, { name: '兵书残卷', count: 70 }] },
        { pts: 1000, rewards: [{ name: '符传', count: 2 }, { name: '蒹葭', count: 5 }, { name: '体力', count: 40 }] },
        { pts: 1500, rewards: [{ name: '符传', count: 2 }, { name: '蒹葭', count: 5 }, { name: '体力', count: 40 }] },
        { pts: 2000, rewards: [{ name: '符传', count: 3 }, { name: '五铢钱', count: 60000 }, { name: '兵书残卷', count: 10 }] },
        { pts: 3000, rewards: [{ name: '互动道具', count: 1 }, { name: '五铢钱', count: 70000 }, { name: '蒹葭', count: 5 }] },
        { pts: 5000, rewards: [{ name: '紫色星石', count: 1 }, { name: '五铢钱', count: 80000 }, { name: '点头之交', count: 8 }] },
        { pts: 10000, rewards: [{ name: '符传', count: 5 }, { name: '五铢钱', count: 90000 }, { name: '兵书全卷', count: 5 }] },
        { pts: 15000, rewards: [{ name: '橙色星石', count: 1 }, { name: '五铢钱', count: 100000 }, { name: '善恶簿', count: 5 }] },
        { pts: 20000, rewards: [{ name: '鸢记', count: 1 }, { name: '五铢钱', count: 100000 }, { name: '善恶簿', count: 5 }] },
        { pts: 25000, rewards: [{ name: '互动道具', count: 1 }, { name: '五铢钱', count: 150000 }, { name: '倾盖之交', count: 3 }] },
        { pts: 30000, rewards: [{ name: '装金玻璃', count: 1 }, { name: '五铢钱', count: 150000 }, { name: '功过格', count: 2 }] },
        { pts: 35000, rewards: [{ name: '头像框', count: 1 }, { name: '称号', count: 1 }, { name: '六韬兵书', count: 5 }, { name: '五铢钱', count: 200000 }] }
    ],

    // ---------- 鸢起礼盒·三 累充档位 ----------
    rewardTiers: [150000, 300000, 450000, 600000, 750000],
    cumulativeTiers: {
        '万氪礼盒统计': [2000, 5000, 10000],
        '累充池': [1000, 2000, 5000, 10000],
        '鸢起礼盒·三': [150000, 300000, 450000, 600000, 750000]
    }
};

// 当前版本的礼包列表（动态指向）
function getActivePacks(version) {
    return version === 'daihao' ? KRYPTON_DATA.packsDaihao : KRYPTON_DATA.packsRuyuan;
}


// ==============================================================
//  initKrypton v4 — qty-map状态 + 原版卡片 + 购物车 + 粘性栏 + 二级分类修复
// ==============================================================
function initKrypton() {
    console.log('[Krypton] v5 初始化中...');
    try {
        var rechargeDateInput = document.getElementById('rechargeDate');
        var packList = document.getElementById('packList');
        var packCatTabs = document.getElementById('packCatTabs');
        var exchangeRateInput = document.getElementById('exchangeRateInput');
        var packsSummaryTitle = document.getElementById('packsSummaryTitle');
        var cartPanelTitle = document.getElementById('cartPanelTitle');
        var cartItemList = document.getElementById('cartItemList');
        var cartStats = document.getElementById('cartStats');
        var activityPanel = document.getElementById('activityPanel');
        var cartPanel = document.getElementById('cartPanel');
        var activityContainer = document.getElementById('activityContainer');
        var yuanqiContainer = document.getElementById('yuanqiContainer');
        var totalActualPtsEl = document.getElementById('totalActualPts');
        var totalSimulatedPtsEl = document.getElementById('totalSimulatedPts');

        if (!rechargeDateInput || !packList || !cartItemList) { console.error('[Krypton] 缺少关键DOM'); return; }

        // ── 快速导航：仅在“广陵资用案”区域显示 ──
        var navBar = document.getElementById('ziyongQuickNav');
        if (navBar) {
            var scrollTimer = null;
            function updateNavVisibility() {
                var planArea = document.querySelector('.plan-layout');
                if (!planArea) return;
                var rect = planArea.getBoundingClientRect();

                // 只有当该区域进入视口且未完全离开时显示
                if (rect.top < window.innerHeight - 150 && rect.bottom > 100) {
                    navBar.style.setProperty('display', 'flex', 'important');

                    if (window.innerWidth > 860) {
                        // 电脑端：定位至回顶按钮左侧（红框位置）
                        navBar.style.right = '150px';
                        navBar.style.bottom = '30px';
                        navBar.style.left = 'auto';
                        navBar.style.top = 'auto';
                        navBar.style.flexDirection = 'column';
                    } else {
                        // 缩小视图（手机端）：恢复到底部横向排列，不随电脑端变动
                        navBar.style.left = '15px';
                        navBar.style.right = '15px';
                        navBar.style.bottom = '20px';
                        navBar.style.top = 'auto';
                        navBar.style.flexDirection = 'row';
                    }
                } else {
                    navBar.style.setProperty('display', 'none', 'important');
                }
            }
            window.addEventListener('scroll', function () {
                if (scrollTimer) clearTimeout(scrollTimer);
                scrollTimer = setTimeout(updateNavVisibility, 10);
            }, { passive: true });
            window.addEventListener('resize', updateNavVisibility);
            updateNavVisibility();
        }

        // ── 快速导航监听 (性能与跨设备兼容性优化) ──
        document.querySelectorAll('.nav-jump-btn').forEach(function (btn) {
            btn.onclick = function (e) {
                e.preventDefault(); e.stopPropagation();
                var tid = btn.dataset.target,
                    target = document.getElementById(tid),
                    rightCol = document.querySelector('.right-column');
                if (!target) return;

                if (window.innerWidth <= 860) {
                    // 手机端：全屏滚动到目标位置 (因为此时面板在下方且页面较长)
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    // 电脑端：精准内部局部滚动 (不惊动外层页面滚动)
                    if (rightCol) {
                        var scrollPos = target.getBoundingClientRect().top - rightCol.getBoundingClientRect().top + rightCol.scrollTop;
                        rightCol.scrollTo({ top: scrollPos - 10, behavior: 'smooth' });
                    }
                }
            };
        });

        // ── 状态 ──
        window.currentVersion = 'daihao';
        var exchangeRate = parseFloat(localStorage.getItem('ziyong_exchangeRate')) || 7.2;
        var eventsData = [];
        var animStates = {};
        var activeCategory = '全部';
        var drawFilter = 'all';
        var collapsedCats = {};
        var collapsedSubCats = {}; // key = "category|subCategory" → bool
        // qty-map: key = "packName|YYYY-MM-DD" → count
        var simQtyMap = {};
        var actQtyMap = {};
        var prevCartQtys = {}; // 记录上个周期的购物车数量，用于触发动画

        // ── 工具 ──
        function normDate(d) { return d ? d.replace(/\//g, '-').split('T')[0] : ''; }
        function getInclusiveEnd(d) {
            if (!d) return '';
            var date = new Date(d.replace(/-/g, '/'));
            date.setDate(date.getDate() - 1);
            var y = date.getFullYear(), m = String(date.getMonth() + 1).padStart(2, '0'), dd = String(date.getDate()).padStart(2, '0');
            return y + '-' + m + '-' + dd;
        }

        function getRemainingTime(endStr) {
            if (!endStr) return '';
            var diff = new Date(endStr.replace(/-/g, '/')).getTime() - new Date().getTime();
            if (diff <= 0) return '<span style="color:#b0998f">已结束</span>';
            var days = Math.floor(diff / 86400000), hours = Math.floor((diff % 86400000) / 3600000);
            return '<span style="color:#d88a2e">剩余: ' + days + '天 ' + hours + '小时</span>';
        }

        function renderRewardPopupHtml(track, title, curA, curS) {
            if (!track || !track.length) return '';
            var maxA = -1, maxS = -1;
            track.forEach(function (t, i) {
                if (curA >= t.pts) maxA = i;
                if (curS >= t.pts) maxS = i;
            });

            var h = '<div class="reward-popup"><div class="reward-popup-title">' + title + ' 奖励清单</div>';
            h += '<div class="reward-popup-container" style="position:relative; padding-left:14px;">';
            // 垂直进度轴
            h += '<div class="reward-v-path"></div>';
            if (maxS >= 0) h += '<div class="reward-v-fill sim" style="height:' + ((maxS + 0.5) / track.length * 100) + '%"></div>';
            if (maxA >= 0) h += '<div class="reward-v-fill act" style="height:' + ((maxA + 0.5) / track.length * 100) + '%"></div>';

            track.forEach(function (t, i) {
                var rStr = t.rewards.map(function (r) { return r.name + '×' + r.count; }).join('、');
                var isAct = i <= maxA, isSim = i <= maxS;
                var cls = isAct ? ' reached-act' : (isSim ? ' reached-sim' : '');
                h += '<div class="reward-popup-row' + cls + '"><span class="reward-popup-pts">' + t.pts.toLocaleString() + '</span><span class="reward-popup-items">' + rStr + '</span></div>';
            });
            h += '</div></div>';
            return h;
        }

        function animateValue(el, start, end, dur) {
            var t0 = null;
            function step(ts) {
                if (!t0) t0 = ts;
                var p = Math.min((ts - t0) / dur, 1), e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
                el.innerText = Math.floor(e * (end - start) + start).toLocaleString();
                if (p < 1) requestAnimationFrame(step); else el.innerText = end.toLocaleString();
            }
            requestAnimationFrame(step);
        }
        function setAnimVal(el, v) {
            if (!el) return;
            var k = el.id || el.className;
            var old = (animStates[k] !== undefined) ? animStates[k] : 0;
            animStates[k] = v;
            if (old !== v) {
                animateValue(el, old, v, 600);
                // 弹动效果 (Scale Pop)
                el.classList.remove('pts-pop'); void el.offsetWidth; el.classList.add('pts-pop');
            } else {
                el.innerText = v.toLocaleString();
            }
        }
        function showFloatingPts(x, y, val) {
            var f = document.createElement('div'); f.className = 'floating-pts';
            f.style.left = x + 'px'; f.style.top = y + 'px';
            f.innerText = (val >= 0 ? '+' : '') + val;
            document.body.appendChild(f);
            setTimeout(function () { f.remove(); }, 800);
        }
        function setAnimFloat(el, v, prefix, suffix, fix) {
            if (!el) return;
            var k = el.id || el.className;
            var old = (animStates[k] !== undefined) ? animStates[k] : 0;
            animStates[k] = v; fix = fix || 0;
            if (Math.abs(old - v) < 0.001) { el.innerText = (prefix || '') + v.toFixed(fix) + (suffix || ''); return; }
            var t0 = null;
            function step(ts) {
                if (!t0) t0 = ts; var p = Math.min((ts - t0) / 600, 1), e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
                var cur = e * (v - old) + old; el.innerText = (prefix || '') + cur.toFixed(fix) + (suffix || '');
                if (p < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
        }
        function getPackCny(pack) {
            if (currentVersion !== 'daihao') return (pack.priceCny || 0);
            return (pack.priceUsd || 0) * exchangeRate;
        }
        function qKey(name, date) { return name + '|' + date; }
        function getSQ(name, date) { return simQtyMap[qKey(name, date)] || 0; }
        function getAQ(name, date) { return actQtyMap[qKey(name, date)] || 0; }

        // ── qty操作 ──
        function addSim(pack, date, silent) {
            var k = qKey(pack.name, date), lim = pack.limit || 1;
            var sq = simQtyMap[k] || 0, aq = actQtyMap[k] || 0;
            if ((sq + aq) < lim) {
                simQtyMap[k] = sq + 1;
                if (!silent) updateAll();
            }
        }
        function removeSim(pack, date, silent) {
            var k = qKey(pack.name, date), cur = simQtyMap[k] || 0;
            if (cur > 0) {
                simQtyMap[k] = cur - 1;
                if (!simQtyMap[k]) delete simQtyMap[k];
                if (!silent) updateAll();
            }
        }
        // toggleActual function removed as card-check has been removed and bulk checkout is used

        // ── 积分计算器 —— 鸢起礼盒专用档位 ──

        function getActivePacks(ver) {
            return ver === 'daihao' ? KRYPTON_DATA.packsDaihao :
                ver === 'ruyuan' ? KRYPTON_DATA.packsRuyuan : [];
        }

        function calcMapPts(qmap) {
            var packs = getActivePacks(currentVersion), total = 0;
            Object.keys(qmap).forEach(function (k) {
                var qty = qmap[k]; if (!qty) return;
                var nm = k.split('|')[0];
                for (var i = 0; i < packs.length; i++) { if (packs[i].name === nm) { total += packs[i].pts * qty; break; } }
            });
            return total;
        }
        function calcRangePts(qmap, s, e) {
            var packs = getActivePacks(currentVersion), total = 0;
            Object.keys(qmap).forEach(function (k) {
                var qty = qmap[k]; if (!qty) return;
                var parts = k.split('|'), nm = parts[0], d = parts[1];
                if (d >= s && d <= e) {
                    for (var i = 0; i < packs.length; i++) { if (packs[i].name === nm) { total += packs[i].pts * qty; break; } }
                }
            });
            return total;
        }
        function getBasePts() {
            var sb = JSON.parse(localStorage.getItem('ziyong_events_base') || '{}'), tot = 0;
            Object.keys(sb).forEach(function (k) { tot += (parseInt(sb[k]) || 0); });
            return tot;
        }

        // ── 存储 ──
        function saveState() {
            localStorage.setItem('ziyong_simQty', JSON.stringify(simQtyMap));
            localStorage.setItem('ziyong_actQty', JSON.stringify(actQtyMap));
        }
        function loadState() {
            var s = localStorage.getItem('ziyong_simQty'), a = localStorage.getItem('ziyong_actQty');
            if (s) simQtyMap = JSON.parse(s);
            if (a) actQtyMap = JSON.parse(a);
            if (!s) { // 兼容旧格式
                var olds = localStorage.getItem('ziyong_simulated'), olda = localStorage.getItem('ziyong_actual');
                if (olds) JSON.parse(olds).forEach(function (h) { var k = qKey(h.name, normDate(h.date)); simQtyMap[k] = (simQtyMap[k] || 0) + 1; });
                if (olda) JSON.parse(olda).forEach(function (h) { var k = qKey(h.name, normDate(h.date)); actQtyMap[k] = (actQtyMap[k] || 0) + 1; });
            }
        }

        var now = new Date();
        var todayStr = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
        rechargeDateInput.value = todayStr;

        function updateRate(val) {
            exchangeRate = parseFloat(val) || 7.2;
            if (exchangeRateInput) exchangeRateInput.value = val;
            localStorage.setItem('ziyong_exchangeRate', val);
            renderPacks(); renderCart();
        }
        function fetchExchangeRate() {
            var btn = document.getElementById('syncRateBtn');
            var timeMsg = document.getElementById('syncTimeMsg');
            var dataDateEl = document.getElementById('syncDataDate');
            if (btn) btn.classList.add('syncing');

            // 再次优化 API 列表：Coinbase 拥有最高精度(5位)与实时性，优先使用
            var apis = [
                { url: 'https://api.coinbase.com/v2/exchange-rates?currency=USD', type: 'coinbase' },
                { url: 'https://api.pearktrue.cn/api/exchangerate/?type=get&before=USD&after=CNY&price=1', type: 'pearktrue' },
                { url: 'https://open.er-api.com/v6/latest/USD', type: 'er-v6' },
                { url: 'https://api.exchangerate-api.com/v4/latest/USD', type: 'er-v4' }
            ];

            function tryFetch(index) {
                if (index >= apis.length) {
                    if (btn) btn.classList.remove('syncing');
                    alert('⚠️ 汇率同步失败：所有接口均暂时无法连接。\n提示：如果是本地打开（file://），请检查网络或更换浏览器。');
                    return;
                }

                var api = apis[index];
                console.log('[Krypton] 正在尝试从 ' + api.type + ' 获取高精度汇率...');

                // 添加随机数防止缓存
                var fetchUrl = api.url + (api.url.indexOf('?') > -1 ? '&' : '?') + '_t=' + Date.now();

                fetch(fetchUrl, { cache: 'no-cache' })
                    .then(function (r) { if (!r.ok) throw new Error(); return r.json(); })
                    .then(function (d) {
                        var r, dateStr = '';
                        // 针对不同 API 格式的动态适配
                        if (api.type === 'coinbase') {
                            r = parseFloat(d.data.rates.CNY);
                            dateStr = '实时市场价';
                        } else if (api.type === 'pearktrue') {
                            r = parseFloat(d.resultprice);
                            dateStr = '国内镜像';
                        } else if (api.type === 'er-v6') {
                            r = d.rates.CNY;
                            dateStr = d.time_last_update_utc ? d.time_last_update_utc.substring(5, 16) : '';
                        } else if (api.type === 'er-v4') {
                            r = d.rates.CNY;
                            dateStr = d.date;
                        }

                        if (r && !isNaN(r)) {
                            console.log('[Krypton] 汇率同步成功(' + api.type + '):', r);
                            updateRate(r.toFixed(4));

                            if (btn) {
                                btn.classList.remove('syncing');
                                btn.classList.add('success');
                                setTimeout(function () { btn.classList.remove('success'); }, 1000);
                            }
                            if (timeMsg) {
                                var now = new Date();
                                timeMsg.innerText = '同步于: ' + (now.getMonth() + 1) + '/' + now.getDate() + ' ' + now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
                            }
                            if (dataDateEl) {
                                // 检查是否有明显的节假日延迟（针对 2026-04-03 这种周末/休市情况）
                                if (dateStr && dateStr.includes('2026-04-03')) {
                                    dataDateEl.innerHTML = '<span style="color:#d85c50">(数据日期: ' + dateStr + ', 银行休市中)</span>';
                                } else {
                                    dataDateEl.innerText = dateStr ? '(数据日期: ' + dateStr + ')' : '';
                                }
                            }
                        } else {
                            throw new Error();
                        }
                    })
                    .catch(function (err) {
                        console.warn('[Krypton] ' + api.type + ' 接口失败，尝试切换下一个...', err);
                        tryFetch(index + 1);
                    });
            }

            tryFetch(0);
        }

        var syncRateBtn = document.getElementById('syncRateBtn');
        if (syncRateBtn) syncRateBtn.onclick = function (e) { e.stopPropagation(); fetchExchangeRate(); };
        if (exchangeRateInput) exchangeRateInput.addEventListener('input', function (e) { updateRate(e.target.value); });

        function syncVersion(ver) {
            window.currentVersion = ver;
            var rg = document.getElementById('rateInputGroup');
            if (rg) rg.style.display = ver === 'daihao' ? '' : 'none';
            
            // 同步下拉框显示文本
            var vToggle = document.getElementById('versionToggle');
            if (vToggle) {
                var s = vToggle.querySelector('.select-selected');
                var items = vToggle.querySelectorAll('.select-items div');
                items.forEach(function(it) {
                    if (it.dataset.val === ver) {
                        if (s) s.innerText = it.innerText;
                        it.classList.add('active');
                    } else {
                        it.classList.remove('active');
                    }
                });
            }

            var tv = ver === 'daihao' ? 'usd' : 'rmb';
            document.querySelectorAll('#currencyToggleWrapper .currency-tab').forEach(function (d) {
                if (d.dataset.val === tv) d.click();
            });
            activeCategory = '全部';
            renderPackCatTabs();
            renderPacks();
            // 同时更新日历
            if (window.calendar) window.calendar.refetchEvents();
        }
        // ── 统一全局下拉框逻辑 ──
        function setupSelect(id, onSelect) {
            var select = document.getElementById(id);
            if (!select) return;
            var selected = select.querySelector('.select-selected');
            var items = select.querySelectorAll('.select-items div');
            
            if (selected) {
                selected.onclick = function(e) {
                    e.stopPropagation();
                    var isOpen = select.classList.contains('open');
                    document.querySelectorAll('.custom-select').forEach(function(s) { s.classList.remove('open'); });
                    if (!isOpen) select.classList.add('open');
                };
            }
            
            items.forEach(function(item) {
                item.onclick = function(e) {
                    e.stopPropagation();
                    var val = item.dataset.val;
                    if (selected) selected.innerText = item.innerText;
                    items.forEach(function(i) { i.classList.remove('active'); });
                    item.classList.add('active');
                    if (onSelect) onSelect(val);
                    select.classList.remove('open');
                };
            });
        }

        setupSelect('versionToggle', syncVersion);
        setupSelect('currencyToggle', function(val) {
            if (window.renderMappingTable) window.renderMappingTable(val);
        });

        // 点击外部关闭所有下拉
        document.addEventListener('click', function() {
            document.querySelectorAll('.custom-select').forEach(function(s) { s.classList.remove('open'); });
        });

        // ── Tab ──
        document.querySelectorAll('.ziyong-tab').forEach(function (tab) {
            tab.onclick = function () {
                var t = tab.dataset.tab;
                document.querySelectorAll('.ziyong-tab').forEach(function (x) { x.classList.remove('active'); });
                tab.classList.add('active');
                document.querySelectorAll('.tab-content').forEach(function (c) {
                    c.classList.remove('active');
                    if (c.id === 'ziyong-' + t + '-content') c.classList.add('active');
                });
                if (t === 'records') updateRecordsTable();
            };
        });



        // ── 事件加载 ──
        function loadEvents() {
            if (window.calendar) {
                eventsData = window.calendar.getEvents().map(function (e) {
                    return { title: e.title, start: normDate(e.startStr), end: normDate(e.endStr || e.startStr), type: e.extendedProps ? e.extendedProps.type : null };
                });
            } else {
                eventsData = [].concat(window.daihaoEvents || [], window.ruyuanEvents || []).map(function (e) {
                    return { title: e.title, start: normDate(e.start), end: normDate(e.end), type: e.type };
                });
            }
            updateAll();
        }

        // ── 分类Tab（主栏+粘性栏同步） ──
        function renderPackCatTabs() {
            var packs = getActivePacks(window.currentVersion), cats = ['全部'], seen = {};
            packs.forEach(function (p) { if (!seen[p.category]) { seen[p.category] = true; cats.push(p.category); } });
            function buildTabs(container) {
                if (!container) return;
                container.innerHTML = '';
                cats.forEach(function (cat) {
                    var btn = document.createElement('button');
                    btn.className = 'pack-cat-btn' + (cat === activeCategory ? ' active' : '');
                    btn.textContent = cat;
                    btn.onclick = function () {
                        if (activeCategory === cat) return;
                        activeCategory = cat;
                        // 自动展开目标分类
                        if (cat !== '全部') collapsedCats[cat] = false;

                        packList.style.transition = 'opacity .18s ease, transform .18s ease';
                        packList.style.opacity = '0.3'; packList.style.transform = 'translateY(5px)';

                        setTimeout(function () {
                            renderPackCatTabs(); renderPacks();
                            requestAnimationFrame(function () {
                                packList.style.opacity = '1';
                                packList.style.transform = 'translateY(0)';
                                // 丝滑滚动到列表顶部或分类标题
                                var target = packList.querySelector('.category-header') || packList;
                                var offset = 180; // 考虑粘贴栏高度的偏移量
                                var topPos = target.getBoundingClientRect().top + window.pageYOffset - offset;
                                window.scrollTo({ top: topPos, behavior: 'smooth' });
                            });
                        }, 180);
                    };
                    container.appendChild(btn);
                });
            }
            buildTabs(packCatTabs);
        }

        // 含抽/无抽 筛选
        document.querySelectorAll('#packDrawFilter .draw-filter-btn').forEach(function (btn) {
            btn.onclick = function () {
                drawFilter = btn.dataset.filter;
                document.querySelectorAll('#packDrawFilter .draw-filter-btn').forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                packList.style.transition = 'opacity .15s ease'; packList.style.opacity = '0.3';
                setTimeout(function () { renderPacks(); packList.style.opacity = '1'; }, 150);
            };
        });

        // ── 礼包渲染（原版卡片 + -/+ qty控件 + √ + FLIP + 排序） ──
        function renderPacks() {
            if (!packList) return;
            var allPacks = getActivePacks(currentVersion);
            var date = normDate(rechargeDateInput.value);
            var activeActTitles = eventsData.filter(function (e) { return date >= e.start && date <= e.end; }).map(function (e) { return e.title; });

            var filtered = allPacks.filter(function (p) {
                var catOk = activeCategory === '全部' || p.category === activeCategory;
                var drawOk = drawFilter === 'all' || (drawFilter === 'hasDraws' && p.draws > 0) || (drawFilter === 'noDraws' && (!p.draws || p.draws <= 0));
                return catOk && drawOk;
            });
            if (packsSummaryTitle) packsSummaryTitle.textContent = '礼包汇总 (' + filtered.length + ')';

            // FLIP记录
            var initPos = {};
            packList.querySelectorAll('.ziyong-card').forEach(function (c) { if (c.dataset.cid) initPos[c.dataset.cid] = c.getBoundingClientRect(); });

            // 分组
            var groups = {}, order = [];
            filtered.forEach(function (p) { if (!groups[p.category]) { groups[p.category] = []; order.push(p.category); } groups[p.category].push(p); });
            packList.innerHTML = '';
            if (!filtered.length) { packList.innerHTML = '<div class="no-activity">当前筛选无礼包</div>'; return; }

            order.forEach(function (cat) {
                var catPacks = groups[cat], isCollapsed = !!collapsedCats[cat];
                // 已满限购的排到末尾
                catPacks.sort(function (a, b) {
                    var al = getAQ(a.name, date) >= (a.limit || 1), bl = getAQ(b.name, date) >= (b.limit || 1);
                    return al && !bl ? 1 : !al && bl ? -1 : 0;
                });
                var sec = document.createElement('div'); sec.className = 'pack-category-section' + (isCollapsed ? ' collapsed' : '');
                var hdr = document.createElement('div'); hdr.className = 'category-header';
                hdr.innerHTML = '<div class="cat-title-row"><h3 class="category-title">' + cat + '</h3><span class="cat-toggle-icon">' + (isCollapsed ? '展开 ▼' : '收起 ▲') + '</span></div>' +
                    '<div class="category-actions"><button class="cat-btn cat-selall">全选</button><button class="cat-btn cat-clr">清空</button></div>';

                var wrapper = document.createElement('div'); wrapper.className = 'category-content-wrapper' + (isCollapsed ? ' collapsed' : '');
                var inner = document.createElement('div'); inner.className = 'category-content-inner';
                var grid = document.createElement('div'); grid.className = 'category-grid';

                inner.appendChild(grid);
                wrapper.appendChild(inner);

                // 渲染卡片 (提取为内部函数)
                function renderCard(p, targetGrid) {
                    var cid = p.category + '-' + p.id;
                    var sq = getSQ(p.name, date), aq = getAQ(p.name, date), lim = p.limit || 1;
                    var maxed = (aq + sq) >= lim, cny = getPackCny(p);
                    var perDraw = p.draws > 0 ? (cny / p.draws).toFixed(2) : null;

                    var isPackInAct = !p.boundActivity || activeActTitles.some(function (t) { return t.toLowerCase().includes((p.boundActivity || '').toLowerCase()); });
                    var fullyBought = aq >= lim;
                    var card = document.createElement('div');
                    card.className = 'ziyong-card'; card.dataset.cid = cid;
                    if (fullyBought) card.classList.add('actual');
                    else if (sq > 0) card.classList.add('simulated');
                    if (fullyBought) card.classList.add('limit-reached');
                    if (!isPackInAct) card.classList.add('disabled');

                    var cnySmallStr = currentVersion === 'daihao' && p.priceUsd ? ' <span class="cny-small-val"></span>' : '';

                    card.innerHTML =
                        '<div class="card-body">' +
                        '  <div class="card-name">' + p.name + '</div>' +
                        '  <div class="card-price"><span class="price-val"></span>' + cnySmallStr + '</div>' +
                        '  <div class="card-pts">' + p.pts + ' 积分</div>' +
                        '<div class="card-detail-row">' +
                        (p.draws > 0 ? '<div class="card-extra">' + p.draws + ' 抽</div>' : '') +
                        (p.extra ? '<div class="card-extra">' + p.extra + '</div>' : '') +
                        '</div>' +
                        (perDraw ? '<div class="card-eff"></div>' : '') +
                        '</div>' +
                        '<div class="card-bottom">' +
                        '  <span class="card-limit-txt" style="color:' + (maxed ? '#d85c50' : '#a08060') + '">' + (aq + sq) + '/' + lim + '</span>' +
                        '  <div class="card-qty-ctrl">' +
                        '    <span class="qty-btn qty-min" ' + (sq <= 0 ? 'disabled' : '') + '>少</span>' +
                        '    <span class="qty-btn qty-minus" ' + (sq <= 0 ? 'disabled' : '') + '>−</span>' +
                        '    <span class="qty-num">' + sq + '</span>' +
                        '    <span class="qty-btn qty-plus"  ' + (maxed ? 'disabled' : '') + '>＋</span>' +
                        '    <span class="qty-btn qty-max" ' + (maxed ? 'disabled' : '') + '>多</span>' +
                        '  </div>' +
                        '</div>';

                    var pval = card.querySelector('.price-val');
                    if (pval) {
                        pval.id = 'p-' + cid;
                        var isUsd = currentVersion === 'daihao' && p.priceUsd;
                        setAnimFloat(pval, isUsd ? p.priceUsd : cny, (isUsd ? '$' : '¥'), '', 2);
                    }
                    var csval = card.querySelector('.cny-small-val');
                    if (csval) { csval.id = 'cs-' + cid; setAnimFloat(csval, cny, '≈¥', '', 0); }
                    var eval_ = card.querySelector('.card-eff');
                    if (eval_) { eval_.id = 'e-' + cid; setAnimFloat(eval_, parseFloat(perDraw), '', ' 元/抽', 2); }

                    card.querySelector('.card-body').addEventListener('click', function (e) {
                        if (!isPackInAct) return;
                        if (aq + sq >= lim) {
                            delete simQtyMap[qKey(p.name, date)];
                            updateAll(true, p.name);
                        } else {
                            addSim(p, date, true); // 使用 silent 模式，由 updateAll 手动触发快速更新
                            updateAll(true, p.name);
                            showFloatingPts(e.pageX, e.pageY - 20, p.pts);
                        }
                    });
                    var minusBtn = card.querySelector('.qty-minus');
                    if (sq > 0) minusBtn.onclick = function (e) {
                        e.stopPropagation();
                        if (sq === 1) {
                            animateCartRowsExit([p.name], function () {
                                removeSim(p, date, true);
                                updateAll(true, p.name);
                                showFloatingPts(e.pageX, e.pageY - 20, -p.pts);
                            });
                        } else {
                            removeSim(p, date, true);
                            updateAll(true, p.name);
                            showFloatingPts(e.pageX, e.pageY - 20, -p.pts);
                        }
                    };
                    var plusBtn = card.querySelector('.qty-plus');
                    if (!maxed) plusBtn.onclick = function (e) {
                        e.stopPropagation();
                        addSim(p, date, true);
                        updateAll(true, p.name);
                        showFloatingPts(e.pageX, e.pageY - 20, p.pts);
                    };
                    var minBtn = card.querySelector('.qty-min');
                    if (sq > 0) minBtn.onclick = function (e) {
                        e.stopPropagation();
                        var pts = -sq * p.pts;
                        animateCartRowsExit([p.name], function () {
                            delete simQtyMap[qKey(p.name, date)];
                            updateAll(true, p.name);
                            showFloatingPts(e.pageX, e.pageY - 20, pts);
                        });
                    };
                    var maxBtn = card.querySelector('.qty-max');
                    if (!maxed) maxBtn.onclick = function (e) {
                        e.stopPropagation();
                        var pts = (lim - aq - sq) * p.pts;
                        simQtyMap[qKey(p.name, date)] = (lim - aq);
                        updateAll(true, p.name);
                        showFloatingPts(e.pageX, e.pageY - 20, pts);
                    };
                    targetGrid.appendChild(card);
                }

                if (['待贤', '恋念'].includes(cat)) {
                    // 通用的二级分组逻辑
                    var subGroups = {}, subOrder = [];
                    var subNames = {
                        '30': '天机符传', '31': '善恶簿', '32': '功过格', '33': '体力',
                        '41': '刘辩', '42': '傅融', '43': '袁基', '44': '左慈', '45': '孙策'
                    };
                    catPacks.forEach(function (p) {
                        var sid = String(p.sortId || (cat === '待贤' ? 30 : 40));
                        if (!subGroups[sid]) { subGroups[sid] = []; subOrder.push(sid); }
                        subGroups[sid].push(p);
                    });
                    subOrder.sort();
                    subOrder.forEach(function (sid) {
                        var subName = subNames[sid] || '其他';
                        var skey = cat + '|' + subName;
                        var subIsCollapsed = !!collapsedSubCats[skey];
                        var subGroupPacks = subGroups[sid];

                        var subSec = document.createElement('div');
                        subSec.className = 'sub-category-section' + (subIsCollapsed ? ' collapsed' : '');

                        var subHdr = document.createElement('div');
                        subHdr.className = 'sub-category-header';
                        subHdr.innerHTML = '<div class="sub-title-row"><span class="sub-title-text">' + subName + '</span><span class="sub-toggle-icon">' + (subIsCollapsed ? '展开 ▼' : '收起 ▲') + '</span></div>' +
                            '<div class="sub-category-actions"><button class="sub-cat-btn sub-selall">全选</button><button class="sub-cat-btn sub-clr">清空</button></div>';

                        var subWrapper = document.createElement('div');
                        subWrapper.className = 'sub-category-content-wrapper' + (subIsCollapsed ? ' collapsed' : '');
                        var subInner = document.createElement('div');
                        subInner.className = 'sub-category-content-inner';
                        var subGrid = document.createElement('div');
                        subGrid.className = 'category-grid';

                        subInner.appendChild(subGrid);
                        subWrapper.appendChild(subInner);

                        subGroupPacks.forEach(function (p) { renderCard(p, subGrid); });

                        // 子分类头点击折叠逻辑
                        subHdr.onclick = function () {
                            collapsedSubCats[skey] = !collapsedSubCats[skey];
                            var cur = collapsedSubCats[skey];
                            subSec.classList.toggle('collapsed', cur);
                            subWrapper.classList.toggle('collapsed', cur);
                            subHdr.querySelector('.sub-toggle-icon').textContent = cur ? '展开 ▼' : '收起 ▲';
                        };
                        subHdr.querySelector('.sub-selall').onclick = function (e) {
                            e.stopPropagation();
                            var totalAddedPts = 0;
                            subGroupPacks.forEach(function (p) {
                                if (getSQ(p.name, date) < (p.limit || 1)) {
                                    addSim(p, date, true);
                                    totalAddedPts += p.pts;
                                }
                            });
                            if (totalAddedPts > 0) {
                                updateAll(true);
                                showFloatingPts(e.pageX, e.pageY - 20, totalAddedPts);
                            }
                        };
                        subHdr.querySelector('.sub-clr').onclick = function (e) {
                            e.stopPropagation();
                            var names = subGroupPacks.map(function (p) { return p.name; });
                            animateCartRowsExit(names, function () {
                                subGroupPacks.forEach(function (p) {
                                    var k = qKey(p.name, date);
                                    if (simQtyMap[k]) delete simQtyMap[k];
                                });
                                updateAll(true);
                            });
                        };

                        subSec.appendChild(subHdr);
                        subSec.appendChild(subWrapper);
                        grid.appendChild(subSec);
                    });
                } else {
                    catPacks.forEach(function (p) { renderCard(p, grid); });
                }


                // 分类头事件
                // 分类栏整体点击折叠
                hdr.onclick = function () {
                    collapsedCats[cat] = !collapsedCats[cat];
                    var cur = collapsedCats[cat];
                    sec.classList.toggle('collapsed', cur);
                    wrapper.classList.toggle('collapsed', cur);
                    hdr.querySelector('.cat-toggle-icon').textContent = cur ? '展开 ▼' : '收起 ▲';
                };
                hdr.querySelector('.cat-selall').onclick = function (e) {
                    e.stopPropagation();
                    var totalAddedPts = 0;
                    catPacks.forEach(function (p) {
                        if (getSQ(p.name, date) < (p.limit || 1)) {
                            addSim(p, date, true);
                            totalAddedPts += p.pts;
                        }
                    });
                    if (totalAddedPts > 0) {
                        updateAll(true);
                        showFloatingPts(e.pageX, e.pageY - 20, totalAddedPts);
                    }
                };
                hdr.querySelector('.cat-clr').onclick = function (e) {
                    e.stopPropagation();
                    var names = catPacks.map(function (p) { return p.name; });
                    animateCartRowsExit(names, function () {
                        catPacks.forEach(function (p) {
                            var k = qKey(p.name, date);
                            if (simQtyMap[k]) delete simQtyMap[k];
                        });
                        updateAll(true);
                    });
                };

                sec.appendChild(hdr); sec.appendChild(wrapper); packList.appendChild(sec);
            });

            // FLIP动画
            requestAnimationFrame(function () {
                var anim = false;
                packList.querySelectorAll('.ziyong-card').forEach(function (c) {
                    var old = initPos[c.dataset.cid]; if (!old) return;
                    var nx = c.getBoundingClientRect(), dx = old.left - nx.left, dy = old.top - nx.top;
                    if (dx || dy) {
                        anim = true;
                        c.style.transition = 'none'; c.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
                        c.offsetHeight;
                        c.style.transition = 'transform .45s cubic-bezier(0.4,0,0.2,1),background-color .3s,border-color .3s';
                        c.style.transform = ''; setTimeout(function () { c.style.transition = ''; }, 450);
                    }
                });
                if (anim) { packList.style.pointerEvents = 'none'; setTimeout(function () { packList.style.pointerEvents = ''; }, 450); }
            });
        }

        // ── 移除动画辅助 ──
        function animateCartRowsExit(names, callback) {
            var rowsToAnimate = [];
            cartItemList.querySelectorAll('.cart-row').forEach(function (r) {
                var rName = r.querySelector('.cart-row-name').innerText;
                if (names.indexOf(rName) !== -1) rowsToAnimate.push(r);
            });

            if (rowsToAnimate.length > 0) {
                rowsToAnimate.forEach(function (r) { r.classList.add('cart-row-exit'); });
                setTimeout(callback, 250);
            } else {
                callback();
            }
        }

        // ── 购物清单（右栏下方） ──
        function renderCart() {
            if (!cartItemList) return;
            var date = normDate(rechargeDateInput.value), allPacks = getActivePacks(currentVersion);
            var items = [], totalDraws = 0, totalCny = 0, totalUsd = 0, totalPts = 0;
            allPacks.forEach(function (p) {
                var sq = getSQ(p.name, date); if (!sq) return;
                var cny = getPackCny(p) * sq;
                var usd = (p.priceUsd || 0) * sq;
                totalDraws += (p.draws || 0) * sq; totalCny += cny; totalUsd += usd; totalPts += p.pts * sq;
                items.push({ p: p, sq: sq, cny: cny, usd: usd });
            });
            var currentCartQtys = {};
            if (!items.length) {
                cartItemList.innerHTML = '<div class="cart-empty-msg" style="padding:15px; color:#a08060; text-align:center;">尚未选购礼包</div>';
                if (cartStats) cartStats.style.display = 'none';
                var div = document.getElementById('activitySectionDivider');
                if (div) div.style.display = 'none';
            } else {
                cartItemList.innerHTML = items.map(function (ci) {
                    currentCartQtys[ci.p.name] = ci.sq;
                    var isNew = ci.sq > (prevCartQtys[ci.p.name] || 0);
                    var animClass = isNew ? ' cart-row-animate' : '';

                    var isDaihaoUsd = currentVersion === 'daihao' && ci.p.priceUsd;
                    var priceStr = isDaihaoUsd ? '$' + (ci.p.priceUsd * ci.sq).toFixed(2) : '¥' + ci.cny.toFixed(2);
                    var secondaryPriceHtml = isDaihaoUsd ? '<div class="cart-row-price-cny" style="font-size:14px; color:#a82e2e; font-weight:700;">¥' + ci.cny.toFixed(2) + '</div>' : '';
                    var unitPrice = isDaihaoUsd ? '$' + ci.p.priceUsd : '¥' + getPackCny(ci.p).toFixed(2);

                    return '<div class="cart-row' + animClass + '" style="gap:4px;">' +
                        '<div class="cart-row-top" style="display:flex; justify-content:space-between; align-items:baseline;">' +
                        '  <span class="cart-row-name">' + ci.p.name + '</span>' +
                        '  <span class="cart-row-price" style="font-size:14px; font-weight:700;">' + priceStr + '</span>' +
                        '</div>' +
                        '<div class="cart-row-bottom" style="display:flex; justify-content:space-between; align-items:baseline;">' +
                        '  <span class="cart-row-sub" style="font-size:12px; color:#8d7365;">' + unitPrice + ' × ' + ci.sq + '</span>' +
                        '  ' + secondaryPriceHtml +
                        '</div>' +
                        '</div>';
                }).join('');
                prevCartQtys = currentCartQtys; // 同步当前状态到历史
                if (cartStats) {
                    cartStats.style.display = '';
                    var div = document.getElementById('activitySectionDivider');
                    if (div) div.style.display = '';

                    var sdEl = document.getElementById('statDraws');
                    var spEl = document.getElementById('statPerDraw');
                    var scpEl = document.getElementById('statCartPts');
                    var sptEl = document.getElementById('statTotalPts');
                    var scEl = document.getElementById('statTotalPrice');
                    var usdRow = document.getElementById('usdRow');
                    var suEl = document.getElementById('statTotalUsd');

                    var base = getBasePts();
                    var actPts = base + calcMapPts(actQtyMap);

                    if (sdEl) setAnimFloat(sdEl, totalDraws, '', ' 抽', (totalDraws % 1 === 0 ? 0 : 1));
                    if (spEl) setAnimFloat(spEl, totalDraws ? (totalCny / totalDraws) : 0, '¥', '', 2);
                    if (scpEl) setAnimVal(scpEl, totalPts);
                    if (sptEl) setAnimVal(sptEl, actPts + totalPts);
                    if (usdRow) {
                        usdRow.style.display = (currentVersion === 'daihao' && totalUsd > 0) ? 'flex' : 'none';
                        if (suEl) setAnimFloat(suEl, totalUsd, '$', '', 2);
                    }
                    if (scEl) setAnimFloat(scEl, totalCny, '¥', '', 2);
                }
            }
        }

        var clearCartBtn = document.getElementById('clearCartBtn');
        if (clearCartBtn) clearCartBtn.onclick = function () {
            var rows = cartItemList.querySelectorAll('.cart-row');
            if (rows.length > 0) {
                rows.forEach(function (r) { r.classList.add('cart-row-exit'); });
                setTimeout(function () {
                    var date = normDate(rechargeDateInput.value);
                    simQtyMap = {}; // 直接全清
                    updateAll(true);
                }, 250);
            } else {
                simQtyMap = {};
                updateAll(true);
            }
        };


        // ── 累充进度（右栏上方） ──
        function getCovBasePts(title, s, e) {
            var sb = JSON.parse(localStorage.getItem('ziyong_events_base') || '{}'), tot = parseInt(sb[title]) || 0, counted = {};
            counted[title] = true;
            eventsData.forEach(function (ev) { if (!counted[ev.title] && ev.start >= s && ev.end <= e) { tot += (parseInt(sb[ev.title]) || 0); counted[ev.title] = true; } });
            if (title === '鸢起长期' && !counted['鸢起年度'] && '2025-05-01' >= s && '2026-04-30' <= e) tot += (parseInt(sb['鸢起年度']) || 0);
            return tot;
        }
        function handleBaseChange(e) {
            if (!e.target.classList.contains('act-base-input')) return;
            var title = e.target.dataset.title, nv = parseInt(e.target.value) || 0;
            var sb = JSON.parse(localStorage.getItem('ziyong_events_base') || '{}');
            var ts = '', te = '';
            if (title === '鸢起年度') { ts = '2025-05-01'; te = '2026-04-30'; }
            else if (title === '鸢起长期') { ts = '2023-03-30'; te = '2026-04-30'; }
            else { var act = eventsData.filter(function (ev) { return ev.title === title; })[0]; if (act) { ts = act.start; te = getInclusiveEnd(act.end); } }
            if (ts) { var eff = getCovBasePts(title, ts, te), cur = parseInt(sb[title]) || 0; sb[title] = nv - (eff - cur); }
            else sb[title] = nv;
            localStorage.setItem('ziyong_events_base', JSON.stringify(sb)); updateAll();
        }
        if (activityContainer) activityContainer.addEventListener('change', handleBaseChange);
        if (yuanqiContainer) {
            yuanqiContainer.addEventListener('change', handleBaseChange);
            yuanqiContainer.addEventListener('click', function (e) {
                if (e.target.classList.contains('yuanqi-calc-btn')) {
                    var inp = yuanqiContainer.querySelector('.yuanqi-target-input');
                    if (inp) { localStorage.setItem('ziyong_yuanqi_target', inp.value); updateAll(); }
                }
            });
            yuanqiContainer.addEventListener('input', function (e) {
                if (e.target.classList.contains('yuanqi-target-input')) {
                    localStorage.setItem('ziyong_yuanqi_target', e.target.value);
                }
            });
        }

        function mkBar(act, sim, max) {
            var pA = Math.min(act / (max || 1) * 100, 100).toFixed(1), pS = Math.min(sim / (max || 1) * 100, 100).toFixed(1);
            return '<div class="progress-bar-bg"><div class="progress-bar simulated" style="width:' + pS + '%; z-index:1;"></div><div class="progress-bar actual" style="width:' + pA + '%; z-index:2;"></div></div>';
        }
        function mkBaseInput(title, base) {
            return '<span class="base-input-group"><label>基础</label><input type="number" class="ancient-input mini act-base-input" data-title="' + title + '" value="' + base + '" style="width:50px;font-size:11px;text-align:right;"></span>';
        }

        function renderYuanqi(date) {
            if (!yuanqiContainer) return;
            var c1s = '2025-05-01', c1e = '2026-04-30', c2s = '2023-03-30', c2e = '2026-04-30';
            var c1b = getCovBasePts('鸢起年度', c1s, c1e), c1a = c1b + calcRangePts(actQtyMap, c1s, c1e), c1si = c1a + calcRangePts(simQtyMap, c1s, c1e);
            var c2b = getCovBasePts('鸢起长期', c2s, c2e), c2a = c2b + calcRangePts(actQtyMap, c2s, c2e), c2si = c2a + calcRangePts(simQtyMap, c2s, c2e);

            // 條件二檔位與禮盒數 (15w/30w/45w/60w/75w)
            var tiers = KRYPTON_DATA.rewardTiers;
            var boxes = 0, next = tiers[tiers.length - 1];
            for (var i = 0; i < tiers.length; i++) {
                if (c2a >= tiers[i]) boxes = i + 1;
                if (c2si < tiers[i] && next === 750000) next = tiers[i];
            }

            var targetVal = localStorage.getItem('ziyong_yuanqi_target') || '60000';
            var remaining = Math.max(0, parseInt(targetVal) - c1si);

            var item = yuanqiContainer.querySelector('.activity-item');
            if (!item) {
                var linkUrl = "https://r.qookkagames.com/p/r/69a258e8c7a0a80cbd2537f4/index?access=hk_offical";
                yuanqiContainer.innerHTML =
                    '<div class="activity-item" data-title="鸢起礼盒">' +
                    '  <div class="activity-header">' +
                    '    <div class="activity-title"><a href="' + linkUrl + '" target="_blank" class="yuanqi-title-link">鸢起礼盒·三<span class="yuanqi-tooltip"> 点击跳转官方积分查询链接 </span></a> <span class="toggle-icon">▼</span></div>' +
                    '    <div class="target-calc-group">' +
                    '      目标 <input type="number" class="target-input-box yuanqi-target-input" value="' + targetVal + '"> <button class="calc-btn yuanqi-calc-btn">算</button>' +
                    '    </div>' +
                    '  </div>' +
                    '  <div class="activity-content-wrapper">' +
                    '    <div class="act-segment">' +
                    '      <div class="act-row">' +
                    '        <div class="act-label-small">条件一: 年度累充满 60,000 积分 (25/05/01-26/04/30)</div>' +
                    '        <div class="target-calc-group tc-box1"></div>' +
                    '      </div>' +
                    '      <div class="act-row">' +
                    '        <div class="act-label-med">年度累充进度</div>' +
                    '        <div class="act-val-row">实际: <span class="act-val-actual c1a-val">0</span> (模拟: <span class="c1si-val">0</span>) / 60,000</div>' +
                    '      </div>' +
                    '      <div class="pb-wrap1">' + mkBar(0, 0, 60000) + '</div>' +
                    '      <div class="act-footer-right rem-val">正在计算...</div>' +
                    '    </div>' +
                    '    <div class="dashed-divider"></div>' +
                    '    <div class="act-segment">' +
                    '      <div class="act-row">' +
                    '        <div class="act-label-small">条件二: 长期充值兑换礼盒 (23/03/30-26/04/30)</div>' +
                    '        <div class="target-calc-group tc-box2"></div>' +
                    '      </div>' +
                    '      <div class="act-row">' +
                    '        <div class="act-label-med">当前可领: <span class="act-val-actual boxes-val">0</span> 个</div>' +
                    '        <div class="act-val-row">实际: <span class="act-val-actual c2a-val">0</span> (模拟: <span class="c2si-val">0</span>) / <span class="next-val">0</span></div>' +
                    '      </div>' +
                    '      <div class="pb-wrap2">' + mkBar(0, 0, 1) + '</div>' +
                    '      <div class="act-footer-right next-rem-val">正在计算...</div>' +
                    '    </div>' +
                    '  </div>' +
                    '</div>';
                item = yuanqiContainer.querySelector('.activity-item');
            }

            // 更新数据
            var linkUrl = "https://r.qookkagames.com/p/r/69a258e8c7a0a80cbd2537f4/index?access=hk_offical";
            var tEl = item.querySelector('.activity-title');
            if (tEl && !tEl.querySelector('.yuanqi-title-link')) {
                tEl.innerHTML = '<a href="' + linkUrl + '" target="_blank" class="yuanqi-title-link">鸢起礼盒·三<span class="yuanqi-tooltip"> 点击跳转官方积分查询链接 </span></a> <span class="toggle-icon">▼</span>';
            }

            item.querySelector('.tc-box1').innerHTML = mkBaseInput('鸢起年度', c1b);
            item.querySelector('.tc-box2').innerHTML = mkBaseInput('鸢起长期', c2b);

            // 條件一狀態標記
            var remVal = item.querySelector('.rem-val');
            if (remaining <= 0) {
                remVal.innerText = '✓ 已达成';
                remVal.style.color = '#3e8e41'; // 綠色
            } else {
                remVal.innerText = '距目標還差: ' + remaining.toLocaleString();
                remVal.style.color = '';
            }

            item.querySelector('.boxes-val').innerText = boxes;
            item.querySelector('.next-val').innerText = next.toLocaleString();

            // 條件二狀態標記
            var nrVal = item.querySelector('.next-rem-val');
            if (c2si >= 750000) {
                nrVal.innerText = '✓ 已达成';
                nrVal.style.color = '#3e8e41';
            } else {
                nrVal.innerText = '距下一礼盒(' + next.toLocaleString() + '): ' + Math.max(0, next - c2si).toLocaleString();
                nrVal.style.color = '';
            }

            // 进度条与数字
            item.querySelector('.pb-wrap1 .progress-bar.actual').style.width = Math.min(c1a / 60000 * 100, 100).toFixed(1) + '%';
            item.querySelector('.pb-wrap1 .progress-bar.simulated').style.width = Math.min(c1si / 60000 * 100, 100).toFixed(1) + '%';
            item.querySelector('.pb-wrap2 .progress-bar.actual').style.width = Math.min(c2a / (next || 1) * 100, 100).toFixed(1) + '%';
            item.querySelector('.pb-wrap2 .progress-bar.simulated').style.width = Math.min(c2si / (next || 1) * 100, 100).toFixed(1) + '%';

            setAnimVal(item.querySelector('.c1a-val'), c1a);
            setAnimVal(item.querySelector('.c1si-val'), c1si);
            setAnimVal(item.querySelector('.c2a-val'), c2a);
            setAnimVal(item.querySelector('.c2si-val'), c2si);

            attachCollapse(yuanqiContainer);
        }

        function renderActivities(date) {
            if (!activityContainer) return;
            var active = eventsData.filter(function (e) {
                // 1. 排除掉已经确定的非累充项（如签到、年卡）
                if (['三周年一阶段', '年卡', '三周年签到'].some(function (x) { return e.title.includes(x); })) return false;
                // 2. 核心排除：已经在顶部专门显示的“鸢起礼盒”及其相关变体，避免重复显示
                if (e.title.indexOf('鸢起礼盒') !== -1 || e.title.indexOf('鸢起年度') !== -1 || e.title.indexOf('鸢起长期') !== -1) return false;

                return date >= e.start && date < e.end && (
                    e.title.includes('累充') ||
                    e.type === 'pool'
                );
            });

            // 3. 结果去重：防止同一活动在 eventsData 中多次出现导致列表出现重复项
            var seenTitles = {};
            active = active.filter(function (e) {
                if (seenTitles[e.title]) return false;
                seenTitles[e.title] = true;
                return true;
            });
            if (!active.length) {
                if (!(date >= '2023-03-30' && date <= '2026-04-30')) activityContainer.innerHTML = '<div class="no-activity">当前日期无累充活动</div>';
                return;
            }

            // 获取现有项的映射，方便重用
            var existingMap = {};
            activityContainer.querySelectorAll('.activity-item').forEach(function (item) {
                existingMap[item.dataset.title] = item;
            });

            // 记录哪些项在本次渲染中仍然活跃
            var activeTitles = {};

            active.forEach(function (act) {
                activeTitles[act.title] = true;
                var inclEnd = getInclusiveEnd(act.end);
                var base = getCovBasePts(act.title, act.start, inclEnd), actA = base + calcRangePts(actQtyMap, act.start, inclEnd), actS = actA + calcRangePts(simQtyMap, act.start, inclEnd);
                var trackDataKey = '', trackName = '', trackData = null;
                if (act.title.includes('三周年累充')) { trackData = KRYPTON_DATA.track1; trackDataKey = 'track1'; trackName = '周年限时累充'; }
                else if (act.title.includes('地宫伴生池')) { trackData = KRYPTON_DATA.track2; trackDataKey = 'track2'; trackName = '男主限时累充'; }

                var T = KRYPTON_DATA.cumulativeTiers[act.title] || [1000, 2000, 5000, 10000];
                if (trackData) T = trackData.map(function (item) { return item.pts; });

                var maxT = Math.max.apply(null, T), nextT = T[T.length - 1];
                for (var i = 0; i < T.length; i++) { if (actS < T[i]) { nextT = T[i]; break; } }

                var item = existingMap[act.title];
                var iA = 'actVal' + act.title.replace(/[^\w]/g, ''), iS = 'simVal' + act.title.replace(/[^\w]/g, '');

                var displayTitle = act.title.replace('【地宫伴生池＆累充】', '【地宫伴生累充】');
                if (!item) {
                    var fD = function (d) { return d.split('-').slice(1).join('/'); };
                    item = document.createElement('div');
                    item.className = 'activity-item';
                    item.dataset.title = act.title;
                    item.innerHTML =
                        '<div class="activity-header" style="position:relative; display:block; padding-bottom:6px;">' +
                        '  <div style="display:flex; justify-content:space-between; align-items:flex-start;">' +
                        '    <div class="activity-title" style="flex:1;">' + displayTitle + ' <span class="toggle-icon">▼</span></div>' +
                        (trackDataKey ? '<div class="reward-badge-container"><span class="reward-badge" data-track="' + trackDataKey + '" data-name="' + trackName + '">🎁 奖励</span></div>' : '') +
                        '  </div>' +
                        '  <div class="activity-date-row" style="font-size:10px; color:#a08060; margin-top:2px; display:flex; justify-content:space-between;">' +
                        '    <span>活动周期: ' + fD(act.start) + '~' + fD(inclEnd) + '</span>' +
                        '    <span class="rem-time-box">' + getRemainingTime(act.end) + '</span>' +
                        '  </div>' +
                        '</div>' +
                        '<div class="activity-content-wrapper">' +
                        '  <div class="act-segment">' +
                        '    <div class="act-row">' +
                        '      <div class="target-calc-group">' + mkBaseInput(act.title, base) + '</div>' +
                        '    </div>' +
                        '    <div class="act-row">' +
                        '      <div class="act-label-med">当前累充进度</div>' +
                        '      <div class="act-val-row">实际: <span id="' + iA + '" class="act-val-actual">0</span> (模拟: <span id="' + iS + '">0</span>) / <span class="next-t-val">0</span></div>' +
                        '    </div>' +
                        '    <div class="pb-wrap">' + mkBar(0, 0, 100) + '</div>' +
                        '    <div class="act-footer-right">正在计算...</div>' +
                        '  </div>' +
                        '</div>';
                    activityContainer.appendChild(item);
                } else {
                    var tEl = item.querySelector('.activity-title');
                    if (tEl) tEl.innerHTML = displayTitle + ' <span class="toggle-icon">▼</span>';
                }

                // 统一更新属性 (无论新旧)
                var badge = item.querySelector('.reward-badge');
                if (badge) { badge.dataset.acta = actA; badge.dataset.acts = actS; }

                var ntv = item.querySelector('.next-t-val'); if (ntv) ntv.innerText = nextT.toLocaleString();
                var afr = item.querySelector('.act-footer-right');
                if (afr) {
                    if (actS >= maxT) {
                        afr.innerText = '✓ 已达成';
                        afr.style.color = '#3e8e41';
                    } else {
                        afr.innerText = '距下档(' + nextT.toLocaleString() + ')还差: ' + Math.max(0, nextT - actS).toLocaleString();
                        afr.style.color = '';
                    }
                }
                // 更新进度条
                var pA = Math.min(actA / (nextT || 1) * 100, 100).toFixed(1);
                var pS = Math.min(actS / (nextT || 1) * 100, 100).toFixed(1);
                var barA = item.querySelector('.progress-bar.actual'), barS = item.querySelector('.progress-bar.simulated');

                if (existingMap[act.title]) {
                    if (barA) barA.style.width = pA + '%';
                    if (barS) barS.style.width = pS + '%';
                } else {
                    // 新建项需要微小延迟触发动画
                    setTimeout(function () {
                        if (barA) barA.style.width = pA + '%';
                        if (barS) barS.style.width = pS + '%';
                    }, 50);
                }

                // 动画数字
                setAnimVal(document.getElementById(iA), actA);
                setAnimVal(document.getElementById(iS), actS);
            });

            // 移除不再需要的项
            for (var t in existingMap) {
                if (!activeTitles[t]) existingMap[t].remove();
            }

            attachCollapse(activityContainer);
        }

        // ── 全局悬浮奖励监听 (事件委托机制，更稳健) ──
        (function initTooltipDelegation() {
            var gp = document.getElementById('rewardGlobalPopup');
            if (!gp) { gp = document.createElement('div'); gp.id = 'rewardGlobalPopup'; document.body.appendChild(gp); }

            document.body.addEventListener('mouseover', function (e) {
                var btn = e.target.closest('.reward-badge');
                if (!btn) return;

                var trackKey = btn.dataset.track, name = btn.dataset.name, actA = parseFloat(btn.dataset.acta) || 0, actS = parseFloat(btn.dataset.acts) || 0;
                var trackData = KRYPTON_DATA[trackKey];
                if (!trackData) return;

                gp.innerHTML = renderRewardPopupHtml(trackData, name, actA, actS);
                gp.style.display = 'block';

                var rect = btn.getBoundingClientRect();
                var popupHeight = gp.offsetHeight;

                // 1. 水平定位：优先在左侧，空间不足跳到右侧
                var leftPos = rect.left - 280;
                if (leftPos < 20) leftPos = rect.right + 20;

                // 2. 垂直自适应：尝试居中对齐勋章，但确保不超出视口上下界
                var topPos = rect.top + (rect.height / 2) - (popupHeight / 2);
                var margin = 20;
                if (topPos < margin) topPos = margin;
                if (topPos + popupHeight > window.innerHeight - margin) {
                    topPos = window.innerHeight - popupHeight - margin;
                }

                gp.style.left = leftPos + 'px';
                gp.style.top = topPos + 'px';

                // 3. 触发动画
                requestAnimationFrame(function () {
                    gp.classList.add('visible');
                });
            });

            document.body.addEventListener('mouseout', function (e) {
                var btn = e.target.closest('.reward-badge');
                if (btn) {
                    gp.classList.remove('visible');
                    // 动画完成后隐藏，防止干扰
                    setTimeout(function () {
                        if (!gp.classList.contains('visible')) gp.style.display = 'none';
                    }, 250);
                }
            });
        })();

        function attachCollapse(container) {
            if (!container) return;
            container.querySelectorAll('.activity-title').forEach(function (title) {
                var item = title.closest('.activity-item'); if (!item) return;
                var cw = item.querySelector('.activity-content-wrapper'), ic = title.querySelector('.toggle-icon');
                title.style.cursor = 'pointer'; title.onclick = null;
                title.onclick = function (e) {
                    e.stopPropagation(); if (!cw) return;
                    var c = cw.classList.toggle('collapsed');
                    if (ic) { ic.classList.toggle('collapsed', c); ic.innerText = c ? '▶' : '▼'; }
                };
            });
        }

        // ── 积分对照表 ──
        function initMappingPanel() {
            var mBody = document.getElementById('mappingBody');
            var currencyToggle = document.getElementById('currencyToggle');
            if (!mBody) return;
            function renderTable(val) {
                mBody.className = 'fade-in-rows';
                mBody.innerHTML = ''; var isUsd = val === 'usd';
                (isUsd ? KRYPTON_DATA.usdMapping : KRYPTON_DATA.rmbMapping).forEach(function (m) {
                    var tr = document.createElement('tr');
                    tr.innerHTML = '<td>' + (isUsd ? '$' : '¥') + m.price + '</td><td>' + m.pts + '</td>';
                    mBody.appendChild(tr);
                });
            }
            // 将渲染逻辑暴露给全局，方便统一逻辑调用
            window.renderMappingTable = renderTable;
            renderTable('usd');
        }

        // ── Excel 导入导出核心逻辑 (修正为针对“总记录”) ──
        var exportCsvBtn = document.getElementById('exportCsvBtn');
        var importCsvBtn = document.getElementById('importCsvBtn');
        var csvInput = document.getElementById('csvInput');

        if (exportCsvBtn) {
            exportCsvBtn.onclick = function () {
                if (typeof XLSX === 'undefined') { alert('Excel 库尚未加载，请稍候...'); return; }

                var packs = getActivePacks('daihao').concat(getActivePacks('ruyuan'));
                var dataRows = [];

                // 遍历 actQtyMap (正式结算的历史总记录)
                Object.keys(actQtyMap).sort().forEach(function (k) {
                    var parts = k.split('|'), nm = parts[0], d = parts[1], qty = actQtyMap[k] || 0;
                    if (qty <= 0) return;

                    // 查找礼包的基础点数和价格
                    var p = packs.find(function (it) { return it.name === nm; });
                    var pts = p ? p.pts : 0;
                    var usd = p ? (p.priceUsd || 0) : 0;
                    var rmb = p ? (p.priceCny || 0) : 0;

                    dataRows.push({
                        "名称": nm,
                        "日期": d,
                        "数量": qty,
                        "总积分": pts * qty,
                        "单价(USD)": usd,
                        "单价(RMB)": rmb
                    });
                });

                if (dataRows.length === 0) { alert('当前总记录为空，没有可导出的数据'); return; }

                var ws = XLSX.utils.json_to_sheet(dataRows);
                var wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "总充值记录");
                XLSX.writeFile(wb, "广陵资用案_总记录_" + new Date().toLocaleDateString() + ".xlsx");
            };

            // 动态加入“导出图片”按钮
            var exportImgBtn = document.createElement('button');
            exportImgBtn.id = 'exportImgBtn';
            exportImgBtn.className = 'cat-btn';
            exportImgBtn.style.padding = '2px 6px';
            exportImgBtn.style.fontSize = '11px';
            exportImgBtn.style.height = '22px';
            exportImgBtn.style.lineHeight = '18px';
            exportImgBtn.style.whiteSpace = 'nowrap';
            exportImgBtn.style.flexShrink = '0';
            exportImgBtn.innerHTML = '<span style="vertical-align:middle;margin-right:2px;">🖼️</span>导出';
            // 初始插入位置：精准挂载到购物清单头部的左侧容器中
            var headerLeft = document.querySelector('.cart-header-left');
            if (headerLeft) {
                headerLeft.appendChild(exportImgBtn);
            } else {
                exportCsvBtn.parentNode.insertBefore(exportImgBtn, exportCsvBtn.nextSibling);
            }

            exportImgBtn.onclick = function () {
                if (typeof html2canvas === 'undefined') { alert('图库尚未加载，请稍候...'); return; }
                // 聚焦截取：仅截取清单统计面板
                var target = document.querySelector('.cart-panel') || document.querySelector('.shopping-list-panel') || document.querySelector('.right-column');
                if (!target) return;

                // 临时优化样式以适应导出
                var originalMaxH = target.style.maxHeight;
                var originalOverflow = target.style.overflow;
                target.style.maxHeight = 'none';
                target.style.overflow = 'visible';

                html2canvas(target, {
                    scale: 2.5, // 极高清晰度
                    useCORS: true,
                    backgroundColor: '#fffcf5',
                    onclone: function (clonedDoc) {
                        var c = clonedDoc.querySelector('.cart-panel') || clonedDoc.querySelector('.shopping-list-panel');
                        if (c) {
                            c.style.maxHeight = 'none';
                            c.style.overflow = 'visible';
                            c.style.padding = '20px';
                            c.style.borderRadius = '0';
                        }
                    }
                }).then(function (canvas) {
                    target.style.maxHeight = originalMaxH;
                    target.style.overflow = originalOverflow;
                    var link = document.createElement('a');
                    link.download = '广陵资用案_结算清单_' + new Date().toLocaleDateString() + '.png';
                    link.href = canvas.toDataURL('image/png');
                    link.click();
                });
            };
        }
        if (importCsvBtn && csvInput) {
            importCsvBtn.onclick = function () { csvInput.click(); };
            csvInput.onchange = function (e) {
                var file = e.target.files[0];
                if (!file) return;
                if (typeof XLSX === 'undefined') { alert('Excel 库尚未加载'); return; }

                var reader = new FileReader();
                reader.onload = function (ev) {
                    try {
                        var data = new Uint8Array(ev.target.result);
                        var workbook = XLSX.read(data, { type: 'array' });
                        var firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                        var rows = XLSX.utils.sheet_to_json(firstSheet);

                        if (rows.length === 0) return;

                        var importedCount = 0;
                        rows.forEach(function (row) {
                            var nm = row["名称"] || row["Name"];
                            var d = row["日期"] || row["Date"];
                            var q = parseInt(row["数量"] || row["Qty"] || 1);
                            if (nm && d && !isNaN(q)) {
                                var key = nm + "|" + d;
                                actQtyMap[key] = (actQtyMap[key] || 0) + q;
                                importedCount++;
                            }
                        });

                        alert('成功导入 ' + importedCount + ' 条记录');
                        saveState();
                        updateAll();
                    } catch (err) {
                        console.error(err); alert('文件读取失败，请确保是正确的 Excel 格式');
                    }
                    csvInput.value = ""; // 重置 input
                };
                reader.readAsArrayBuffer(file);
            };
        }

        // ── 确认结算按钮 ──
        var checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.onclick = function () {
                var simCount = Object.keys(simQtyMap).filter(function (k) { return simQtyMap[k] > 0; }).length;
                if (simCount === 0) {
                    alert('购物车为空，无需结算'); return;
                }

                // 遍历模拟表，合并到实际表中
                Object.keys(simQtyMap).forEach(function (k) {
                    var sq = simQtyMap[k] || 0;
                    if (sq > 0) {
                        actQtyMap[k] = (actQtyMap[k] || 0) + sq;
                        delete simQtyMap[k];
                    }
                });

                updateAll();
            };
        }

        // ── 综合清空按钮 (自定义美化弹窗版) ──
        function showConfirmModal(msg, onConfirm) {
            var overlay = document.createElement('div');
            overlay.className = 'ziyong-modal-overlay';
            overlay.innerHTML =
                '<div class="ziyong-modal-card">' +
                '  <div class="ziyong-modal-icon">⚠️</div>' +
                '  <div class="ziyong-modal-title">确认清空数据？</div>' +
                '  <div class="ziyong-modal-msg">' + msg + '</div>' +
                '  <div class="ziyong-modal-btns">' +
                '    <button class="ziyong-modal-btn cancel">取消</button>' +
                '    <button class="ziyong-modal-btn confirm">确定清空</button>' +
                '  </div>' +
                '</div>';
            document.body.appendChild(overlay);

            // 动画淡入
            setTimeout(function () { overlay.classList.add('show'); }, 10);

            overlay.querySelector('.cancel').onclick = function () {
                overlay.classList.remove('show');
                setTimeout(function () { overlay.remove(); }, 300);
            };
            overlay.querySelector('.confirm').onclick = function () {
                overlay.classList.remove('show');
                setTimeout(function () { overlay.remove(); onConfirm(); }, 300);
            };
        }

        function performGlobalClear() {
            showConfirmModal('清空后所有礼包勾选、确认结算的历史记录都将无法恢复。', function () {
                console.log('[Krypton] 执行全局数据清空...');
                simQtyMap = {};
                actQtyMap = {};
                // 清理所有已知的存储键
                [
                    'ziyong_simQty', 'ziyong_actQty', 'ziyong_events_base',
                    'ziyong_simulated', 'ziyong_actual', 'krypton_records'
                ].forEach(function (k) { localStorage.removeItem(k); });

                animStates = {};
                updateAll();
                updateRecordsTable();

                // 成功提示
                var toast = document.createElement('div');
                toast.className = 'ziyong-toast';
                toast.innerText = '✨ 记录已全部清空';
                document.body.appendChild(toast);
                setTimeout(function () { toast.classList.add('show'); }, 10);
                setTimeout(function () {
                    toast.classList.remove('show');
                    setTimeout(function () { toast.remove(); }, 500);
                }, 2000);
            });
        }

        var btnClearGlobal = document.getElementById('clearAllRecordsBtn') || document.getElementById('clearDataBtn');
        if (btnClearGlobal) {
            btnClearGlobal.addEventListener('click', function (e) {
                e.preventDefault();
                performGlobalClear();
            });

            // 按钮物理位置已在创建时锁定，此处仅确保功能绑定
            var eBtn = document.getElementById('exportImgBtn');
            if (eBtn) {
                eBtn.style.margin = '0';
                eBtn.style.fontSize = '11px';
            }
        } else {
            console.warn('[Krypton] 未找到全局清空按钮 (clearAllRecordsBtn / clearDataBtn)');
        }

        // ── 总记录表 (正式结算记录) ──
        function updateRecordsTable() {
            if (!recordsBody) return;
            var packs = getActivePacks(currentVersion);

            // 更新表头 (增加美金和人民币列)
            var thead = recordsBody.previousElementSibling;
            if (thead && thead.tagName === 'THEAD') {
                thead.innerHTML = '<tr><th>活动</th><th>时间</th><th>名称</th><th>积分</th><th>USD</th><th>RMB</th></tr>';
            }

            recordsBody.innerHTML = '';
            var totalPts = 0, totalUsd = 0, totalCny = 0;

            Object.keys(actQtyMap).sort().forEach(function (k) {
                var parts = k.split('|'), nm = parts[0], d = parts[1], aq = actQtyMap[k] || 0;
                if (!aq) return;

                var pack = null;
                for (var i = 0; i < packs.length; i++) { if (packs[i].name === nm) { pack = packs[i]; break; } }

                var act = eventsData.filter(function (e) {
                    var dn = d.replace(/-/g, '/');
                    return d >= e.start && d <= normDate(getInclusiveEnd(actQtyMap[k] ? e.end : ''));
                })[0];
                // 更加精确的活动匹配
                if (!act) {
                    act = eventsData.filter(function (e) { return d >= e.start && d <= e.end && (e.title.includes('累充') || e.type === 'pool'); })[0];
                }

                var pts = pack ? pack.pts * aq : 0;
                var usd = pack ? (pack.priceUsd || 0) * aq : 0;
                var cny = pack ? getPackCny(pack) * aq : 0;

                totalPts += pts; totalUsd += usd; totalCny += cny;

                var tr = document.createElement('tr');
                var actName = act ? act.title.replace('【地宫伴生池＆累充】', '【地宫伴生累充】') : '日常';
                tr.innerHTML = '<td>' + actName + '</td><td>' + d.split('-').slice(1).join('/') + '</td><td>' + nm + '</td><td>' + pts + '</td><td>$' + usd.toFixed(2) + '</td><td>¥' + cny.toFixed(2) + '</td>';
                recordsBody.appendChild(tr);
            });

            // 添加统计行 (Summary Row)
            if (Object.keys(actQtyMap).length > 0) {
                var footTr = document.createElement('tr');
                footTr.style.background = '#f2e6ce';
                footTr.style.fontWeight = '800';
                footTr.style.color = '#5d4037';
                footTr.innerHTML = '<td colspan="3" style="text-align:right;padding-right:15px;">总计：</td>' +
                    '<td>' + totalPts + '</td>' +
                    '<td>$' + totalUsd.toFixed(2) + '</td>' +
                    '<td>¥' + totalCny.toFixed(2) + '</td>';
                recordsBody.appendChild(footTr);
            }
        }

        // ── 局部更新核心 (手术式精准刷新) ──
        function updatePackCard(name, date) {
            var cards = packList.querySelectorAll('.ziyong-card[data-name="' + name + '"]');
            if (!cards.length) return;

            var allPacks = getActivePacks(currentVersion);
            var p = allPacks.find(function (it) { return it.name === name; });
            if (!p) return;

            var sq = getSQ(name, date), aq = getAQ(name, date), lim = p.limit || 1;
            var maxed = (aq + sq) >= lim;
            var fullyBought = aq >= lim;

            cards.forEach(function (card) {
                // 更新高亮状态
                card.classList.toggle('actual', fullyBought);
                card.classList.toggle('simulated', (!fullyBought && sq > 0));
                card.classList.toggle('limit-reached', maxed);

                // 更新选购数量
                var numEl = card.querySelector('.qty-num');
                if (numEl) numEl.innerText = sq;

                // 更新限购文本与颜色
                var limEl = card.querySelector('.card-limit-txt');
                if (limEl) {
                    limEl.innerText = (aq + sq) + '/' + lim;
                    limEl.style.color = maxed ? '#d85c50' : '#a08060';
                }

                // 更新按钮禁用状态
                var minBtn = card.querySelector('.qty-min'), minusBtn = card.querySelector('.qty-minus');
                var plusBtn = card.querySelector('.qty-plus'), maxBtn = card.querySelector('.qty-max');

                if (minBtn) minBtn.setAttribute('disabled', sq <= 0 ? 'true' : 'false');
                if (minusBtn) minusBtn.setAttribute('disabled', sq <= 0 ? 'true' : 'false');
                if (plusBtn) plusBtn.setAttribute('disabled', maxed ? 'true' : 'false');
                if (maxBtn) maxBtn.setAttribute('disabled', maxed ? 'true' : 'false');
            });
        }

        // ── 总更新 (带 Fast 模式) ──
        var updateAll = function (isFast, targetName) {
            var date = normDate(rechargeDateInput.value);
            var base = getBasePts();
            var actPts = base + calcMapPts(actQtyMap);
            var simPts = actPts + calcMapPts(simQtyMap);

            // 动画更新总分
            setAnimVal(totalActualPtsEl, actPts);
            setAnimVal(totalSimulatedPtsEl, simPts);

            var stickyA = document.getElementById('stickyActualPts');
            var stickyS = document.getElementById('stickySimPts');
            if (stickyA) setAnimVal(stickyA, actPts);
            if (stickyS) setAnimVal(stickyS, simPts);

            // 核心性能切换
            if (!isFast) {
                renderPacks();
            } else if (targetName) {
                updatePackCard(targetName, date);
            } else {
                // 如果是批量操作(全选/清空)，但使用了 isFast，则遍历局部更新
                var allPacks = getActivePacks(window.currentVersion);
                allPacks.forEach(function (p) { updatePackCard(p.name, date); });
            }

            renderYuanqi(date);
            renderActivities(date);
            renderCart();
            saveState();
        };

        // ── 动态同步粘性偏移量 ──
        function syncStickyOffset() {
            var bar = document.querySelector('.ziyong-control-bar');
            var rightCol = document.querySelector('.right-column');
            if (bar && rightCol) {
                var h = bar.offsetHeight;
                rightCol.style.top = (h + 20) + 'px';
                rightCol.style.maxHeight = 'calc(100vh - ' + (h + 40) + 'px)';
                // 也设置内部高度，防止由于长列表撑开容器导致底部统计不可见
                var panels = rightCol.querySelectorAll('.cart-panel, .activity-panel');
                panels.forEach(function (p) { p.style.maxHeight = 'calc(50% - 10px)'; });
            }
        }
        window.addEventListener('resize', syncStickyOffset);

        // ── 初始化启动 ──
        loadState();
        initMappingPanel();
        syncVersion('daihao');
        setTimeout(function () {
            loadEvents();
            if (!eventsData.length && window.calendar) setTimeout(loadEvents, 1000);
            fetchExchangeRate();
            syncStickyOffset();
            console.log('[Krypton] v4 完成');
        }, 800);
        // 也可额外在 updateAll() 中同步（防止内容折行引起高度变化）
        var oldUpdateAll = updateAll;
        updateAll = function () {
            oldUpdateAll();
            setTimeout(syncStickyOffset, 50);
        };

    } catch (err) { console.error('[Krypton] 严重错误:', err); }
}

// ── 内联样式 ──
(function () {
    var s = document.createElement('style');
    s.textContent = [
        // 粘性栏
        '#stickyKryptonBar{position:fixed;top:0;left:0;right:0;z-index:2000;background:rgba(253,250,243,.97);border-bottom:1px solid #e8e2d4;backdrop-filter:blur(8px);transform:translateY(-100%);transition:transform .3s ease;pointer-events:none;}',
        '#stickyKryptonBar.visible{transform:translateY(0);pointer-events:auto;}',
        '.sticky-inner{display:flex;align-items:center;gap:12px;padding:6px 20px;flex-wrap:wrap;}',
        '.sticky-pts-group{display:flex;gap:10px;align-items:center;}',
        '.sticky-pts-item{font-size:12px;color:#7a6f66;}.sticky-pts-item b{color:#d85c50;font-size:14px;margin-left:3px;}',
        '.sticky-pts-item.sim b{color:#a08060;}',
        '.sticky-controls-group{display:flex;gap:8px;align-items:center;}',
        '.sticky-cat-tabs{display:flex;gap:4px;flex-wrap:wrap;}',
        // 右栏布局
        '.plan-layout{display:grid;grid-template-columns:1fr 340px;gap:18px;align-items:start;}',
        '@media(max-width:860px){.plan-layout{grid-template-columns:1fr;}}',
        '.right-column{display:flex;flex-direction:column;gap:15px;position:sticky;top:200px;max-height:calc(100vh - 220px);overflow:hidden;}',
        '.activity-panel{background:#fff;border:1px solid #e8e2d4;border-radius:10px;overflow:hidden;display:flex;flex-direction:column;flex:1;min-height:180px;}',
        '.activity-panel-header{padding:10px 14px;background:#fdfaf3;border-bottom:1px solid #e8e2d4;}',
        '.activity-panel-title{font-size:14px;font-weight:700;color:#5d4037;letter-spacing:1px;}',
        '.activity-panel-body{padding:10px;display:flex;flex-direction:column;gap:8px;overflow-y:auto;flex:1;padding-bottom:30px;}',
        // 购物清单
        '.cart-panel{background:#fff;border:1px solid #e8e2d4;border-radius:10px;overflow:hidden;display:flex;flex-direction:column;flex:none;width:100%;}',
        '.cart-panel-header{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:8px 14px;background:#fdfaf3;border-bottom:1px solid #e8e2d4;}',
        '.cart-header-left{display:flex;justify-content:flex-start;}',
        '.cart-header-right{display:flex;justify-content:flex-end;}',
        '.cart-title{font-size:13px;font-weight:700;color:#5d4037;white-space:nowrap;grid-column:2;}',
        '.cart-item-list{flex:none;padding:12px 12px 0;}',
        '.cart-empty-msg{font-size:12px;color:#aaa;text-align:center;padding:20px 0;}',
        '.cart-row{display:flex;flex-direction:column;padding:8px 0;border-bottom:1px solid #f8f5f0;transform-origin:right;}',
        '.cart-row-animate{animation:cartRowIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;}',
        '.cart-row-exit{animation:cartRowOut 0.25s cubic-bezier(0.4, 0, 1, 1) forwards;}',
        '@keyframes cartRowIn{0%{opacity:0;transform:translateX(20px);}100%{opacity:1;transform:translateX(0);}}',
        '@keyframes cartRowOut{0%{opacity:1;transform:translateX(0);}100%{opacity:0;transform:translateX(20px);}}',
        '.cart-row:last-child{border-bottom:none;}',
        '.cart-row-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:2px;}',
        '.cart-row-name{font-size:14px;color:#3e3a33;font-weight:600;}',
        '.cart-row-price{font-size:14px;color:#3e3a33;font-weight:700;}',
        '.cart-row-sub{font-size:12px;color:#8d7365;}',
        '.cart-stats{padding:0 12px 15px 12px;}',
        '.stat-divider{margin:15px 0;}',
        '.stat-divider.dashed{border-top:1.5px dashed #eee!important; border-bottom:none!important; border-left:none!important; border-right:none!important; height:0;}',
        '.stat-divider.solid{display:none;}',
        '.stat-row{display:flex;justify-content:space-between;align-items:center;font-size:14px;margin:12px 0;color:#555;}',
        '.stat-bold{font-weight:700; color:#333;}',
        '.stat-badge{background:#f8f9fa;color:#444;padding:3px 10px;border-radius:6px;font-weight:600;min-width:65px;text-align:center;font-size:13px;}',
        '.stat-badge.highlight{background:#fff9e6;color:#a67c52;border:1px solid #ffeeba;}',
        '.stat-total{margin-top:20px;padding-top:15px; border-top:1.2px solid #eee; align-items:center;color:#333;font-weight:700; display:flex; justify-content:space-between;}',
        '.stat-total #statTotalPrice{font-size:32px;color:#a82e2e;font-weight:800;line-height:1;}',
        // 原版卡片
        '.ziyong-card{background:#fffefb;border:1.5px solid #e0d5c1;border-radius:8px;padding:10px 10px 8px;cursor:pointer;position:relative;transition:border-color .25s,box-shadow .25s,background-color .25s,transform .25s;display:flex;flex-direction:column;gap:2px;}',
        '.ziyong-card:hover:not(.disabled){border-color:#c09d62;box-shadow:0 3px 10px rgba(0,0,0,.08);transform:translateY(-2px);will-change:transform,box-shadow;}',
        '.ziyong-card.simulated{background:#faf7f1;border-color:#d85c50;}',
        '.ziyong-card.actual{background:#e2d9c5;border-color:#e0d5c1;cursor:default;}',
        '.ziyong-card.limit-reached{opacity:.6;}',
        '.ziyong-card.disabled{opacity:.38;cursor:not-allowed;}',
        '.card-body{cursor:pointer;flex:1;}',
        '.card-name{font-size:13px;font-weight:700;color:#3e3a33;line-height:1.3;margin-bottom:3px;}',
        '.card-price{font-size:14px;font-weight:700;color:#c0392b;}',
        '.card-pts{font-size:11px;color:#8d7365;}',
        '.card-eff{font-size:10px;color:#a08060;font-style:italic;}',
        // 卡片底部 qty控件
        '.card-bottom{display:flex;align-items:center;justify-content:space-between;margin-top:6px;border-top:1px solid #ede8dc;padding-top:5px;}',
        '.card-limit-txt{font-size:10px;color:#a08060;}',
        '.card-qty-ctrl{display:flex;align-items:center;gap:2px;}',
        '.qty-btn{width:20px;height:20px;border-radius:50%;border:1px solid #d5c8b2;background:#fff;color:#5d4037;font-size:13px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1;transition:all .15s;}',
        '.qty-btn:hover:not([disabled]){background:#f2e6ce;border-color:#c09d62;}',
        '.qty-btn[disabled]{opacity:.3;cursor:default;}',
        '.qty-num{min-width:18px;text-align:center;font-size:12px;font-weight:600;color:#3e3a33;}',
        '.card-check{width:22px;height:22px;border-radius:50%;border:1.5px solid #d5c8b2;background:#fff;color:#b8a88a;cursor:pointer;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;transition:all .2s;margin-left:3px;}',
        '.card-check:hover{border-color:#5d8a50;color:#5d8a50;}',
        '.card-check.active{background:#5d8a50;border-color:#5d8a50;color:#fff;}',
        // 分类标题行
        '.cat-title-row{display:flex;align-items:center;gap:6px;cursor:pointer;flex:1;}',
        '.cat-toggle-icon{font-size:10px;color:#a08060;transition:transform .25s;margin-left:8px;user-select:none;}',
        '.category-header{display:flex;justify-content:space-between;align-items:center;padding:8px 12px;background:#f5f0e8;border-radius:6px 6px 0 0;border-bottom:1px solid #e8e2d4;user-select:none;cursor:pointer;}',
        '.cat-btn{padding:2px 8px;border:1px solid #d5c8b2;border-radius:4px;background:#fff;color:#7a6f66;font-size:11px;cursor:pointer;transition:all .15s;}',
        '.cat-btn:hover{background:#f2e6ce;border-color:#c09d62;}',
        // 活动进度
        '.activity-item{background:#fffefb;border:1.2px solid #edebd8;border-radius:10px;padding:12px 15px;margin-bottom:18px;}',
        '.activity-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;border-bottom:1px solid rgba(237,235,216,0.5);padding-bottom:8px;}',
        '.activity-title{font-size:14px;font-weight:700;color:#c05b4d;cursor:pointer;user-select:none;}',
        '.target-calc-group{display:flex;align-items:center;gap:5px;font-size:11px;color:#a08060;margin-left:auto;}',
        '.target-input-box{width:65px;border:1px solid #e8e2d4;border-radius:6px;padding:2px 6px;font-size:11px;text-align:center;}',
        '.calc-btn{background:#d85c50;color:#fff;border:none;border-radius:4px;padding:2px 8px;cursor:pointer;font-weight:700;}',
        '.act-segment{margin:10px 0;}',
        '.act-row{display:flex;justify-content:space-between;align-items:center;margin:4px 0;}',
        '.act-label-small{font-size:11px;color:#b8a598;}',
        '.act-label-med{font-size:12px;color:#5d4037;font-weight:600;}',
        '.act-val-row{font-size:11px;color:#4a3b32;font-weight:500;}',
        '.act-val-actual{color:#d85c50;font-weight:700;}',
        '.act-footer-right{text-align:right;font-size:10px;color:#b0998f;margin-top:2px;}',
        '.dashed-divider{border-top:1px dashed #e8e2d4;margin:12px 0;}',
        '.activity-content-wrapper{overflow:hidden;transition:max-height .4s cubic-bezier(0.4, 0, 0.2, 1),opacity .25s;max-height:800px;opacity:1;will-change:max-height,opacity;contain:content;}',
        '.activity-content-wrapper.collapsed{max-height:0!important;opacity:0;pointer-events:none;}',
        '.toggle-icon{font-size:9px;margin-left:3px;vertical-align:middle;transition:transform .25s;display:inline-block;}',
        '.toggle-icon.collapsed{transform:rotate(-90deg);}',
        '.progress-bar-bg{height:5px;background:#efede8;border-radius:3px;overflow:hidden;position:relative;margin:6px 0;}',
        '.progress-bar{height:100%;position:absolute;left:0;top:0;transition:width 0.65s cubic-bezier(0.34, 1.56, 0.64, 1);}',
        '.progress-bar.actual{background:#d85c50;}',
        '.progress-bar.simulated{background:#a67c52;}',
        // 货币/平台切换 下拉卡片
        '.custom-select{position:relative;display:inline-block;min-width:75px;cursor:pointer;user-select:none;vertical-align:middle;}',
        '.select-selected{padding:4px 22px 4px 8px;border-radius:8px;background:none !important;font-size:15px;font-weight:700;color:#5d4037;display:flex;align-items:center;position:relative;transition:all .2s;}',
        '.select-selected:hover{color:#d85c50;}',
        '.select-selected::after{content:"";position:absolute;right:4px;top:50%;transform:translateY(-30%);border:5px solid transparent;border-top-color:currentColor;transition:transform .3s;}',
        '.custom-select.open .select-selected{color:#d85c50;background:none !important;}',
        '.custom-select.open .select-selected::after{transform:translateY(-70%) rotate(180deg);}',
        '.select-items{display:none;position:absolute;top:100%;left:50%;transform:translateX(-50%) translateY(10px);background:#fffefb;border:1.2px solid #e8e2d4;border-radius:15px;box-shadow:0 12px 40px rgba(93,64,55,0.18);z-index:3000;min-width:110px;padding:8px 0;overflow:hidden;animation:selectCardIn .28s cubic-bezier(0.175, 0.885, 0.32, 1.25);}',
        '@keyframes selectCardIn{from{opacity:0;transform:translateX(-50%) translateY(0);}to{opacity:1;transform:translateX(-50%) translateY(10px);}}',
        '.custom-select.open .select-items{display:block;}',
        '.select-items div{padding:12px 15px;cursor:pointer;font-size:15px;color:#5d4037;text-align:center;transition:all .2s;font-weight:500;}',
        '.select-items div:hover{background:#fdfaf3;color:#d85c50;}',
        '.select-items div.active{color:#d85c50;font-weight:800;background:#fdf9f0;}',
        // 汇率按钮与时间提示 (自定义 SVG 版)
        '.rate-input-wrapper{display:inline-flex;align-items:center;gap:6px;vertical-align:middle;}',
        '.sync-rate-btn{padding:3px;background:#fdfaf3;border:1px solid #d5c8b2;border-radius:4px;cursor:pointer;line-height:1;transition:all .2s ease;display:flex;align-items:center;justify-content:center;color:#a08060;box-shadow:0 1px 2px rgba(0,0,0,0.05);}',
        '.sync-rate-btn:hover{background:#f2e6ce;border-color:#c09d62;color:#5d4037;}',
        '.sync-rate-btn:active{transform:translateY(1px);box-shadow:none;}',
        '.sync-icon{width:14px;height:14px;stroke:currentColor;stroke-width:3;transition:transform .5s ease;}',
        '.sync-rate-btn.syncing .sync-icon{animation:spinRate 1s linear infinite;}',
        '.sync-rate-btn.success{background:#edf8ee;border-color:#5d8a50;color:#5d8a50;}',
        // 快速导航 (响应式适配版)
        '.quick-nav-bar{position:fixed; display:none!important; z-index:2500; pointer-events:auto;}',
        '.nav-jump-btn{width:82px; height:46px; border:1.8px solid #d5c8b2; border-radius:12px; background:#fff; color:#5d4037; font-size:13px; font-weight:800; cursor:pointer; transition:all .2s; box-shadow:0 8px 25px rgba(93,64,55,0.15); display:flex; align-items:center; justify-content:center; text-align:center; line-height:1.2;}',
        '.nav-jump-btn:hover{background:#fdfaf3; border-color:#c05b4d; color:#a82e2e; transform:scale(1.05);}',
        // 电脑端：纵向排列，带左装饰条
        '@media(min-width:861px){ .quick-nav-bar{flex-direction:column; gap:8px;} .nav-jump-btn{border-left:4px solid #c05b4d;} }',
        // 手机端：横向排列，底装饰条，不随电脑端位置变化
        '@media(max-width:860px){',
        '  .quick-nav-bar{flex-direction:row; gap:10px; width:auto;}',
        '  .nav-jump-btn{flex:1; width:auto; height:48px; border-bottom:4px solid #c05b4d; font-size:14px;}',
        '}',
        // 自定义美化弹窗
        '.ziyong-modal-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(93,64,55,0.4);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:9999;opacity:0;visibility:hidden;transition:all .3s ease;}',
        '.ziyong-modal-overlay.show{opacity:1;visibility:visible;}',
        '.ziyong-modal-card{background:#fffcf5;width:320px;border-radius:20px;padding:30px 20px;text-align:center;box-shadow:0 15px 50px rgba(0,0,0,0.2);border:1px solid #e8e2d4;transform:scale(0.85);transition:transform .3s cubic-bezier(0.175, 0.885, 0.32, 1.2);}',
        '.ziyong-modal-overlay.show .ziyong-modal-card{transform:scale(1);}',
        '.ziyong-modal-icon{font-size:36px;margin-bottom:15px;}',
        '.ziyong-modal-title{font-size:18px;font-weight:800;color:#5d4037;margin-bottom:12px;}',
        '.ziyong-modal-msg{font-size:14px;color:#8d7365;line-height:1.6;margin-bottom:25px;}',
        '.ziyong-modal-btns{display:flex;gap:12px;}',
        '.ziyong-modal-btn{flex:1;height:44px;border-radius:12px;font-size:14px;font-weight:700;cursor:pointer;transition:all .2s;border:none;}',
        '.ziyong-modal-btn.cancel{background:#e8e2d4;color:#5d4037;}',
        '.ziyong-modal-btn.cancel:hover{background:#d7ccc8;}',
        '.ziyong-modal-btn.confirm{background:#d85c50;color:#fff;}',
        '.ziyong-modal-btn.confirm:hover{background:#c1483d;box-shadow:0 5px 15px rgba(216,92,80,0.3);}',
        '.ziyong-toast{position:fixed;top:50px;left:50%;transform:translateX(-50%) translateY(-20px);padding:12px 24px;background:#5d4037;color:#fff;border-radius:30px;font-size:14px;z-index:10000;opacity:0;transition:all .4s ease;box-shadow:0 10px 30px rgba(0,0,0,0.2);}',
        '.ziyong-toast.show{opacity:1;transform:translateX(-50%) translateY(0);}',
        // 奖励预览增强 (全局浮窗版)
        '.reward-badge-container{position:relative;}',
        '.reward-badge{display:inline-flex; align-items:center; background:#fff5f2; color:#c05b4d; border:1px solid #f9d9d5; border-radius:12px; padding:2px 8px; font-size:11px; font-weight:700; cursor:help; transition:all .2s; user-select:none;}',
        '.reward-badge:hover{background:#d85c50; color:#fff; transform:scale(1.05);}',
        '#rewardGlobalPopup{display:none; position:fixed; z-index:9999; pointer-events:none; transition:all 0.25s cubic-bezier(0.165, 0.84, 0.44, 1.1); opacity:0; transform: translateY(10px) scale(0.96);}',
        '#rewardGlobalPopup.visible{opacity:1; transform: translateY(0) scale(1);}',
        '.reward-popup{width:260px; background:rgba(255,255,255,0.98); backdrop-filter:blur(12px); border:1.2px solid #f3e9da; border-radius:12px; padding:12px; box-shadow:0 15px 45px rgba(192,91,77,0.25); max-height:calc(100vh - 60px); overflow-y:auto; display:flex; flex-direction:column;}',
        '.reward-popup::-webkit-scrollbar{width:4px;}',
        '.reward-popup::-webkit-scrollbar-thumb{background:#e8dcc5; border-radius:10px;}',
        '.reward-v-path{position:absolute; left:6px; top:12px; bottom:12px; width:3px; background:#efede8; border-radius:3px; z-index:1;}',
        '.reward-v-fill{position:absolute; left:6px; top:12px; width:3px; border-radius:3px; z-index:2; transition:height .5s cubic-bezier(0.34, 1.4, 0.64, 1);}',
        '.reward-v-fill.act{background:#d85c50; box-shadow:0 0 8px rgba(216,92,80,0.3);}',
        '.reward-v-fill.sim{background:#a67c52; opacity:0.9;}',
        '.reward-popup-row.reached-act{opacity:1; transform:translateX(3px); transition:all .3s;}',
        '.reward-popup-row.reached-act .reward-popup-pts{background:#d85c50 !important; color:#fff !important; border-color:#c05b4d !important; box-shadow:0 2px 6px rgba(216,92,80,0.3);}',
        '.reward-popup-row.reached-sim .reward-popup-pts{background:#ede0d4 !important; color:#8d6e63 !important; border-color:#d7ccc8 !important; font-weight:800;}',
        '.reward-popup-title { text-align:center; font-size:13px; font-weight:800; color:#5d4037; margin-bottom:10px; border-bottom:1.5px solid #f3e9da; padding-bottom:6px; letter-spacing:0.5px; position:sticky; top:0; background:rgba(255,255,255,0.98); z-index:3; backdrop-filter:blur(5px);}',
        '.reward-popup-row{display:flex; align-items:center; gap:8px; margin-bottom:6px; font-size:11px; line-height:1.4;}',
        '.reward-popup-row:last-child{margin-bottom:0;}',
        '.reward-popup-pts{background:#fff3e3; color:#a67c52; padding:2px 6px; border-radius:4px; font-weight:800; min-width:55px; text-align:center; border:1px solid #ffeeba;}',
        '.reward-popup-items{color:#7a6f66; flex:1; overflow:hidden; text-overflow:ellipsis;}',
        '.sync-time-msg{font-size:11px;color:#8d7365;font-weight:500;white-space:nowrap;opacity:0.8;font-family:serif;}',
        '.pts-pop{animation:ptsPop .4s cubic-bezier(0.175, 0.885, 0.32, 1.275); display:inline-block;}',
        '@keyframes ptsPop{0%{transform:scale(1);}50%{transform:scale(1.25);color:#d85c50;}100%{transform:scale(1);}}',
        '.floating-pts{position:absolute;pointer-events:none;color:#d85c50;font-weight:800;font-size:18px;z-index:9999;animation:floatPts .8s ease-out forwards;text-shadow:0 2px 4px rgba(0,0,0,0.1);}',
        '@keyframes floatPts{0%{opacity:0;transform:translateY(0);}20%{opacity:1;transform:translateY(-15px);}100%{opacity:0;transform:translateY(-50px);}}',
        '@keyframes spinRate{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}'
    ].join('');
    document.head.appendChild(s);
})();

// 程序入口
if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', initKrypton); }
else { initKrypton(); }
