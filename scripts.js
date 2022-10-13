// Selecting the buttons in the application
let submitBtn = document.getElementById("submitBtn");
let completeAllBtn = document.getElementById("completeAllTasksBtn");
let clearCompleteBtn = document.getElementById("clearCompleteBtn");
let deleteBtn = document.querySelectorAll(".deleteBtn");
// Todo : figutre out why querySelectorAll is not working
let doneBtn = document.querySelectorAll(".taskDoneBtn");
console.log(doneBtn);
// Selection the tabs
let tabsItem = document.querySelectorAll(".tabsItem");
let allTab = tabsItem[0];                         //All
let inCompleteTab = tabsItem[1];                  //Uncomplete
let completedTab = tabsItem[2];                   //Complete

// Selecting Input Bar
let inputBar = document.getElementById("inputBar");

// Selection of Containeres
let allTasksContainer = document.getElementById("todo-list-items");
let inCompleteTaskContainer = document.getElementById("inCompleteTaskContainer");
let completeTaskContainer = document.getElementById("completeTaskContainer");

// Adding Event listeners to buttons 
submitBtn.addEventListener("click",addTask);
inputBar.addEventListener("keydown",addTaskOnEnter);
allTab.addEventListener("click",showAllTasks);
inCompleteTab.addEventListener("click",showInCompleteTasks);
completedTab.addEventListener("click",showCompleteTasks);
completeAllBtn.addEventListener("click",completeAllTasks)
// Array.from(document.getElementsByClassName("taskDoneBtn")).forEach(function(item){
//      item.addEventListener("click",function(e){
//           e.preventDefault();
//           console.log(this.parentElement)
//      })
// })
// Function 

// For adding task to localStorage and the task contain on click of submit button 
function addTask(e){
     e.preventDefault();
     
     if(inputBar.value != ""){
          var task = {
               taskName: inputBar.value,
               isCompleted : false
          }
     }else{
          alert("Don't leave the box empty")
          return ;
     }

     let tasks = localStorage.getItem("tasks");

     if(tasks == null){
          tasks = [];
     }else{
          tasks = JSON.parse(localStorage.getItem("tasks"));
     }

     tasks.push(task);
     localStorage.setItem("tasks", JSON.stringify(tasks));

     inputBar.value = "";
     showAllTasks();
     taskCount();
}

// For adding task to localStorage and the task contain on click of Enter
function addTaskOnEnter(e){
     // e.preventDefault();

     if(e.code == "Enter" || e.code == "NumpadEnter"){
          submitBtn.click();
     }
}

showAllTasks();
function showAllTasks() {

     // Remove the active-tab class from All and completed

     if(inCompleteTab.classList.contains("active-tab")){
          inCompleteTab.classList.remove("active-tab");
     }
     if(completedTab.classList.contains("active-tab")){
          completedTab.classList.remove("active-tab");
     }

     // Add active-tab class in inComplete
     allTab.classList.add("active-tab");

     // Clear container
     // allTasksContainer.innerHTML = "";
     inCompleteTaskContainer.innerHTML = "";
     completeTaskContainer.innerHTML = "";


     let tasks = localStorage.getItem("tasks");
     // console.log(typeOf tasks);
     if(tasks == null){
          return;
     }
     tasks = JSON.parse(localStorage.getItem("tasks"));
     allTasksContainer.innerHTML = "";
     tasks.forEach(task => {
          if(task.isCompleted == true){
               allTasksContainer.innerHTML += 
               `<li class="single-task-container flex-row">
                    <div class="check-and-task-name">
                         <i class="taskDoneBtn fa-solid fa-circle-check"></i>
                         <label for="one" class="taskName strikethrough">${task.taskName}</label>
                    </div>
                    <i class="deleteBtn fa-solid fa-trash-can"></i>
               </li>`
          }else{
               allTasksContainer.innerHTML +=
               `<li class="single-task-container flex-row">
                    <div class="check-and-task-name">
                         <i class="taskDoneBtn fa-solid fa-circle-check"></i>
                         <label for="one" class="taskName">${task.taskName}</label>
                    </div>
                    <i class="deleteBtn fa-solid fa-trash-can"></i>
               </li>`
          }
     });
};

function showInCompleteTasks(){
     // Remove the active-tab class from All and completed

     if(allTab.classList.contains("active-tab")){
          allTab.classList.remove("active-tab");
     }
     if(completedTab.classList.contains("active-tab")){
          completedTab.classList.remove("active-tab");
     }

     // Add active-tab class in inComplete
     inCompleteTab.classList.add("active-tab");

     // Clear container
     allTasksContainer.innerHTML = "";
     inCompleteTaskContainer.innerHTML = "";
     completeTaskContainer.innerHTML = "";

     // display only those in which isComplete is false
     let tasks = localStorage.getItem("tasks");

     // console.log(typeOf tasks);
     if(tasks == null){
          return;
     }
     tasks = JSON.parse(localStorage.getItem("tasks"));
     tasks.filter(function(item) {
          if(item.isCompleted == false){
               inCompleteTaskContainer.innerHTML +=
               `<li class="single-task-container flex-row">
               <div class="check-and-task-name">
                    <i class="taskDoneBtn fa-solid fa-circle-check"></i>
                    <label for="one" class="taskName">${item.taskName}</label>
               </div>
               <i class="deleteBtn fa-solid fa-trash-can"></i>
               </li>`
               // console.log(item.taskName)
          }
     })
     
}

function showCompleteTasks(){
      // Remove the active-tab class from All and Incompleted

     if(allTab.classList.contains("active-tab")){
          allTab.classList.remove("active-tab");
     }
     if(inCompleteTab.classList.contains("active-tab")){
          inCompleteTab.classList.remove("active-tab");
     }

     // Add active-tab class in inComplete
     completedTab.classList.add("active-tab");

    // Clear container
     allTasksContainer.innerHTML = "";
     inCompleteTaskContainer.innerHTML = "";
     completeTaskContainer.innerHTML = "";

      // display only those in which isComplete is false
     let tasks = localStorage.getItem("tasks");

     // console.log(typeOf tasks);
     if(tasks == null){
          return;
     }

     tasks = JSON.parse(localStorage.getItem("tasks"));
     tasks.filter(function(item) {
          if(item.isCompleted === true){
               completeTaskContainer.innerHTML +=
               `<li class="single-task-container flex-row">
               <div class="check-and-task-name">
                    <i class="taskDoneBtn fa-solid fa-circle-check"></i>
                    <label for="one" class="taskName strikethrough">${item.taskName}</label>
               </div>
               <i class="deleteBtn fa-solid fa-trash-can"></i>
               </li>`
               console.log(item.taskName)
          }
     })
}

// function taskDone(e){
//      e.preventDefault();
//      console.log(this)
// }

function taskCount(){
     var tasks = localStorage.getItem("tasks");
     if(tasks == null){
          document.getElementById("taskLeftCount").innerHTML = 0;
          return;
     }


     tasks = JSON.parse(localStorage.getItem("tasks"));
     var count = 0;
     tasks.filter(function(item){
          if(item.isCompleted == false){
               count++;
          }
     })
     document.getElementById("taskLeftCount").innerHTML = count;
}
taskCount();

function completeAllTasks(){

     let tasks = localStorage.getItem("tasks");
     if(tasks == null){
          return;
     }

     tasks = JSON.parse(localStorage.getItem("tasks"));

     tasks.forEach(function(task){
          if(task.isCompleted == false){
               task.isCompleted = true;
          }
     })

     // console.log(tasks);

     localStorage.setItem("tasks", JSON.stringify(tasks));
     showAllTasks();
}