const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task.text;
        if (task.completed) li.classList.add("completed");

        li.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            tasks.splice(index, 1);
            saveTasks();
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

addBtn.addEventListener("click", () => {
    if (taskInput.value.trim() === "") return;

    tasks.push({ text: taskInput.value, completed: false });
    taskInput.value = "";
    saveTasks();
});

renderTasks();
