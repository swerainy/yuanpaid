// ============================================================
//  广陵资用案 · krypton.js  (merged 版本)
//  数据来源：yuanpaid/src/data.ts + rewards.ts
//  功能：礼包购物车、汇率换算、每抽单价、累充里程碑悬浮面板
// ============================================================

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
        { id: 1,  name: "年卡",         pts: 2280, limit: 1,   draws: 180, priceUsd: 37.99, category: "超值",   sortId: 10 },
        { id: 2,  name: "半年卡",       pts: 1200, limit: 1,   draws: 90,  priceUsd: 19.99, category: "超值",   sortId: 10 },
        { id: 3,  name: "季卡",         pts: 720,  limit: 1,   draws: 45,  priceUsd: 11.99, category: "超值",   sortId: 10 },
        { id: 4,  name: "广陵金库",     pts: 600,  limit: 1,   draws: 34,  priceUsd: 9.99,  category: "超值",   sortId: 10 },
        { id: 97, name: "地宫秘宝",     pts: 900,  limit: 1,   draws: 22,  priceUsd: 14.99, category: "超值",   sortId: 40 },
        { id: 87, name: "密探特训37期", pts: 780,  limit: 1,   draws: 0,   priceUsd: 12.99, category: "超值",   sortId: 50 },
        { id: 88, name: "密探特训38期", pts: 780,  limit: 1,   draws: 0,   priceUsd: 12.99, category: "超值",   sortId: 50 },
        { id: 101,name: "主线助力",     pts: 1200, limit: 2,   draws: 0,   priceUsd: 19.99, category: "其他",   sortId: 50 },
        { id: 6,  name: "卡池超值",     pts: 60,   limit: 1,   draws: 2,   priceUsd: 0.99,  category: "卡池",   sortId: 20 },
        { id: 11, name: "卡池特惠",     pts: 300,  limit: 1,   draws: 5,   priceUsd: 4.99,  category: "卡池",   sortId: 20 },
        { id: 12, name: "卡池初级",     pts: 600,  limit: 1,   draws: 10,  priceUsd: 9.99,  category: "卡池",   sortId: 20 },
        { id: 15, name: "卡池助力",     pts: 780,  limit: 3,   draws: 10,  priceUsd: 12.99, category: "卡池",   sortId: 20 },
        { id: 16, name: "卡池中级",     pts: 1200, limit: 1,   draws: 14,  priceUsd: 19.99, category: "卡池",   sortId: 20 },
        { id: 19, name: "卡池高级",     pts: 1800, limit: 1,   draws: 18,  priceUsd: 29.99, category: "卡池",   sortId: 20 },
        { id: 21, name: "卡池特级",     pts: 3000, limit: 1,   draws: 25,  priceUsd: 49.99, category: "卡池",   sortId: 20 },
        { id: 23, name: "卡池终极",     pts: 6000, limit: 1,   draws: 40,  priceUsd: 99.99, category: "卡池",   sortId: 20 },
        { id: 24, name: "卡池豪华",     pts: 6000, limit: 2,   draws: 40,  priceUsd: 99.99, category: "卡池",   sortId: 20 },
        { id: 5,  name: "贤士礼包1",   pts: 60,   limit: 2,   draws: 2,   priceUsd: 0.99,  category: "贤士",   sortId: 30 },
        { id: 7,  name: "贤士礼包1.2", pts: 120,  limit: 2,   draws: 4,   priceUsd: 1.99,  category: "贤士",   sortId: 30 },
        { id: 8,  name: "贤士礼包2",   pts: 180,  limit: 3,   draws: 5,   priceUsd: 2.99,  category: "贤士",   sortId: 30 },
        { id: 9,  name: "贤士礼包2.1", pts: 300,  limit: 3,   draws: 8,   priceUsd: 4.99,  category: "贤士",   sortId: 30 },
        { id: 10, name: "贤士礼包3",   pts: 600,  limit: 3,   draws: 12,  priceUsd: 9.99,  category: "贤士",   sortId: 30 },
        { id: 13, name: "贤士礼包3.1", pts: 900,  limit: 3,   draws: 15,  priceUsd: 14.99, category: "贤士",   sortId: 30 },
        { id: 14, name: "贤士礼包3.2", pts: 1200, limit: 5,   draws: 16,  priceUsd: 19.99, category: "贤士",   sortId: 30 },
        { id: 17, name: "贤士礼包3.3", pts: 1800, limit: 5,   draws: 20,  priceUsd: 29.99, category: "贤士",   sortId: 30 },
        { id: 20, name: "贤士礼包3.4", pts: 3000, limit: 5,   draws: 28,  priceUsd: 49.99, category: "贤士",   sortId: 30 },
        { id: 22, name: "贤士礼包3.5", pts: 6000, limit: 10,  draws: 45,  priceUsd: 99.99, category: "贤士",   sortId: 30 },
        { id: 89, name: "善恶簿体验包", pts: 60,   limit: 2,  draws: 0,   priceUsd: 0.99,  category: "贤士",   sortId: 31, extra: "10 善恶簿" },
        { id: 90, name: "善恶簿精选包", pts: 120,  limit: 2,  draws: 0,   priceUsd: 1.99,  category: "贤士",   sortId: 31, extra: "18 善恶簿" },
        { id: 91, name: "善恶簿高阶包", pts: 360,  limit: 2,  draws: 0,   priceUsd: 5.99,  category: "贤士",   sortId: 31, extra: "35 善恶簿" },
        { id: 92, name: "善恶簿丰盈包", pts: 1200, limit: 5,  draws: 0,   priceUsd: 19.99, category: "贤士",   sortId: 31, extra: "80 善恶簿" },
        { id: 93, name: "功过格体验包", pts: 120,  limit: 2,  draws: 0,   priceUsd: 1.99,  category: "贤士",   sortId: 32, extra: "10 功过格" },
        { id: 94, name: "功过格精选包", pts: 300,  limit: 2,  draws: 0,   priceUsd: 4.99,  category: "贤士",   sortId: 32, extra: "18 功过格" },
        { id: 95, name: "功过格高阶包", pts: 600,  limit: 2,  draws: 0,   priceUsd: 9.99,  category: "贤士",   sortId: 32, extra: "28 功过格" },
        { id: 96, name: "功过格丰盈包", pts: 1440, limit: 5,  draws: 0,   priceUsd: 23.99, category: "贤士",   sortId: 32, extra: "50 功过格" },
        { id: 98, name: "体力体验包",   pts: 60,   limit: 2,  draws: 0,   priceUsd: 0.99,  category: "贤士",   sortId: 33, extra: "4 体力" },
        { id: 99, name: "体力精选包",   pts: 180,  limit: 2,  draws: 0,   priceUsd: 2.99,  category: "贤士",   sortId: 33, extra: "8 体力" },
        { id: 100,name: "体力高阶包",   pts: 300,  limit: 5,  draws: 0,   priceUsd: 4.99,  category: "贤士",   sortId: 33, extra: "11 体力" },
        { id: 18, name: "首充双倍60",   pts: 60,   limit: 1,  draws: 0.6, priceUsd: 0.99,  category: "其他",   sortId: 50 },
        { id: 25, name: "首充双倍300",  pts: 300,  limit: 1,  draws: 3,   priceUsd: 4.99,  category: "其他",   sortId: 50 },
        { id: 26, name: "首充双倍900",  pts: 900,  limit: 1,  draws: 9,   priceUsd: 14.99, category: "其他",   sortId: 50 },
        { id: 27, name: "首充双倍1800", pts: 1800, limit: 1,  draws: 18,  priceUsd: 29.99, category: "其他",   sortId: 50 },
        { id: 28, name: "首充双倍3000", pts: 3000, limit: 1,  draws: 30,  priceUsd: 49.99, category: "其他",   sortId: 50 },
        { id: 29, name: "首充双倍6000", pts: 6000, limit: 1,  draws: 60,  priceUsd: 99.99, category: "其他",   sortId: 50 },
        // 恋念礼包
        { id: 30, name: "孙策·金窗绣户恋念礼包1", pts: 900,  limit: 1,   draws: 0, priceUsd: 14.99, category: "恋念", sortId: 40, extra: "40 阴文·金窗" },
        { id: 31, name: "孙策·金窗绣户恋念礼包2", pts: 600,  limit: 6,   draws: 0, priceUsd: 9.99,  category: "恋念", sortId: 40, extra: "20 阴文·金窗" },
        { id: 32, name: "孙策·金窗绣户恋念礼包3", pts: 1200, limit: 999, draws: 0, priceUsd: 19.99, category: "恋念", sortId: 40, extra: "20 阴文·金窗" },
        { id: 33, name: "左慈·乌飞恋念礼包1",     pts: 900,  limit: 1,   draws: 0, priceUsd: 14.99, category: "恋念", sortId: 40, extra: "40 阴文·乌飞" },
        { id: 34, name: "左慈·乌飞恋念礼包2",     pts: 600,  limit: 6,   draws: 0, priceUsd: 9.99,  category: "恋念", sortId: 40, extra: "20 阴文·乌飞" },
        { id: 35, name: "左慈·乌飞恋念礼包3",     pts: 1200, limit: 999, draws: 0, priceUsd: 19.99, category: "恋念", sortId: 40, extra: "20 阴文·乌飞" },
        { id: 36, name: "袁基·若书之说恋念礼包1",  pts: 900,  limit: 1,   draws: 0, priceUsd: 14.99, category: "恋念", sortId: 40, extra: "40 阴文·若书" },
        { id: 37, name: "袁基·若书之说恋念礼包2",  pts: 600,  limit: 6,   draws: 0, priceUsd: 9.99,  category: "恋念", sortId: 40, extra: "20 阴文·若书" },
        { id: 38, name: "袁基·若书之说恋念礼包3",  pts: 1200, limit: 999, draws: 0, priceUsd: 19.99, category: "恋念", sortId: 40, extra: "20 阴文·若书" },
        { id: 39, name: "傅融·乌云白云恋念礼包1",  pts: 900,  limit: 1,   draws: 0, priceUsd: 14.99, category: "恋念", sortId: 40, extra: "40 阴文·乌云" },
        { id: 40, name: "傅融·乌云白云恋念礼包2",  pts: 600,  limit: 6,   draws: 0, priceUsd: 9.99,  category: "恋念", sortId: 40, extra: "20 阴文·乌云" },
        { id: 41, name: "傅融·乌云白云恋念礼包3",  pts: 1200, limit: 999, draws: 0, priceUsd: 19.99, category: "恋念", sortId: 40, extra: "20 阴文·乌云" },
        { id: 42, name: "刘辩·浮白与离光恋念礼包1", pts: 900, limit: 1,   draws: 0, priceUsd: 14.99, category: "恋念", sortId: 40, extra: "40 阴文·浮白" },
        { id: 43, name: "刘辩·浮白与离光恋念礼包2", pts: 600, limit: 6,   draws: 0, priceUsd: 9.99,  category: "恋念", sortId: 40, extra: "20 阴文·浮白" },
        { id: 44, name: "刘辩·浮白与离光恋念礼包3", pts: 1200,limit: 999, draws: 0, priceUsd: 19.99, category: "恋念", sortId: 40, extra: "20 阴文·浮白" },
        { id: 45, name: "孙策·狐截尾恋念礼包1",   pts: 900,  limit: 1,   draws: 0, priceUsd: 14.99, category: "恋念", sortId: 40, extra: "40 阴文·截尾" },
        { id: 46, name: "孙策·狐截尾恋念礼包2",   pts: 600,  limit: 6,   draws: 0, priceUsd: 9.99,  category: "恋念", sortId: 40, extra: "20 阴文·截尾" },
        { id: 47, name: "孙策·狐截尾恋念礼包3",   pts: 1200, limit: 999, draws: 0, priceUsd: 19.99, category: "恋念", sortId: 40, extra: "20 阴文·截尾" },
        { id: 48, name: "傅融·神游恋念礼包1",     pts: 900,  limit: 1,   draws: 0, priceUsd: 14.99, category: "恋念", sortId: 40, extra: "40 阴文·神游" },
        { id: 49, name: "傅融·神游恋念礼包2",     pts: 600,  limit: 6,   draws: 0, priceUsd: 9.99,  category: "恋念", sortId: 40, extra: "20 阴文·神游" },
        { id: 50, name: "傅融·神游恋念礼包3",     pts: 1200, limit: 999, draws: 0, priceUsd: 19.99, category: "恋念", sortId: 40, extra: "20 阴文·神游" },
        { id: 51, name: "左慈·紫藤醉日恋念礼包1", pts: 900,  limit: 1,   draws: 0, priceUsd: 14.99, category: "恋念", sortId: 40, extra: "40 阴文·紫藤" },
        { id: 52, name: "左慈·紫藤醉日恋念礼包2", pts: 600,  limit: 6,   draws: 0, priceUsd: 9.99,  category: "恋念", sortId: 40, extra: "20 阴文·紫藤" },
        { id: 53, name: "左慈·紫藤醉日恋念礼包3", pts: 1200, limit: 999, draws: 0, priceUsd: 19.99, category: "恋念", sortId: 40, extra: "20 阴文·紫藤" },
        { id: 54, name: "袁基·却扇歌恋念礼包1",   pts: 900,  limit: 1,   draws: 0, priceUsd: 14.99, category: "恋念", sortId: 40, extra: "40 阴文·却扇" },
        { id: 55, name: "袁基·却扇歌恋念礼包2",   pts: 600,  limit: 6,   draws: 0, priceUsd: 9.99,  category: "恋念", sortId: 40, extra: "20 阴文·却扇" },
        { id: 56, name: "袁基·却扇歌恋念礼包3",   pts: 1200, limit: 999, draws: 0, priceUsd: 19.99, category: "恋念", sortId: 40, extra: "20 阴文·却扇" },
        { id: 57, name: "刘辩·极乐之宴恋念礼包1", pts: 900,  limit: 1,   draws: 0, priceUsd: 14.99, category: "恋念", sortId: 40, extra: "40 阴文·极乐" },
        { id: 58, name: "刘辩·极乐之宴恋念礼包2", pts: 600,  limit: 6,   draws: 0, priceUsd: 9.99,  category: "恋念", sortId: 40, extra: "20 阴文·极乐" },
        { id: 59, name: "刘辩·极乐之宴恋念礼包3", pts: 1200, limit: 999, draws: 0, priceUsd: 19.99, category: "恋念", sortId: 40, extra: "20 阴文·极乐" },
        { id: 60, name: "孙策·师子狻猊恋念礼包1", pts: 900,  limit: 1,   draws: 0, priceUsd: 14.99, category: "恋念", sortId: 40, extra: "40 阴文·狻猊" },
        { id: 61, name: "孙策·师子狻猊恋念礼包2", pts: 600,  limit: 6,   draws: 0, priceUsd: 9.99,  category: "恋念", sortId: 40, extra: "20 阴文·狻猊" },
        { id: 62, name: "孙策·师子狻猊恋念礼包3", pts: 1200, limit: 999, draws: 0, priceUsd: 19.99, category: "恋念", sortId: 40, extra: "20 阴文·狻猊" },
        { id: 63, name: "左慈·璃魂月魄恋念礼包1", pts: 900,  limit: 1,   draws: 0, priceUsd: 14.99, category: "恋念", sortId: 40, extra: "40 阴文·璃魂" },
        { id: 64, name: "左慈·璃魂月魄恋念礼包2", pts: 600,  limit: 6,   draws: 0, priceUsd: 9.99,  category: "恋念", sortId: 40, extra: "20 阴文·璃魂" },
        { id: 65, name: "左慈·璃魂月魄恋念礼包3", pts: 1200, limit: 999, draws: 0, priceUsd: 19.99, category: "恋念", sortId: 40, extra: "20 阴文·璃魂" },
        { id: 66, name: "傅融·湖心之梦恋念礼包1", pts: 900,  limit: 1,   draws: 0, priceUsd: 14.99, category: "恋念", sortId: 40, extra: "40 阴文·湖心" },
        { id: 67, name: "傅融·湖心之梦恋念礼包2", pts: 600,  limit: 6,   draws: 0, priceUsd: 9.99,  category: "恋念", sortId: 40, extra: "20 阴文·湖心" },
        { id: 68, name: "傅融·湖心之梦恋念礼包3", pts: 1200, limit: 999, draws: 0, priceUsd: 19.99, category: "恋念", sortId: 40, extra: "20 阴文·湖心" },
        { id: 69, name: "孙策·围城恋念礼包1",     pts: 900,  limit: 1,   draws: 0, priceUsd: 14.99, category: "恋念", sortId: 40, extra: "40 阴文·围城" },
        { id: 70, name: "孙策·围城恋念礼包2",     pts: 600,  limit: 6,   draws: 0, priceUsd: 9.99,  category: "恋念", sortId: 40, extra: "20 阴文·围城" },
        { id: 71, name: "孙策·围城恋念礼包3",     pts: 1200, limit: 999, draws: 0, priceUsd: 19.99, category: "恋念", sortId: 40, extra: "20 阴文·围城" },
        { id: 72, name: "袁基·盛宴恋念礼包1",     pts: 900,  limit: 1,   draws: 0, priceUsd: 14.99, category: "恋念", sortId: 40, extra: "40 阴文·盛宴" },
        { id: 73, name: "袁基·盛宴恋念礼包2",     pts: 600,  limit: 6,   draws: 0, priceUsd: 9.99,  category: "恋念", sortId: 40, extra: "20 阴文·盛宴" },
        { id: 74, name: "袁基·盛宴恋念礼包3",     pts: 1200, limit: 999, draws: 0, priceUsd: 19.99, category: "恋念", sortId: 40, extra: "20 阴文·盛宴" },
        { id: 75, name: "刘辩·灯之国恋念礼包1",   pts: 900,  limit: 1,   draws: 0, priceUsd: 14.99, category: "恋念", sortId: 40, extra: "40 阴文·灯之国" },
        { id: 76, name: "刘辩·灯之国恋念礼包2",   pts: 600,  limit: 6,   draws: 0, priceUsd: 9.99,  category: "恋念", sortId: 40, extra: "20 阴文·灯之国" },
        { id: 77, name: "刘辩·灯之国恋念礼包3",   pts: 1200, limit: 999, draws: 0, priceUsd: 19.99, category: "恋念", sortId: 40, extra: "20 阴文·灯之国" },
        { id: 78, name: "左慈·欲追日影恋念礼包1", pts: 900,  limit: 1,   draws: 0, priceUsd: 14.99, category: "恋念", sortId: 40, extra: "40 阴文·日影" },
        { id: 79, name: "左慈·欲追日影恋念礼包2", pts: 600,  limit: 6,   draws: 0, priceUsd: 9.99,  category: "恋念", sortId: 40, extra: "20 阴文·日影" },
        { id: 80, name: "左慈·欲追日影恋念礼包3", pts: 1200, limit: 999, draws: 0, priceUsd: 19.99, category: "恋念", sortId: 40, extra: "20 阴文·日影" },
        { id: 81, name: "傅融·梦中雪恋念礼包1",   pts: 900,  limit: 1,   draws: 0, priceUsd: 14.99, category: "恋念", sortId: 40, extra: "40 阴文·梦中雪" },
        { id: 82, name: "傅融·梦中雪恋念礼包2",   pts: 600,  limit: 6,   draws: 0, priceUsd: 9.99,  category: "恋念", sortId: 40, extra: "20 阴文·梦中雪" },
        { id: 83, name: "傅融·梦中雪恋念礼包3",   pts: 1200, limit: 999, draws: 0, priceUsd: 19.99, category: "恋念", sortId: 40, extra: "20 阴文·梦中雪" },
        { id: 84, name: "刘辩·魇恋念礼包1",       pts: 900,  limit: 1,   draws: 0, priceUsd: 14.99, category: "恋念", sortId: 40, extra: "40 阴文·魇" },
        { id: 85, name: "刘辩·魇恋念礼包2",       pts: 600,  limit: 6,   draws: 0, priceUsd: 9.99,  category: "恋念", sortId: 40, extra: "20 阴文·魇" },
        { id: 86, name: "刘辩·魇恋念礼包3",       pts: 1200, limit: 999, draws: 0, priceUsd: 19.99, category: "恋念", sortId: 40, extra: "20 阴文·魇" }
    ],

    // ---------- 如鸢礼包（CNY计价，40个） ----------
    packsRuyuan: [
        { id: 1,  name: "年卡",         pts: 2480, limit: 1,  draws: 180, priceCny: 248,  category: "超值", sortId: 10 },
        { id: 3,  name: "季卡",         pts: 720,  limit: 1,  draws: 45,  priceCny: 72,   category: "超值", sortId: 10 },
        { id: 4,  name: "广陵金库",     pts: 680,  limit: 1,  draws: 34,  priceCny: 68,   category: "超值", sortId: 10 },
        { id: 31, name: "地宫秘宝",     pts: 980,  limit: 1,  draws: 22,  priceCny: 98,   category: "超值", sortId: 40 },
        { id: 30, name: "密探特训",     pts: 780,  limit: 1,  draws: 0,   priceCny: 78,   category: "超值", sortId: 50 },
        { id: 6,  name: "卡池超值",     pts: 60,   limit: 1,  draws: 2,   priceCny: 6,    category: "卡池", sortId: 20 },
        { id: 11, name: "卡池特惠",     pts: 300,  limit: 1,  draws: 5,   priceCny: 30,   category: "卡池", sortId: 20 },
        { id: 12, name: "卡池初级",     pts: 680,  limit: 1,  draws: 10,  priceCny: 68,   category: "卡池", sortId: 20 },
        { id: 15, name: "卡池助力",     pts: 780,  limit: 3,  draws: 10,  priceCny: 78,   category: "卡池", sortId: 20 },
        { id: 16, name: "卡池中级",     pts: 1280, limit: 1,  draws: 14,  priceCny: 128,  category: "卡池", sortId: 20 },
        { id: 19, name: "卡池高级",     pts: 1980, limit: 1,  draws: 18,  priceCny: 198,  category: "卡池", sortId: 20 },
        { id: 21, name: "卡池特级",     pts: 3280, limit: 1,  draws: 25,  priceCny: 328,  category: "卡池", sortId: 20 },
        { id: 23, name: "卡池终极",     pts: 6480, limit: 1,  draws: 40,  priceCny: 648,  category: "卡池", sortId: 20 },
        { id: 24, name: "卡池豪华",     pts: 6480, limit: 2,  draws: 40,  priceCny: 648,  category: "卡池", sortId: 20 },
        { id: 5,  name: "贤士礼包1",   pts: 60,   limit: 2,  draws: 2,   priceCny: 6,    category: "贤士", sortId: 30 },
        { id: 7,  name: "贤士礼包1.2", pts: 120,  limit: 2,  draws: 4,   priceCny: 12,   category: "贤士", sortId: 30 },
        { id: 8,  name: "贤士礼包2",   pts: 180,  limit: 3,  draws: 5,   priceCny: 18,   category: "贤士", sortId: 30 },
        { id: 9,  name: "贤士礼包2.1", pts: 300,  limit: 3,  draws: 8,   priceCny: 30,   category: "贤士", sortId: 30 },
        { id: 10, name: "贤士礼包3",   pts: 680,  limit: 3,  draws: 12,  priceCny: 68,   category: "贤士", sortId: 30 },
        { id: 13, name: "贤士礼包3.1", pts: 980,  limit: 3,  draws: 15,  priceCny: 98,   category: "贤士", sortId: 30 },
        { id: 14, name: "贤士礼包3.2", pts: 1280, limit: 5,  draws: 16,  priceCny: 128,  category: "贤士", sortId: 30 },
        { id: 17, name: "贤士礼包3.3", pts: 1980, limit: 5,  draws: 20,  priceCny: 198,  category: "贤士", sortId: 30 },
        { id: 20, name: "贤士礼包3.4", pts: 3280, limit: 5,  draws: 28,  priceCny: 328,  category: "贤士", sortId: 30 },
        { id: 22, name: "贤士礼包3.5", pts: 6480, limit: 10, draws: 45,  priceCny: 648,  category: "贤士", sortId: 30 },
        { id: 89, name: "善恶簿体验包", pts: 60,   limit: 2, draws: 0,   priceCny: 6,    category: "贤士", sortId: 31, extra: "10 善恶簿" },
        { id: 90, name: "善恶簿精选包", pts: 120,  limit: 2, draws: 0,   priceCny: 12,   category: "贤士", sortId: 31, extra: "18 善恶簿" },
        { id: 91, name: "善恶簿高阶包", pts: 360,  limit: 2, draws: 0,   priceCny: 36,   category: "贤士", sortId: 31, extra: "35 善恶簿" },
        { id: 92, name: "善恶簿丰盈包", pts: 1280, limit: 5, draws: 0,   priceCny: 128,  category: "贤士", sortId: 31, extra: "80 善恶簿" },
        { id: 93, name: "功过格体验包", pts: 120,  limit: 2, draws: 0,   priceCny: 12,   category: "贤士", sortId: 32, extra: "10 功过格" },
        { id: 94, name: "功过格精选包", pts: 300,  limit: 2, draws: 0,   priceCny: 30,   category: "贤士", sortId: 32, extra: "18 功过格" },
        { id: 95, name: "功过格高阶包", pts: 680,  limit: 2, draws: 0,   priceCny: 68,   category: "贤士", sortId: 32, extra: "28 功过格" },
        { id: 96, name: "功过格丰盈包", pts: 1580, limit: 5, draws: 0,   priceCny: 158,  category: "贤士", sortId: 32, extra: "50 功过格" },
        { id: 98, name: "体力体验包",   pts: 60,   limit: 2, draws: 0,   priceCny: 6,    category: "贤士", sortId: 33, extra: "4 体力" },
        { id: 99, name: "体力精选包",   pts: 180,  limit: 2, draws: 0,   priceCny: 18,   category: "贤士", sortId: 33, extra: "8 体力" },
        { id: 100,name: "体力高阶包",   pts: 300,  limit: 5, draws: 0,   priceCny: 30,   category: "贤士", sortId: 33, extra: "11 体力" },
        { id: 18, name: "首充双倍60",   pts: 60,   limit: 1, draws: 0.6, priceCny: 6,    category: "其他", sortId: 50 },
        { id: 25, name: "首充双倍300",  pts: 300,  limit: 1, draws: 3,   priceCny: 30,   category: "其他", sortId: 50 },
        { id: 26, name: "首充双倍900",  pts: 980,  limit: 1, draws: 9,   priceCny: 98,   category: "其他", sortId: 50 },
        { id: 27, name: "首充双倍1800", pts: 1980, limit: 1, draws: 18,  priceCny: 198,  category: "其他", sortId: 50 },
        { id: 28, name: "首充双倍3000", pts: 3280, limit: 1, draws: 30,  priceCny: 328,  category: "其他", sortId: 50 },
        { id: 29, name: "首充双倍6000", pts: 6480, limit: 1, draws: 60,  priceCny: 648,  category: "其他", sortId: 50 }
    ],

    // ---------- 周年限时累充 Track1（14档，截止2026-04-29） ----------
    track1: [
        { pts: 100,   rewards: [{name:'符传',count:1},{name:'五铢钱',count:100000}] },
        { pts: 300,   rewards: [{name:'善恶簿',count:10},{name:'兵书残卷',count:100}] },
        { pts: 500,   rewards: [{name:'符传',count:2},{name:'白金币',count:200}] },
        { pts: 1000,  rewards: [{name:'符传',count:2},{name:'解谪瓶',count:30},{name:'白金币',count:300}] },
        { pts: 2400,  rewards: [{name:'功过格',count:10},{name:'防务情报',count:10},{name:'市井情报',count:10}] },
        { pts: 5000,  rewards: [{name:'符传',count:3},{name:'节气情报',count:10}] },
        { pts: 10000, rewards: [{name:'符传',count:3},{name:'豪门情报',count:10},{name:'地脉情报',count:10}] },
        { pts: 16000, rewards: [{name:'善恶簿',count:20},{name:'功过格',count:10}] },
        { pts: 20000, rewards: [{name:'符传',count:5},{name:'善恶簿',count:20},{name:'五铢钱',count:500000}] },
        { pts: 25000, rewards: [{name:'密探自选·金蟾',count:1},{name:'善恶簿',count:20},{name:'星图箱',count:1}] },
        { pts: 35000, rewards: [{name:'符传',count:10},{name:'装金玻璃',count:1}] },
        { pts: 45000, rewards: [{name:'符传',count:10},{name:'功过格',count:10},{name:'六韬兵书',count:10}] },
        { pts: 55000, rewards: [{name:'骨算筹',count:2},{name:'金算筹',count:2},{name:'善恶簿',count:20}] },
        { pts: 60000, rewards: [{name:'密探自选·金蟾',count:1},{name:'云中殿（背景）',count:1},{name:'星图箱',count:2}] }
    ],

    // ---------- 男主限时累充 Track2（14档，截止联动日历） ----------
    track2: [
        { pts: 150,   rewards: [{name:'符传',count:1},{name:'蒹葭',count:2},{name:'兵书残卷',count:30}] },
        { pts: 450,   rewards: [{name:'符传',count:1},{name:'蒹葭',count:3},{name:'兵书残卷',count:50}] },
        { pts: 700,   rewards: [{name:'符传',count:2},{name:'五铢钱',count:30000},{name:'兵书残卷',count:70}] },
        { pts: 1000,  rewards: [{name:'符传',count:2},{name:'蒹葭',count:5},{name:'体力',count:40}] },
        { pts: 1500,  rewards: [{name:'符传',count:2},{name:'蒹葭',count:5},{name:'体力',count:40}] },
        { pts: 2000,  rewards: [{name:'符传',count:3},{name:'五铢钱',count:60000},{name:'兵书残卷',count:10}] },
        { pts: 3000,  rewards: [{name:'互动道具',count:1},{name:'五铢钱',count:70000},{name:'蒹葭',count:5}] },
        { pts: 5000,  rewards: [{name:'紫色星石',count:1},{name:'五铢钱',count:80000},{name:'点头之交',count:8}] },
        { pts: 10000, rewards: [{name:'符传',count:5},{name:'五铢钱',count:90000},{name:'兵书全卷',count:5}] },
        { pts: 15000, rewards: [{name:'橙色星石',count:1},{name:'五铢钱',count:100000},{name:'善恶簿',count:5}] },
        { pts: 20000, rewards: [{name:'鸢记',count:1},{name:'五铢钱',count:100000},{name:'善恶簿',count:5}] },
        { pts: 25000, rewards: [{name:'互动道具',count:1},{name:'五铢钱',count:150000},{name:'倾盖之交',count:3}] },
        { pts: 30000, rewards: [{name:'装金玻璃',count:1},{name:'五铢钱',count:150000},{name:'功过格',count:2}] },
        { pts: 35000, rewards: [{name:'头像框',count:1},{name:'称号',count:1},{name:'六韬兵书',count:5},{name:'五铢钱',count:200000}] }
    ],

    // ---------- 鸢起礼盒·三 累充档位 ----------
    rewardTiers: [150000, 300000, 450000, 600000, 750000],
    cumulativeTiers: {
        '万氪礼盒统计': [2000, 5000, 10000],
        '累充池': [1000, 2000, 5000, 10000],
        '鸢起礼盒·三': [60000, 150000, 300000, 450000, 600000, 750000]
    }
};

