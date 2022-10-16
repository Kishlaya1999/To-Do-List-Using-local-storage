//*--------------------------------------------- Selecting elements form DOM------------------------------------------

// Selecting the buttons in the application
let submitBtn = document.getElementById("submitBtn");
let completeAllBtn = document.getElementById("completeAllTasksBtn");
let clearCompleteBtn = document.getElementById("clearCompleteBtn");

// Selection the tabs
let tabsItem = document.querySelectorAll(".tabsItem");
let allTab = tabsItem[0]; //All
let inCompleteTab = tabsItem[1]; //Uncomplete
let completedTab = tabsItem[2]; //Complete

// Selecting Input Bar
let inputBar = document.getElementById("inputBar");

// Selection of Containeres
let allTasksContainer = document.getElementById("todo-list-items");
let inCompleteTaskContainer = document.getElementById("inCompleteTaskContainer");
let completeTaskContainer = document.getElementById("completeTaskContainer");

//*--------------------------------------------- Adding Event Listeners to selected elements--------------------------
submitBtn.addEventListener("click", addTask);
inputBar.addEventListener("keydown", addTaskOnEnter);
allTab.addEventListener("click", showAllTasks);
inCompleteTab.addEventListener("click", showInCompleteTasks);
completedTab.addEventListener("click", showCompleteTasks);
completeAllBtn.addEventListener("click", completeAllTasks);
clearCompleteBtn.addEventListener("click", clearCompleted);

//*--------------------------------------------- Adding Functions-----------------------------------------------------


// For adding task to localStorage and the task contain on click of submit button 
function addTask(e) {
     e.preventDefault();
     // if some value is entered in input bar then only execute this otherwise show an alert message 
     if (inputBar.value != "") {
          // Structure of a single task that is added in the Tasks array in localStorage
          var task = {
               taskName: inputBar.value,
               isCompleted: false, //Tells the state of the task i.e. completed or not
               id: Date.now() //Acts as an id to each task [we used while marking as done]
          }
     } else {
          alert("Don't leave the box empty")
          return;
     }

     // getting the task array form the localStorge
     let tasks = localStorage.getItem("tasks");

     //if tasks array is null i.e. user has enterd to the website for the first time
     if (tasks == null) {
          // we create an array and assign to tasks  
          tasks = [];
     } else { //tasks array NOT NULL i.e. tasks array has already been created and stored in localStorage
          // parsing tasks array [i.e. getItem returns us string so converting it to array format] and assigning it to tasks
          tasks = JSON.parse(localStorage.getItem("tasks"));
     }

     // pushing the newly created task to tasks array
     tasks.push(task);
     // updating the tasks array in the localStorage 
     localStorage.setItem("tasks", JSON.stringify(tasks));

     inputBar.value = ""; //emptying the inputBar so that next time it is already cleared
     // showAllTasks();                    //Re-rendering the list according to the new tasks array
     displayActiveTab();
     noOfTasksLeft(); //Changing the number of tasks left
     eventListener();
}

// For adding task to localStorage and the task container on click of Enter button
function addTaskOnEnter(e) {

     // if any of the two enter button is clicked by user then submit button is clicked using code
     if (e.code == "Enter" || e.code == "NumpadEnter") {
          submitBtn.click();
     }
}

