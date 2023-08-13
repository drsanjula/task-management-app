// Select elements
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage if available
const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
const tasks = [...storedTasks];

// Function to render tasks
function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        
        if (!task.completed) {
            taskItem.innerHTML = `
                <label>
                    <input type="checkbox" class="complete-checkbox" data-index="${index}">
                    ${task.name}
                </label>
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">X</button>
            `;
            taskList.appendChild(taskItem);
        }
    });

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');

        if (task.completed) {
            taskItem.innerHTML = `
                <label>
                    <input type="checkbox" class="complete-checkbox" data-index="${index}" checked>
                    <del>${task.name}</del>
                </label>
                <button class="delete-btn" data-index="${index}">X</button>
            `;
            taskList.appendChild(taskItem);
        }
    });

    updateLocalStorage();
}

// Function to update local storage
function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event listener for form submission
taskForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const taskName = document.getElementById('task-name').value;

    if (taskName) {
        tasks.push({ name: taskName, completed: false });
        renderTasks();
        taskForm.reset();
    }
});

// Event listener for completing tasks
taskList.addEventListener('change', function (e) {
    if (e.target.classList.contains('complete-checkbox')) {
        const index = parseInt(e.target.getAttribute('data-index'));
        tasks[index].completed = e.target.checked;
        renderTasks();
    }
});

// Event listener for deleting tasks
taskList.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-btn')) {
        const index = parseInt(e.target.getAttribute('data-index'));
        tasks.splice(index, 1);
        renderTasks();
    }
});

// Event listener for editing tasks
taskList.addEventListener('click', function (e) {
    if (e.target.classList.contains('edit-btn')) {
        const index = parseInt(e.target.getAttribute('data-index'));
        const newName = prompt('Edit task name:', tasks[index].name);
        
        if (newName !== null) {
            tasks[index].name = newName;
            renderTasks();
        }
    }
});

// Initial render
renderTasks();
