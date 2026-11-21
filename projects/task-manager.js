"use strict";

// Browser storage is optional: the list still works if storage is blocked.
const STORAGE_KEY = "portfolio-daily-list-v1";
const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const taskCount = document.querySelector("#task-count");
const taskStatus = document.querySelector("#task-status");
const clearCompleted = document.querySelector("#clear-completed");
let filter = "all";
let tasks = [];

function storageUnavailable() {
  document.querySelector("#storage-note").textContent = "Storage is unavailable. Tasks will last for this visit only.";
}

try {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  if (Array.isArray(saved)) {
    tasks = saved.filter(task => task && typeof task.id === "string" && typeof task.text === "string" && typeof task.done === "boolean").map(task => ({ id: task.id, text: task.text.slice(0, 120), done: task.done }));
  }
} catch (error) {
  storageUnavailable();
}

function saveTasks() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); }
  catch (error) { storageUnavailable(); }
}

function renderTasks() {
  taskList.replaceChildren();
  const visible = tasks.filter(task => filter === "all" || (filter === "active" ? !task.done : task.done));
  const remaining = tasks.filter(task => !task.done).length;
  taskCount.textContent = `${remaining} task${remaining === 1 ? "" : "s"} left`;
  clearCompleted.disabled = !tasks.some(task => task.done);

  if (visible.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty";
    empty.textContent = filter === "all" ? "Your list is clear. Add your first task above." : `No ${filter} tasks to show.`;
    taskList.append(empty);
    return;
  }

  visible.forEach(task => {
    const row = document.createElement("li");
    row.className = `task-row${task.done ? " done" : ""}`;
    const label = document.createElement("label");
    label.className = "task-label";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.dataset.taskId = task.id;
    const text = document.createElement("span");
    // textContent keeps user input as text rather than HTML.
    text.textContent = task.text;
    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      saveTasks();
      renderTasks();
      taskStatus.textContent = `Task marked ${task.done ? "completed" : "active"}.`;
      const current = Array.from(taskList.querySelectorAll("input")).find(input => input.dataset.taskId === task.id);
      if (current) current.focus();
      else document.querySelector(`[data-filter="${filter}"]`).focus();
    });
    label.append(checkbox, text);
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "delete";
    remove.textContent = "×";
    remove.setAttribute("aria-label", `Delete task: ${task.text}`);
    remove.addEventListener("click", () => {
      tasks = tasks.filter(item => item.id !== task.id);
      saveTasks();
      renderTasks();
      taskStatus.textContent = "Task deleted.";
      taskInput.focus();
    });
    row.append(label, remove);
    taskList.append(row);
  });
}

taskInput.addEventListener("input", () => taskInput.setCustomValidity(""));
taskForm.addEventListener("submit", event => {
  event.preventDefault();
  const text = taskInput.value.trim();
  if (!text) {
    taskInput.setCustomValidity("Please enter a task, not just spaces.");
    taskInput.reportValidity();
    return;
  }
  tasks.push({ id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, text, done: false });
  saveTasks();
  taskInput.value = "";
  setFilter("all");
  taskStatus.textContent = "Task added.";
  taskInput.focus();
});

function setFilter(value) {
  filter = value;
  document.querySelectorAll("[data-filter]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.filter === filter)));
  renderTasks();
}

document.querySelectorAll("[data-filter]").forEach(button => button.addEventListener("click", () => setFilter(button.dataset.filter)));
clearCompleted.addEventListener("click", () => {
  const completed = tasks.filter(task => task.done).length;
  tasks = tasks.filter(task => !task.done);
  saveTasks();
  renderTasks();
  taskStatus.textContent = `${completed} completed task${completed === 1 ? "" : "s"} cleared.`;
});
renderTasks();