// Function for rendering all the task in All container 
function showAllTasks() {

     localStorage.setItem("activeTab", "All");

     // Remove the active-tab class from incomplete and completed
     if (inCompleteTab.classList.contains("active-tab")) {
          inCompleteTab.classList.remove("active-tab");
     }
     if (completedTab.classList.contains("active-tab")) {
          completedTab.classList.remove("active-tab");
     }

     // Adding active-tab class in inComplete
     allTab.classList.add("active-tab");

     allTasksContainer.style.display = "flex";
     inCompleteTaskContainer.style.display = "none";
     completeTaskContainer.style.display = "none";

     // Clearing the previously containing content from container so that new content can be added
     inCompleteTaskContainer.innerHTML = "";
     completeTaskContainer.innerHTML = "";

     // getting the tasks array form the localStorge
     let tasks = localStorage.getItem("tasks");
     // if tasks array is null that is no need to render the tasks so returning from here
     if (tasks == null) {
          return;
     }
     // converting 'string' to array 'object'
     tasks = JSON.parse(localStorage.getItem("tasks"));
     allTasksContainer.innerHTML = "";
     // iterating over each and every task in task array and rendering according to the task completed or not
     tasks.forEach(task => {
          // if isCompleted == true i.e. task is already completed so glowing done button and striking of the task by adding the doneBtnGlow and strikethrough class
          if (task.isCompleted == true) {
               allTasksContainer.innerHTML +=
                    `<li class="single-task-container flex-row">
                    <div class="check-and-task-name">
                         <i class="taskDoneBtn doneBtnGlow fa-solid fa-circle-check"></i>
                         <label for="one" class="taskName strikethrough">${task.taskName}</label>
                         <span style="display:none;">${task.id}</span>
                    </div>
                    <i class="deleteBtn fa-solid fa-trash-can"></i>
               </li>`
          }
          // if isComplete == false i.e. task is not finished so rendering the list without adding doneBtnGlow and strikethrough class 
          else {
               allTasksContainer.innerHTML +=
                    `<li class="single-task-container flex-row">
                    <div class="check-and-task-name">
                         <i class="taskDoneBtn fa-solid fa-circle-check"></i>
                         <label for="one" class="taskName">${task.taskName}</label>
                         <span style="display:none;">${task.id}</span>
                    </div>
                    <i class="deleteBtn fa-solid fa-trash-can"></i>
               </li>`
          }
     });
     eventListener();
};


function showInCompleteTasks() {

     localStorage.setItem("activeTab", "Incomplete");


     // Remove the active-tab class from All and completed
     if (allTab.classList.contains("active-tab")) {
          allTab.classList.remove("active-tab");
     }
     if (completedTab.classList.contains("active-tab")) {
          completedTab.classList.remove("active-tab");
     }

     // Add active-tab class in inComplete
     inCompleteTab.classList.add("active-tab");

     allTasksContainer.style.display = "none";
     inCompleteTaskContainer.style.display = "flex";
     completeTaskContainer.style.display = "none";

     // Clearing the previously containing content from container so that new content can be added
     allTasksContainer.innerHTML = "";
     inCompleteTaskContainer.innerHTML = "";
     completeTaskContainer.innerHTML = "";

     let tasks = localStorage.getItem("tasks");

     // console.log(typeOf tasks);
     if (tasks == null) {
          return;
     }
     tasks = JSON.parse(localStorage.getItem("tasks"));

     tasks.filter(function (task) {
          // display only those in which isComplete is false
          if (task.isCompleted == false) {
               inCompleteTaskContainer.innerHTML +=
                    `<li class="single-task-container flex-row">
               <div class="check-and-task-name">
                    <i class="taskDoneBtn fa-solid fa-circle-check"></i>
                    <label for="one" class="taskName">${task.taskName}</label>
                    <span style="display:none;">${task.id}</span>
               </div>
               <i class="deleteBtn fa-solid fa-trash-can"></i>
               </li>`
          }
     })
     eventListener();
}

