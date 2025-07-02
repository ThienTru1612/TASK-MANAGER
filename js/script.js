$(document).ready(function () {
    // Mock data - giả lập dữ liệu
    let tasks = [
        {
            id: 1,
            title: "Hoàn thành báo cáo dự án",
            description: "Viết báo cáo tổng kết môn học Lập trình Web",
            dueDate: "2023-12-15",
            priority: "high",
            status: "inprogress"
        },
        {
            id: 2,
            title: "Thiết kế giao diện người dùng",
            description: "Thiết kế wireframe cho ứng dụng quản lý tác vụ",
            dueDate: "2023-12-10",
            priority: "medium",
            status: "todo"
        },
        {
            id: 3,
            title: "Kiểm thử tính năng đăng nhập",
            description: "Kiểm tra tính năng đăng nhập với các trường hợp khác nhau",
            dueDate: "2023-12-05",
            priority: "low",
            status: "done"
        }
    ];

    let currentTask = null;

    function renderTasks() {
        $('#taskList').empty();

        tasks.forEach((task, index) => {
            let priorityClass = '';
            let priorityText = '';
            let statusClass = '';
            let statusText = '';

            switch (task.priority) {
                case 'high':
                    priorityClass = 'priority-high';
                    priorityText = 'Cao';
                    break;
                case 'medium':
                    priorityClass = 'priority-medium';
                    priorityText = 'Trung bình';
                    break;
                case 'low':
                    priorityClass = 'priority-low';
                    priorityText = 'Thấp';
                    break;
            }

            switch (task.status) {
                case 'todo':
                    statusClass = 'status-todo';
                    statusText = 'Chưa bắt đầu';
                    break;
                case 'inprogress':
                    statusClass = 'status-inprogress';
                    statusText = 'Đang thực hiện';
                    break;
                case 'done':
                    statusClass = 'status-done';
                    statusText = 'Hoàn thành';
                    break;
            }

            let dueDate = new Date(task.dueDate);
            let formattedDate = dueDate.toLocaleDateString('vi-VN');

            let taskElement = $(`
                <div class="task-item" data-id="${task.id}">
                    <div class="task-item-header">
                        <div class="task-title">${task.title}</div>
                        <span class="task-priority ${priorityClass}">${priorityText}</span>
                    </div>
                    <p>${task.description}</p>
                    <div class="task-due-date">
                        <i class="far fa-calendar-alt"></i> Hạn chót: ${formattedDate}
                    </div>
                    <div class="task-meta">
                        <span class="task-status ${statusClass}">${statusText}</span>
                    </div>
                    <div class="task-actions">
                        <button class="btn btn-edit edit-task"><i class="fas fa-edit"></i> Sửa</button>
                        <button class="btn btn-delete delete-task"><i class="fas fa-trash"></i> Xóa</button>
                    </div>
                </div>
            `);

            // Animation fadeIn với delay từng task
            taskElement.css({opacity: 0, transform: 'translateY(10px)'}).appendTo('#taskList')
                .delay(100 * index)
                .animate({opacity: 1, translateY: '0px'}, 400);
        });

        applySearchFilter();
    }

    $('#addTaskBtn').click(function () {
        $('#taskModal').addClass('show');
        $('#modalTitle').text('Thêm tác vụ mới');
        $('#taskForm')[0].reset();
        currentTask = null;
    });

    $('#closeModal, #cancelBtn').click(function () {
        $('#taskModal').removeClass('show');
    });

    // Đóng modal khi click ngoài modal-content
    $('#taskModal').click(function (e) {
        if ($(e.target).is('#taskModal')) {
            $('#taskModal').removeClass('show');
        }
    });

    $('#taskForm').submit(function (e) {
        e.preventDefault();

        const taskData = {
            id: currentTask ? currentTask.id : (tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1),
            title: $('#taskTitle').val(),
            description: $('#taskDescription').val(),
            dueDate: $('#taskDueDate').val(),
            priority: $('#taskPriority').val(),
            status: $('#taskStatus').val()
        };

        if (currentTask) {
            tasks = tasks.map(task => task.id === currentTask.id ? taskData : task);
        } else {
            tasks.push(taskData);
        }

        $('#taskModal').removeClass('show');
        renderTasks();
    });

    $(document).on('click', '.edit-task', function () {
        const taskId = $(this).closest('.task-item').data('id');
        currentTask = tasks.find(task => task.id === taskId);

        $('#taskTitle').val(currentTask.title);
        $('#taskDescription').val(currentTask.description);
        $('#taskDueDate').val(currentTask.dueDate);
        $('#taskPriority').val(currentTask.priority);
        $('#taskStatus').val(currentTask.status);

        $('#modalTitle').text('Sửa tác vụ');
        $('#taskModal').addClass('show');
    });

    $(document).on('click', '.delete-task', function () {
        const $taskItem = $(this).closest('.task-item');
        const taskId = $taskItem.data('id');

        tasks = tasks.filter(task => task.id !== taskId);

        // Hiệu ứng fade trước khi xóa
        $taskItem.fadeOut(300, function () {
            renderTasks();
        });
    });

    $('#searchInput').on('input', function () {
        applySearchFilter();
    });

    

    function applySearchFilter() {
        const keyword = $('#searchInput').val().toLowerCase();
        $('.task-item').each(function () {
            const title = $(this).find('.task-title').text().toLowerCase();
            const desc = $(this).find('p').text().toLowerCase();
            if (title.includes(keyword) || desc.includes(keyword)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    renderTasks();
});
