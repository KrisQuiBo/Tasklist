// variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const listGroup = document.querySelector('.list-group');
// let deleteTask = document.querySelector('.fa-check-circle');
let cardAction = document.querySelector('.card-action');

// Load Event Listeners
loadEventListeners();

function loadEventListeners() {
  // add task event
    document.addEventListener('DOMContentLoaded', getTasks);
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeSingleTask);
  clearBtn.addEventListener('click', removeAllTasks);
  filter.addEventListener('keyup', filterTasks)
}

// get tasks from LS
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){
    //create li
    const li = document.createElement('li');
    //add class
    li.className = "list-group-item";
    //add text node and append to li
    li.appendChild(document.createTextNode(task));
    //create new link element
    const link = document.createElement('a');
    //add class
    link.className = "delete-item secondary-content";
    // add icon html
    link.innerHTML = '<i class="far fa-check-circle" style="color:tomato"></i>';
    // append the link to the li
    li.appendChild(link);

    //append li to ul
    taskList.appendChild(li);
  });
}

// add Tasks
function addTask(e) {
  if (taskInput.value === '') {
    alert('You need to add a task');
  }
  //create li
  const li = document.createElement('li');
  //add class
  li.className = "list-group-item";
  //add text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  //create new link element
  const link = document.createElement('a');
  //add class
  link.className = "delete-item secondary-content";
  // add icon html
  link.innerHTML = '<i class="far fa-check-circle" style="color:tomato"></i>';
  //
  const otherLink = document.createElement('a');
  otherLink.className = "add-item secondary-content";
  otherLink.innerHTML = '<i class="far fa-heart"></i>'
  // append the link to the li
  li.appendChild(link);
  li.appendChild(otherLink);
  //append li to ul
  taskList.appendChild(li);

  //store to LS
  storeTaskInLocalStorage(taskInput.value);
  //clear Input
  taskInput.value = '';
  e.preventDefault();
} //end addTask

// store Task
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//remove single task
function removeSingleTask(e) {
if (e.target.parentElement.classList.contains('delete-item')) {
  if(confirm("Are you sure?")){
    e.target.parentElement.parentElement.remove();
    // remove from LS
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}
// remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index) {
    if(taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear tasks
function removeAllTasks(e) {
  // taskList.innerHTML = '';
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

function filterTasks(e) {
  let text = e.target.value.toLowerCase();
  let tasks = document.querySelectorAll('.list-group-item');
  tasks.forEach(function(task) {
    let item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }

  });
}
