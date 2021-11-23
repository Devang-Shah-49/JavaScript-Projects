//Define UI Vars
const form = document.querySelector("#task-form");
// const form = document.getElementById('task-form');
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector("#filter");
const taskInput = document.querySelector('#task');

//Load event listeners
loadEventListeners();

function loadEventListeners(){
    document.addEventListener('DOMContentLoaded', getTasks);
    form.addEventListener('submit', addTask); //Add task event
    taskList.addEventListener('click', removeTask); //Remove task event
    clearBtn.addEventListener('click', clearTasks); //Clear all tasks event
    filter.addEventListener("keyup", filterTasks); //Filter task event
}


//Get tasks from local storage
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task) {
        const li = document.createElement('li');
        li.className = 'collection-item' //Adding respective class name
        li.appendChild(document.createTextNode(task)); //Whatever in put is added that is appended
        
        //create html tag for remove icon
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        // link.innerHTML = '<i class="far fa-remove"></i>';
        link.innerHTML = '<i class="far fa-trash-alt"></i>';
        // link.innerHTML = '<i class="fas fa-trash"></i>';
        li.appendChild(link);
    
        //Append all this to ul
        // console.log(li);
        taskList.appendChild(li);
    });
}


//Add task function
function addTask(e){
    //Create li element
    if (taskInput.value){
    const li = document.createElement('li');
    li.className = 'collection-item'; //Adding respective class name
    li.appendChild(document.createTextNode(taskInput.value)); //Whatever in put is added that is appended
    
    //create html tag for remove icon
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    // link.innerHTML = '<i class="far fa-remove"></i>';
    link.innerHTML = '<i class="far fa-trash-alt"></i>';
    // link.innerHTML = '<i class="fas fa-trash"></i>';
    li.appendChild(link);

    //Append all this to ul
    // console.log(li);
    taskList.appendChild(li);

    // store task in LS
    storeTaskInLocalStorage(taskInput.value);
    }
    else{
        alert('Add a Task');
        // addTask(e);
        // window.location.reload();
    } 
    //Once appended and stored, Clear input value
    taskInput.value = '';
    e.preventDefault();
}



//Store input task to storage
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


//Remove task function
function removeTask(e){
    if(e.target.parentElement.classList.contains("delete-item")) {
        if (confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove();

            //Remove from local storage also
            removeTaskFromLocalStorage
            (e.target.parentElement.parentElement);
        }
    }
    // e.preventDefault();
}


function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


//Clear all tasks function
function clearTasks(){
    // taskList.innerHTML = ""; //slower way
    //Faster way removeChild >>>> innerHTML
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    //clear tasks from local storage also
    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
    localStorage.clear();
}



//Filter task function
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    //returns node list
    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if (item.toLowerCase().indexOf(text)){
                task.style.display = 'none';
            } else {
                task.style.display = 'block';
            }
        }
    );
    e.preventDefault();
}



















// //Define UI Vars
// const form = document.querySelector("#task-form");
// // const form = document.getElementById('task-form');
// const taskList = document.querySelector(".collection");
// const clearBtn = document.querySelector('.clear-tasks');
// const filter = document.querySelector("#filter");
// const taskInput = document.querySelector('#task');

// //Load event listeners
// loadEventListeners();

// function loadEventListeners(){
//     form.addEventListener('submit', addTask); //Add task event
//     taskList.addEventListener('click', removeTask); //Remove task event
//     clearBtn.addEventListener('click', clearTasks); //Clear all tasks event
//     filter.addEventListener("keyup", filterTasks); //Filter task event
// }


// //Add task function
// function addTask(e){
//     if(taskInput.value === ''){
//         alert('Add a Task');
//     }
//     //Create li element
//     const li = document.createElement('li');
//     li.className = 'collection-item' //Adding respective class name
//     li.appendChild(document.createTextNode(taskInput.value)); //Whatever in put is added that is appended
    
//     //create html tag for remove icon
//     const link = document.createElement('a');
//     link.className = 'delete-item secondary-content';
//     // link.innerHTML = '<i class="far fa-remove"></i>';
//     link.innerHTML = '<i class="far fa-trash-alt"></i>';
//     // link.innerHTML = '<i class="fas fa-trash"></i>';
//     li.appendChild(link);

//     //Append all this to ul
//     console.log(li);
//     taskList.appendChild(li);
    
//     //Once appended Clear input value
//     taskInput.value = '';

//     e.preventDefault();
// }


// //Remove task function
// function removeTask(e){
//     if(e.target.parentElement.classList.contains("delete-item")) {
//         if (confirm('Are You Sure?')) {
//             e.target.parentElement.parentElement.remove();
//         }
//     }
// }


// //Clear all tasks function
// function clearTasks(){
//     // taskList.innerHTML = ""; //slower way
//     //Faster way removeChild >>>> innerHTML
//     while(taskList.firstChild){
//         taskList.removeChild(taskList.firstChild);
//     }
// }


// //Filter task function
// function filterTasks(e){
//     const text = e.target.value.toLowerCase();
//     //returns node list
//     document.querySelectorAll('.collection-item').forEach(
//         function(task){
//             const item = task.firstChild.textContent;
//             if (item.toLowerCase().indexOf(text)){
//                 task.style.display = 'block';
//             } else {
//                 task.style.display = 'none';
//             }
//         }
//     );
// }