// 当前版本的礼包列表（动态指向）
function getActivePacks(version) {
    return version === 'daihao' ? KRYPTON_DATA.packsDaihao : KRYPTON_DATA.packsRuyuan;
}


// ==============================================================
//  initKrypton v3 — qty-map状态 + 原版卡片 + 购物车 + 粘性栏
// ==============================================================
function initKrypton() {
    console.log('[Krypton] v3 初始化中...');
    try {
        var rechargeDateInput   = document.getElementById('rechargeDate');
        var totalActualPtsEl    = document.getElementById('totalActualPts');
        var totalSimulatedPtsEl = document.getElementById('totalSimulatedPts');
        var activityContainer   = document.getElementById('activityContainer');
        var packList            = document.getElementById('packList');
        var yuanqiContainer     = document.getElementById('yuanqiContainer');
        var recordsBody         = document.getElementById('recordsBody');
        var packCatTabs         = document.getElementById('packCatTabs');
        var shopTitle           = document.getElementById('shopTitle');
        var exchangeRateInput   = document.getElementById('exchangeRateInput');
        var cartItemList        = document.getElementById('cartItemList');
        var cartStats           = document.getElementById('cartStats');
        if (!rechargeDateInput || !packList) { console.error('[Krypton] 缺少关键DOM'); return; }

        // ── 状态 ──
        var currentVersion = 'daihao';
        var exchangeRate   = 7.2;
        var eventsData     = [];
        var animStates     = {};
        var activeCategory = '全部';
        var drawFilter     = 'all';
        var collapsedCats  = {};
        // qty-map: key = "packName|YYYY-MM-DD" → count
        var simQtyMap = {};
        var actQtyMap = {};

        // ── 工具 ──
        function normDate(d) { return d ? d.replace(/\//g,'-').split('T')[0] : ''; }

        function animateValue(el, start, end, dur) {
            var t0 = null;
            function step(ts) {
                if (!t0) t0 = ts;
                var p = Math.min((ts-t0)/dur,1), e = p===1?1:1-Math.pow(2,-10*p);
                el.innerText = Math.floor(e*(end-start)+start).toLocaleString();
                if (p < 1) requestAnimationFrame(step); else el.innerText = end.toLocaleString();
            }
            requestAnimationFrame(step);
        }
        function setAnimVal(el, v) {
            if (!el) return;
            var old = animStates[el.id] !== undefined ? animStates[el.id] : v;
            animStates[el.id] = v;
            if (old !== v) animateValue(el, old, v, 600); else el.innerText = v.toLocaleString();
        }
        function getPackCny(pack) {
            return currentVersion === 'daihao' ? (pack.priceUsd||0)*exchangeRate : (pack.priceCny||0);
        }
        function qKey(name, date) { return name+'|'+date; }
        function getSQ(name, date) { return simQtyMap[qKey(name,date)]||0; }
        function getAQ(name, date) { return actQtyMap[qKey(name,date)]||0; }

        // ── qty操作 ──
        function addSim(pack, date) {
            var k = qKey(pack.name, date), lim = pack.limit||1, cur = simQtyMap[k]||0;
            if (cur < lim) { simQtyMap[k]=cur+1; updateAll(); }
        }
        function removeSim(pack, date) {
            var k = qKey(pack.name, date), cur = simQtyMap[k]||0;
            if (cur > 0) {
                simQtyMap[k] = cur-1; if (!simQtyMap[k]) delete simQtyMap[k];
                var ac = actQtyMap[k]||0;
                if (ac > (simQtyMap[k]||0)) { actQtyMap[k]=simQtyMap[k]||0; if (!actQtyMap[k]) delete actQtyMap[k]; }
                updateAll();
            }
        }
        // toggleActual function removed as card-check has been removed and bulk checkout is used

        // ── pts计算 ──
        function calcMapPts(qmap) {
            var packs = getActivePacks(currentVersion), total = 0;
            Object.keys(qmap).forEach(function(k) {
                var qty = qmap[k]; if (!qty) return;
                var nm = k.split('|')[0];
                for (var i=0;i<packs.length;i++) { if (packs[i].name===nm) { total+=packs[i].pts*qty; break; } }
            });
            return total;
        }
        function calcRangePts(qmap, s, e) {
            var packs = getActivePacks(currentVersion), total = 0;
            Object.keys(qmap).forEach(function(k) {
                var qty = qmap[k]; if (!qty) return;
                var parts=k.split('|'), nm=parts[0], d=parts[1];
                if (d>=s && d<=e) {
                    for (var i=0;i<packs.length;i++) { if (packs[i].name===nm) { total+=packs[i].pts*qty; break; } }
                }
            });
            return total;
        }
        function getBasePts() {
            var sb = JSON.parse(localStorage.getItem('ziyong_events_base')||'{}'), tot=0;
            Object.keys(sb).forEach(function(k){ tot+=(parseInt(sb[k])||0); });
            return tot;
        }

        // ── 存储 ──
        function saveState() {
            localStorage.setItem('ziyong_simQty', JSON.stringify(simQtyMap));
            localStorage.setItem('ziyong_actQty',  JSON.stringify(actQtyMap));
        }
        function loadState() {
            var s=localStorage.getItem('ziyong_simQty'), a=localStorage.getItem('ziyong_actQty');
            if (s) simQtyMap=JSON.parse(s);
            if (a) actQtyMap=JSON.parse(a);
            if (!s) { // 兼容旧格式
                var olds=localStorage.getItem('ziyong_simulated'), olda=localStorage.getItem('ziyong_actual');
                if (olds) JSON.parse(olds).forEach(function(h){ var k=qKey(h.name,normDate(h.date)); simQtyMap[k]=(simQtyMap[k]||0)+1; });
                if (olda) JSON.parse(olda).forEach(function(h){ var k=qKey(h.name,normDate(h.date)); actQtyMap[k]=(actQtyMap[k]||0)+1; });
            }
        }

        var now = new Date();
        var todayStr = now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0')+'-'+String(now.getDate()).padStart(2,'0');
        rechargeDateInput.value = todayStr;

        function updateRate(val) {
            exchangeRate = parseFloat(val)||7.2;
            if (exchangeRateInput) exchangeRateInput.value = val;
            renderPacks(); renderCart();
        }
        if (exchangeRateInput) exchangeRateInput.addEventListener('input', function(e){ updateRate(e.target.value); });

        function syncVersion(ver) {
            currentVersion = ver;
            var rg = document.getElementById('rateInputGroup');
            if (rg) rg.style.display = ver==='daihao' ? '' : 'none';
            var tv = ver==='daihao'?'usd':'rmb';
            document.querySelectorAll('#currencyToggleWrapper .currency-tab').forEach(function(d) {
                if (d.dataset.val===tv) d.click();
            });
            activeCategory = '全部';
            renderPackCatTabs();
            renderPacks();
        }
        document.querySelectorAll('#versionToggle .select-items div').forEach(function(item) {
            item.addEventListener('click', function() { syncVersion(item.dataset.val); });
        });

        // ── Tab ──
        document.querySelectorAll('.ziyong-tab').forEach(function(tab) {
            tab.onclick = function() {
                var t=tab.dataset.tab;
                document.querySelectorAll('.ziyong-tab').forEach(function(x){x.classList.remove('active');});
                tab.classList.add('active');
                document.querySelectorAll('.tab-content').forEach(function(c){
                    c.classList.remove('active');
                    if (c.id==='ziyong-'+t+'-content') c.classList.add('active');
                });
                if (t==='records') updateRecordsTable();
            };
        });



        // ── 事件加载 ──
        function loadEvents() {
            if (window.calendar) {
                eventsData = window.calendar.getEvents().map(function(e) {
                    return { title:e.title, start:normDate(e.startStr), end:normDate(e.endStr||e.startStr), type:e.extendedProps?e.extendedProps.type:null };
                });
            } else {
                eventsData = [].concat(window.daihaoEvents||[], window.ruyuanEvents||[]).map(function(e) {
                    return { title:e.title, start:normDate(e.start), end:normDate(e.end), type:e.type };
                });
            }
            updateAll();
        }

        // ── 分类Tab（主栏+粘性栏同步） ──
        function renderPackCatTabs() {
            var packs = getActivePacks(currentVersion), cats=['全部'], seen={};
            packs.forEach(function(p){ if (!seen[p.category]){seen[p.category]=true;cats.push(p.category);} });
            function buildTabs(container) {
                if (!container) return;
                container.innerHTML='';
                cats.forEach(function(cat) {
                    var btn=document.createElement('button');
                    btn.className='pack-cat-btn'+(cat===activeCategory?' active':'');
                    btn.textContent=cat;
                    btn.onclick=function(){
                        if (activeCategory===cat) return;
                        activeCategory=cat;
                        packList.style.transition='opacity .18s ease, transform .18s ease';
                        packList.style.opacity='0.3'; packList.style.transform='translateY(5px)';
                        
                        setTimeout(function(){
                            renderPackCatTabs(); renderPacks();
                            requestAnimationFrame(function(){ 
                                packList.style.opacity='1'; 
                                packList.style.transform='translateY(0)'; 
                                // 丝滑滚动到列表顶部或分类标题
                                var target = packList.querySelector('.category-header') || packList;
                                var offset = 180; // 考虑粘贴栏高度的偏移量
                                var topPos = target.getBoundingClientRect().top + window.pageYOffset - offset;
                                window.scrollTo({ top: topPos, behavior: 'smooth' });
                            });
                        },180);
                    };
                    container.appendChild(btn);
                });
            }
            buildTabs(packCatTabs);
        }

        // 含抽/无抽 筛选
        document.querySelectorAll('#packDrawFilter .draw-filter-btn').forEach(function(btn) {
            btn.onclick=function(){
                drawFilter=btn.dataset.filter;
                document.querySelectorAll('#packDrawFilter .draw-filter-btn').forEach(function(b){b.classList.remove('active');});
                btn.classList.add('active');
                packList.style.transition='opacity .15s ease'; packList.style.opacity='0.3';
                setTimeout(function(){ renderPacks(); packList.style.opacity='1'; },150);
            };
        });

        // ── 礼包渲染（原版卡片 + -/+ qty控件 + √ + FLIP + 排序） ──
        function renderPacks() {
            if (!packList) return;
            var allPacks = getActivePacks(currentVersion);
            var date = normDate(rechargeDateInput.value);
            var activeActTitles = eventsData.filter(function(e){ return date>=e.start&&date<=e.end; }).map(function(e){return e.title;});

            var filtered = allPacks.filter(function(p) {
                var catOk  = activeCategory==='全部'||p.category===activeCategory;
                var drawOk = drawFilter==='all'||(drawFilter==='hasDraws'&&p.draws>0)||(drawFilter==='noDraws'&&(!p.draws||p.draws<=0));
                return catOk&&drawOk;
            });
            if (shopTitle) shopTitle.textContent='礼包汇总 ('+filtered.length+')';

            // FLIP记录
            var initPos={};
            packList.querySelectorAll('.ziyong-card').forEach(function(c){ if(c.dataset.cid) initPos[c.dataset.cid]=c.getBoundingClientRect(); });

            // 分组
            var groups={}, order=[];
            filtered.forEach(function(p){ if(!groups[p.category]){groups[p.category]=[];order.push(p.category);} groups[p.category].push(p); });
            packList.innerHTML='';
            if (!filtered.length) { packList.innerHTML='<div class="no-activity">当前筛选无礼包</div>'; return; }

            order.forEach(function(cat) {
                var catPacks=groups[cat], isCollapsed=!!collapsedCats[cat];
                // 已满限购的排到末尾
                catPacks.sort(function(a,b){
                    var al=getAQ(a.name,date)>=(a.limit||1), bl=getAQ(b.name,date)>=(b.limit||1);
                    return al&&!bl?1:!al&&bl?-1:0;
                });
                var sec=document.createElement('div'); sec.className='pack-category-section';
                var hdr=document.createElement('div'); hdr.className='category-header';
                hdr.innerHTML='<div class="cat-title-row"><h3 class="category-title">'+cat+'</h3></div>'+
                    '<div class="category-actions"><button class="cat-btn cat-selall" data-cat="'+cat+'">全选</button><button class="cat-btn cat-clr" data-cat="'+cat+'">清空</button><span class="cat-toggle-icon" style="cursor:pointer; padding: 0 4px; user-select:none; color:#a08060; font-size:12px;">'+(isCollapsed?'展开 ▼':'收起 ▲')+'</span></div>';
                
                var wrapper=document.createElement('div'); wrapper.className='category-content-wrapper' + (isCollapsed?' collapsed':'');
                var inner=document.createElement('div'); inner.className='category-content-inner';
                var grid=document.createElement('div'); grid.className='category-grid';

                inner.appendChild(grid);
                wrapper.appendChild(inner);

                catPacks.forEach(function(pack) {
                    var cid=pack.category+'-'+pack.id;
                    var sq=getSQ(pack.name,date), aq=getAQ(pack.name,date), lim=pack.limit||1;
                    var maxed=aq>=lim, cny=getPackCny(pack);
                    var perDraw=pack.draws>0?(cny/pack.draws).toFixed(2):null;
                    var currency=currentVersion==='daihao'&&pack.priceUsd?'$'+pack.priceUsd:'¥'+cny.toFixed(2);

                    var isPackInAct=!pack.boundActivity||activeActTitles.some(function(t){ return t.toLowerCase().includes((pack.boundActivity||'').toLowerCase()); });
                    var card=document.createElement('div');
                    card.className='ziyong-card'; card.dataset.cid=cid;
                    if (aq>0&&aq>=sq)    card.classList.add('actual');
                    else if (sq>0)        card.classList.add('simulated');
                    if (maxed)            card.classList.add('limit-reached');
                    if (!isPackInAct)     card.classList.add('disabled');

                    var effStr=perDraw?'<div class="card-eff">'+perDraw+' 元/抽</div>':'';
                    var cnySmall=currentVersion==='daihao'&&pack.priceUsd?' <small>≈¥'+cny.toFixed(0)+'</small>':'';

                    card.innerHTML=
                        '<div class="card-body">'+
                        '  <div class="card-name">'+pack.name+'</div>'+
                        '  <div class="card-price">'+currency+cnySmall+'</div>'+
                        '  <div class="card-pts">'+pack.pts+' 积分'+(pack.draws>0?' · '+pack.draws+'抽':'')+'</div>'+
                        effStr+
                        '</div>'+
                        '<div class="card-bottom">'+
                        '  <span class="card-limit-txt" style="color:'+(maxed?'#d85c50':'#a08060')+'">'+aq+'/'+lim+'</span>'+
                        '  <div class="card-qty-ctrl">'+
                        '    <span class="qty-btn qty-minus" '+(sq<=0?'disabled':'')+'>−</span>'+
                        '    <span class="qty-num">'+sq+'</span>'+
                        '    <span class="qty-btn qty-plus"  '+(sq>=lim?'disabled':'')+'>＋</span>'+
                        '  </div>'+
                        '</div>';

                    // 点击卡片主体 = addSim (已购状态 Actual 锁定点击)
                    card.querySelector('.card-body').addEventListener('click', function(e){
                        if (!isPackInAct || maxed || aq > 0) return;
                        addSim(pack,date);
                    });
                    var minusBtn=card.querySelector('.qty-minus');
                    if(sq>0 && aq<=0) minusBtn.onclick=function(e){ e.stopPropagation(); removeSim(pack,date); };
                    if(aq>0) minusBtn.setAttribute('disabled','true');

                    var plusBtn=card.querySelector('.qty-plus');
                    if(sq<lim && aq<=0) plusBtn.onclick=function(e){ e.stopPropagation(); addSim(pack,date); };
                    if(aq>0) plusBtn.setAttribute('disabled','true');
                    grid.appendChild(card);
                });

                // 分类头事件
                hdr.querySelector('.cat-toggle-icon').onclick=function(){
                    collapsedCats[cat]=!collapsedCats[cat];
                    wrapper.classList.toggle('collapsed', collapsedCats[cat]);
                    hdr.querySelector('.cat-toggle-icon').textContent=collapsedCats[cat]?'展开 ▼':'收起 ▲';
                };
                hdr.querySelector('.cat-selall').onclick=function(e){
                    e.stopPropagation();
                    catPacks.forEach(function(p){ if(getSQ(p.name,date)<(p.limit||1)) addSim(p,date); });
                };
                hdr.querySelector('.cat-clr').onclick=function(e){
                    e.stopPropagation();
                    catPacks.forEach(function(p){
                        var k=qKey(p.name,date); delete simQtyMap[k]; delete actQtyMap[k];
                    }); updateAll();
                };

                sec.appendChild(hdr); sec.appendChild(wrapper); packList.appendChild(sec);
            });

            // FLIP动画
            requestAnimationFrame(function(){
                var anim=false;
                packList.querySelectorAll('.ziyong-card').forEach(function(c){
                    var old=initPos[c.dataset.cid]; if(!old) return;
                    var nx=c.getBoundingClientRect(), dx=old.left-nx.left, dy=old.top-nx.top;
                    if(dx||dy){ anim=true;
                        c.style.transition='none'; c.style.transform='translate('+dx+'px,'+dy+'px)';
                        c.offsetHeight;
                        c.style.transition='transform .45s cubic-bezier(0.4,0,0.2,1),background-color .3s,border-color .3s';
                        c.style.transform=''; setTimeout(function(){c.style.transition='';},450);
                    }
                });
                if(anim){packList.style.pointerEvents='none';setTimeout(function(){packList.style.pointerEvents='';},450);}
            });
        }

        // ── 购物清单（右栏下方） ──
        function renderCart() {
            if (!cartItemList) return;
            var date=normDate(rechargeDateInput.value), allPacks=getActivePacks(currentVersion);
            var items=[], totalDraws=0, totalCny=0, totalUsd=0, totalPts=0;
            allPacks.forEach(function(p){
                var sq=getSQ(p.name,date); if(!sq) return;
                var cny=getPackCny(p)*sq;
                var usd=(p.priceUsd||0)*sq;
                totalDraws+=(p.draws||0)*sq; totalCny+=cny; totalUsd+=usd; totalPts+=p.pts*sq;
                items.push({p:p,sq:sq,cny:cny,usd:usd});
            });
            if (!items.length) {
                cartItemList.innerHTML='<div class="cart-empty-msg" style="padding:15px; color:#a08060; text-align:center;">尚未选购礼包</div>';
                if (cartStats) cartStats.style.display='none';
                var div=document.getElementById('activitySectionDivider');
                if (div) div.style.display='none';
            } else {
                cartItemList.innerHTML=items.map(function(ci){
                    return '<div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:12px; border-bottom:1px solid #e8e2d4; padding-bottom:4px;">'+
                        '<span style="color:#5d4037; font-weight:600;">'+ci.p.name+'</span>'+
                        '<span style="color:#8d7365;">×'+ci.sq+' ￥'+ci.cny.toFixed(2)+'</span></div>';
                }).join('');
                if (cartStats) {
                    cartStats.style.display='';
                    var div=document.getElementById('activitySectionDivider');
                    if (div) div.style.display='';
                    
                    var sdEl=document.getElementById('statDraws');
                    var spEl=document.getElementById('statPerDraw');
                    var sptEl=document.getElementById('statTotalPts');
                    var scEl=document.getElementById('statTotalPrice');
                    var usdRow=document.getElementById('usdRow');
                    var suEl=document.getElementById('statTotalUsd');
                    if(sdEl) sdEl.textContent=totalDraws?(totalDraws % 1 === 0 ? totalDraws : totalDraws.toFixed(1))+'抽':'-';
                    if(spEl) spEl.textContent=totalDraws?'￥'+(totalCny/totalDraws).toFixed(2):'-';
                    if(sptEl) sptEl.textContent=totalPts+' 分';
                    if(usdRow) {
                        usdRow.style.display=(currentVersion==='daihao' && totalUsd>0)?'flex':'none';
                        if(suEl) suEl.textContent='$'+totalUsd.toFixed(2);
                    }
                    if(scEl) scEl.textContent='￥'+totalCny.toFixed(2);
                }
            }
        }

        var clearCartBtn=document.getElementById('clearCartBtn');
        if (clearCartBtn) clearCartBtn.onclick=function(){
            var date=normDate(rechargeDateInput.value), packs=getActivePacks(currentVersion);
            packs.forEach(function(p){ var k=qKey(p.name,date); delete simQtyMap[k]; delete actQtyMap[k]; });
            updateAll();
        };

        var checkoutBtn=document.getElementById('checkoutBtn');
        if (checkoutBtn) checkoutBtn.onclick=function(){
            var date=normDate(rechargeDateInput.value), packs=getActivePacks(currentVersion);
            var hadItems = false;
            packs.forEach(function(p){
                var k=qKey(p.name,date);
                var sq=simQtyMap[k]||0;
                if (sq > 0) {
                    actQtyMap[k] = Math.max((actQtyMap[k]||0), sq);
                    delete simQtyMap[k];
                    hadItems = true;
                }
            });
            if (hadItems) updateAll();
        };

        // ── 累充进度（右栏上方） ──
        function getCovBasePts(title, s, e) {
            var sb=JSON.parse(localStorage.getItem('ziyong_events_base')||'{}'), tot=parseInt(sb[title])||0, counted={};
            counted[title]=true;
            eventsData.forEach(function(ev){ if(!counted[ev.title]&&ev.start>=s&&ev.end<=e){ tot+=(parseInt(sb[ev.title])||0); counted[ev.title]=true; } });
            if (title==='鸢起长期'&&!counted['鸢起年度']&&'2025-05-01'>=s&&'2026-04-30'<=e) tot+=(parseInt(sb['鸢起年度'])||0);
            return tot;
        }
        function handleBaseChange(e) {
            if (!e.target.classList.contains('act-base-input')) return;
            var title=e.target.dataset.title, nv=parseInt(e.target.value)||0;
            var sb=JSON.parse(localStorage.getItem('ziyong_events_base')||'{}');
            var ts='',te='';
            if (title==='鸢起年度'){ts='2025-05-01';te='2026-04-30';}
            else if (title==='鸢起长期'){ts='2023-03-30';te='2026-04-30';}
            else { var act=eventsData.filter(function(ev){return ev.title===title;})[0]; if(act){ts=act.start;te=act.end;} }
            if (ts) { var eff=getCovBasePts(title,ts,te), cur=parseInt(sb[title])||0; sb[title]=nv-(eff-cur); }
            else sb[title]=nv;
            localStorage.setItem('ziyong_events_base',JSON.stringify(sb)); updateAll();
        }
        if (activityContainer) activityContainer.addEventListener('change',handleBaseChange);
        if (yuanqiContainer)   yuanqiContainer.addEventListener('change',handleBaseChange);

        function mkBar(act, sim, max) {
            var pA=Math.min(act/(max||1)*100,100).toFixed(1), pS=Math.min(sim/(max||1)*100,100).toFixed(1);
            return '<div class="progress-bar-bg"><div class="progress-bar simulated" style="width:'+pS+'%"></div><div class="progress-bar actual" style="width:'+pA+'%"></div></div>';
        }
        function mkBaseInput(title, base) {
            return '<span class="base-input-group"><label>基础</label><input type="number" class="ancient-input mini act-base-input" data-title="'+title+'" value="'+base+'" style="width:50px;font-size:11px;text-align:right;"></span>';
        }

        function renderYuanqi(date) {
            if (!yuanqiContainer) return;
            var c1s='2025-05-01',c1e='2026-04-30',c2s='2023-03-30',c2e='2026-04-30';
            var c1b=getCovBasePts('鸢起年度',c1s,c1e);
            var c1a=c1b+calcRangePts(actQtyMap,c1s,c1e);
            var c1si=c1b+calcRangePts(simQtyMap,c1s,c1e);
            var c2b=getCovBasePts('鸢起长期',c2s,c2e);
            var c2a=c2b+calcRangePts(actQtyMap,c2s,c2e);
            var c2si=c2b+calcRangePts(simQtyMap,c2s,c2e);
            var tiers=KRYPTON_DATA.rewardTiers, boxes=0, next=tiers[0];
            for(var i=0;i<tiers.length;i++){if(c2a>=tiers[i]){boxes++;next=tiers[i+1]||tiers[tiers.length-1];}}
            yuanqiContainer.innerHTML=
                '<div class="activity-item"><div class="activity-header"><div class="activity-info">'+
                '<span class="activity-title">鸢起礼盒·三 <span class="toggle-icon">▼</span></span>'+
                '<div class="activity-pts">年度 <span class="actual-val">'+c1a.toLocaleString()+'</span>/60,000'+
                (c1si>c1a?' <span class="sim-val">(模拟'+c1si.toLocaleString()+')</span>':'')+'</div></div>'+
                mkBaseInput('鸢起年度',c1b)+'</div>'+
                '<div class="activity-content-wrapper"><div class="activity-content-inner">'+
                '<div class="activity-subtitle">条件一：年度累充60,000 (25/05~26/04)</div>'+
                mkBar(c1a,c1si,60000)+
                '<div class="activity-tier">'+(c1a>=60000?'<span class="tier-done">✓ 已达成</span>':'差 <b>'+(60000-c1a).toLocaleString()+'</b>')+'</div>'+
                '<div class="activity-subtitle" style="margin-top:8px">条件二：长期兑换礼盒 (23/03~26/04) '+mkBaseInput('鸢起长期',c2b)+'</div>'+
                '<div class="activity-pts">长期 <span class="actual-val">'+c2a.toLocaleString()+'</span>'+
                (c2si>c2a?' <span class="sim-val">(模拟'+c2si.toLocaleString()+')</span>':'')+
                ' · 可领 <b style="color:#d85c50;font-size:1.1em">'+boxes+'</b> 个</div>'+
                mkBar(c2a,c2si,next)+
                '<div class="activity-tier">'+(c2a>=750000?'<span class="tier-done">✓ 满档</span>':'距下一礼盒('+next.toLocaleString()+'): <b>'+(next-c2a).toLocaleString()+'</b>')+'</div>'+
                '</div></div></div>';
            attachCollapse(yuanqiContainer);
        }

        function renderActivities(date) {
            if (!activityContainer) return;
            activityContainer.innerHTML='';
            var active=eventsData.filter(function(e){
                if(e.title.includes('鸢起礼盒')) return false;
                if(['三周年一阶段','年卡','三周年签到'].some(function(x){return e.title.includes(x);})) return false;
                return date>=e.start&&date<=e.end&&(e.title.includes('累充')||e.type==='pool'||e.type==='anniversary'||e.type==='palace');
            });
            if (!active.length) {
                if (!(date>='2023-03-30'&&date<='2026-04-30')) activityContainer.innerHTML='<div class="no-activity">当前日期无累充活动</div>';
                return;
            }
            active.forEach(function(act){
                var base=getCovBasePts(act.title,act.start,act.end);
                var actA=base+calcRangePts(actQtyMap,act.start,act.end);
                var actS=base+calcRangePts(simQtyMap,act.start,act.end);
                var T=KRYPTON_DATA.cumulativeTiers[act.title]||[1000,2000,5000,10000];
                var maxT=Math.max.apply(null,T), nextT=null;
                for(var i=0;i<T.length;i++){if(actA<T[i]){nextT=T[i];break;}} if(!nextT)nextT=maxT;
                var fD=function(d){return d.split('-').slice(1).join('/');};
                var div=document.createElement('div'); div.className='activity-item';
                div.innerHTML='<div class="activity-header"><div class="activity-info">'+
                    '<span class="activity-title">'+act.title+' <span style="font-size:10px;opacity:.7">('+fD(act.start)+'~'+fD(act.end)+')</span> <span class="toggle-icon">▼</span></span>'+
                    '<div class="activity-pts">实际: <span class="actual-val">'+actA.toLocaleString()+'</span>'+(actS>actA?' <span class="sim-val">(模拟'+actS.toLocaleString()+')</span>':'')+'</div>'+
                    '</div>'+mkBaseInput(act.title,base)+'</div>'+
                    '<div class="activity-content-wrapper"><div class="activity-content-inner">'+
                    mkBar(actA,actS,nextT)+
                    '<div class="activity-tier">'+(actA>=maxT?'<span class="tier-done">✓ 满档</span>':'距下档('+nextT.toLocaleString()+'): <b>'+(nextT-actA).toLocaleString()+'</b>')+'</div>'+
                    '</div></div>';
                activityContainer.appendChild(div);
            });
            attachCollapse(activityContainer);
        }

        function attachCollapse(container) {
            if (!container) return;
            container.querySelectorAll('.activity-title').forEach(function(title){
                var item=title.closest('.activity-item'); if(!item) return;
                var cw=item.querySelector('.activity-content-wrapper'), ic=title.querySelector('.toggle-icon');
                title.style.cursor='pointer'; title.onclick=null;
                title.onclick=function(e){ e.stopPropagation(); if(!cw) return;
                    var c=cw.classList.toggle('collapsed');
                    if(ic){ic.classList.toggle('collapsed',c);ic.innerText=c?'▶':'▼';}
                };
            });
        }

        // ── 积分对照表 ──
        function initMappingPanel() {
            var mBody=document.getElementById('mappingBody');
            var currencyToggle=document.getElementById('currencyToggle');
            if (!mBody) return;
            function renderTable(val){
                mBody.className='fade-in-rows';
                mBody.innerHTML=''; var isUsd=val==='usd';
                (isUsd?KRYPTON_DATA.usdMapping:KRYPTON_DATA.rmbMapping).forEach(function(m){
                    var tr=document.createElement('tr');
                    tr.innerHTML='<td>'+(isUsd?'$':'¥')+m.price+'</td><td>'+m.pts+'</td>';
                    mBody.appendChild(tr);
                });
            }
            if (currencyToggle) {
                var selectedLabel = currencyToggle.querySelector('.select-selected');
                var itemsList = currencyToggle.querySelectorAll('.select-items div');
                if (selectedLabel && itemsList.length > 0) {
                    selectedLabel.onclick = function(e){
                        e.stopPropagation();
                        currencyToggle.classList.toggle('open');
                    };
                    itemsList.forEach(function(item){
                        item.onclick = function(){
                            var val = this.dataset.val;
                            selectedLabel.innerText = this.innerText;
                            itemsList.forEach(function(i){i.classList.remove('active');});
                            this.classList.add('active');
                            renderTable(val);
                            currencyToggle.classList.remove('open');
                        };
                    });
                }
                document.addEventListener('click', function(){
                    currencyToggle.classList.remove('open');
                });
            }
            renderTable('usd');
        }

        // ── CSV / 清空 ──
        var exportCsvBtn=document.getElementById('exportCsvBtn');
        var importCsvBtn=document.getElementById('importCsvBtn');
        var csvInput=document.getElementById('csvInput');
        if (exportCsvBtn) exportCsvBtn.onclick=function(){
            var packs=getActivePacks(currentVersion), csv='名称,日期,积分,qty,类型\n';
            Object.keys(simQtyMap).forEach(function(k){
                var parts=k.split('|'),nm=parts[0],d=parts[1],sq=simQtyMap[k]||0,aq=actQtyMap[k]||0;
                if(sq) csv+=nm+','+d+','+(function(){for(var i=0;i<packs.length;i++)if(packs[i].name===nm)return packs[i].pts;return 0;}())+','+sq+','+(aq?'实际':'模拟')+'\n';
            });
            var lk=document.createElement('a');lk.href='data:text/csv;charset=utf-8,'+encodeURI(csv);lk.download='ziyong.csv';document.body.appendChild(lk);lk.click();
        };
        if (importCsvBtn&&csvInput){ importCsvBtn.onclick=function(){csvInput.click();}; }

        var clearAllBtn=document.getElementById('clearAllRecordsBtn');
        if (clearAllBtn) clearAllBtn.onclick=function(){
            if(!confirm('确定清空所有记录？')) return;
            simQtyMap={}; actQtyMap={};
            localStorage.removeItem('ziyong_simQty'); localStorage.removeItem('ziyong_actQty');
            localStorage.removeItem('ziyong_events_base'); localStorage.removeItem('ziyong_simulated'); localStorage.removeItem('ziyong_actual');
            animStates={}; updateAll(); alert('已重置');
        };

        // ── 总记录表 ──
        function updateRecordsTable() {
            if (!recordsBody) return;
            recordsBody.innerHTML='';
            var packs=getActivePacks(currentVersion);
            Object.keys(simQtyMap).forEach(function(k){
                var parts=k.split('|'),nm=parts[0],d=parts[1],sq=simQtyMap[k]||0,aq=actQtyMap[k]||0;
                if(!sq) return;
                var pack=null; for(var i=0;i<packs.length;i++){if(packs[i].name===nm){pack=packs[i];break;}}
                var act=eventsData.filter(function(e){return d>=e.start&&d<=e.end&&e.title.includes('累充');})[0];
                var cny=pack?getPackCny(pack)*sq:0;
                var tr=document.createElement('tr'); if(aq<sq) tr.classList.add('simulated-row');
                tr.innerHTML='<td>'+(act?act.title:'日常')+'</td><td>'+d+'</td><td>'+nm+'</td><td>'+(pack?pack.pts*sq:0)+'</td><td>¥'+cny.toFixed(2)+'(×'+sq+')</td>';
                recordsBody.appendChild(tr);
            });
        }

        // ── 总更新 ──
        function updateAll() {
            var base=getBasePts();
            var simPts=base+calcMapPts(simQtyMap);
            var actPts=base+calcMapPts(actQtyMap);
            setAnimVal(totalActualPtsEl,    actPts);
            setAnimVal(totalSimulatedPtsEl, simPts);
            var stickyA=document.getElementById('stickyActualPts');
            var stickyS=document.getElementById('stickySimPts');
            if(stickyA) setAnimVal(stickyA,actPts);
            if(stickyS) setAnimVal(stickyS,simPts);
            renderPacks();
            var date=normDate(rechargeDateInput.value);
            renderYuanqi(date); renderActivities(date);
            renderCart();
            saveState();
        }

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
                panels.forEach(function(p){ p.style.maxHeight = 'calc(50% - 10px)'; });
            }
        }
        window.addEventListener('resize', syncStickyOffset);
        
        // ── 初始化启动 ──
        loadState();
        initMappingPanel();
        syncVersion('daihao');
        setTimeout(function(){
            loadEvents();
            if (!eventsData.length&&window.calendar) setTimeout(loadEvents,1000);
            syncStickyOffset();
            console.log('[Krypton] v3 完成');
        },800);
        // 也可额外在 updateAll() 中同步（防止内容折行引起高度变化）
        var oldUpdateAll = updateAll;
        updateAll = function() {
            oldUpdateAll();
            setTimeout(syncStickyOffset, 50);
        };

    } catch(err) { console.error('[Krypton] 严重错误:',err); }
}

