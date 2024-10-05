// select elements

const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("addTask-btn");
const taskList = document.getElementById("task-list");

// array for storing tasks
let tasks = [];

// function to add Tasks

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        // Create a new task object
        const task = {
            id: generateId(), // Unique ID
            text: taskText,
            completed: false
        };
        tasks.push(task); // Add task to the array
        renderTasks(); // Update the UI
        taskInput.value = ''; // Clear input field
    }
}

// function to generate id
let Counter = 1;
function generateId() {
  const counter = Counter++;
  return counter;
}

// Function to delete task  
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId); // Filter out the task
    renderTasks(); // Update the UI
}

// Function to toggle task completion
function toggleTaskCompletion(taskId) {
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            return {
                ...task,
                completed: !task.completed
            };
        }
        return task;
    });
    renderTasks();
}

// Function to render tasks
function renderTasks() {
    taskList.innerHTML = ''; // Clear the task list
    tasks.forEach(task => {
        // Create a list item for each task
        const li = document.createElement('li');
        li.classList.toggle('completed', task.completed); // Add 'completed' class if the task is completed
        li.innerHTML = `
            <span>${task.id} ${task.text}</span>
            <div>
                <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTaskCompletion(${task.id})">
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(li); // Add the list item to the task list
    });
}
addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});
