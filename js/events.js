/**
 * Events logic for Ancient Style Game Calendar
 */

const COLORS = {
    training: '#dce3c6',
    palace: '#cbe0e0',
    pool: '#ebdcb8',
    furniture: '#ebd1d1',
    anniversary: '#f0c9c2',
    monthly: '#d4cfe6',
    newperiod: '#c8dcd0'
};

const LUNAR_MARKERS = {
    '2026-01-17': '春節', '2026-02-01': '元宵', '2026-04-04': '清明', '2026-06-19': '端午', '2026-09-25': '中秋', '2026-10-19': '重陽',
    '2026-02-04': '立春', '2026-03-20': '春分', '2026-05-05': '立夏', '2026-05-20': '小滿', '2026-06-21': '夏至', '2026-07-07': '小暑', '2026-08-07': '立秋', '2026-09-07': '白露', '2026-09-23': '秋分', '2026-10-08': '寒露', '2026-11-07': '立冬', '2026-12-21': '冬至',
    '2025-01-28': '春節', '2025-02-12': '元宵', '2025-04-04': '清明', '2025-05-31': '端午', '2025-09-06': '中秋', '2025-10-29': '重陽',
    '2025-02-03': '立春', '2025-03-20': '春分', '2025-05-05': '立夏', '2025-05-21': '小滿', '2025-06-21': '夏至', '2025-08-07': '立秋', '2025-09-23': '秋分', '2025-11-07': '立冬', '2025-12-21': '冬至',
};

const CURRENT_DATE = new Date('2026-03-26');

// Helper Functions
function addDays(dateStr, days) {
    let parts = dateStr.split('-');
    let d = new Date(parts[0], parts[1] - 1, parts[2]);
    d.setDate(d.getDate() + days);
    return formatDate(d);
}

function addMonths(dateStr, months) {
    let parts = dateStr.split('-');
    let d = new Date(parts[0], parts[1] - 1, parts[2]);
    d.setMonth(d.getMonth() + months);
    return formatDate(d);
}