// ── 内联样式 ──
(function(){
    var s=document.createElement('style');
    s.textContent=[
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
        '.cart-panel{background:#fff;border:1px solid #e8e2d4;border-radius:10px;overflow:hidden;display:flex;flex-direction:column;flex:1;min-height:220px;}',
        '.cart-panel-header{display:flex;justify-content:space-between;align-items:center;padding:8px 14px;background:#fdfaf3;border-bottom:1px solid #e8e2d4;}',
        '.cart-title{font-size:13px;font-weight:700;color:#5d4037;}',
        '.cart-item-list{flex:1;overflow-y:auto;padding:8px 12px;padding-bottom:30px;}',
        '.cart-empty-msg{font-size:12px;color:#aaa;text-align:center;padding:12px 0;}',
        '.cart-row{display:flex;justify-content:space-between;font-size:11px;padding:3px 0;border-bottom:1px solid #f5f0e8;}',
        '.cart-row-name{color:#5d4037;font-weight:600;flex:1;}',
        '.cart-row-info{color:#8d7365;margin-left:8px;}',
        '.cart-stats{padding:8px 12px 15px 12px;border-top:1px solid #f0ebe0;}',
        '.stat-row{display:flex;justify-content:space-between;font-size:12px;padding:3px 0;color:#7a6f66;}',
        '.stat-total{font-weight:700;color:#3e3a33;font-size:13px;border-top:1px solid #e8e2d4;padding-top:5px;margin-top:3px;padding-bottom:4px;}',
        // 原版卡片
        '.ziyong-card{background:#fffefb;border:1.5px solid #e0d5c1;border-radius:8px;padding:10px 10px 8px;cursor:pointer;position:relative;transition:border-color .25s,box-shadow .25s,background .25s,transform .25s;display:flex;flex-direction:column;gap:2px;}',
        '.ziyong-card:hover:not(.disabled){border-color:#c09d62;box-shadow:0 3px 10px rgba(0,0,0,.08);transform:translateY(-2px);}',
        '.ziyong-card.simulated{background:#faf7f1;border-color:#d85c50;}',
        '.ziyong-card.actual{background:#e2d9c5;border-color:#e0d5c1;cursor:default;}',
        '.ziyong-card.limit-reached{opacity:.6;}',
        '.ziyong-card.disabled{opacity:.38;cursor:not-allowed;}',
        '.card-body{cursor:pointer;flex:1;}',
        '.card-name{font-size:13px;font-weight:700;color:#3e3a33;line-height:1.3;margin-bottom:3px;}',
        '.card-price{font-size:14px;font-weight:700;color:#c0392b;}',
        '.card-price small{font-size:10px;color:#8d7365;font-weight:400;margin-left:4px;}',
        '.card-pts{font-size:11px;color:#8d7365;}',
        '.card-eff{font-size:10px;color:#a08060;font-style:italic;}',
        // 卡片底部 qty控件
        '.card-bottom{display:flex;align-items:center;justify-content:space-between;margin-top:6px;border-top:1px solid #ede8dc;padding-top:5px;}',
        '.card-limit-txt{font-size:10px;color:#a08060;}',
        '.card-qty-ctrl{display:flex;align-items:center;gap:2px;}',
        '.qty-minus,.qty-plus{width:20px;height:20px;border-radius:50%;border:1px solid #d5c8b2;background:#fff;color:#5d4037;font-size:13px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1;transition:all .15s;}',
        '.qty-minus:hover:not([disabled]),.qty-plus:hover:not([disabled]){background:#f2e6ce;border-color:#c09d62;}',
        '.qty-minus[disabled],.qty-plus[disabled]{opacity:.3;cursor:default;}',
        '.qty-num{min-width:18px;text-align:center;font-size:12px;font-weight:600;color:#3e3a33;}',
        '.card-check{width:22px;height:22px;border-radius:50%;border:1.5px solid #d5c8b2;background:#fff;color:#b8a88a;cursor:pointer;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;transition:all .2s;margin-left:3px;}',
        '.card-check:hover{border-color:#5d8a50;color:#5d8a50;}',
        '.card-check.active{background:#5d8a50;border-color:#5d8a50;color:#fff;}',
        // 分类标题行
        '.cat-title-row{display:flex;align-items:center;gap:6px;cursor:pointer;flex:1;}',
        '.cat-toggle-icon{font-size:10px;color:#a08060;transition:transform .25s;}',
        '.category-header{display:flex;justify-content:space-between;align-items:center;padding:8px 12px;background:#f5f0e8;border-radius:6px 6px 0 0;border-bottom:1px solid #e8e2d4;user-select:none;}',
        '.cat-btn{padding:2px 8px;border:1px solid #d5c8b2;border-radius:4px;background:#fff;color:#7a6f66;font-size:11px;cursor:pointer;transition:all .15s;}',
        '.cat-btn:hover{background:#f2e6ce;border-color:#c09d62;}',
        // 活动进度
        '.activity-item{background:#fdfaf3;border:1px solid #e8e2d4;border-radius:8px;padding:10px 12px;margin-bottom:15px;}',
        '.activity-header{display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:5px;}',
        '.activity-info{flex:1;min-width:0;}',
        '.activity-title{font-size:12px;font-weight:700;color:#5d4037;cursor:pointer;user-select:none;line-height:1.4;display:block;}',
        '.activity-subtitle{font-size:10px;color:#8d7365;margin:3px 0;}',
        '.activity-pts{font-size:10px;color:#7a6f66;margin-top:2px;}',
        '.actual-val{font-weight:700;color:#d85c50;}',
        '.sim-val{color:#a08060;}',
        '.base-input-group{display:inline-flex;align-items:center;gap:2px;flex-shrink:0;}',
        '.base-input-group label{font-size:9px;color:#a08060;}',
        '.activity-tier{font-size:10px;color:#7a6f66;margin-top:4px;}',
        '.tier-done{color:#5d8a50;font-weight:700;}',
        '.activity-content-wrapper{overflow:hidden;transition:max-height .3s ease,opacity .25s;max-height:300px;opacity:1;}',
        '.activity-content-wrapper.collapsed{max-height:0!important;opacity:0;}',
        '.activity-content-inner{padding-top:4px;}',
        '.toggle-icon{font-size:9px;margin-left:3px;vertical-align:middle;transition:transform .25s;display:inline-block;}',
        '.toggle-icon.collapsed{transform:rotate(-90deg);}',
        // 进度条
        '.progress-bar-bg{height:5px;background:#ede8dc;border-radius:3px;position:relative;overflow:hidden;margin:4px 0;}',
        '.progress-bar{height:100%;border-radius:3px;position:absolute;top:0;left:0;transition:width .5s ease;}',
        '.progress-bar.simulated{background:rgba(212,168,71,.45);}',
        '.progress-bar.actual{background:#d85c50;}',
        // 货币下拉
        '.custom-select{position:relative;display:inline-block;min-width:60px;}',
        '.select-selected{cursor:pointer;padding:2px 6px;border-radius:4px;border:1px solid #d5c8b2;background:#fff;font-size:12px;}',
        '.select-items{display:none;position:absolute;top:100%;left:0;background:#fff;border:1px solid #d5c8b2;border-radius:4px;box-shadow:0 4px 12px rgba(0,0,0,.1);z-index:100;min-width:80px;}',
        '.custom-select.open .select-items{display:block;}',
        '.select-items div{padding:5px 10px;cursor:pointer;font-size:12px;color:#5d4037;}',
        '.select-items div:hover,.select-items div.active{background:#f2e6ce;color:#c09d62;}'
    ].join('');
    document.head.appendChild(s);
})();

// 程序入口
if (document.readyState==='loading') { document.addEventListener('DOMContentLoaded',initKrypton); }
else { initKrypton(); }
