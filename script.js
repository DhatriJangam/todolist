// script.js

document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <button class="edit" data-index="${index}">Edit</button>
                    <button class="delete" data-index="${index}">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    };

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTask = {
            text: taskInput.value,
            completed: false
        };
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        taskInput.value = '';
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            const index = e.target.getAttribute('data-index');
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        }

        if (e.target.classList.contains('edit')) {
            const index = e.target.getAttribute('data-index');
            const newText = prompt('Edit your task:', tasks[index].text);
            if (newText) {
                tasks[index].text = newText;
                saveTasks();
                renderTasks();
            }
        }

        if (e.target.tagName === 'SPAN') {
            const index = Array.from(taskList.children).indexOf(e.target.parentElement);
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        }
    });

    renderTasks();
});