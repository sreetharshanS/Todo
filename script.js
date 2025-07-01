const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearAllBtn = document.getElementById("clearAllBtn");
const taskCount = document.getElementById("taskCount");

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTask();
});
clearAllBtn.addEventListener("click", clearAllTasks);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li"); 
  li.className = "task-row";

  const span = document.createElement("span");
  span.className = "task-text";
  span.textContent = taskText;
  span.addEventListener("click", () => {
    span.classList.toggle("completed");
    updateCount();
  });

  const editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.innerHTML = "✏️";
  editBtn.addEventListener("click", () => {
    const newText = prompt("Edit task:", span.textContent);
    if (newText !== null) span.textContent = newText;
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.innerHTML = "🗑️";
  deleteBtn.addEventListener("click", () => {
    li.remove();
    updateCount();
  });

  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
  taskInput.value = "";
  updateCount();
}

function clearAllTasks() {
  taskList.innerHTML = "";
  updateCount();
}

function updateCount() {
  const total = document.querySelectorAll(".task-text").length;
  const completed = document.querySelectorAll(".task-text.completed").length;
  const remaining = total - completed;
  taskCount.textContent = `${remaining} task${remaining !== 1 ? "s" : ""} remaining`;
}

