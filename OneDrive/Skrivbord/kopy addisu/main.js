import { addTaskToList, createNewList } from "./functions";
import { sortTasks } from "./sort";
import "./style.css";

let sequentialTaskId = 1;
export class Task {
  taskName;
  isDone;
  taskId;

  constructor(taskName, isDone = false) {
    this.taskName = taskName;
    this.isDone = isDone;
    this.taskId = sequentialTaskId;
    sequentialTaskId++;
  }

  changeDone() {
    this.isDone = !this.isDone;
  }
}

export let tasks = [
  new Task("Handla"),
  new Task("Tvätta bilen"),
  new Task("Gymma"),
  new Task("Städda"),
];

tasks.forEach((task) => {
  localStorage.setItem("task-" + task.taskId, JSON.stringify(task));
});
//localStorage.setItem("tasks", JSON.stringify(tasks));
const addButton = document.getElementById("add-button");
const ulList = document.querySelector("#ulList");
export const userInput = document.querySelector("#task-input");

tasks.forEach((task) => {
  addTaskToList(task);
});

addButton.addEventListener("click", createNewList);

ulList.addEventListener("click", function (event) {
  let toBeRemoved = event.target.id;
  if (event.target.id === "delete-icon") {
    const li = event.target.parentElement;
    console.log(li);
    ulList.removeChild(li);

    const indexToRemove = Array.from(ulList.children).indexOf(li);
    let tsk = tasks.at(indexToRemove);
    console.log(tsk);
    tasks.splice(indexToRemove, 1);
    console.log("task-" + tsk.taskId);
    localStorage.removeItem("task-" + tsk.taskId);
  }
});

sortTasks();
