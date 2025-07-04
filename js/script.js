$(document).ready(function() {

    // --- 1. Khai báo Hằng số và Biến Toàn cục ---
    // Task Elements
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

    // Search Elements
    const searchIconContainer = $('.search-icon-container');
    const searchInputContainer = $('.search-input-container');
    const searchInput = $('#searchInput');

    // Filter Buttons
    const filterButtons = $('.filter-btn');

    // Group Task Integration Elements (NEW)
    const groupSelectContainer = $('#groupSelectContainer');
    const taskGroupInput = $('#taskGroup');

    // Dark Mode Toggle
    const darkModeToggle = $('#darkModeToggle');
    const body = $('body');

    // Section Elements (for display toggling)
    const tasksSection = $('#taskSection');
    const calendarSection = $('#calendarSection');
    const statisticsSection = $('#statisticsSection');
    const groupSection = $('#groupSection');
    const jobSection = $('#jobSection');
    const studySection = $('#studySection');
    const personalSection = $('#personalSection');

    // Sidebar Navigation Buttons
    const tasksViewBtn = $('#tasksViewBtn');
    const calendarViewBtn = $('#calendarViewBtn');
    const statisticsViewBtn = $('#statisticsViewBtn');
    const groupCategoryLink = $('#groupCategoryLink');
    const workCategoryLink = $('#workCategoryLink');
    const studyCategoryLink = $('#studyCategoryLink');
    const personalCategoryLink = $('#personalCategoryLink');

    // Calendar Elements
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

    // Group Management Elements
    const groupList = $('#groupList');
    const groupModal = $('#groupModal');
    const createGroupBtn = $('#createGroupBtn');
    const closeGroupModalBtn = $('#closeGroupModal');
    const cancelGroupBtn = $('#cancelGroupBtn');
    const groupForm = $('#groupForm');
    const groupModalTitle = $('#groupModalTitle');
    const groupIdInput = $('#groupId');
    const groupNameInput = $('#groupName');
    const groupDescriptionInput = $('#groupDescription');
    const groupMembersInput = $('#groupMembers');
    const groupStartDateInput = $('#groupStartDate');
    const groupDueDateInput = $('#groupDueDate');
    const groupPriorityInput = $('#groupPriority');
    const groupStatusInput = $('#groupStatus');

    // Job Management Elements
    const jobList = $('#jobList');
    const jobModal = $('#jobModal');
    const addJobBtn = $('#addJobBtn');
    const closeJobModalBtn = $('#closeJobModal');
    const cancelJobBtn = $('#cancelJobBtn');
    const jobForm = $('#jobForm');
    const jobModalTitle = $('#jobModalTitle');
    const jobIdInput = $('#jobId');
    const jobTitleInput = $('#jobTitle');
    const jobDescriptionInput = $('#jobDescription');
    const jobCompanyInput = $('#jobCompany');
    const jobLocationInput = $('#jobLocation');
    const jobSalaryInput = $('#jobSalary');
    const jobStatusInput = $('#jobStatus');
    const jobApplicationLinkInput = $('#jobApplicationLink');

    // Study Management Elements
    const createStudyTaskBtn = $('#createStudyTaskBtn');
    const studyTaskList = $('#studyTaskList');
    const studyModal = $('#studyModal');
    const studyForm = $('#studyForm');
    const studyIdInput = $('#studyId');
    const studyTitleInput = $('#studyTitle');
    const studyDescriptionInput = $('#studyDescription');
    const studyStartDateInput = $('#studyStartDate');
    const studyDueDateInput = $('#studyDueDate');
    const studyPriorityInput = $('#studyPriority');
    const studyStatusInput = $('#studyStatus');

    // Personal Management Elements
    const createPersonalTaskBtn = $('#createPersonalTaskBtn');
    const personalTaskList = $('#personalTaskList');
    const personalModal = $('#personalModal');
    const personalForm = $('#personalForm');
    const personalModalTitle = $('#personalModalTitle');
    const personalIdInput = $('#personalId');
    const personalTitleInput = $('#personalTitle');
    const personalDescriptionInput = $('#personalDescription');
    const personalStartDateInput = $('#personalStartDate');
    const personalDueDateInput = $('#personalDueDate');
    const personalPriorityInput = $('#personalPriority');
    const personalStatusInput = $('#personalStatus');

    // Notification Elements (NEW)
    const notificationBell = $('#notificationBell');
    const notificationsDropdown = $('#notificationsDropdown');
    const notificationCountBadge = $('.notification-badge'); // Giữ lại nếu bạn muốn cập nhật số lượng
    const notificationList = $('#notificationList');
    const markAllAsReadBtn = $('#markAllAsReadBtn');
    const viewAllNotificationsLink = $('#viewAllNotifications');


    // Global State Variables
    let currentMainFilter = 'all'; // For status filters (all, inprogress, done, overdue)
    let currentFilterBy = 'none'; // Can be 'type' or 'category'
    let currentFilterValue = 'all'; // The value to filter by ('individual', 'group', 'work', 'study', 'personal')
    let searchTerm = '';
    let currentTask = null; // Used for editing tasks

    // Calendar State
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    // --- 2. Local Storage & Initial Data Loading ---
    function saveTasksToLocalStorage(tasksData) {
        localStorage.setItem('tasks', JSON.stringify(tasksData));
    }

    function loadTasksFromLocalStorage() {
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
    }

    function saveGroupsToLocalStorage(groupsData) {
        localStorage.setItem('groups', JSON.stringify(groupsData));
    }

    function loadGroupsFromLocalStorage() {
        const storedGroups = localStorage.getItem('groups');
        return storedGroups ? JSON.parse(storedGroups) : [];
    }

    function saveJobsToLocalStorage(jobsData) {
        localStorage.setItem('jobs', JSON.stringify(jobsData));
    }

    function loadJobsFromLocalStorage() {
        const storedJobs = localStorage.getItem('jobs');
        return storedJobs ? JSON.parse(storedJobs) : [];
    }

    // Load data on initialization
    let tasks = loadTasksFromLocalStorage();
    let groups = loadGroupsFromLocalStorage();
    let jobs = loadJobsFromLocalStorage();

    // Initialize with sample data if local storage is empty
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
                },
                groupId: 'g1' // Thêm dòng này
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
                },
                groupId: 'g2' // Thêm dòng này
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
                },
                groupId: 'g1' // Thêm dòng này (ví dụ)
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
                },
                groupId: 'g3' // Thêm dòng này
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
                },
                groupId: 'g1' // Thêm dòng này (ví dụ)
            }
        ];
        saveTasksToLocalStorage(tasks);
    }

    if (groups.length === 0) {
        groups = [
            { id: 'g1', name: 'Nhóm Phát triển Web', description: 'Phát triển các dự án web cho khách hàng.', members: ['An', 'Bình', 'Cường'], startDate: '2025-06-01', dueDate: '2025-07-30', priority: 'high', status: 'inprogress' },
            { id: 'g2', name: 'Nhóm Marketing', description: 'Lên kế hoạch và triển khai các chiến dịch marketing.', members: ['Đạt', 'Thảo'], startDate: '2025-07-01', dueDate: '2025-08-15', priority: 'medium', status: 'todo' },
            { id: 'g3', name: 'Nhóm Thiết kế', description: 'Thiết kế giao diện người dùng và trải nghiệm người dùng.', members: ['Lan', 'Mai', 'Sơn'], startDate: '2025-05-20', dueDate: '2025-06-25', priority: 'low', status: 'done' }
        ];
        saveGroupsToLocalStorage(groups);
    }

    if (jobs.length === 0) {
        jobs = [
            { id: 'j1', title: 'Frontend Developer', description: 'Phát triển giao diện người dùng cho ứng dụng web.', company: 'Tech Solutions Inc.', location: 'Hà Nội', salary: '1000 - 1500 USD/tháng', status: 'Đã nộp đơn', applicationLink: 'https://example.com/job1' },
            { id: 'j2', title: 'Backend Engineer', description: 'Xây dựng và duy trì các API backend.', company: 'Global Innovations', location: 'TP.HCM', salary: '1200 - 1800 USD/tháng', status: 'Đang tìm kiếm', applicationLink: '' },
            { id: 'j3', title: 'UI/UX Designer', description: 'Thiết kế trải nghiệm người dùng trực quan và hấp dẫn.', company: 'Creative Minds Studio', location: 'Đà Nẵng', salary: '800 - 1200 USD/tháng', status: 'Đã phỏng vấn', applicationLink: 'https://example.com/job3' }
        ];
        saveJobsToLocalStorage(jobs);
    }

    // --- 3. Utility Functions ---
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

    function getPriorityText(priority) {
        switch (priority) {
            case 'high': return 'Cao';
            case 'medium': return 'Trung bình';
            case 'low': return 'Thấp';
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

    function getStatusText(status) {
        switch (status) {
            case 'todo': return 'Chưa bắt đầu';
            case 'inprogress': return 'Đang thực hiện';
            case 'done': return 'Hoàn thành';
            case 'overdue': return 'Quá hạn';
            default: return '';
        }
    }

    // Helper to calculate members progress for group tasks
    function calculateMembersProgress(subtasks) {
        const progress = {};
        subtasks.forEach(subtask => {
            if (subtask.member) {
                if (!progress[subtask.member]) {
                    progress[subtask.member] = [];
                }
                progress[subtask.member].push({
                    text: subtask.text,
                    completed: subtask.completed
                });
            }
        });
        return progress;
    }

    // --- 4. Render Functions ---

    // Render Main Task List
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
                    // If category is 'group', filter by groupId
                    if (currentFilterValue === 'group') {
                        // Only show tasks that are of type 'group' AND have a groupId
                        // (This assumes tasks with category 'group' should also have type 'group' and a groupId)
                        if (task.type !== 'group' || !task.groupId) {
                            return false;
                        }
                    } else {
                        // For other categories (work, study, personal), filter as usual
                        if (task.category !== currentFilterValue) {
                            return false;
                        }
                    }
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
            const priorityText = getPriorityText(task.priority);

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

            let groupTagHtml = '';
            if (task.groupId) {
                const group = groups.find(g => g.id === task.groupId);
                if (group) {
                    groupTagHtml = `<div class="task-group-tag"><small>Nhóm: ${group.name}</small></div>`;
                }
            }

            let taskItemHtml = `
                <div class="task-item" data-id="${task.id}" data-type="${task.type}" data-status="${overallStatus}" data-category="${task.category}">
                    ${groupTagHtml}
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

    // Update Task Progress (used after subtask completion change)
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
        renderGroups(); // Cập nhật phần nhóm để hiển thị tác vụ liên quan
    }

    // Render Calendar
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

    // Render Task Statistics Chart
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

    // Render Groups List
    function renderGroups() {
        groupList.empty();
        if (groups.length === 0) {
            groupList.append('<p class="no-groups-message" style="text-align: center; color: #777;">Chưa có nhóm nào.</p>');
            return;
        } else {
            $('.no-groups-message').remove();
        }

        groups.forEach(group => {
            // BỔ SUNG: Lọc các tác vụ thuộc nhóm này
            const tasksInGroup = tasks.filter(task => task.groupId === group.id);
            let tasksInGroupHtml = '';
            if (tasksInGroup.length > 0) {
                tasksInGroupHtml += `
                    <div class="group-tasks-list">
                        <h4>Tác vụ của nhóm:</h4>
                        <ul>
                `;
                tasksInGroup.forEach(task => {
                    const overallStatus = getTaskOverallStatus(task);
                    let statusClass = '';
                    switch (overallStatus) {
                        case 'todo': statusClass = 'status-todo'; break;
                        case 'inprogress': statusClass = 'status-inprogress'; break;
                        case 'done': statusClass = 'status-done'; break;
                        case 'overdue': statusClass = 'status-overdue'; break;
                    }
                    tasksInGroupHtml += `
                            <li>
                                <span class="task-title-small">${task.title}</span>
                                <span class="task-status-small ${statusClass}">${getStatusText(overallStatus)}</span>
                            </li>
                    `;
                });
                tasksInGroupHtml += `
                        </ul>
                    </div>
                `;
            } else {
                tasksInGroupHtml += `<p class="no-tasks-message" style="font-size: 0.9em; color: #999; margin-top: 10px;">Chưa có tác vụ nào cho nhóm này.</p>`;
            }

            const groupItemHtml = `
                <div class="team-card" data-id="${group.id}">
                    <h3>${group.name}</h3>
                    <p>${group.description}</p>
                    <div class="team-meta-info">
                        <div><i class="far fa-calendar-alt"></i> Bắt đầu: ${formatDate(group.startDate)}</div>
                        <div><i class="far fa-calendar-check"></i> Hạn chót: ${formatDate(group.dueDate)}</div>
                        <div><i class="fas fa-exclamation-circle"></i> Độ ưu tiên: <span class="priority-${group.priority}">${getPriorityText(group.priority)}</span></div>
                        <div><i class="fas fa-info-circle"></i> Trạng thái: <span class="status-${group.status}">${getStatusText(group.status)}</span></div>
                    </div>
                    <div class="team-members">
                        <h4>Thành viên:</h4>
                        <div class="member-avatars">
                            ${group.members.map(member => `<div class="member-avatar">${member.charAt(0).toUpperCase()}</div>`).join('')}
                        </div>
                    </div>
                    ${tasksInGroupHtml}
                    <div class="team-actions-footer">
                        <button class="btn btn-edit edit-group" data-id="${group.id}"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-delete delete-group" data-id="${group.id}"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </div>
            `;
            groupList.append(groupItemHtml);
        });
    }

    // Render Job List
    function renderJobs() {
        jobList.empty();
        if (jobs.length === 0) {
            jobList.append('<p class="no-jobs-message" style="text-align: center; color: #777;">Chưa có công việc nào được thêm.</p>');
            return;
        } else {
            $('.no-jobs-message').remove();
        }

        jobs.forEach(job => {
            const jobItemHtml = `
                <div class="job-item" data-id="${job.id}">
                    <h3>${job.title}</h3>
                    <p>${job.description}</p>
                    <div class="job-meta">
                        <div><i class="fas fa-building"></i> ${job.company}</div>
                        <div><i class="fas fa-map-marker-alt"></i> ${job.location || 'N/A'}</div>
                        <div><i class="fas fa-money-bill-wave"></i> ${job.salary || 'N/A'}</div>
                        <div><i class="fas fa-info-circle"></i> ${job.status}</div>
                    </div>
                    <div class="team-actions-footer">
                        ${job.applicationLink ? `<a href="${job.applicationLink}" target="_blank" class="btn btn-primary btn-sm"><i class="fas fa-external-link-alt"></i> Ứng tuyển</a>` : ''}
                        <button class="btn btn-edit edit-job" data-id="${job.id}"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-delete delete-job" data-id="${job.id}"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </div>
            `;
            jobList.append(jobItemHtml);
        });
    }

    // Render Study Tasks List
    function renderStudyTasks() {
        studyTaskList.empty(); // Xóa danh sách hiện tại

        const studyTasks = tasks.filter(task => task.category === 'study'); // Lọc tác vụ học tập

        if (studyTasks.length === 0) {
            studyTaskList.append('<p class="no-tasks-message" style="text-align: center; color: #777;">Không có tác vụ học tập nào được tìm thấy.</p>');
            return;
        }

        studyTasks.forEach(task => {
            const priorityClass = getPriorityClass(task.priority);
            const priorityText = getPriorityText(task.priority);
            const overallStatus = getTaskOverallStatus(task);
            let statusClass = '';
            let statusText = '';
            switch (overallStatus) {
                case 'todo': statusClass = 'status-todo'; statusText = 'Chưa bắt đầu'; break;
                case 'inprogress': statusClass = 'status-inprogress'; statusText = 'Đang thực hiện'; break;
                case 'done': statusClass = 'status-done'; statusText = 'Hoàn thành'; break;
                case 'overdue': statusClass = 'status-overdue'; statusText = 'Quá hạn'; break;
            }

            const taskItemHtml = `
                <div class="task-item" data-id="${task.id}" data-category="study">
                    <div class="task-item-header">
                        <span class="task-title">${task.title}</span>
                        <span class="task-priority ${priorityClass}">${priorityText}</span>
                    </div>
                    <p class="task-description">${task.description}</p>
                    <p class="task-dates">
                        <i class="far fa-calendar-alt"></i> Bắt đầu: ${formatDate(task.startDate)} - Hạn chót: ${formatDate(task.dueDate)}
                    </p>
                    <div class="task-actions">
                        <span class="task-status ${statusClass}">${statusText}</span>
                        <button class="btn btn-edit edit-study-task" data-id="${task.id}"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-delete delete-study-task" data-id="${task.id}"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </div>
            `;
            studyTaskList.append(taskItemHtml);
        });
    }

    // Render Personal Tasks List
    function renderPersonalTasks() {
        personalTaskList.empty();
        const personalTasks = tasks.filter(task => task.category === 'personal');

        if (personalTasks.length === 0) {
            personalTaskList.append('<p class="no-tasks-message" style="text-align: center; color: #777;">Không có tác vụ cá nhân nào được tìm thấy.</p>');
            return;
        }

        personalTasks.forEach(task => {
            const priorityClass = getPriorityClass(task.priority);
            const priorityText = getPriorityText(task.priority);
            const overallStatus = getTaskOverallStatus(task);
            let statusClass = '';
            let statusText = '';
            switch (overallStatus) {
                case 'todo': statusClass = 'status-todo'; statusText = 'Chưa bắt đầu'; break;
                case 'inprogress': statusClass = 'status-inprogress'; statusText = 'Đang thực hiện'; break;
                case 'done': statusClass = 'status-done'; statusText = 'Hoàn thành'; break;
                case 'overdue': statusClass = 'status-overdue'; statusText = 'Quá hạn'; break;
            }

            const taskItemHtml = `
                <div class="task-item" data-id="${task.id}" data-category="personal">
                    <div class="task-item-header">
                        <span class="task-title">${task.title}</span>
                        <span class="task-priority ${priorityClass}">${priorityText}</span>
                    </div>
                    <p class="task-description">${task.description}</p>
                    <p class="task-dates">
                        <i class="far fa-calendar-alt"></i> Bắt đầu: ${formatDate(task.startDate)} - Hạn chót: ${formatDate(task.dueDate)}
                    </p>
                    <div class="task-actions">
                        <span class="task-status ${statusClass}">${statusText}</span>
                        <button class="btn btn-edit edit-personal-task" data-id="${task.id}"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-delete delete-personal-task" data-id="${task.id}"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </div>
            `;
            personalTaskList.append(taskItemHtml);
        });
    }

    // --- 5. Modal Management Functions ---

    // Task Modal
    function openTaskModal(task = null) {
        taskForm[0].reset();
        taskIdInput.val('');
        subtasksListDiv.empty(); // Clear subtasks list
        currentTask = task; // Set currentTask for subtask completion preservation

        // Reset visibility for subtask section
        subtasksContainer.show();
        addSubtaskBtn.show();
        taskTypeInput.prop('disabled', false); // Enable type selection for new tasks

        // Logic for group dropdown
        groupSelectContainer.hide(); // Hide by default
        taskGroupInput.empty(); // Clear previous options

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
            }
            // If it's a group task, show and populate the group dropdown
            if (task.type === 'group') {
                groupSelectContainer.show();
                loadGroupOptions(); // Populate group options
                if (task.groupId) {
                    taskGroupInput.val(task.groupId);
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

    // Group Modal
    function openGroupModal(group = null) {
        groupForm[0].reset();
        groupIdInput.val('');
        // Đặt giá trị mặc định cho ngày hiện tại khi tạo mới
        const today = new Date().toISOString().split('T')[0];

        if (group) {
            groupModalTitle.text('Chỉnh sửa nhóm');
            groupIdInput.val(group.id);
            groupNameInput.val(group.name);
            groupDescriptionInput.val(group.description);
            groupMembersInput.val(group.members.join(', '));
            groupStartDateInput.val(group.startDate); // Điền ngày bắt đầu
            groupDueDateInput.val(group.dueDate);     // Điền ngày hết hạn
            groupPriorityInput.val(group.priority);   // Điền độ ưu tiên
            groupStatusInput.val(group.status);       // Điền trạng thái
        } else {
            groupModalTitle.text('Tạo nhóm mới');
            groupStartDateInput.val(today); // Đặt ngày bắt đầu là hôm nay
            groupDueDateInput.val(today);   // Đặt ngày hết hạn là hôm nay
            groupPriorityInput.val('medium'); // Mặc định ưu tiên trung bình
            groupStatusInput.val('todo');     // Mặc định trạng thái "Chưa bắt đầu"
        }
        groupModal.addClass('show');
    }

    function closeGroupModal() {
        groupModal.removeClass('show');
    }

    // Job Modal
    function openJobModal(job = null) {
        jobForm[0].reset();
        jobIdInput.val('');
        if (job) {
            jobModalTitle.text('Chỉnh sửa công việc');
            jobIdInput.val(job.id);
            jobTitleInput.val(job.title);
            jobDescriptionInput.val(job.description);
            jobCompanyInput.val(job.company);
            jobLocationInput.val(job.location);
            jobSalaryInput.val(job.salary);
            jobStatusInput.val(job.status);
            jobApplicationLinkInput.val(job.applicationLink);
        } else {
            jobModalTitle.text('Thêm công việc mới');
        }
        jobModal.addClass('show');
    }

    function closeJobModal() {
        jobModal.removeClass('show');
    }

    // Study Modal
    function openStudyTaskModal(task = null) {
        studyForm[0].reset(); // Reset form
        studyIdInput.val(''); // Clear ID
        if (task) {
            $('#studyModalTitle').text('Chỉnh sửa tác vụ học tập');
            studyIdInput.val(task.id);
            studyTitleInput.val(task.title);
            studyDescriptionInput.val(task.description);
            studyStartDateInput.val(task.startDate);
            studyDueDateInput.val(task.dueDate);
            studyPriorityInput.val(task.priority);
            studyStatusInput.val(task.status);
        } else {
            $('#studyModalTitle').text('Thêm tác vụ học tập mới'); // Set title
            const today = new Date().toISOString().split('T')[0];
            studyStartDateInput.val(today);
            studyDueDateInput.val(today);
        }
        studyModal.addClass('show'); // Hiển thị modal
    }

    function closeStudyModal() {
        studyModal.removeClass('show'); // Ẩn modal
    }

    // Personal Modal
    function openPersonalModal(task = null) {
        personalForm[0].reset();
        personalIdInput.val('');
        if (task) {
            personalModalTitle.text('Chỉnh sửa tác vụ cá nhân');
            personalIdInput.val(task.id);
            personalTitleInput.val(task.title);
            personalDescriptionInput.val(task.description);
            personalStartDateInput.val(task.startDate);
            personalDueDateInput.val(task.dueDate);
            personalPriorityInput.val(task.priority);
            personalStatusInput.val(task.status);
        } else {
            personalModalTitle.text('Thêm tác vụ cá nhân mới');
            const today = new Date().toISOString().split('T')[0];
            personalStartDateInput.val(today);
            personalDueDateInput.val(today);
        }
        personalModal.addClass('show');
    }

    function closePersonalModal() {
        personalModal.removeClass('show');
    }

    // --- 6. Event Listeners ---

    // Task Modal Events
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

        // Get groupId if it's a group task
        const groupId = (type === 'group') ? taskGroupInput.val() : undefined;

        // Validate for group tasks (must select a group)
        if (type === 'group' && !groupId) {
            alert('Vui lòng chọn nhóm cho tác vụ này.');
            return;
        }

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
            membersProgress: type === 'group' ? membersProgress : undefined,
            groupId: groupId // Add groupId here
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
        renderGroups(); // Update group section to reflect new tasks
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
                renderGroups(); // Update group section
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

        // Logic for group dropdown
        if (selectedType === 'group') {
            groupSelectContainer.show();
            loadGroupOptions(); // Populate group options
        } else {
            groupSelectContainer.hide();
        }

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

    // Calendar Navigation Events
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

    // Calendar Day Click Event (to show tasks for that day)
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

    // Group Management Events
    createGroupBtn.on('click', () => openGroupModal());
    closeGroupModalBtn.on('click', closeGroupModal);
    cancelGroupBtn.on('click', closeGroupModal);
    $(document).on('click', function(event) {
        if ($(event.target).is(groupModal)) {
            closeGroupModal();
        }
    });

    groupForm.on('submit', function(e) {
        e.preventDefault();
        const id = groupIdInput.val() || generateUniqueId();
        const name = groupNameInput.val();
        const description = groupDescriptionInput.val();
        const members = groupMembersInput.val().split(',').map(m => m.trim()).filter(m => m !== '');
        const startDate = groupStartDateInput.val();
        const dueDate = groupDueDateInput.val();
        const priority = groupPriorityInput.val();
        const status = groupStatusInput.val();

        const newGroupData = { id, name, description, members, startDate, dueDate, priority, status };
        const existingGroupIndex = groups.findIndex(g => g.id === id);

        if (existingGroupIndex > -1) {
            groups[existingGroupIndex] = newGroupData;
        } else {
            groups.push(newGroupData);
        }
        saveGroupsToLocalStorage(groups);
        closeGroupModal();
        renderGroups();
        // Update tasks that might be linked to this group (e.g., if group name changed)
        renderTasks();
        renderCalendar();
        renderTaskStatsChart();
    });

    groupList.on('click', '.edit-group', function() {
        const groupId = $(this).data('id');
        const group = groups.find(g => g.id === groupId);
        if (group) {
            openGroupModal(group);
        }
    });

    groupList.on('click', '.delete-group', function() {
        const groupId = $(this).data('id');
        if (confirm('Bạn có chắc chắn muốn xóa nhóm này? Các tác vụ thuộc nhóm này sẽ không còn liên kết với nhóm nào.')) {
            groups = groups.filter(group => group.id !== groupId);
            // Optionally, update tasks that were linked to this group
            tasks.forEach(task => {
                if (task.groupId === groupId) {
                    task.groupId = undefined; // Remove group association
                    // You might want to change task.type to 'individual' here if desired
                    // task.type = 'individual';
                    // task.category = 'personal'; // Or some other default category
                }
            });
            saveGroupsToLocalStorage(groups);
            saveTasksToLocalStorage(tasks); // Save updated tasks
            renderGroups();
            renderTasks(); // Re-render tasks to reflect changes
            renderCalendar();
            renderTaskStatsChart();
        }
    });

    // Job Management Events
    addJobBtn.on('click', () => openJobModal());
    closeJobModalBtn.on('click', closeJobModal);
    cancelJobBtn.on('click', closeJobModal);
    $(document).on('click', function(event) {
        if ($(event.target).is(jobModal)) {
            closeJobModal();
        }
    });

    jobForm.on('submit', function(e) {
        e.preventDefault();
        const id = jobIdInput.val() || generateUniqueId();
        const title = jobTitleInput.val();
        const description = jobDescriptionInput.val();
        const company = jobCompanyInput.val();
        const location = jobLocationInput.val();
        const salary = jobSalaryInput.val();
        const status = jobStatusInput.val();
        const applicationLink = jobApplicationLinkInput.val();

        const newJobData = { id, title, description, company, location, salary, status, applicationLink };
        const existingJobIndex = jobs.findIndex(j => j.id === id);

        if (existingJobIndex > -1) {
            jobs[existingJobIndex] = newJobData;
        } else {
            jobs.push(newJobData);
        }
        saveJobsToLocalStorage(jobs);
        closeJobModal();
        renderJobs();
    });

    jobList.on('click', '.edit-job', function() {
        const jobId = $(this).data('id');
        const job = jobs.find(j => j.id === jobId);
        if (job) {
            openJobModal(job);
        }
    });

    jobList.on('click', '.delete-job', function() {
        const jobId = $(this).data('id');
        if (confirm('Bạn có chắc chắn muốn xóa công việc này?')) {
            jobs = jobs.filter(job => job.id !== jobId);
            saveJobsToLocalStorage(jobs);
            renderJobs();
        }
    });

    // Study Management Events
    createStudyTaskBtn.on('click', () => openStudyTaskModal());
    studyModal.find('.close-button').on('click', closeStudyModal);
    studyModal.find('#cancelStudyBtn').on('click', closeStudyModal);
    $(document).on('click', function(event) {
        if ($(event.target).is(studyModal)) {
            closeStudyModal();
        }
    });

    studyForm.on('submit', function(e) {
        e.preventDefault();
        const id = studyIdInput.val() || generateUniqueId();
        const title = studyTitleInput.val().trim();
        const description = studyDescriptionInput.val().trim();
        const startDate = studyStartDateInput.val();
        const dueDate = studyDueDateInput.val();
        const priority = studyPriorityInput.val();
        const status = studyStatusInput.val();

        if (!title) {
            alert('Tiêu đề tác vụ không được để trống.');
            return;
        }

        const newStudyTask = {
            id, type: 'individual', title, description, subtasks: [], startDate, dueDate, priority, status, category: 'study'
        };

        const existingTaskIndex = tasks.findIndex(task => task.id === id);
        if (existingTaskIndex > -1) {
            tasks[existingTaskIndex] = newStudyTask;
        } else {
            tasks.push(newStudyTask);
        }

        saveTasksToLocalStorage(tasks);
        closeStudyModal();
        renderStudyTasks();
        renderCalendar();
        renderTaskStatsChart();
    });

    studyTaskList.on('click', '.edit-study-task', function() {
        const taskId = $(this).data('id');
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            openStudyTaskModal(task);
        }
    });

    studyTaskList.on('click', '.delete-study-task', function() {
        const taskId = $(this).data('id');
        if (confirm('Bạn có chắc chắn muốn xóa tác vụ học tập này?')) {
            tasks = tasks.filter(task => task.id !== taskId);
            saveTasksToLocalStorage(tasks);
            renderStudyTasks();
            renderCalendar();
            renderTaskStatsChart();
        }
    });

    // Personal Management Events
    createPersonalTaskBtn.on('click', () => openPersonalModal());
    personalModal.find('.close-button').on('click', closePersonalModal);
    personalModal.find('#cancelPersonalBtn').on('click', closePersonalModal);
    $(document).on('click', function(event) {
        if ($(event.target).is(personalModal)) {
            closePersonalModal();
        }
    });

    personalForm.on('submit', function(e) {
        e.preventDefault();
        const id = personalIdInput.val() || generateUniqueId();
        const title = personalTitleInput.val();
        const description = personalDescriptionInput.val();
        const startDate = personalStartDateInput.val();
        const dueDate = personalDueDateInput.val();
        const priority = personalPriorityInput.val();
        const status = personalStatusInput.val();

        const newPersonalTaskData = {
            id, type: 'individual', title, description, subtasks: [], startDate, dueDate, priority, status, category: 'personal'
        };

        const existingTaskIndex = tasks.findIndex(t => t.id === id);
        if (existingTaskIndex > -1) {
            tasks[existingTaskIndex] = newPersonalTaskData;
        } else {
            tasks.push(newPersonalTaskData);
        }
        saveTasksToLocalStorage(tasks);
        closePersonalModal();
        renderPersonalTasks();
        renderCalendar();
        renderTaskStatsChart();
    });

    personalTaskList.on('click', '.edit-personal-task', function() {
        const taskId = $(this).data('id');
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            openPersonalModal(task);
        }
    });

    personalTaskList.on('click', '.delete-personal-task', function() {
        const taskId = $(this).data('id');
        if (confirm('Bạn có chắc chắn muốn xóa tác vụ cá nhân này?')) {
            tasks = tasks.filter(task => task.id !== taskId);
           saveTasksToLocalStorage(tasks);
            renderPersonalTasks();
            renderCalendar();
            renderTaskStatsChart();
        }
    });

    // Notification Dropdown Toggle (NEW)
    notificationBell.on('click', function(e) {
        e.stopPropagation(); // Ngăn chặn sự kiện click lan truyền lên body
        notificationsDropdown.toggleClass('show');
    });

    // Close dropdown when clicking outside (NEW)
    $(document).on('click', function(e) {
        if (!notificationsDropdown.is(e.target) && notificationsDropdown.has(e.target).length === 0 && !notificationBell.is(e.target)) {
            notificationsDropdown.removeClass('show');
        }
    });

    // Example: Mark all as read button (you'll need to implement actual logic)
    markAllAsReadBtn.on('click', function() {
        alert('Đánh dấu tất cả thông báo là đã đọc!');
        // Logic để xóa thông báo hoặc cập nhật trạng thái
        notificationList.empty().append('<li class="no-notifications">Không có thông báo mới.</li>');
        notificationCountBadge.text('0'); // Cập nhật số lượng
        notificationsDropdown.removeClass('show'); // Ẩn dropdown sau khi đọc
    });

    // Example: View all notifications link (you'll need to implement actual logic)
    viewAllNotificationsLink.on('click', function(e) {
        e.preventDefault();
        alert('Chuyển đến trang xem tất cả thông báo!');
        // Logic để chuyển hướng người dùng đến trang thông báo chi tiết
        notificationsDropdown.removeClass('show'); // Ẩn dropdown
    });

    // Function to add a new notification (example)
    function addNotification(message) {
        const currentCount = parseInt(notificationCountBadge.text());
        notificationCountBadge.text(currentCount + 1);

        // Remove "no notifications" message if present
        if (notificationList.find('.no-notifications').length) {
            notificationList.empty();
        }

        const newNotificationHtml = `<li>${message}</li>`;
        notificationList.prepend(newNotificationHtml); // Add new notification to the top
    }

    // Example usage: Add some sample notifications after a delay
    setTimeout(() => {
        addNotification('Bạn có một tác vụ mới: "Hoàn thành báo cáo hàng quý".');
    }, 2000);
    setTimeout(() => {
        addNotification('Nhóm "Phát triển Web" đã cập nhật tiến độ.');
    }, 4000);
    setTimeout(() => {
        addNotification('Hạn chót tác vụ "Tập thể dục 30 phút" sắp đến.');
    }, 6000);

    // --- 7. Sidebar Navigation & Section Toggling ---
    $('.sidebar-menu a').on('click', function(e) {
        e.preventDefault();
        $('.sidebar-menu a').removeClass('active');
        $(this).addClass('active');

        // Hide all sections
        tasksSection.hide();
        calendarSection.hide();
        statisticsSection.hide();
        groupSection.hide();
        jobSection.hide();
        studySection.hide();
        personalSection.hide();

        const targetViewId = $(this).attr('id');
        const typeFilter = $(this).data('type-filter');
        const categoryFilter = $(this).data('category-filter');

        if (targetViewId === 'tasksViewBtn') {
           tasksSection.show();
            currentFilterBy = 'none';
            currentFilterValue = 'all';
            currentMainFilter = 'all';
            filterButtons.removeClass('active');
            $('[data-filter="all"]').addClass('active');
            renderTasks();
        } else if (typeFilter) {
           tasksSection.show();
            currentFilterBy = 'type';
            currentFilterValue = typeFilter;
            currentMainFilter = 'all';
            filterButtons.removeClass('active');
            $('[data-filter="all"]').addClass('active');
            renderTasks();
        } else if (categoryFilter) {
            if (categoryFilter === 'group') {
                groupSection.show();
                renderGroups();
            } else if (categoryFilter === 'work') {
                jobSection.show();
                renderJobs();
            } else if (categoryFilter === 'study') {
                studySection.show();
                renderStudyTasks();
            } else if (categoryFilter === 'personal') {
                personalSection.show();
                renderPersonalTasks();
            } else { // If 'all' or other categories without a dedicated section
                tasksSection.show();
                currentFilterBy = 'category';
                currentFilterValue = categoryFilter;
                currentMainFilter = 'all';
                filterButtons.removeClass('active');
                $('[data-filter="all"]').addClass('active');
                renderTasks();
            }
        } else if (targetViewId === 'calendarViewBtn') {
            calendarSection.show();
            renderCalendar();
        } else if (targetViewId === 'statisticsViewBtn') {
            statisticsSection.show();
           renderTaskStatsChart();
        }
    });

    // --- 8. Initial Load & Dark Mode Check ---
    // Initial render calls
    renderTasks();
    renderCalendar();
    renderTaskStatsChart();
    renderGroups(); // Render groups on initial load
    renderJobs(); // Render jobs on initial load
    renderStudyTasks(); // Render study tasks on initial load
    renderPersonalTasks(); // Render personal tasks on initial load

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

    // Helper to load group options into the dropdown (used by task modal)
    function loadGroupOptions() {
        taskGroupInput.empty();
        taskGroupInput.append('<option value="">--- Chọn nhóm ---</option>');

        if (groups.length === 0) {
            taskGroupInput.append('<option value="" disabled>Chưa có nhóm nào</option>');
            return;
        }

        groups.forEach(group => {
            taskGroupInput.append(`<option value="${group.id}">${group.name}</option>`);
        });
    }

});
