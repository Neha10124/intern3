const taskForm = document.getElementById("taskForm");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");

let tasks = [];

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  const newTask = {
    id: Date.now(),
    title,
    description,
    completed: false,
    createdAt: new Date().toLocaleString(),
    completedAt: null,
  };

  tasks.push(newTask);
  taskForm.reset();
  renderTasks();
});

function renderTasks() {
  pendingTasks.innerHTML = "";
  completedTasks.innerHTML = "";

  tasks.forEach((task) => {
    const taskEl = document.createElement("div");
    taskEl.className = "task";

    const taskInfo = document.createElement("div");
    taskInfo.className = "task-info";
    taskInfo.innerHTML = `
      <strong>${task.title}</strong>
      <p>${task.description}</p>
      <div class="timestamp">Created: ${task.createdAt}</div>
      ${task.completedAt ? `<div class="timestamp">Completed: ${task.completedAt}</div>` : ""}
    `;

    const buttons = document.createElement("div");
    buttons.className = "task-buttons";

    const delBtn = document.createElement("button");
    delBtn.className = "delete-btn";
    delBtn.innerText = "Delete";
    delBtn.onclick = () => deleteTask(task.id);

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.innerText = "Edit";
    editBtn.onclick = () => editTask(task.id);

    buttons.appendChild(editBtn);
    buttons.appendChild(delBtn);

    if (!task.completed) {
      const completeBtn = document.createElement("button");
      completeBtn.className = "complete-btn";
      completeBtn.innerText = "Complete";
      completeBtn.onclick = () => markComplete(task.id);
      buttons.appendChild(completeBtn);
      pendingTasks.appendChild(taskEl);
    } else {
      completedTasks.appendChild(taskEl);
    }

    taskEl.appendChild(taskInfo);
    taskEl.appendChild(buttons);
  });
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  renderTasks();
}

function markComplete(id) {
  const task = tasks.find((t) => t.id === id);
  task.completed = true;
  task.completedAt = new Date().toLocaleString();
  renderTasks();
}

function editTask(id) {
  const task = tasks.find((t) => t.id === id);
  document.getElementById("title").value = task.title;
  document.getElementById("description").value = task.description;

  // Remove and wait for user to re-submit
  tasks = tasks.filter((t) => t.id !== id);
  renderTasks();
}