function formatDate(dateObj) {
    let y = dateObj.getFullYear();
    let m = String(dateObj.getMonth() + 1).padStart(2, '0');
    let d = String(dateObj.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function getLastDayOfMonth(dateStr) {
    let parts = dateStr.split('-');
    let d = new Date(parts[0], parts[1], 0);
    return formatDate(d);
}

// Event Generators
function generateMonthlyEvents(startYear, startMonth, count) {
    let events = [];
    const CAVE_REWARDS = ['历练次数', '善恶簿', '行装匣'];
    for (let i = 0; i < count; i++) {
        let y = startYear;
        let m = startMonth + i;
        while (m > 12) { m -= 12; y++; }
        let monthStr = String(m).padStart(2, '0');
        let firstDay = `${y}-${monthStr}-01`;
        let lastDay = getLastDayOfMonth(firstDay);
        let lastDayParts = lastDay.split('-');
        let lastDayNum = lastDayParts[2];

        // 计算神秘洞窟奖励循环: 4月历练(0), 5月善恶(1), 6月行装(2)
        // 公式: (m-1) % 3 (结果 0,1,2 对应三个奖励)
        let rewardIdx = (m - 1) % 3;
        let rewardName = CAVE_REWARDS[rewardIdx];

        events.push({
            title: '新一期白鹄行动',
            start: firstDay,
            end: addDays(firstDay, 1),
            backgroundColor: COLORS.monthly,
            display: 'block',
            extendedProps: {
                noFilter: true,
                tooltipOverride: `白鹄行动  ${monthStr}月01日 ~ ${monthStr}月${lastDayNum}日`
            }
        });
        events.push({
            title: `新一期神秘洞窟（${rewardName}）`,
            start: firstDay,
            end: addDays(firstDay, 1),
            backgroundColor: COLORS.newperiod,
            display: 'block',
            extendedProps: {
                noFilter: true,
                tooltipOverride: `神秘洞窟（${rewardName}）  ${monthStr}月01日 ~ ${monthStr}月${lastDayNum}日`
            }
        });
    }
    return events;
}

function createPalaceEvent(start, end, name) {
    let poolEnd = addDays(end, 2);
    return [
        { title: `【地宫】${name}`, start: start, end: addDays(end, 1), backgroundColor: COLORS.palace, type: 'palace' },
        { title: `【地宫伴生池＆累充】${name}`, start: start, end: addDays(poolEnd, 1), backgroundColor: COLORS.pool, type: 'pool' }
    ];
}

// Initial Core Events (Static)
let daihaoEvents = [
    { title: '三周年一阶段', start: '2026-03-30', end: addDays('2026-04-15', 1), backgroundColor: COLORS.anniversary, type: 'anniversary' },
    { title: '三周年累充＆300井池', start: '2026-03-30', end: addDays('2026-04-28', 1), backgroundColor: COLORS.anniversary, type: 'anniversary' },
    { title: '三周年签到', start: '2026-03-30', end: addDays('2026-04-15', 1), backgroundColor: COLORS.anniversary, type: 'anniversary' },
    { title: '鸢起礼盒·三', start: '2025-05-01', end: addDays('2026-04-30', 1), backgroundColor: COLORS.anniversary, type: 'anniversary' },
    { title: '【密探特训】第34期', start: '2025-12-18', end: addDays('2026-01-14', 1), backgroundColor: COLORS.training, type: 'training' },
    { title: '【密探特训】第35期', start: '2026-01-15', end: addDays('2026-02-11', 1), backgroundColor: COLORS.training, type: 'training' },
    { title: '【密探特训】第36期', start: '2026-02-12', end: addDays('2026-03-11', 1), backgroundColor: COLORS.training, type: 'training' },
    { title: '【密探特训】第37期', start: '2026-03-12', end: addDays('2026-04-08', 1), backgroundColor: COLORS.training, type: 'training' },
    ...createPalaceEvent('2023-04-06', '2023-05-22', '孙策 金窗'),
    ...createPalaceEvent('2024-11-15', '2024-12-27', '孙策 师子'),
    ...createPalaceEvent('2025-01-09', '2025-02-17', '左慈 璃魂'),
    ...createPalaceEvent('2025-03-13', '2025-04-21', '傅融 湖心'),
    ...createPalaceEvent('2025-04-29', '2025-06-09', '孙策 围城'),
    ...createPalaceEvent('2025-06-26', '2025-08-04', '袁基 盛宴'),
    ...createPalaceEvent('2025-08-21', '2025-09-29', '刘辩 灯之国'),
    ...createPalaceEvent('2025-10-16', '2025-11-24', '左慈 欲追'),
    ...createPalaceEvent('2025-12-11', '2026-01-19', '傅融 梦中雪'),
    ...createPalaceEvent('2026-02-05', '2026-03-16', '刘辩 魇'),
    ...createPalaceEvent('2026-04-02', '2026-05-11', '袁基 欲影·谍影'),
    { title: '【家具】爱拼才会赢', start: '2025-11-01', end: addDays('2026-01-31', 1), backgroundColor: COLORS.furniture, type: 'furniture' },
    { title: '【家具】回乡路', start: '2026-02-01', end: addDays('2026-04-30', 1), backgroundColor: COLORS.furniture, type: 'furniture' },
    // 密探特训"新一期"单日标记
    { title: '新一期密探特训', start: '2025-12-18', end: addDays('2025-12-18', 1), backgroundColor: COLORS.newperiod, extendedProps: { noFilter: true } },
    { title: '新一期密探特训', start: '2026-01-15', end: addDays('2026-01-15', 1), backgroundColor: COLORS.newperiod, extendedProps: { noFilter: true } },
    { title: '新一期密探特训', start: '2026-02-12', end: addDays('2026-02-12', 1), backgroundColor: COLORS.newperiod, extendedProps: { noFilter: true } },
    { title: '新一期密探特训', start: '2026-03-12', end: addDays('2026-03-12', 1), backgroundColor: COLORS.newperiod, extendedProps: { noFilter: true } },
    // 家具"新一期"单日标记
    { title: '新一期家具主题', start: '2025-11-01', end: addDays('2025-11-01', 1), backgroundColor: COLORS.newperiod, extendedProps: { noFilter: true } },
    { title: '新一期家具主题', start: '2026-02-01', end: addDays('2026-02-01', 1), backgroundColor: COLORS.newperiod, extendedProps: { noFilter: true } },
    ...generateMonthlyEvents(2025, 1, 24)
];

let ruyuanEvents = [];

// Dynamic Generation Functions
function generateTraining(lastStart, lastPeriodNum, count) {
    let curStart = addDays(lastStart, 28);
    for (let i = 0; i < count; i++) {
        let curEnd = addDays(curStart, 27);
        daihaoEvents.push({
            title: `【密探特训】第${lastPeriodNum + i + 1}期${new Date(curStart) > CURRENT_DATE ? '(预)' : ''}`,
            start: curStart, end: addDays(curEnd, 1), backgroundColor: COLORS.training, type: 'training'
        });
        daihaoEvents.push({
            title: '新一期密探特训',
            start: curStart, end: addDays(curStart, 1),
            backgroundColor: COLORS.newperiod,
            extendedProps: { noFilter: true }
        });
        curStart = addDays(curStart, 28);
    }
}

function generatePalace(lastStart, count) {
    let curStart = addDays(lastStart, 56);
    for (let i = 0; i < count; i++) {
        let pEnd = addDays(curStart, 39);
        let pPoolEnd = addDays(curStart, 41);
        let tag = new Date(curStart) > CURRENT_DATE ? '(预)' : '';
        daihaoEvents.push({ title: `【地宫】${tag}`, start: curStart, end: addDays(pEnd, 1), backgroundColor: COLORS.palace, type: 'palace' });
        daihaoEvents.push({ title: `【地宫伴生池＆累充】${tag}`, start: curStart, end: addDays(pPoolEnd, 1), backgroundColor: COLORS.pool, type: 'pool' });
        curStart = addDays(curStart, 56);
    }
}

function generateFurniture(lastStart, count) {
    let curStart = addMonths(lastStart, 3);
    for (let i = 0; i < count; i++) {
        let nextStart = addMonths(curStart, 3);
        let curEnd = addDays(nextStart, -1);
        let tag = new Date(curStart) > CURRENT_DATE ? '(预)' : '';
        daihaoEvents.push({ title: `【家具】${tag}`, start: curStart, end: addDays(curEnd, 1), backgroundColor: COLORS.furniture, type: 'furniture' });
        daihaoEvents.push({
            title: '新一期家具主题',
            start: curStart, end: addDays(curStart, 1),
            backgroundColor: COLORS.newperiod,
            extendedProps: { noFilter: true }
        });
        curStart = nextStart;
    }
}

// Initial Auto-Generation
generateTraining('2026-03-12', 37, 6);
generatePalace('2026-04-02', 4);
generateFurniture('2026-02-01', 4);