function showCompleteTasks() {
     localStorage.setItem("activeTab", "Complete");

     // Remove the active-tab class from All and Incompleted
     if (allTab.classList.contains("active-tab")) {
          allTab.classList.remove("active-tab");
     }
     if (inCompleteTab.classList.contains("active-tab")) {
          inCompleteTab.classList.remove("active-tab");
     }

     // Add active-tab class in inComplete
     completedTab.classList.add("active-tab");
     
     allTasksContainer.style.display = "none";
     inCompleteTaskContainer.style.display = "none";
     completeTaskContainer.style.display = "flex";

     // Clearing the previously containing content from container so that new content can be added
     allTasksContainer.innerHTML = "";
     inCompleteTaskContainer.innerHTML = "";
     completeTaskContainer.innerHTML = "";

     // display only those in which isComplete is false
     let tasks = localStorage.getItem("tasks");

     if (tasks == null) {
          return;
     }
     tasks = JSON.parse(localStorage.getItem("tasks"));

     tasks.filter(function (task) {
          // displaying only those in which isCompleted is true
          if (task.isCompleted === true) {
               completeTaskContainer.innerHTML +=
                    `<li class="single-task-container flex-row">
               <div class="check-and-task-name">
                    <i class="taskDoneBtn doneBtnGlow fa-solid fa-circle-check"></i>
                    <label for="one" class="taskName strikethrough">${task.taskName}</label>
                    <span style="display:none;">${task.id}</span>     
               </div>
               <i class="deleteBtn fa-solid fa-trash-can"></i>
               </li>`
          }
     })
     eventListener();
}

function noOfTasksLeft() {

     var tasks = localStorage.getItem("tasks");
     if (tasks == null) {
          document.getElementById("taskLeftCount").innerHTML = 0;
          return;
     }

     tasks = JSON.parse(localStorage.getItem("tasks"));

     // Diclaring and initializing the count variable as 0
     var count = 0;

     tasks.filter(function (item) {
          // Counting the number of tasks which are not completed
          if (item.isCompleted == false) {
               count++;
          }
     });
     // Updating the count variable in DOM
     document.getElementById("taskLeftCount").innerHTML = count;
}
noOfTasksLeft();

// Function for completing all the tasks in one click
function completeAllTasks() {

     let tasks = localStorage.getItem("tasks");
     if (tasks == null) {
          return;
     }

     tasks = JSON.parse(localStorage.getItem("tasks"));

     tasks.forEach(function (task) {
          // Updaing the tasks array isCompleted as true
          if (task.isCompleted == false) {
               task.isCompleted = true;
          }
     })

     // Storing the updated tasks array
     localStorage.setItem("tasks", JSON.stringify(tasks));

     displayActiveTab();
     noOfTasksLeft();
}

// Function for clearing completed tasks
function clearCompleted() {
     let tasks = localStorage.getItem("tasks");
     if (tasks == null) {
          return;
     }

     tasks = JSON.parse(localStorage.getItem("tasks"));
     // Creating the dummyTasks array which will contain incomplete tasks
     let dummyTask = [];
     tasks.forEach(function (task) {
          // pushing the task which are incomplete to dummyTasks array
          if (task.isCompleted == false) {
               dummyTask.push(task);
          }
     })
     // updating the tasks array to with the incomplete tasks
     localStorage.setItem("tasks", JSON.stringify(dummyTask));

     displayActiveTab();
}

// after buuton is clicked event listeners are removed so to add event listener I created this class
function eventListener() {
     // can't select this in starting because it is renedred later after element is added
     let doneBtn = document.querySelectorAll(".taskDoneBtn");
     let deleteBtn = document.querySelectorAll(".deleteBtn");
     // Adding eventListener to all the done buttons
     doneBtn.forEach(function (item) {
          item.addEventListener("click", thisTaskIsFinished);
     });

     // Adding eventListener to all the delete buttons
     deleteBtn.forEach(function (item) {
          item.addEventListener("click", deleteThisTask);
     });
}

