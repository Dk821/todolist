const form = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText) {
    addTaskToList(taskText);
    saveTask(taskText);
    taskInput.value = '';
  }
});

// Add to UI
function addTaskToList(taskText, isCompleted = false) {
  const li = document.createElement('li');
  if (isCompleted) li.classList.add('completed');
  li.textContent = taskText;

  li.addEventListener('click', function () {
    li.classList.toggle('completed');
    updateLocalStorage();
  });

  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.className = 'delete-btn';
  delBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    li.remove();
    updateLocalStorage();
  });

  li.appendChild(delBtn);
  taskList.appendChild(li);
}

// Save to localStorage
function saveTask(taskText) {
  const tasks = getTasks();
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get from localStorage
function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Load from localStorage
function loadTasks() {
  const tasks = getTasks();
  tasks.forEach(task => addTaskToList(task.text, task.completed));
}

// Update localStorage after toggling or deleting
function updateLocalStorage() {
  const updatedTasks = [];
  taskList.querySelectorAll('li').forEach(li => {
    updatedTasks.push({
      text: li.childNodes[0].nodeValue.trim(),
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
