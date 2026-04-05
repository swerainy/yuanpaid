/**
 * Main application logic for Ancient Style Game Calendar
 */

document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');
    const toggleBtn = document.getElementById('toggleBtn');
    const calendarWrapper = document.getElementById('calendar-wrapper');
    const versionToggle = document.getElementById('versionToggle');
    const backToTopBtn = document.getElementById('backToTop');
    const tooltip = document.getElementById('customTooltip');
    const excelInput = document.getElementById('excelInput');

    let currentVersion = 'daihao';
    let excelEvents = [];

    // Helper: Format date for Tooltip
    function formatDateMMDD(dateObj) {
        let m = String(dateObj.getMonth() + 1).padStart(2, '0');
        let d = String(dateObj.getDate()).padStart(2, '0');
        return `${m}月${d}日`;
    }

    // Initialize FullCalendar
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'zh-cn',
        firstDay: 1,
        contentHeight: 'auto',
        navLinks: true,
        dayMaxEvents: false,
        slotLabelInterval: '01:00',
        slotDuration: '01:00',

        customButtons: {
            myToday: {
                text: '今天',
                click: function () {
                    calendar.today();
                    setTimeout(() => {
                        let todayEl = document.querySelector('.fc-day-today');
                        if (todayEl) {
                            todayEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    }, 100);
                }
            }
        },

        headerToolbar: {
            left: 'prev,next myToday',
            center: 'title',
            right: 'multiMonthYear,dayGridMonth,timeGridWeek'
        },

        buttonText: { year: '年', month: '月', week: '周' },

        events: function (info, successCallback, failureCallback) {
            let baseEvents = currentVersion === 'daihao' ? daihaoEvents : ruyuanEvents;
            let activeFilters = Array.from(document.querySelectorAll('.filter-tag.active')).map(el => el.dataset.type);

            // Combine with Excel events if any
            let allVisibleEvents = [...baseEvents, ...excelEvents];

            let filteredEvents = allVisibleEvents.filter(e => {
                if (e.extendedProps && e.extendedProps.noFilter) return true;
                return activeFilters.includes(e.type);
            });
            successCallback(filteredEvents);
        },

        navLinkDayClick: function (date, jsEvent) {
            if (calendar.view.type === 'dayGridMonth') {
                calendar.changeView('timeGridWeek', date);
                setTimeout(function () {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 50);
            }
        },

        views: {
            multiMonthYear: {
                multiMonthMaxColumns: 3,
                fixedWeekCount: true
            }
        },

        // Year View Grid & Content Fixes
        datesSet: function (info) {
            if (info.view.type === 'multiMonthYear') {
                setTimeout(patchYearViewGrid, 50);
                bindYearViewClicks();
            }
        },

        // --- 切换或筛选时触发内容动画 ---
        eventsSet: function (events) {
            let viewEl = document.querySelector('.fc-view-harness');
            if (viewEl) {
                viewEl.style.animation = 'none';
                void viewEl.offsetWidth;
                viewEl.style.animation = 'fadeSlide 0.4s ease-out';
            }
        },

        // Custom Content Rendering
        dayCellContent: function (arg) {
            if (arg.view.type.includes('timeGrid')) return { html: '' };

            let dateStr = formatDate(arg.date);
            let lunarMarker = LUNAR_MARKERS[dateStr] || '';
            let lunarHtml = lunarMarker ? `<span class="simplified-lunar-marker">${lunarMarker}</span>` : '';

            if (arg.view.type === 'multiMonthYear') {
                return { html: `<span class="fc-daygrid-day-number">${arg.date.getDate()}</span>${lunarHtml}` };
            }
            return { html: `${lunarHtml}<span class="fc-daygrid-day-number">${arg.date.getDate()}</span>` };
        },

        // Tooltip Handling
        eventMouseEnter: function (info) {
            let titleText;
            if (info.event.extendedProps && info.event.extendedProps.tooltipOverride) {
                titleText = info.event.extendedProps.tooltipOverride;
            } else {
                let start = info.event.start;
                let end = info.event.end ? new Date(info.event.end.getTime() - 86400000) : start;
                titleText = info.event.title + '  ' + formatDateMMDD(start) + ' ~ ' + formatDateMMDD(end);
            }

            tooltip.textContent = titleText;
            tooltip.classList.add('show');

            const moveTooltip = (e) => {
                tooltip.style.left = (e.clientX + 15) + 'px';
                tooltip.style.top = (e.clientY - 40) + 'px';
            };

            info.el.addEventListener('mousemove', moveTooltip);
            info.el._tooltipMove = moveTooltip;
        },

        eventMouseLeave: function (info) {
            tooltip.classList.remove('show');
            if (info.el._tooltipMove) {
                info.el.removeEventListener('mousemove', info.el._tooltipMove);
                delete info.el._tooltipMove;
            }
        }
    });

    calendar.render();
    window.calendar = calendar; // Expose calendar globally

    // --- Year View Helpers ---
    function patchYearViewGrid() {
        document.querySelectorAll('.fc-multimonth-month').forEach(monthEl => {
            let tbody = monthEl.querySelector('tbody');
            if (!tbody) return;
            tbody.querySelectorAll('.dummy-row').forEach(el => el.remove());
            let trs = tbody.querySelectorAll('tr:not(.dummy-row)');
            if (trs.length > 0 && trs.length < 6) {
                let missingCount = 6 - trs.length;
                let rowHeight = trs[0].getBoundingClientRect().height;
                for (let i = 0; i < missingCount; i++) {
                    let dummyTr = document.createElement('tr');
                    dummyTr.className = 'dummy-row';
                    for (let j = 0; j < 7; j++) {
                        let dummyTd = document.createElement('td');
                        dummyTd.className = 'fc-daygrid-day dummy-cell';
                        dummyTd.innerHTML = `<div style="height:${rowHeight}px; width: 100%;"></div>`;
                        dummyTr.appendChild(dummyTd);
                    }
                    tbody.appendChild(dummyTr);
                }
            }
        });
    }

    function bindYearViewClicks() {
        // Month Title Click
        document.querySelectorAll('.fc-multimonth-title').forEach(titleEl => {
            titleEl.onclick = (e) => {
                let monthBlock = titleEl.closest('.fc-multimonth-month');
                let firstDayEl = monthBlock.querySelector('td.fc-day:not(.fc-day-other)[data-date]');
                if (firstDayEl) calendar.changeView('dayGridMonth', firstDayEl.getAttribute('data-date'));
            };
        });
        // Date Cell Click
        document.querySelectorAll('.fc-multimonth td.fc-day:not(.fc-day-other)').forEach(dayEl => {
            dayEl.onclick = () => {
                let dateStr = dayEl.getAttribute('data-date');
                if (dateStr) calendar.changeView('dayGridMonth', dateStr);
            };
        });
    }

    // --- UI Event Listeners ---

    // Version Toggle
    if (versionToggle) {
        const vLabel = versionToggle.querySelector('.select-selected');
        const vItems = versionToggle.querySelectorAll('.select-items div');
        
        vLabel.addEventListener('click', (e) => {
            e.stopPropagation();
            versionToggle.classList.toggle('open');
            vLabel.classList.toggle('open');
        });

        document.addEventListener('click', () => {
            versionToggle.classList.remove('open');
            vLabel.classList.remove('open');
        });

        vItems.forEach(item => {
            item.addEventListener('click', function() {
                const val = this.dataset.val;
                if (val !== currentVersion) {
                    currentVersion = val;
                    vLabel.innerText = this.innerText;
                    vItems.forEach(i => i.classList.remove('active'));
                    this.classList.add('active');
                    calendar.refetchEvents();
                }
            });
        });
    }

    // Filter Toggle
    document.querySelectorAll('.filter-tag').forEach(tag => {
        tag.onclick = function () {
            this.classList.toggle('active');
            calendar.refetchEvents();
        };
    });

    // Select All / Deselect All
    document.getElementById('selectAllBtn').onclick = () => {
        document.querySelectorAll('.filter-tag').forEach(t => t.classList.add('active'));
        calendar.refetchEvents();
    };
    document.getElementById('deselectAllBtn').onclick = () => {
        document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
        calendar.refetchEvents();
    };

    // Toggle Calendar Visibility
    toggleBtn.onclick = () => {
        calendarWrapper.classList.toggle('collapsed');
        toggleBtn.innerText = calendarWrapper.classList.contains('collapsed') ? '展开 ▼' : '收起 ▲';
    };

    // Back to Top
    window.onscroll = () => {
        if (window.scrollY > 300) backToTopBtn.classList.add('show');
        else backToTopBtn.classList.remove('show');
    };
    backToTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    // Excel Import
    excelInput.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            excelEvents = await loadExcelEvents(file);
            calendar.refetchEvents();
            alert('Excel 数据加载成功！');
        } catch (err) {
            console.error(err);
            alert('加载 Excel 失败，请确保使用正确的模板。');
        }
    };

    // PNG Export
    document.getElementById('exportPngBtn').onclick = () => {
        const calendarInner = document.getElementById('calendar-inner');
        const btn = document.getElementById('exportPngBtn');
        const originalText = btn.innerText;

        btn.innerText = '正在生成图片...';
        btn.style.opacity = '0.7';
        btn.disabled = true;

        html2canvas(calendarInner, {
            useCORS: true,
            scale: 2,
            backgroundColor: '#fdfaf3',
            logging: false,
            ignoreElements: (el) => {
                // Filter out elements that shouldn't be in the screenshot if any
                return false;
            }
        }).then(canvas => {
            const link = document.createElement('a');
            const viewType = calendar.view.type === 'dayGridMonth' ? '月视图' :
                (calendar.view.type === 'timeGridWeek' ? '周视图' : '年视图');
            const dateStr = new Date().toLocaleDateString('zh-CN').replace(/\//g, '-');
            link.download = `代号鸢日历_${viewType}_${dateStr}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();

            btn.innerText = originalText;
            btn.style.opacity = '1';
            btn.disabled = false;
        }).catch(err => {
            console.error('Export failed:', err);
            alert('导出失败，请重试');
            btn.innerText = originalText;
            btn.style.opacity = '1';
            btn.disabled = false;
        });
    };
});
