$(document).ready(function() {
    const taskList = $('#taskList');
    const taskModal = $('#taskModal');
    const addTaskBtn = $('#addTaskBtn');
    const closeModalBtn = $('#closeModal');
    const cancelBtn = $('#cancelBtn');
    const taskForm = $('#taskForm');
    const modalTitle = $('#modalTitle');

    const taskIdInput = $('#taskId');
    const taskTypeInput = $('#taskType');
    const taskTitleInput = $('#taskTitle');
    const taskDescriptionInput = $('#taskDescription');
    const subtasksListDiv = $('#subtasksList');
    const addSubtaskBtn = $('#addSubtaskBtn');
    const taskStartDateInput = $('#taskStartDate');
    const taskDueDateInput = $('#taskDueDate');
    const taskPriorityInput = $('#taskPriority');
    const taskStatusInput = $('#taskStatus');
    const subtasksContainer = $('#subtasks-container');
    const addSubtaskButtonContainer = $('#add-subtask-button-container');

    const searchIconContainer = $('.search-icon-container');
    const searchInputContainer = $('.search-input-container');
    const searchInput = $('#searchInput');

    const filterButtons = $('.filter-btn');

    // Dark Mode Toggle
    const darkModeToggle = $('#darkModeToggle');

    // Sidebar elements
    const sidebar = $('.sidebar');
    const body = $('body');

    // Calendar Elements
    const calendarSection = $('#calendarSection');
    const tasksSection = $('#taskSection');
    const statisticsSection = $('#statisticsSection');
    const tasksViewBtn = $('#tasksViewBtn');
    const calendarViewBtn = $('#calendarViewBtn');
    const statisticsViewBtn = $('#statisticsViewBtn');
    const currentMonthYear = $('#currentMonthYear');
    const calendarDates = $('#calendarDates');
    const prevMonthBtn = $('#prevMonthBtn');
    const nextMonthBtn = $('#nextMonthBtn');

    // Calendar Detail Modal Elements
    const calendarTaskDetailModal = $('#calendarTaskDetailModal');
    const closeCalendarDetailModalBtn = $('#closeCalendarDetailModal');
    const closeCalendarDetailModalBottomBtn = $('#closeCalendarDetailModalBottom');
    const calendarDetailDateSpan = $('#calendarDetailDate');
    const calendarDetailTaskList = $('#calendarDetailTaskList');

    // --- Local Storage Functions ---
    function saveTasksToLocalStorage(tasksData) {
        localStorage.setItem('tasks', JSON.stringify(tasksData));
    }

    function loadTasksFromLocalStorage() {
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
    }

    // Load tasks on initialization
    let tasks = loadTasksFromLocalStorage();

    // If no tasks are in local storage, initialize with sample data
    if (tasks.length === 0) {
        tasks = [
            // Sample Individual Tasks (10)
            {
                id: 'ind1', type: 'individual', title: 'Hoàn thành báo cáo hàng quý', description: 'Viết và nộp báo cáo hoạt động quý 2.',
                subtasks: [{text: 'Thu thập dữ liệu', completed: true}, {text: 'Phân tích số liệu', completed: false}, {text: 'Viết nội dung', completed: false}, {text: 'Kiểm tra lỗi', completed: false}],
                startDate: '2025-07-01', dueDate: '2025-07-15', priority: 'high', status: 'inprogress'
            },
            {
                id: 'ind2', type: 'individual', title: 'Học lập trình JavaScript nâng cao', description: 'Hoàn thành khóa học JavaScript trên Udemy.',
                subtasks: [{text: 'Module 1: ES6+', completed: true}, {text: 'Module 2: Async/Await', completed: true}, {text: 'Module 3: React cơ bản', completed: false}, {text: 'Làm dự án nhỏ', completed: false}],
                startDate: '2025-06-20', dueDate: '2025-08-30', priority: 'medium', status: 'inprogress'
            },
            {
                id: 'ind3', type: 'individual', title: 'Tập thể dục 30 phút mỗi ngày', description: 'Duy trì thói quen tập luyện hàng ngày.',
                subtasks: [{text: 'Chạy bộ 3km', completed: false}, {text: 'Tập gym', completed: false}, {text: 'Yoga 15 phút', completed: false}],
                startDate: '2025-07-01', dueDate: '2025-07-05', priority: 'low', status: 'todo'
            },
            {
                id: 'ind4', type: 'individual', title: 'Sửa lỗi website khách hàng A', description: 'Khắc phục các lỗi hiển thị trên trang chủ.',
                subtasks: [{text: 'Xác định lỗi', completed: true}, {text: 'Chỉnh sửa CSS', completed: true}, {text: 'Kiểm thử lại', completed: true}, {text: 'Deploy bản vá', completed: true}],
                startDate: '2025-06-25', dueDate: '2025-06-28', priority: 'high', status: 'done'
            },
            {
                id: 'ind5', type: 'individual', title: 'Đọc sách "Clean Code"', description: 'Đọc hết cuốn sách về Clean Code.',
                subtasks: [{text: 'Chương 1-5', completed: false}, {text: 'Chương 6-10', completed: false}, {text: 'Chương 11-15', completed: false}],
                startDate: '2025-07-05', dueDate: '2025-07-30', priority: 'medium', status: 'todo'
            },
            {
                id: 'ind6', type: 'individual', title: 'Chuẩn bị bài thuyết trình', description: 'Chuẩn bị nội dung và slide cho buổi thuyết trình tuần tới.',
                subtasks: [{text: 'Nghiên cứu chủ đề', completed: true}, {text: 'Viết dàn ý', completed: false}, {text: 'Thiết kế slide', completed: false}, {text: 'Luyện tập', completed: false}],
                startDate: '2025-06-28', dueDate: '2025-07-05', priority: 'high', status: 'inprogress'
            },
            {
                id: 'ind7', type: 'individual', title: 'Dọn dẹp nhà cửa', description: 'Tổng vệ sinh toàn bộ căn hộ.',
                subtasks: [{text: 'Lau sàn', completed: false}, {text: 'Dọn bếp', completed: false}, {text: 'Vệ sinh phòng tắm', completed: false}],
                startDate: '2025-07-06', dueDate: '2025-07-06', priority: 'low', status: 'todo'
            },
            {
                id: 'ind8', type: 'individual', title: 'Mua quà sinh nhật cho mẹ', description: 'Tìm và mua món quà phù hợp cho mẹ.',
                subtasks: [{text: 'Lên ý tưởng', completed: true}, {text: 'Tham khảo cửa hàng', completed: true}, {text: 'Mua sắm', completed: true}, {text: 'Gói quà', completed: true}],
                startDate: '2025-06-15', dueDate: '2025-06-20', priority: 'medium', status: 'done'
            },
            {
                id: 'ind9', type: 'individual', title: 'Lên kế hoạch du lịch cuối năm', description: 'Nghiên cứu địa điểm và đặt vé cho chuyến đi.',
                subtasks: [{text: 'Chọn địa điểm', completed: false}, {text: 'Xem xét ngân sách', completed: false}, {text: 'Đặt vé máy bay/tàu', completed: false}, {text: 'Đặt phòng khách sạn', completed: false}],
                startDate: '2025-07-10', dueDate: '2025-07-10', priority: 'low', status: 'todo'
            },
            {
                id: 'ind10', type: 'individual', title: 'Cập nhật CV', description: 'Thêm kinh nghiệm và kỹ năng mới vào CV.',
                subtasks: [{text: 'Liệt kê kinh nghiệm mới', completed: true}, {text: 'Viết mô tả kỹ năng', completed: false}, {text: 'Kiểm tra định dạng', completed: false}],
                startDate: '2025-06-20', dueDate: '2025-07-01', priority: 'medium', status: 'inprogress'
            },
            // Sample Group Tasks (5)
            {
                id: 'grp1', type: 'group', title: 'Dự án website công ty', description: 'Phát triển trang web giới thiệu sản phẩm mới.',
                subtasks: [
                    {text: 'Thiết kế giao diện', completed: false, member: 'An'},
                    {text: 'Phát triển Backend', completed: false, member: 'Bình'},
                    {text: 'Tích hợp API', completed: false, member: 'Cường'},
                    {text: 'Kiểm thử toàn diện', completed: false, member: 'An'}
                ],
                startDate: '2025-06-01', dueDate: '2025-07-15', priority: 'high', status: 'inprogress',
                membersProgress: {
                    'An': [{text: 'Thiết kế giao diện', completed: false}, {text: 'Kiểm thử toàn diện', completed: false}],
                    'Bình': [{text: 'Phát triển Backend', completed: false}],
                    'Cường': [{text: 'Tích hợp API', completed: false}]
                }
            },
            {
                id: 'grp2', type: 'group', title: 'Tổ chức sự kiện cuối năm', description: 'Lập kế hoạch và thực hiện tiệc tổng kết cuối năm.',
                subtasks: [
                    {text: 'Lên ngân sách', completed: true, member: 'An'},
                    {text: 'Chọn địa điểm', completed: true, member: 'Bình'},
                    {text: 'Thuê âm thanh ánh sáng', completed: false, member: 'An'},
                    {text: 'Lên danh sách khách mời', completed: false, member: 'Cường'}
                ],
                startDate: '2025-09-01', dueDate: '2025-12-15', priority: 'medium', status: 'inprogress',
                membersProgress: {
                    'An': [{text: 'Lên ngân sách', completed: true}, {text: 'Thuê âm thanh ánh sáng', completed: false}],
                    'Bình': [{text: 'Chọn địa điểm', completed: true}],
                    'Cường': [{text: 'Lên danh sách khách mời', completed: false}]
                }
            },
            {
                id: 'grp3', type: 'group', title: 'Nghiên cứu thị trường mới', description: 'Phân tích tiềm năng thị trường sản phẩm X.',
                subtasks: [
                    {text: 'Thu thập khảo sát', completed: false, member: 'Đạt'},
                    {text: 'Phân tích dữ liệu', completed: false, member: 'Thảo'},
                    {text: 'Viết báo cáo', completed: false, member: 'Đạt'}
                ],
                startDate: '2025-07-15', dueDate: '2025-08-15', priority: 'high', status: 'todo',
                membersProgress: {
                    'Đạt': [{text: 'Thu thập khảo sát', completed: false}, {text: 'Viết báo cáo', completed: false}],
                    'Thảo': [{text: 'Phân tích dữ liệu', completed: false}]
                }
            },
            {
                id: 'grp4', type: 'group', title: 'Đào tạo nhân viên mới', description: 'Tổ chức các buổi huấn luyện cho nhân sự mới.',
                subtasks: [
                    {text: 'Lên giáo trình', completed: true, member: 'Lan'},
                    {text: 'Chuẩn bị tài liệu', completed: true, member: 'Mai'},
                    {text: 'Giảng dạy Module 1', completed: true, member: 'Lan'},
                    {text: 'Đánh giá học viên', completed: true, member: 'Mai'}
                ],
                startDate: '2025-06-01', dueDate: '2025-06-30', priority: 'low', status: 'done',
                membersProgress: {
                    'Lan': [{text: 'Lên giáo trình', completed: true}, {text: 'Giảng dạy Module 1', completed: true}],
                    'Mai': [{text: 'Chuẩn bị tài liệu', completed: true}, {text: 'Đánh giá học viên', completed: true}]
                }
            },
            {
                id: 'grp5', type: 'group', title: 'Cải tiến quy trình sản xuất', description: 'Đề xuất và triển khai giải pháp tối ưu hóa.',
                subtasks: [
                    {text: 'Khảo sát hiện trạng', completed: false, member: 'Sơn'},
                    {text: 'Phân tích điểm yếu', completed: false, member: 'Hà'},
                    {text: 'Đề xuất giải pháp', completed: false, member: 'Sơn'},
                    {text: 'Triển khai thử nghiệm', completed: false, member: 'Hà'}
                ],
                startDate: '2025-07-01', dueDate: '2025-07-08', priority: 'high', status: 'inprogress',
                membersProgress: {
                    'Sơn': [{text: 'Khảo sát hiện trạng', completed: false}, {text: 'Đề xuất giải pháp', completed: false}],
                    'Hà': [{text: 'Phân tích điểm yếu', completed: false}, {text: 'Triển khai thử nghiệm', completed: false}]
                }
            }
        ];
        saveTasksToLocalStorage(tasks); // Save sample data to local storage for the first time
    }

    let currentTask = null;

    // Lịch
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    // Hàm render lịch
    function renderCalendar() {
        calendarDates.empty();

        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
        const numDaysInMonth = lastDayOfMonth.getDate();
        const firstWeekday = firstDayOfMonth.getDay(); // 0 (Sunday) to 6 (Saturday)

        const monthNames = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
                            "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];
        currentMonthYear.text(`${monthNames[currentMonth]} ${currentYear}`);

        // Thêm các ô trống cho những ngày trước tháng hiện tại
        // Note: adjust 'firstWeekday' for your calendar's starting day (e.g., if Monday is 0)
        let startDayAdjusted = (firstWeekday === 0) ? 6 : firstWeekday - 1; // If Sunday is 0, make it 6 (Sat) so Monday is 0
        for (let i = 0; i < startDayAdjusted; i++) {
            calendarDates.append('<div class="calendar-day inactive"></div>');
        }

        // Thêm các ngày của tháng
        for (let day = 1; day <= numDaysInMonth; day++) {
            const date = new Date(currentYear, currentMonth, day);
            const dateString = date.toISOString().split('T')[0];

            let dayClasses = ['calendar-day'];
            const today = new Date();
            if (date.toDateString() === today.toDateString()) {
                dayClasses.push('current-day');
            }

            // Lọc các task có hạn chót vào ngày này
            const tasksForDay = tasks.filter(task => task.dueDate === dateString);

            let indicatorsHtml = '<div class="calendar-task-indicators">';
            if (tasksForDay.length > 0) {
                // Sắp xếp tác vụ: quá hạn > chưa bắt đầu > đang thực hiện > hoàn thành
                const sortedTasks = tasksForDay.sort((a, b) => {
                    const statusOrder = { 'overdue': 0, 'todo': 1, 'inprogress': 2, 'done': 3 };
                    const aStatus = getTaskOverallStatus(a); // Lấy trạng thái tổng thể bao gồm quá hạn
                    const bStatus = getTaskOverallStatus(b);
                    return statusOrder[aStatus] - statusOrder[bStatus];
                });

                sortedTasks.forEach(task => {
                    const overallStatus = getTaskOverallStatus(task);
                    let dotClass = '';
                    switch (overallStatus) {
                        case 'todo': dotClass = 'status-todo-dot'; break;
                        case 'inprogress': dotClass = 'status-inprogress-dot'; break;
                        case 'done': dotClass = 'status-done-dot'; break;
                        case 'overdue': dotClass = 'status-todo-dot'; break; // Quá hạn cũng dùng chấm đỏ
                    }
                    indicatorsHtml += `<div class="calendar-task-indicator ${dotClass}"></div>`;
                });
            }
            indicatorsHtml += '</div>';

            calendarDates.append(`
                <div class="${dayClasses.join(' ')}" data-date="${dateString}">
                    <span class="day-number">${day}</span>
                    ${indicatorsHtml}
                </div>
            `);
        }
    }

    // Helper to determine overall task status (including overdue)
    function getTaskOverallStatus(task) {
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const dueDateObj = new Date(task.dueDate);
        dueDateObj.setHours(0, 0, 0, 0);
        const isOverdue = task.status !== 'done' && dueDateObj < now;

        if (isOverdue) return 'overdue';
        return task.status;
    }


    // Event Listeners cho nút điều hướng lịch
    prevMonthBtn.on('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });

    nextMonthBtn.on('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });

    // Mở modal chi tiết tác vụ khi click vào ô ngày trên lịch
    $(document).on('click', '.calendar-day:not(.inactive)', function() {
        const dateString = $(this).data('date');
        const clickedDate = new Date(dateString);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        calendarDetailDateSpan.text(clickedDate.toLocaleDateString('vi-VN', options));
        calendarDetailTaskList.empty();

        const tasksForSelectedDay = tasks.filter(task => task.dueDate === dateString);

        if (tasksForSelectedDay.length > 0) {
            // Sắp xếp tác vụ giống như khi hiển thị chấm
            const sortedTasks = tasksForSelectedDay.sort((a, b) => {
                const statusOrder = { 'overdue': 0, 'todo': 1, 'inprogress': 2, 'done': 3 };
                const aStatus = getTaskOverallStatus(a);
                const bStatus = getTaskOverallStatus(b);
                return statusOrder[aStatus] - statusOrder[bStatus];
            });

            sortedTasks.forEach(task => {
                const overallStatus = getTaskOverallStatus(task);
                let statusClass = '';
                let statusText = '';
                switch (overallStatus) {
                    case 'todo': statusClass = 'status-todo'; statusText = 'Chưa bắt đầu'; break;
                    case 'inprogress': statusClass = 'status-inprogress'; statusText = 'Đang thực hiện'; break;
                    case 'done': statusClass = 'status-done'; statusText = 'Hoàn thành'; break;
                    case 'overdue': statusClass = 'status-overdue'; statusText = 'Quá hạn'; break;
                }

                let priorityClass = '';
                let priorityText = '';
                switch (task.priority) {
                    case 'high': priorityClass = 'priority-high'; priorityText = 'Cao'; break;
                    case 'medium': priorityClass = 'priority-medium'; priorityText = 'Trung bình'; break;
                    case 'low': priorityClass = 'priority-low'; priorityText = 'Thấp'; break;
                }

                calendarDetailTaskList.append(`
                    <div class="detail-item">
                        <h4>
                            ${task.title}
                            <span class="detail-status ${statusClass}">${statusText}</span>
                        </h4>
                        <p><span class="detail-label">Mô tả:</span> ${task.description || 'Không có'}</p>
                        <p><span class="detail-label">Ngày bắt đầu:</span> ${formatDate(task.startDate)}</p>
                        <p><span class="detail-label">Hạn chót:</span> ${formatDate(task.dueDate)}</p>
                        <p><span class="detail-label">Độ ưu tiên:</span> <span class="detail-priority ${priorityClass}">${priorityText}</span></p>
                        ${task.type === 'group' ? `<p><span class="detail-label">Loại:</span> Nhóm</p>` : `<p><span class="detail-label">Loại:</span> Cá nhân</p>`}
                    </div>
                `);
            });
        } else {
            calendarDetailTaskList.append('<p style="text-align: center; color: #777;">Không có tác vụ nào trong ngày này.</p>');
        }

        calendarTaskDetailModal.addClass('show');
    });

    // Đóng modal chi tiết tác vụ
    closeCalendarDetailModalBtn.on('click', function() {
        calendarTaskDetailModal.removeClass('show');
    });

    closeCalendarDetailModalBottomBtn.on('click', function() {
        calendarTaskDetailModal.removeClass('show');
    });

    calendarTaskDetailModal.on('click', function(e) {
        if ($(e.target).is('#calendarTaskDetailModal')) {
            calendarTaskDetailModal.removeClass('show');
        }
    });


    // Hàm chuyển đổi giữa các view (Tác vụ, Lịch và Thống kê)
    function switchView(view) {
        tasksSection.removeClass('active');
        calendarSection.removeClass('active');
        statisticsSection.removeClass('active');

        tasksViewBtn.removeClass('active');
        calendarViewBtn.removeClass('active');
        statisticsViewBtn.removeClass('active');

        if (view === 'tasks') {
            tasksSection.addClass('active');
            tasksViewBtn.addClass('active');
            renderTasks();
        } else if (view === 'calendar') {
            calendarSection.addClass('active');
            calendarViewBtn.addClass('active');
            renderCalendar();
        } else if (view === 'statistics') {
            statisticsSection.addClass('active');
            statisticsViewBtn.addClass('active');
            renderTaskStatsChart(); // Gọi hàm render biểu đồ
        }
        saveTasksToLocalStorage(tasks); // Lưu trạng thái khi chuyển view
    }

    // Event Listeners cho nút sidebar
    tasksViewBtn.on('click', function(e) {
        e.preventDefault();
        switchView('tasks');
    });

    calendarViewBtn.on('click', function(e) {
        e.preventDefault();
        switchView('calendar');
    });

    statisticsViewBtn.on('click', function(e) {
        e.preventDefault();
        switchView('statistics');
    });

    function renderTasks(filter = 'all', searchText = '') {
        taskList.empty();
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        const filteredTasks = tasks.filter(task => {
            const matchesSearch = searchText === '' ||
                                  task.title.toLowerCase().includes(searchText.toLowerCase()) ||
                                  (task.description && task.description.toLowerCase().includes(searchText.toLowerCase())); // Check if description exists

            if (!matchesSearch) return false;

            const dueDate = new Date(task.dueDate);
            dueDate.setHours(0, 0, 0, 0);
            const isOverdue = task.status !== 'done' && dueDate < now;

            switch (filter) {
                case 'all': return true;
                case 'inprogress': return task.status === 'inprogress';
                case 'done': return task.status === 'done';
                case 'overdue': return isOverdue;
                case 'individual': return task.type === 'individual';
                case 'group': return task.type === 'group';
                default: return true;
            }
        });

        if (filteredTasks.length === 0) {
            taskList.append('<p style="text-align: center; color: #777;">Không tìm thấy tác vụ nào.</p>');
            return;
        }

        filteredTasks.forEach((task, index) => {
            let priorityClass = '';
            let priorityText = '';
            switch (task.priority) {
                case 'high': priorityClass = 'priority-high'; priorityText = 'Cao'; break;
                case 'medium': priorityClass = 'priority-medium'; priorityText = 'Trung bình'; break;
                case 'low': priorityClass = 'priority-low'; priorityText = 'Thấp'; break;
            }

            let statusClass = '';
            let statusText = '';
            const dueDateObj = new Date(task.dueDate);
            dueDateObj.setHours(0, 0, 0, 0);
            const isOverdue = task.status !== 'done' && dueDateObj < now;

            if (isOverdue) {
                statusClass = 'status-overdue';
                statusText = 'Quá hạn';
            } else {
                switch (task.status) {
                    case 'todo': statusClass = 'status-todo'; statusText = 'Chưa bắt đầu'; break;
                    case 'inprogress': statusClass = 'status-inprogress'; statusText = 'Đang thực hiện'; break;
                    case 'done': statusClass = 'status-done'; statusText = 'Hoàn thành'; break;
                }
            }

            const totalSubtasks = task.subtasks ? task.subtasks.length : 0;
            const completedSubtasks = task.subtasks ? task.subtasks.filter(sub => sub.completed).length : 0;
            const progress = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

            let taskItemHtml = `
                <div class="task-item" data-id="${task.id}" data-type="${task.type}" data-status="${task.status}">
                    <div class="task-item-header">
                        <span class="task-title">${task.title}</span>
                        <span class="task-priority ${priorityClass}">${priorityText}</span>
                    </div>
                    <p class="task-description">${task.description}</p>
                    <p class="task-dates">
                        <i class="far fa-calendar-alt"></i> Bắt đầu: ${formatDate(task.startDate)} - Hạn chót: ${formatDate(task.dueDate)}
                    </p>
                    <ul class="subtasks-list">
            `;
            if (task.subtasks) {
                task.subtasks.forEach((subtask, subIndex) => {
                    taskItemHtml += `
                        <li class="subtask-item ${subtask.completed ? 'completed' : ''}">
                            <input type="checkbox" id="subtask-${task.id}-${subIndex}" data-task-id="${task.id}" data-subtask-index="${subIndex}" ${subtask.completed ? 'checked' : ''}>
                            <label for="subtask-${task.id}-${subIndex}">${subtask.text}</label>
                            ${task.type === 'group' && subtask.member ? `<span style="font-size: 0.8em; color: #999; margin-left: 5px;">(${subtask.member})</span>` : ''}
                        </li>
                    `;
                });
            }
            taskItemHtml += `
                    </ul>
                    <div class="progress-container">
                        <div class="progress-bar" style="width: ${progress}%;"></div>
                        <span class="progress-text">${Math.round(progress)}%</span>
                    </div>
            `;

            if (task.type === 'group' && task.membersProgress) {
                taskItemHtml += `
                    <div class="group-members-progress">
                        <h4>Tiến độ thành viên:</h4>
                        ${Object.entries(task.membersProgress).map(([member, memberSubtasks]) => {
                            const memberTotalSubtasks = memberSubtasks.length;
                            const memberCompletedSubtasks = memberSubtasks.filter(sub => sub.completed).length;
                            let memberProgress = 0;
                            if (memberTotalSubtasks > 0) {
                                memberProgress = (memberCompletedSubtasks / memberTotalSubtasks) * 100;
                            }

                            let displayWidth = memberProgress;
                            let noProgressClass = '';

                            if (memberProgress === 0 && memberTotalSubtasks > 0) {
                                displayWidth = 0;
                                noProgressClass = 'no-progress';
                            } else if (memberProgress > 0 && memberProgress < 1 && memberTotalSubtasks > 0) {
                                displayWidth = 1;
                            } else if (memberProgress === 100 && memberTotalSubtasks > 0) {
                                displayWidth = 100;
                            }

                            return `
                                <div class="member-progress-item">
                                    <strong>${member}:</strong>
                                    <div class="progress-bar-small">
                                        <span class="${noProgressClass}" style="width: ${displayWidth}%;"></span>
                                        <span class="progress-text-small">${Math.round(memberProgress)}%</span>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                `;
            }

            taskItemHtml += `
                    <div class="task-actions">
                        <span class="task-status ${statusClass}">${statusText}</span>
                        <button class="btn btn-edit edit-task" data-id="${task.id}"><i class="fas fa-edit"></i> Sửa</button>
                        <button class="btn btn-delete delete-task" data-id="${task.id}"><i class="fas fa-trash-alt"></i> Xóa</button>
                    </div>
                </div>
            `;

            const taskElement = $(taskItemHtml);

            taskElement.css({opacity: 0, transform: 'translateY(10px)'}).appendTo('#taskList')
                .delay(100 * index)
                .animate({opacity: 1, translateY: '0px'}, 400);
        });
    }

    function formatDate(dateString) {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        const hasTime = dateString.includes('T') || dateString.includes(':');

        if (hasTime) {
            const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
            return date.toLocaleDateString('vi-VN', options);
        } else {
            const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
            return date.toLocaleDateString('vi-VN', options);
        }
    }

    function updateTaskProgress(taskId) {
        const task = tasks.find(t => t.id === taskId);
        if (!task) return;

        const totalSubtasks = task.subtasks ? task.subtasks.length : 0;
        const completedSubtasks = task.subtasks ? task.subtasks.filter(sub => sub.completed).length : 0;
        const progress = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

        const $taskItem = $(`.task-item[data-id="${taskId}"]`);

        $taskItem.find('.progress-bar').css('width', `${progress}%`);
        $taskItem.find('.progress-text').text(`${Math.round(progress)}%`);

        let newStatus = task.status;
        if (progress === 100) {
            newStatus = 'done';
        } else if (progress > 0 && progress < 100) {
            newStatus = 'inprogress';
        } else {
            newStatus = 'todo';
        }

        if (task.status !== newStatus) {
            task.status = newStatus;

            let statusClass = '';
            let statusText = '';
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            const dueDateObj = new Date(task.dueDate);
            dueDateObj.setHours(0, 0, 0, 0);
            const isOverdue = task.status !== 'done' && dueDateObj < now;

            if (isOverdue) {
                statusClass = 'status-overdue';
                statusText = 'Quá hạn';
            } else {
                switch (task.status) {
                    case 'todo': statusClass = 'status-todo'; statusText = 'Chưa bắt đầu'; break;
                    case 'inprogress': statusClass = 'status-inprogress'; statusText = 'Đang thực hiện'; break;
                    case 'done': statusClass = 'status-done'; statusText = 'Hoàn thành'; break;
                }
            }

            const $taskStatusSpan = $taskItem.find('.task-status');
            $taskStatusSpan.removeClass('status-todo status-inprogress status-done status-overdue').addClass(statusClass).text(statusText);
            $taskItem.attr('data-status', task.status);
        }

        if (task.type === 'group' && task.membersProgress) {
            for (const member in task.membersProgress) {
                const memberTotalSubtasks = task.membersProgress[member].length;
                const memberCompletedSubtasks = task.membersProgress[member].filter(sub => sub.completed).length;
                let memberProgress = 0;
                if (memberTotalSubtasks > 0) {
                    memberProgress = (memberCompletedSubtasks / memberTotalSubtasks) * 100;
                }

                let displayWidth = memberProgress;
                let noProgressClass = '';

                if (memberProgress === 0 && memberTotalSubtasks > 0) {
                    displayWidth = 0;
                    noProgressClass = 'no-progress';
                } else if (memberProgress > 0 && memberProgress < 1 && memberTotalSubtasks > 0) {
                    displayWidth = 1;
                } else if (memberProgress === 100 && memberTotalSubtasks > 0) {
                    displayWidth = 100;
                }

                const memberProgressBar = $taskItem.find(`.member-progress-item:has(strong:contains("${member}")) .progress-bar-small span`);
                const memberProgressText = $taskItem.find(`.member-progress-item:has(strong:contains("${member}")) .progress-text-small`);

                memberProgressBar.css('width', `${displayWidth}%`);
                if (noProgressClass === 'no-progress') {
                    memberProgressBar.addClass('no-progress');
                } else {
                    memberProgressBar.removeClass('no-progress');
                }
                memberProgressText.text(`${Math.round(memberProgress)}%`);
            }
        }
        saveTasksToLocalStorage(tasks); // Save changes
        applySearchFilter(filterButtons.filter('.active').data('filter'), searchInput.val());
        renderCalendar(); // Cập nhật lịch khi tiến độ tác vụ thay đổi
        renderTaskStatsChart(); // Cập nhật biểu đồ thống kê
    }

    $(document).on('change', '.subtasks-list input[type="checkbox"]', function() {
        const taskId = $(this).data('task-id');
        const subtaskIndex = $(this).data('subtask-index');
        const task = tasks.find(t => t.id === taskId);

        if (task && task.subtasks && task.subtasks[subtaskIndex]) {
            task.subtasks[subtaskIndex].completed = this.checked;
            $(this).parent().toggleClass('completed', this.checked);

            if (task.type === 'group' && task.subtasks[subtaskIndex].member) {
                const memberName = task.subtasks[subtaskIndex].member;
                const memberSubtask = task.membersProgress[memberName] ? task.membersProgress[memberName].find(sub => sub.text === task.subtasks[subtaskIndex].text) : null;
                if (memberSubtask) {
                    memberSubtask.completed = this.checked;
                }
            }
            updateTaskProgress(taskId);
        }
    });

    addTaskBtn.on('click', function () {
        $('#taskModal').addClass('show');
        $('#modalTitle').text('Thêm tác vụ mới');
        $('#taskForm')[0].reset();
        taskIdInput.val('');
        subtasksListDiv.empty();
        currentTask = null;

        taskTypeInput.val('individual').trigger('change');
    });

    $('#closeModal, #cancelBtn').click(function () {
        $('#taskModal').removeClass('show');
    });

    $('#taskModal').click(function (e) {
        if ($(e.target).is('#taskModal')) {
            $('#taskModal').removeClass('show');
        }
    });

    taskTypeInput.on('change', function() {
        const selectedType = $(this).val();
        subtasksListDiv.empty();
        // Always show add subtask button regardless of type
        if (selectedType === 'group') {
            // No specific action needed here for group, just ensure inputs are added with member field
        } else {
            // For individual tasks, remove member field if present from existing subtasks
            subtasksListDiv.find('.subtask-member-input').remove();
        }
    });

    addSubtaskBtn.on('click', function() {
        const isGroupTask = taskTypeInput.val() === 'group';
        const subtaskHtml = `
            <div class="subtask-input-group">
                <input type="text" class="form-control subtask-input" placeholder="Tên nhiệm vụ con" required>
                ${isGroupTask ? `
                    <input type="text" class="form-control subtask-member-input" placeholder="Gán cho thành viên">
                ` : ''}
                <button type="button" class="remove-subtask-btn"><i class="fas fa-times"></i></button>
            </div>
        `;
        subtasksListDiv.append(subtaskHtml);
    });

    $(document).on('click', '.remove-subtask-btn', function() {
        $(this).closest('.subtask-input-group').remove();
    });

    taskForm.submit(function (e) {
        e.preventDefault();

        const id = taskIdInput.val() || 'task' + Date.now();
        const type = taskTypeInput.val();
        const title = taskTitleInput.val();
        const description = taskDescriptionInput.val();

        const subtasks = [];
        subtasksListDiv.find('.subtask-input-group').each(function() {
            const subtaskText = $(this).find('.subtask-input').val();
            const memberNameInput = $(this).find('.subtask-member-input');
            const memberName = memberNameInput.length > 0 ? memberNameInput.val().trim() : undefined;

            if (subtaskText) {
                // Find existing subtask to preserve completion status
                const existingSubtask = currentTask && currentTask.subtasks ? currentTask.subtasks.find(s => s.text === subtaskText) : null;
                subtasks.push({
                    text: subtaskText,
                    completed: existingSubtask ? existingSubtask.completed : false,
                    member: type === 'group' ? memberName : undefined
                });
            }
        });

        const startDate = taskStartDateInput.val();
        const dueDate = taskDueDateInput.val();
        const priority = taskPriorityInput.val();
        const status = taskStatusInput.val();

        let membersProgress = {};
        if (type === 'group') {
            const uniqueMembers = [...new Set(subtasks.map(s => s.member).filter(Boolean))];
            uniqueMembers.forEach(member => {
                membersProgress[member] = subtasks.filter(s => s.member === member).map(s => ({text: s.text, completed: s.completed}));
            });
        }

        const newTaskData = {
            id, type, title, description, subtasks, startDate, dueDate, priority, status, membersProgress: type === 'group' ? membersProgress : undefined
        };

        const existingTaskIndex = tasks.findIndex(t => t.id === id);

        if (existingTaskIndex > -1) {
            tasks[existingTaskIndex] = newTaskData;
        } else {
            tasks.push(newTaskData);
        }

        saveTasksToLocalStorage(tasks); // Save tasks after adding/editing
        $('#taskModal').removeClass('show');
        renderTasks(filterButtons.filter('.active').data('filter'), searchInput.val());
        renderCalendar(); // Cập nhật lịch sau khi lưu tác vụ
        renderTaskStatsChart(); // Cập nhật biểu đồ thống kê
    });

    $(document).on('click', '.edit-task', function () {
        const taskId = $(this).data('id');
        currentTask = tasks.find(task => task.id === taskId);

        if (currentTask) {
            modalTitle.text('Sửa tác vụ');
            taskIdInput.val(currentTask.id);
            taskTypeInput.val(currentTask.type);
            taskTitleInput.val(currentTask.title);
            taskDescriptionInput.val(currentTask.description);
            taskStartDateInput.val(currentTask.startDate);
            taskDueDateInput.val(currentTask.dueDate);
            taskPriorityInput.val(currentTask.priority);
            taskStatusInput.val(currentTask.status);

            taskTypeInput.trigger('change');

            subtasksListDiv.empty();
            if (currentTask.subtasks) {
                currentTask.subtasks.forEach(subtask => {
                    const isGroupTask = currentTask.type === 'group';
                    const subtaskHtml = `
                        <div class="subtask-input-group">
                            <input type="text" class="form-control subtask-input" value="${subtask.text}" placeholder="Tên nhiệm vụ con" required>
                            ${isGroupTask ? `
                                <input type="text" class="form-control subtask-member-input" value="${subtask.member || ''}" placeholder="Gán cho thành viên">
                            ` : ''}
                            <button type="button" class="remove-subtask-btn"><i class="fas fa-times"></i></button>
                        </div>
                    `;
                    subtasksListDiv.append(subtaskHtml);
                });
            }

            $('#taskModal').addClass('show');
        }
    });

    $(document).on('click', '.delete-task', function () {
        const $taskItem = $(this).closest('.task-item');
        const taskId = $taskItem.data('id');

        if (confirm('Bạn có chắc chắn muốn xóa tác vụ này?')) {
            tasks = tasks.filter(task => task.id !== taskId);
            saveTasksToLocalStorage(tasks); // Save tasks after deleting

            $taskItem.fadeOut(300, function () {
                renderTasks(filterButtons.filter('.active').data('filter'), searchInput.val());
                renderCalendar();
                renderTaskStatsChart(); // Cập nhật biểu đồ thống kê
            });
        }
    });

    filterButtons.on('click', function () {
        filterButtons.removeClass('active');
        $(this).addClass('active');
        const filter = $(this).data('filter');
        applySearchFilter(filter, searchInput.val());
    });

    searchIconContainer.on('click', function() {
        searchInputContainer.toggleClass('active');
        if (searchInputContainer.hasClass('active')) {
            searchInput.focus();
        } else {
            searchInput.val('');
            applySearchFilter(filterButtons.filter('.active').data('filter'), '');
        }
    });

    searchInput.on('input', function () {
        applySearchFilter(filterButtons.filter('.active').data('filter'), $(this).val());
    });

    function applySearchFilter(currentFilter = 'all', currentSearchText = '') {
        const keyword = currentSearchText.toLowerCase();
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        let anyTaskVisible = false;

        $('.task-item').each(function () {
            const $this = $(this);
            const title = $this.find('.task-title').text().toLowerCase();
            const desc = $this.find('.task-description').text().toLowerCase();
            const taskType = $this.data('type');
            const taskStatus = $this.data('status');
            const taskId = $this.data('id');
            const taskObj = tasks.find(t => t.id === taskId); // Retrieve the actual task object

            if (!taskObj) { // If task object not found, hide it (shouldn't happen with proper ID management)
                $this.fadeOut(200);
                return;
            }

            let matchesSearch = title.includes(keyword) || (taskObj.description && taskObj.description.toLowerCase().includes(keyword));

            let matchesFilter = true;
            if (currentFilter !== 'all') {
                const dueDateObj = new Date(taskObj.dueDate);
                dueDateObj.setHours(0, 0, 0, 0);
                const isOverdue = taskStatus !== 'done' && dueDateObj < now;

                switch (currentFilter) {
                    case 'inprogress':
                        matchesFilter = taskStatus === 'inprogress';
                        break;
                    case 'done':
                        matchesFilter = taskStatus === 'done';
                        break;
                    case 'overdue':
                        matchesFilter = isOverdue;
                        break;
                    case 'individual':
                        matchesFilter = taskType === 'individual';
                        break;
                    case 'group':
                        matchesFilter = taskType === 'group';
                        break;
                }
            }

            if (matchesSearch && matchesFilter) {
                $this.fadeIn(200);
                anyTaskVisible = true;
            } else {
                $this.fadeOut(200);
            }
        });

        if (!anyTaskVisible && tasks.length > 0) {
            if (!$('.no-tasks-message').length) {
                taskList.append('<p class="no-tasks-message" style="text-align: center; color: #777;">Không tìm thấy tác vụ nào phù hợp.</p>');
            }
        } else {
            $('.no-tasks-message').remove();
        }
    }

    // Dark Mode Functionality
    function enableDarkMode() {
        $('body').addClass('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
    }

    function disableDarkMode() {
        $('body').removeClass('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
    }

    // Check for saved dark mode preference on load
    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
        darkModeToggle.prop('checked', true);
    } else {
        disableDarkMode();
        darkModeToggle.prop('checked', false);
    }

    // Toggle dark mode on button click
    darkModeToggle.on('change', function() {
        if ($(this).is(':checked')) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    });

    // Hàm render biểu đồ thống kê tác vụ
    function renderTaskStatsChart() {
        const taskNames = tasks.map(task => task.title);
        const taskProgress = tasks.map(task => {
            const totalSubtasks = task.subtasks ? task.subtasks.length : 0;
            const completedSubtasks = task.subtasks ? task.subtasks.filter(sub => sub.completed).length : 0;
            return totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;
        });

        const backgroundColors = tasks.map(task => {
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            const dueDateObj = new Date(task.dueDate);
            dueDateObj.setHours(0, 0, 0, 0);
            const isOverdue = task.status !== 'done' && dueDateObj < now;

            if (isOverdue) return '#e74c3c'; // Đỏ: Quá hạn
            switch (task.status) {
                case 'todo': return '#e74c3c'; // Đỏ: Chưa bắt đầu
                case 'inprogress': return '#8e44ad'; // Tím: Đang thực hiện
                case 'done': return '#2ecc71'; // Xanh lá: Hoàn thành
                default: return '#cccccc';
            }
        });

        if (window.taskStatsChartInstance) {
            window.taskStatsChartInstance.destroy(); // Hủy bỏ biểu đồ cũ nếu có
        }

        const ctx = document.getElementById('taskStatsChart').getContext('2d');
        window.taskStatsChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: taskNames, // Tên các task trên trục Ox
                datasets: [{
                    label: '% Tiến độ hoàn thành',
                    data: taskProgress, // % tiến độ thực tế
                    backgroundColor: backgroundColors,
                    borderRadius: 5, // Bo tròn các góc cột
                    barThickness: 40 // Điều chỉnh độ dày cột
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // Cho phép tùy chỉnh kích thước mà không bị giới hạn tỷ lệ
                layout: {
                    padding: {
                        top: 10,
                        bottom: 10,
                        left: 10,
                        right: 10
                    }
                },
                plugins: {
                    legend: {
                        display: false // Ẩn chú thích mặc định của dataset
                    },
                    tooltip: {
                        callbacks: {
                            label: ctx => {
                                let label = ctx.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += `${Math.round(ctx.parsed.y)}%`;
                                return label;
                            },
                             title: ctx => {
                                // Hiển thị tên task trên tooltip
                                return ctx[0].label;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100, // Trục Y hiển thị từ 0% đến 100%
                        ticks: {
                            stepSize: 10,
                            callback: value => value + '%' // Định dạng nhãn trục Y là phần trăm
                        },
                        title: {
                            display: true,
                            text: '% Tiến độ hoàn thành thực tế' // Tiêu đề trục Y
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Tên các task' // Tiêu đề trục X
                        },
                        // Đảm bảo nhãn trục X không bị cắt nếu quá dài
                        ticks: {
                            autoSkip: false,
                            maxRotation: 45,
                            minRotation: 45
                        }
                    }
                }
            }
        });

        // Cập nhật nội dung của phần tử chú thích hiện có thay vì thêm mới
        const $taskChartLegend = $('#taskChartLegend');
        $taskChartLegend.empty(); // Xóa nội dung hiện có

        const legendItems = [
            { color: '#e74c3c', text: 'Chưa bắt đầu / Quá hạn' },
            { color: '#8e44ad', text: 'Đang thực hiện' },
            { color: '#2ecc71', text: 'Hoàn thành' }
        ];

        legendItems.forEach(item => {
            $taskChartLegend.append(`
                <div style="display: inline-block; margin: 0 10px;">
                    <span style="display: inline-block; width: 15px; height: 15px; background-color: ${item.color}; border-radius: 3px; vertical-align: middle; margin-right: 5px;"></span>
                    <span style="vertical-align: middle;">${item.text}</span>
                </div>
            `);
        });
    }

    // Initial render of tasks, calendar, and chart when the page loads
    renderTasks();
    renderCalendar();
    renderTaskStatsChart(); // Render chart on initial load

    // Trigger dark mode check on window load as well, for robustness
    $(window).on('load', function() {
        if (localStorage.getItem('darkMode') === 'enabled') {
            enableDarkMode();
            darkModeToggle.prop('checked', true);
        } else {
            disableDarkMode();
            darkModeToggle.prop('checked', false);
        }
    });
});
