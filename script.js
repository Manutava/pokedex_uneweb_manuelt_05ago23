//Initial References
const newTaskInput =document.querySelector("#new-task input");
const tasksDiv =document.querySelector("#tasks");
let deleteTasks,editTasks,tasks;
let updateNote = "";
let count;

// Function on window load
window.onload = () => {
    updateNote = "";
    count = Object.keys(localStorage).length;
    displayTasks
  }

 //Function to Display The Tasks
const displayTasks = () => {
    if (Object.keys(localStorage).length > 0) {
      tasksDiv.style.display = "inline-block";
    } else {
      tasksDiv.style.display = "none";
    }
  
    //Clear the tasks
    tasksDiv.innerHTML = "";
  
    //Fetch All the keys in local storage
    let tasks = Object.keys(localStorage);
    tasks = tasks.sort();

    for (let key of tasks) {
      let classValue = "";
  
   //Get all values
   let value = localStorage.getItem(key);
   let taskInnerDiv = document.createElement("div");
   taskInnerDiv.classList.add("task");
   taskInnerDiv.setAttribute("id", key);
   taskInnerDiv.innerHTML = `<span id="taskname">${key.split("_")[1]}</span>`;

      //localstorage would store boolean as stringso we parse it to boolean back
      let editButton = document.createElement("button");
      editButton.classList.add("edit");
      editButton.innerHTML = `<ion-icon name="create"></ion-icon>`;
      if (!JSON.parse(value)) {
        editButton.style.visibility = "visible";
      } else {
        editButton.style.visibility="hidden";
        taskInnerDiv.classList.add("completed");
      }
      taskInnerDiv.appendChild(editButton);
      taskInnerDiv.innerHTML += `<button class="delete"><ion-icon name="trash"></ion-icon></button>`;
      tasksDiv.appendChild(taskInnerDiv);
    }
    //tasks completed
    tasks = document.querySelectorAll(".task");
    tasks.forEach((element, index) => {
    element.onclick = () => {
      //local storage update
      if (element.classList.contains("completed")) {
        updateStorage(element.id.split("_")[0], element.innerText, false);
      } else {
        updateStorage(element.id.split("_")[0], element.innerText, true);
      }
    }
  });

  //Edit Tasks
  editTasks = document.getElementsByClassName("edit");
  Array.from(editTasks).forEach((element, index) => {
    element.addEventListener("click", (e) => {
      //Stop propogation to outer elements (if removed when we click delete eventuallyrhw click will move to parent)
      e.stopPropagation();
      //disable other edit buttons when one task is being edited
      disableButtons(true);
      //update input value and remove div
      let parent = element.parentElement;
      newTaskInput.value = parent.querySelector("taskname").innerHTML;
      //set updateNote to the task that is being edited
      updateNote = parent.id;
      //remove task
      parent.remove();
    });
  });
}