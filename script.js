// script.js

document.addEventListener("DOMContentLoaded", function() {
    // Step 1: Declare Reference Variables
    const addButton = document.getElementById("add-button");
    const newTaskInput = document.getElementById("new-task-input");
    const tasksContainer = document.querySelector(".tasks");
    const pendingTaskCount = document.getElementById("count-value");

    let taskCount = 0;

    // Step 2: Display Pending Task Count
    function displayCount(count) {
        pendingTaskCount.textContent = count;
    }

    // Step 3: Add a new task
    function addTask() {
        const taskName = newTaskInput.value.trim();
        if (taskName === "") {
            showError("Digite uma tarefa válida!");
            return;
        }

        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.innerHTML = `
        <input type="checkbox">
        <span class="task-name">${taskName}</span>
        <button class="edit-button">Editar</button>
        <button class="delete-button">Excluir</button>
      `;

        taskElement.querySelector(".delete-button").addEventListener("click", deleteTask);
        taskElement.querySelector(".edit-button").addEventListener("click", editTask);
        taskElement.querySelector("input[type='checkbox']").addEventListener("change", toggleTask);

        tasksContainer.appendChild(taskElement);
        newTaskInput.value = "";
        taskCount++;
        displayCount(taskCount);
    }

    // Step 4: Deleting a task
    function deleteTask() {
        const taskElement = this.parentNode;
        taskElement.remove();
        taskCount--;
        displayCount(taskCount);
    }

    // Step 5: Editing a task
    function editTask() {
        const taskNameElement = this.parentNode.querySelector(".task-name");
        const taskName = taskNameElement.textContent;
        newTaskInput.value = taskName;
        deleteTask.call(this);
    }

    // Step 6: Crossing out a completed task
    function toggleTask() {
        const taskNameElement = this.parentNode.querySelector(".task-name");
        taskNameElement.classList.toggle("completed-task");
        if (this.checked) {
            taskCount--;
        } else {
            taskCount++;
        }
        displayCount(taskCount);
    }

    // Step 7: Function on window load
    window.onload = function() {
        taskCount = 0;
        displayCount(taskCount);
        newTaskInput.value = "";
    };

    addButton.addEventListener("click", addTask);
});

function showError(message) {
    alert(message);
}