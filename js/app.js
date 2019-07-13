// variables

const form = document.querySelector('#form');
const taskList = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#tasks');

// Load Event Listeners

loadEventListeners();

function loadEventListeners() {
  form.addEventListener('submit', addTask);
}

// add Tasks

function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');
  }

  e.preventDefault();
}
