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
    const currentMonthYearSpan = $('#currentMonthYear');
    const calendarDatesDiv = $('#calendarDates');
    const prevMonthBtn = $('#prevMonthBtn');
    const nextMonthBtn = $('#nextMonthBtn');

    // Calendar Detail Modal Elements
    const calendarTaskDetailModal = $('#calendarTaskDetailModal');
    const closeCalendarDetailModalBtn = $('#closeCalendarDetailModal');
    const closeCalendarDetailModalBottomBtn = $('#closeCalendarDetailModalBottom');
    const calendarDetailDateSpan = $('#calendarDetailDate');
    const calendarDetailTaskList = $('#calendarDetailTaskList');

    // Chart Elements
    const taskStatsChartCanvas = $('#taskStatsChart');
    let taskStatsChartInstance; // To hold the Chart.js instance

    // Global variables for filtering and categorization
    let currentMainFilter = 'all'; // For status filters (all, inprogress, done, overdue, individual, group)
    // Renamed currentSidebarCategory to currentFilterBy and currentFilterValue
    let currentFilterBy = 'none'; // Can be 'type' or 'category'
    let currentFilterValue = 'all'; // The value to filter by ('individual', 'group', 'work', 'study', 'personal')
    let searchTerm = '';

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

    // If no tasks are in local storage, initialize with sample data (with 'category' field)
    if (tasks.length === 0) {
        tasks = [
            // Sample Individual Tasks (10)
            {
                id: 'ind1', type: 'individual', title: 'Hoàn thành báo cáo hàng quý', description: 'Viết và nộp báo cáo hoạt động quý 2.',
                subtasks: [{text: 'Thu thập dữ liệu', completed: true}, {text: 'Phân tích số liệu', completed: false}, {text: 'Viết nội dung', completed: false}, {text: 'Kiểm tra lỗi', completed: false}],
                startDate: '2025-07-01', dueDate: '2025-07-15', priority: 'high', status: 'inprogress', category: 'work'
            },
            {
                id: 'ind2', type: 'individual', title: 'Học lập trình JavaScript nâng cao', description: 'Hoàn thành khóa học JavaScript trên Udemy.',
                subtasks: [{text: 'Module 1: ES6+', completed: true}, {text: 'Module 2: Async/Await', completed: true}, {text: 'Module 3: React cơ bản', completed: false}, {text: 'Làm dự án nhỏ', completed: false}],
                startDate: '2025-06-20', dueDate: '2025-08-30', priority: 'medium', status: 'inprogress', category: 'study'
            },
            {
                id: 'ind3', type: 'individual', title: 'Tập thể dục 30 phút mỗi ngày', description: 'Duy trì thói quen tập luyện hàng ngày.',
                subtasks: [{text: 'Chạy bộ 3km', completed: false}, {text: 'Tập gym', completed: false}, {text: 'Yoga 15 phút', completed: false}],
                startDate: '2025-07-01', dueDate: '2025-07-05', priority: 'low', status: 'todo', category: 'personal'
            },
            {
                id: 'ind4', type: 'individual', title: 'Sửa lỗi website khách hàng A', description: 'Khắc phục các lỗi hiển thị trên trang chủ.',
                subtasks: [{text: 'Xác định lỗi', completed: true}, {text: 'Chỉnh sửa CSS', completed: true}, {text: 'Kiểm thử lại', completed: true}, {text: 'Deploy bản vá', completed: true}],
                startDate: '2025-06-25', dueDate: '2025-06-28', priority: 'high', status: 'done', category: 'work'
            },
            {
                id: 'ind5', type: 'individual', title: 'Đọc sách "Clean Code"', description: 'Đọc hết cuốn sách về Clean Code.',
                subtasks: [{text: 'Chương 1-5', completed: false}, {text: 'Chương 6-10', completed: false}, {text: 'Chương 11-15', completed: false}],
                startDate: '2025-07-05', dueDate: '2025-07-30', priority: 'medium', status: 'todo', category: 'study'
            },
            {
                id: 'ind6', type: 'individual', title: 'Chuẩn bị bài thuyết trình', description: 'Chuẩn bị nội dung và slide cho buổi thuyết trình tuần tới.',
                subtasks: [{text: 'Nghiên cứu chủ đề', completed: true}, {text: 'Viết dàn ý', completed: false}, {text: 'Thiết kế slide', completed: false}, {text: 'Luyện tập', completed: false}],
                startDate: '2025-06-28', dueDate: '2025-07-05', priority: 'high', status: 'inprogress', category: 'work'
            },
            {
                id: 'ind7', type: 'individual', title: 'Dọn dẹp nhà cửa', description: 'Tổng vệ sinh toàn bộ căn hộ.',
                subtasks: [{text: 'Lau sàn', completed: false}, {text: 'Dọn bếp', completed: false}, {text: 'Vệ sinh phòng tắm', completed: false}],
                startDate: '2025-07-06', dueDate: '2025-07-06', priority: 'low', status: 'todo', category: 'personal'
            },
            {
                id: 'ind8', type: 'individual', title: 'Mua quà sinh nhật cho mẹ', description: 'Tìm và mua món quà phù hợp cho mẹ.',
                subtasks: [{text: 'Lên ý tưởng', completed: true}, {text: 'Tham khảo cửa hàng', completed: true}, {text: 'Mua sắm', completed: true}, {text: 'Gói quà', completed: true}],
                startDate: '2025-06-15', dueDate: '2025-06-20', priority: 'medium', status: 'done', category: 'personal'
            },
            {
                id: 'ind9', type: 'individual', title: 'Lên kế hoạch du lịch cuối năm', description: 'Nghiên cứu địa điểm và đặt vé cho chuyến đi.',
                subtasks: [{text: 'Chọn địa điểm', completed: false}, {text: 'Xem xét ngân sách', completed: false}, {text: 'Đặt vé máy bay/tàu', completed: false}, {text: 'Đặt phòng khách sạn', completed: false}],
                startDate: '2025-07-10', dueDate: '2025-07-10', priority: 'low', status: 'todo', category: 'personal'
            },
            {
                id: 'ind10', type: 'individual', title: 'Cập nhật CV', description: 'Thêm kinh nghiệm và kỹ năng mới vào CV.',
                subtasks: [{text: 'Liệt kê kinh nghiệm mới', completed: true}, {text: 'Viết mô tả kỹ năng', completed: false}, {text: 'Kiểm tra định dạng', completed: false}],
                startDate: '2025-06-20', dueDate: '2025-07-01', priority: 'medium', status: 'inprogress', category: 'work'
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
                startDate: '2025-06-01', dueDate: '2025-07-15', priority: 'high', status: 'inprogress', category: 'group',
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
                startDate: '2025-09-01', dueDate: '2025-12-15', priority: 'medium', status: 'inprogress', category: 'group',
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
                startDate: '2025-07-15', dueDate: '2025-08-15', priority: 'high', status: 'todo', category: 'work',
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
                startDate: '2025-06-01', dueDate: '2025-06-30', priority: 'low', status: 'done', category: 'group',
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
                startDate: '2025-07-01', dueDate: '2025-07-08', priority: 'high', status: 'inprogress', category: 'work',
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

    // --- Utility Functions ---
    function generateUniqueId() {
        return '_' + Math.random().toString(36).substr(2, 9);
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

    function getPriorityClass(priority) {
        switch (priority) {
            case 'high': return 'priority-high';
            case 'medium': return 'priority-medium';
            case 'low': return 'priority-low';
            default: return '';
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

    // --- Render Functions ---
    function renderTasks() {
        taskList.empty();
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        const filteredTasks = tasks.filter(task => {
            // Apply sidebar type/category filter
            if (currentFilterBy === 'type') {
                if (currentFilterValue !== 'all' && task.type !== currentFilterValue) {
                    return false;
                }
            } else if (currentFilterBy === 'category') {
                if (currentFilterValue !== 'all' && task.category !== currentFilterValue) {
                    return false;
                }
            }


            const matchesSearch = searchTerm === '' ||
                                  task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));

            if (!matchesSearch) return false;

            // Apply main status/type filter
            const overallStatus = getTaskOverallStatus(task);
            switch (currentMainFilter) {
                case 'all': return true;
                case 'inprogress': return overallStatus === 'inprogress';
                case 'done': return overallStatus === 'done';
                case 'overdue': return overallStatus === 'overdue';
                // These cases were for previous `currentSidebarCategory` which is now replaced
                // case 'individual': return task.type === 'individual';
                // case 'group': return task.type === 'group';
                default: return true;
            }
        });

        if (filteredTasks.length === 0) {
            taskList.append('<p class="no-tasks-message" style="text-align: center; color: #777;">Không tìm thấy tác vụ nào phù hợp.</p>');
            return;
        } else {
            $('.no-tasks-message').remove();
        }

        filteredTasks.forEach((task, index) => {
            const priorityClass = getPriorityClass(task.priority);
            const priorityText = task.priority === 'high' ? 'Cao' : (task.priority === 'medium' ? 'Trung bình' : 'Thấp');

            const overallStatus = getTaskOverallStatus(task);
            let statusClass = '';
            let statusText = '';
            switch (overallStatus) {
                case 'todo': statusClass = 'status-todo'; statusText = 'Chưa bắt đầu'; break;
                case 'inprogress': statusClass = 'status-inprogress'; statusText = 'Đang thực hiện'; break;
                case 'done': statusClass = 'status-done'; statusText = 'Hoàn thành'; break;
                case 'overdue': statusClass = 'status-overdue'; statusText = 'Quá hạn'; break;
            }

            const totalSubtasks = task.subtasks ? task.subtasks.length : 0;
            const completedSubtasks = task.subtasks ? task.subtasks.filter(sub => sub.completed).length : 0;
            const progress = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

            let taskItemHtml = `
                <div class="task-item" data-id="${task.id}" data-type="${task.type}" data-status="${overallStatus}" data-category="${task.category}">
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
            if (task.subtasks && task.subtasks.length > 0) {
                task.subtasks.forEach((subtask, subIndex) => {
                    taskItemHtml += `
                        <li class="subtask-item ${subtask.completed ? 'completed' : ''}">
                            <input type="checkbox" id="subtask-${task.id}-${subIndex}" data-task-id="${task.id}" data-subtask-index="${subIndex}" ${subtask.completed ? 'checked' : ''}>
                            <label for="subtask-${task.id}-${subIndex}">${subtask.text}</label>
                            ${task.type === 'group' && subtask.member ? `<span style="font-size: 0.8em; color: #999; margin-left: 5px;">(${subtask.member})</span>` : ''}
                        </li>
                    `;
                });
            } else {
                 taskItemHtml += `<li><small>Không có nhiệm vụ con</small></li>`;
            }
            taskItemHtml += `
                    </ul>
                    <div class="progress-container">
                        <div class="progress-bar" style="width: ${progress}%;"></div>
                        <span class="progress-text">${Math.round(progress)}%</span>
                    </div>
            `;

            if (task.type === 'group' && task.membersProgress && Object.keys(task.membersProgress).length > 0) {
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
                        <button class="btn btn-edit edit-task" data-id="${task.id}"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-delete delete-task" data-id="${task.id}"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </div>
            `;

            const taskElement = $(taskItemHtml);

            taskElement.css({opacity: 0, transform: 'translateY(10px)'}).appendTo('#taskList')
                .delay(100 * index)
                .animate({opacity: 1, translateY: '0px'}, 400);
        });
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

        // Determine new task status based on overall progress
        let newStatus = task.status; // Keep original status if no subtasks
        if (totalSubtasks > 0) { // Only update status based on subtasks if they exist
            if (progress === 100) {
                newStatus = 'done';
            } else if (completedSubtasks > 0) { // If some subtasks completed
                newStatus = 'inprogress';
            } else { // No subtasks completed
                newStatus = 'todo';
            }
        }

        // Apply overdue logic to newStatus
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const dueDateObj = new Date(task.dueDate);
        dueDateObj.setHours(0, 0, 0, 0);
        const isOverdue = newStatus !== 'done' && dueDateObj < now;

        if (isOverdue) {
            newStatus = 'overdue';
        }

        // Only update DOM if status actually changed
        if ($taskItem.attr('data-status') !== newStatus) {
            $taskItem.attr('data-status', newStatus);

            let statusClass = '';
            let statusText = '';
            switch (newStatus) {
                case 'todo': statusClass = 'status-todo'; statusText = 'Chưa bắt đầu'; break;
                case 'inprogress': statusClass = 'status-inprogress'; statusText = 'Đang thực hiện'; break;
                case 'done': statusClass = 'status-done'; statusText = 'Hoàn thành'; break;
                case 'overdue': statusClass = 'status-overdue'; statusText = 'Quá hạn'; break;
            }

            const $taskStatusSpan = $taskItem.find('.task-actions .task-status');
            $taskStatusSpan.removeClass('status-todo status-inprogress status-done status-overdue').addClass(statusClass).text(statusText);
        }


        // Update group member progress bars
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
                    // Ensures progress bar is visible even for very small progress
                    displayWidth = 1;
                }

                const $memberProgressItem = $taskItem.find(`.member-progress-item:has(strong:contains("${member}"))`);
                const memberProgressBar = $memberProgressItem.find('.progress-bar-small span:first-child');
                const memberProgressText = $memberProgressItem.find('.progress-text-small');

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
        renderCalendar(); // Cập nhật lịch khi tiến độ tác vụ thay đổi
        renderTaskStatsChart(); // Cập nhật biểu đồ thống kê
    }

    // --- Task Modal & Form Management ---
    function openTaskModal(task = null) {
        taskForm[0].reset();
        taskIdInput.val('');
        subtasksListDiv.empty(); // Clear subtasks list
        currentTask = task; // Set currentTask for subtask completion preservation

        // Reset visibility for subtask section
        subtasksContainer.show();
        addSubtaskBtn.show();
        taskTypeInput.prop('disabled', false); // Enable type selection for new tasks

        if (task) {
            modalTitle.text('Chỉnh sửa tác vụ');
            taskIdInput.val(task.id);
            taskTypeInput.val(task.type);
            taskTypeInput.prop('disabled', true); // Disable type change for existing tasks
            taskTitleInput.val(task.title);
            taskDescriptionInput.val(task.description);
            taskStartDateInput.val(task.startDate);
            taskDueDateInput.val(task.dueDate);
            taskPriorityInput.val(task.priority);
            taskStatusInput.val(task.status);

            if (task.subtasks && task.subtasks.length > 0) {
                task.subtasks.forEach(sub => addSubtaskInput(sub.text, sub.member, task.type));
            } else {
                // If no subtasks, hide subtasks container for individual task
                if (task.type === 'individual') {
                     // Still show if no subtasks, just no inputs
                } else if (task.type === 'group') {
                    // For group tasks, if no subtasks, still allow adding new ones.
                }
            }

            // Manually trigger change to ensure correct subtask input display
            taskTypeInput.trigger('change');

        } else {
            modalTitle.text('Thêm tác vụ mới');
            taskTypeInput.val('individual'); // Default to individual
            const today = new Date().toISOString().split('T')[0];
            taskStartDateInput.val(today);
            taskDueDateInput.val(today);
            taskTypeInput.trigger('change'); // Apply default type setting
        }

        taskModal.addClass('show');
    }

    function closeTaskModal() {
        taskModal.removeClass('show');
    }

    function addSubtaskInput(text = '', member = '', type = 'individual') {
        const isGroupTask = (type === 'group' || taskTypeInput.val() === 'group'); // Check current modal type or passed type
        const subtaskHtml = `
            <div class="subtask-input-group">
                <input type="text" class="form-control subtask-input" value="${text}" placeholder="Tên nhiệm vụ con" required>
                ${isGroupTask ? `
                    <input type="text" class="form-control subtask-member-input" value="${member || ''}" placeholder="Gán cho thành viên">
                ` : ''}
                <button type="button" class="remove-subtask-btn"><i class="fas fa-times"></i></button>
            </div>
        `;
        subtasksListDiv.append(subtaskHtml);
    }

    // --- Event Listeners ---
    addTaskBtn.on('click', () => openTaskModal());
    closeModalBtn.on('click', closeTaskModal);
    cancelBtn.on('click', closeTaskModal);

    $(document).on('click', function(event) {
        if ($(event.target).is(taskModal)) {
            closeTaskModal();
        }
    });

    taskForm.on('submit', function(e) {
        e.preventDefault();

        const id = taskIdInput.val() || generateUniqueId();
        const type = taskTypeInput.val();
        const title = taskTitleInput.val();
        const description = taskDescriptionInput.val();

        const subtasks = [];
        subtasksListDiv.find('.subtask-input-group').each(function() {
            const subtaskText = $(this).find('.subtask-input').val();
            const memberNameInput = $(this).find('.subtask-member-input');
            const memberName = memberNameInput.length > 0 ? memberNameInput.val().trim() : undefined;

            if (subtaskText) {
                // Find existing subtask to preserve completion status for individual and group
                let existingCompleted = false;
                if (currentTask && currentTask.subtasks) {
                    const foundSub = currentTask.subtasks.find(s => s.text === subtaskText && (s.member === memberName || s.member === undefined));
                    if (foundSub) {
                        existingCompleted = foundSub.completed;
                    }
                }
                subtasks.push({
                    text: subtaskText,
                    completed: existingCompleted,
                    member: type === 'group' ? memberName : undefined
                });
            }
        });

        const startDate = taskStartDateInput.val();
        const dueDate = taskDueDateInput.val();
        const priority = taskPriorityInput.val();
        const status = taskStatusInput.val(); // Status set from form (todo, inprogress, done)

        let membersProgress = {};
        if (type === 'group') {
            const uniqueMembers = [...new Set(subtasks.map(s => s.member).filter(Boolean))];
            uniqueMembers.forEach(member => {
                membersProgress[member] = subtasks.filter(s => s.member === member).map(s => ({text: s.text, completed: s.completed}));
            });
        }

        // Determine task category based on the currently active sidebar filter
        let taskCategory = 'personal'; // Default category
        if (currentFilterBy === 'category') {
            taskCategory = currentFilterValue;
        } else if (type === 'group') {
            taskCategory = 'group'; // Group tasks implicitly have 'group' category
        } else {
            // For individual tasks, if no category filter is active, default to 'personal'
            taskCategory = 'personal';
        }


        const newTaskData = {
            id, type, title, description, subtasks, startDate, dueDate, priority, status,
            category: taskCategory,
            membersProgress: type === 'group' ? membersProgress : undefined
        };

        const existingTaskIndex = tasks.findIndex(t => t.id === id);

        if (existingTaskIndex > -1) {
            tasks[existingTaskIndex] = newTaskData;
        } else {
            tasks.push(newTaskData);
        }

        saveTasksToLocalStorage(tasks); // Save tasks after adding/editing
        closeTaskModal();
        renderTasks(); // Re-render with new data and current filters
        renderCalendar(); // Update calendar
        renderTaskStatsChart(); // Update chart
    });

    // Edit task - (Delegated event listener)
    taskList.on('click', '.edit-task', function() {
        const taskId = $(this).data('id');
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            openTaskModal(task);
        }
    });

    // Delete task - (Delegated event listener)
    taskList.on('click', '.delete-task', function() {
        const $taskItem = $(this).closest('.task-item');
        const taskId = $taskItem.data('id');

        if (confirm('Bạn có chắc chắn muốn xóa tác vụ này?')) {
            tasks = tasks.filter(task => task.id !== taskId);
            saveTasksToLocalStorage(tasks); // Save tasks after deleting

            $taskItem.fadeOut(300, function () {
                renderTasks(); // Re-render to update the list
                renderCalendar();
                renderTaskStatsChart();
            });
        }
    });

    // Add subtask input field (Delegated event listener)
    addSubtaskBtn.on('click', function() {
        addSubtaskInput('', '', taskTypeInput.val()); // Pass current modal type
    });

    // Remove subtask input field (Delegated event listener)
    $(document).on('click', '.remove-subtask-btn', function() {
        $(this).closest('.subtask-input-group').remove();
    });

    // Handle subtask checkbox change (Delegated event listener)
    taskList.on('change', '.subtasks-list input[type="checkbox"]', function() {
        const taskId = $(this).data('task-id');
        const subtaskIndex = $(this).data('subtask-index');
        const isChecked = this.checked;

        const task = tasks.find(t => t.id === taskId);

        if (task && task.subtasks && task.subtasks[subtaskIndex]) {
            task.subtasks[subtaskIndex].completed = isChecked;
            $(this).parent().toggleClass('completed', isChecked); // Update visual state

            // If it's a group task subtask with a member, update member's progress too
            if (task.type === 'group' && task.subtasks[subtaskIndex].member) {
                const memberName = task.subtasks[subtaskIndex].member;
                if (task.membersProgress && task.membersProgress[memberName]) {
                    const memberSubtask = task.membersProgress[memberName].find(sub => sub.text === task.subtasks[subtaskIndex].text);
                    if (memberSubtask) {
                        memberSubtask.completed = isChecked;
                    }
                }
            }
            updateTaskProgress(taskId); // Re-calculate and update progress/status
        }
    });

    // Toggle subtasks and group members display based on task type in modal
    taskTypeInput.on('change', function() {
        const selectedType = $(this).val();
        subtasksListDiv.empty(); // Clear existing subtask inputs

        if (selectedType === 'individual') {
            subtasksContainer.show();
            addSubtaskBtn.show();
        } else { // group
            subtasksContainer.show(); // Always show for group to allow adding subtasks
            addSubtaskBtn.show();
        }
    });

    // Search functionality
    searchIconContainer.on('click', function() {
        searchInputContainer.toggleClass('active');
        if (searchInputContainer.hasClass('active')) {
            searchInput.focus();
        } else {
            searchInput.val('');
            searchTerm = ''; // Clear search term
            renderTasks(); // Re-render without search filter
        }
    });

    searchInput.on('input', function() {
        searchTerm = $(this).val();
        renderTasks(); // Re-render with search filter
    });

    // Filter tasks by status (main filters)
    filterButtons.on('click', function() {
        filterButtons.removeClass('active');
        $(this).addClass('active');
        currentMainFilter = $(this).data('filter');
        renderTasks();
    });

    // Dark Mode Toggle Logic
    darkModeToggle.on('change', function() {
        if (this.checked) {
            body.addClass('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            body.removeClass('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
        }
    });

    // Check for dark mode preference on load
    if (localStorage.getItem('darkMode') === 'enabled') {
        darkModeToggle.prop('checked', true);
        body.addClass('dark-mode');
    }

    // --- Sidebar Navigation & Category/Type Filtering ---
    $('.sidebar-menu a').on('click', function(e) {
        e.preventDefault();
        $('.sidebar-menu a').removeClass('active');
        $(this).addClass('active');

        // Hide all sections
        tasksSection.hide();
        calendarSection.hide();
        statisticsSection.hide();

        const targetViewId = $(this).attr('id');
        const typeFilter = $(this).data('type-filter');
        const categoryFilter = $(this).data('category-filter');

        if (targetViewId === 'tasksViewBtn') {
            tasksSection.show();
            currentFilterBy = 'none'; // Reset filter type
            currentFilterValue = 'all'; // Reset filter value
            currentMainFilter = 'all'; // Reset main status filter to 'all'
            filterButtons.removeClass('active');
            $('[data-filter="all"]').addClass('active');
            renderTasks();
        } else if (typeFilter) { // If it's a type filter (e.g., individual, group)
            tasksSection.show();
            currentFilterBy = 'type';
            currentFilterValue = typeFilter;
            currentMainFilter = 'all'; // Reset main status filter
            filterButtons.removeClass('active');
            $('[data-filter="all"]').addClass('active');
            renderTasks();
        } else if (categoryFilter) { // If it's a category filter (e.g., work, study, personal, group)
            tasksSection.show();
            currentFilterBy = 'category';
            currentFilterValue = categoryFilter;
            currentMainFilter = 'all'; // Reset main status filter
            filterButtons.removeClass('active');
            $('[data-filter="all"]').addClass('active');
            renderTasks();
        } else if (targetViewId === 'calendarViewBtn') {
            calendarSection.show();
            renderCalendar();
        } else if (targetViewId === 'statisticsViewBtn') {
            statisticsSection.show();
            renderTaskStatsChart();
        }
    });

    // --- Calendar Functions ---
    function renderCalendar() {
        calendarDatesDiv.empty();
        currentMonthYearSpan.text(new Date(currentYear, currentMonth).toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' }));

        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Adjust for Monday start (getDay() returns 0 for Sunday, 1 for Monday, etc.)
        const startDayIndex = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1; // 0 (Sunday) -> 6, 1 (Monday) -> 0

        // Fill leading empty days
        for (let i = 0; i < startDayIndex; i++) {
            calendarDatesDiv.append('<div class="calendar-day inactive"></div>');
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentYear, currentMonth, day);
            const isCurrentDay = date.toDateString() === today.toDateString();
            const dateString = date.toISOString().split('T')[0];

            const tasksForDay = tasks.filter(task => {
                const taskStartDate = task.startDate ? new Date(task.startDate) : null;
                const taskDueDate = task.dueDate ? new Date(task.dueDate) : null;

                let isOnDay = false;
                // Check if task's start date or due date falls on this calendar day
                if (taskStartDate && taskStartDate.toISOString().split('T')[0] === dateString) {
                    isOnDay = true;
                }
                if (taskDueDate && taskDueDate.toISOString().split('T')[0] === dateString) {
                    isOnDay = true;
                }
                // Check if the task spans across this day (start before, end after/on)
                if (taskStartDate && taskDueDate && taskStartDate < date && taskDueDate >= date) {
                    isOnDay = true;
                }
                return isOnDay;
            });

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

            const dayClass = isCurrentDay ? 'current-day' : '';
            calendarDatesDiv.append(`
                <div class="calendar-day ${dayClass}" data-date="${dateString}">
                    <span class="day-number">${day}</span>
                    ${indicatorsHtml}
                </div>
            `);
        }
    }

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

    calendarDatesDiv.on('click', '.calendar-day:not(.inactive)', function() {
        const selectedDate = $(this).data('date');
        const dateObj = new Date(selectedDate);
        const formattedDate = dateObj.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
        calendarDetailDateSpan.text(formattedDate);
        calendarDetailTaskList.empty();

        const tasksForSelectedDate = tasks.filter(task => {
            const taskStartDate = task.startDate ? new Date(task.startDate) : null;
            const taskDueDate = task.dueDate ? new Date(task.dueDate) : null;

            let isOnDay = false;
            if (taskStartDate && taskStartDate.toISOString().split('T')[0] === selectedDate) {
                isOnDay = true;
            }
            if (taskDueDate && taskDueDate.toISOString().split('T')[0] === selectedDate) {
                isOnDay = true;
            }
            if (taskStartDate && taskDueDate && taskStartDate < dateObj && taskDueDate >= dateObj) {
                isOnDay = true;
            }
            return isOnDay;
        });

        if (tasksForSelectedDate.length === 0) {
            calendarDetailTaskList.append('<p style="text-align: center; color: #777;">Không có tác vụ nào trong ngày này.</p>');
        } else {
            const sortedTasks = tasksForSelectedDate.sort((a, b) => {
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
        }
        calendarTaskDetailModal.addClass('show');
    });

    closeCalendarDetailModalBtn.on('click', () => calendarTaskDetailModal.removeClass('show'));
    closeCalendarDetailModalBottomBtn.on('click', () => calendarTaskDetailModal.removeClass('show'));

    calendarTaskDetailModal.on('click', function(e) {
        if ($(e.target).is('#calendarTaskDetailModal')) {
            calendarTaskDetailModal.removeClass('show');
        }
    });

    // --- Chart Functions for Statistics Section ---
    function renderTaskStatsChart() {
        const taskNames = tasks.map(task => task.title);
        const taskProgress = tasks.map(task => {
            const totalSubtasks = task.subtasks ? task.subtasks.length : 0;
            const completedSubtasks = task.subtasks ? task.subtasks.filter(sub => sub.completed).length : 0;
            return totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;
        });

        const backgroundColors = tasks.map(task => {
            const overallStatus = getTaskOverallStatus(task);
            switch (overallStatus) {
                case 'todo': return '#e74c3c'; // Red: ToDo
                case 'inprogress': return '#8e44ad'; // Purple: InProgress
                case 'done': return '#2ecc71'; // Green: Done
                case 'overdue': return '#e74c3c'; // Red: Overdue
                default: return '#cccccc';
            }
        });

        if (window.taskStatsChartInstance) {
            window.taskStatsChartInstance.destroy(); // Destroy existing chart before creating a new one
        }

        const ctx = taskStatsChartCanvas[0].getContext('2d'); // Get the raw DOM element
        window.taskStatsChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: taskNames,
                datasets: [{
                    label: '% Tiến độ hoàn thành',
                    data: taskProgress,
                    backgroundColor: backgroundColors,
                    borderRadius: 5,
                    barThickness: 40
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
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
                        display: false
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
                                return ctx[0].label;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 10,
                            callback: value => value + '%'
                        },
                        title: {
                            display: true,
                            text: '% Tiến độ hoàn thành thực tế'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Task'
                        },
                        ticks: {
                            autoSkip: false,
                            maxRotation: 45,
                            minRotation: 45
                        }
                    }
                }
            }
        });

        const $taskChartLegend = $('#taskChartLegend');
        $taskChartLegend.empty();

        const legendItems = [
            { color: '#e74c3c', text: 'Chưa bắt đầu' },
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
    renderTaskStatsChart();

    // Trigger dark mode check on window load as well, for robustness
    $(window).on('load', function() {
        if (localStorage.getItem('darkMode') === 'enabled') {
            body.addClass('dark-mode');
            darkModeToggle.prop('checked', true);
        } else {
            body.removeClass('dark-mode');
            darkModeToggle.prop('checked', false);
        }
    });
});