function thisTaskIsFinished() {
     // if it doesn't contais doneBtnGlow it means it's isCompleted is false hence we change to true else vice versa
     if (this.classList.contains("doneBtnGlow") == false) {
          // getting the id of the element that we have to mark as done
          let idOfTaskToBeMarkedAsDone = this.parentElement.children[2].innerHTML;

          let tasks = localStorage.getItem("tasks");
          if (tasks == null) {
               return;
          }

          tasks = JSON.parse(localStorage.getItem("tasks"));

          tasks.forEach(function (task) {
               // Iterting through the loop and whenever the id matches then changing its isCompleted as true
               if (task.id == idOfTaskToBeMarkedAsDone) {
                    task.isCompleted = true;
               }
          });

          localStorage.setItem("tasks", JSON.stringify(tasks));
     } else {

          let ans = confirm("This task is marked as done by you. Do you want to undone it again: \nFor 'Yes' press 'OK' \nFor 'No' press 'Cancel'");

          if (ans == true) {
               // getting the id of the element that we have to mark as undone
               let idOfTaskToBeUnMarkedAsDone = this.parentElement.children[2].innerHTML;

               let tasks = localStorage.getItem("tasks");
               if (tasks == null) {
                    return;
               }

               tasks = JSON.parse(localStorage.getItem("tasks"));

               tasks.forEach(function (task) {
                    // Iterting through the loop and whenever the id matches then changing its isCompleted as false
                    if (task.id == idOfTaskToBeUnMarkedAsDone) {
                         task.isCompleted = false;
                    }
               });

               localStorage.setItem("tasks", JSON.stringify(tasks));
          }
     }
     displayActiveTab();
     noOfTasksLeft();
     eventListener();

}

function deleteThisTask() {
     let completedOrNot = this.parentElement.children[0].children[1].classList.contains("strikethrough");
     if (completedOrNot == true) {
          // adding the animation class to that item which has to be deleted
          this.parentElement.classList.add("fade-out-bck");
          // running the rest of the functionality after 1 sec so that the animation gets completed
          setTimeout(() => {
               // getting the name of the element that we have to delete
               let thisTaskIsToBeDeleted = this.parentElement.children[0].children[1].innerHTML;

               let tasks = localStorage.getItem("tasks");
               if (tasks == null) {
                    return;
               }

               tasks = JSON.parse(localStorage.getItem("tasks"));

               // iterating through the loop and when it matches with the element we have to delete then we remove that using splice function
               tasks.forEach(function (task, index) {
                    if (task.taskName == thisTaskIsToBeDeleted) {
                         tasks.splice(index, 1);
                    }
               });
               localStorage.setItem("tasks", JSON.stringify(tasks));
               displayActiveTab();
               eventListener();
               noOfTasksLeft();
          }, 1000)
     } else {
          let userResponse = confirm("You had not completed this task yet. Do you still want to delete:\nFor 'Yes' press 'OK' \nFor 'No' press 'Cancel'");
          if (userResponse) {
               this.parentElement.classList.add("fade-out-bck");
               // running the rest of the functionality after 1 sec so that the animation gets completed
               setTimeout(() => {
                    // getting the name of the element that we have to delete
                    let thisTaskIsToBeDeleted = this.parentElement.children[0].children[1].innerHTML;

                    let tasks = localStorage.getItem("tasks");
                    if (tasks == null) {
                         return;
                    }

                    tasks = JSON.parse(localStorage.getItem("tasks"));

                    // iterating through the loop and when it matches with the element we have to delete then we remove that using splice function
                    tasks.forEach(function (task, index) {
                         if (task.taskName == thisTaskIsToBeDeleted) {
                              tasks.splice(index, 1);
                         }
                    });
                    localStorage.setItem("tasks", JSON.stringify(tasks));
                    displayActiveTab();
                    eventListener();
                    noOfTasksLeft();
               }, 1000)
          }else{
               return;
          }

     }
}

function displayActiveTab() {
     // Checking the active tab in localStorage
     let activeTab = localStorage.getItem("activeTab");
     // If user enters for the first time then only active tab would be null hence displaying all task container which would be blank
     if (activeTab == null) {
          showAllTasks();
          return;
     }
     // Rendering the list according to the activeTab value
     switch (activeTab) {
          case "All":
               showAllTasks();
               break;
          case "Incomplete":
               showInCompleteTasks();
               break;
          case "Complete":
               showCompleteTasks();
               break;
     }
};
displayActiveTab();