document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("new-task");
    const addTaskButton = document.getElementById("add-task-button");
    const taskList = document.getElementById("task-list");

    // Load tasks from local storage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => addTaskToDOM(task.text, task.completed));
    };

    // Save tasks to local storage
    const saveTasks = () => {
        const tasks = [];
        taskList.querySelectorAll("li").forEach(taskElement => {
            tasks.push({
                text: taskElement.querySelector(".task-text").textContent,
                completed: taskElement.classList.contains("completed")
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    // Add a new task to the DOM
    const addTaskToDOM = (taskText, completed = false) => {
        const li = document.createElement("li");
        li.className = completed ? "completed" : "";

        const span = document.createElement("span");
        span.className = "task-text";
        span.textContent = taskText;

        const completeButton = document.createElement("button");
        completeButton.textContent = "Complete";
        completeButton.addEventListener("click", () => {
            li.classList.toggle("completed");
            saveTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            taskList.removeChild(li);
            saveTasks();
        });

        li.appendChild(span);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    };

    // Handle add task button click
    addTaskButton.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTaskToDOM(taskText);
            taskInput.value = "";
            saveTasks();
        }
    });

    // Load tasks on page load
    loadTasks();
});
