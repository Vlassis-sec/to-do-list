// IMPORTS
import Storage from "./Storage.js";
import StateManager from "./StateManager.js";
import Renderer from "./Renderer.js";
import { getInitialTasksList } from "./utils.js";

// ELEMENTS
const add_btn = document.querySelector("#add_btn");
const unordered_list = document.querySelector("#unordered_list");
const completed_list = document.querySelector("#completed_list");
const task_title = document.querySelector("#user_input");
const toggle_icon = document.querySelector("#toggle_icn");

getInitialTasksList();
Renderer.renderPersistedTasks(
  StateManager.tasksList,
  unordered_list,
  completed_list,
  StateManager.visibility,
  toggle_icon
);

// EVENT LISTENERS
add_btn.addEventListener("click", add_task);
unordered_list.addEventListener("click", delete_task);
unordered_list.addEventListener("click", check_item);
completed_list.addEventListener("click", delete_task);
completed_list.addEventListener("click", check_item);
toggle_icon.addEventListener("click", toggle_visibility);

// EVENT FUNCTIONS
function add_task(event) {
  event.preventDefault();
  if (!task_title.value) return;
  // TO-DO -> ADD TRY/CATCH | CASES : WHAT IF CREATTASK OR CREATELISTITEM THROWS?
  const task = StateManager.createTask(task_title.value.trim());
  StateManager.addTaskToList(task);
  Renderer.displayTheList(
    StateManager.tasksList,
    unordered_list,
    completed_list
  );
  Storage.updateStorage("tasks", StateManager.tasksList);
  task_title.value = "";
}

function delete_task(event) {
  if (event.target.closest("[data-action]")) {
    const li = event.target.closest("[data-item]");
    const elementID = Renderer.getListItemId(li);
    StateManager.removeTaskFromList(elementID);
    Renderer.displayTheList(
      StateManager.tasksList,
      unordered_list,
      completed_list
    );
    Storage.updateStorage("tasks", StateManager.tasksList);
  }
}

function check_item(event) {
  if (event.target.closest(".checkbox")) {
    const li = event.target.closest("[data-item]");
    Renderer.removeTaskAnimation(li);
    const elementID = Renderer.getListItemId(li);
    StateManager.modifyTaskState(elementID);
    li.addEventListener("animationend", () => {
      Renderer.displayTheList(
        StateManager.tasksList,
        unordered_list,
        completed_list
      );
      Storage.updateStorage("tasks", StateManager.tasksList);
    });
  }
}

function toggle_visibility() {
  StateManager.toggleVisiblity();
  Renderer.toggleCompletedListVisibility(
    StateManager.visibility,
    completed_list,
    toggle_icon
  );
  Storage.updateStorage("visibility", StateManager.visibility);
}
