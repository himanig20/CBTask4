let tasks = [];
let selectedCategory = null;

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const dueDateInput = document.getElementById('dueDateInput');
        const dueDateValue = dueDateInput.value.trim();
        const dueDate = dueDateValue !== '' ? new Date(dueDateValue) : null;

        const categoryInput = document.getElementById('categoryInput');
        const category = categoryInput.value.trim();

        const task = {
            id: Date.now(),
            text: taskText,
            dueDate: dueDate,
            category: category
        };

        tasks.push(task);
        updateTasks();
        taskInput.value = '';
        dueDateInput.value = '';
        categoryInput.value = '';
    }
}

function updateTasks() {
    const tasksContainer = document.getElementById('tasksContainer');
    tasksContainer.innerHTML = '';

    // Sort tasks by due date
    tasks.sort((a, b) => (a.dueDate - b.dueDate));

    const filteredTasks = selectedCategory
        ? tasks.filter(task => task.category === selectedCategory)
        : tasks;

    filteredTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.draggable = true;
        taskElement.dataset.taskId = task.id;

        const taskTextElement = document.createElement('div');
        taskTextElement.innerText = task.text;

        const dueDateElement = document.createElement('div');
        dueDateElement.classList.add('due-date');
        dueDateElement.innerText = task.dueDate ? formatDueDate(task.dueDate) : '';

        const categoryElement = document.createElement('div');
        categoryElement.classList.add('category');
        categoryElement.innerText = task.category ? task.category : '';

        taskElement.appendChild(taskTextElement);
        taskElement.appendChild(dueDateElement);
        taskElement.appendChild(categoryElement);

        tasksContainer.appendChild(taskElement);

        taskElement.addEventListener('dragstart', handleDragStart);
        taskElement.addEventListener('dragover', handleDragOver);
        taskElement.addEventListener('drop', handleDrop);
    });
}

function formatDueDate(dueDate) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return dueDate.toLocaleDateString('en-US', options);
}

function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.dataset.taskId);
}

function handleDragOver(event) {
    event.preventDefault();
}

function handleDrop(event) {
    event.preventDefault();

    const taskId = event.dataTransfer.getData('text/plain');
    const draggedTask = tasks.find(task => task.id.toString() === taskId);
    const dropTarget = event.currentTarget;

    const dropTargetIndex = tasks.findIndex(task => task.id.toString() === dropTarget.dataset.taskId);

    tasks = tasks.filter(task => task.id !== draggedTask.id);
    tasks.splice(dropTargetIndex, 0, draggedTask);

    updateTasks();
}

function filterByCategory(category) {
    selectedCategory = category;
    updateTasks();
}

// Function to initialize the application
function init() {
    // You can add initial tasks or other setup here
}

// Call the init function to initialize the application
init();
