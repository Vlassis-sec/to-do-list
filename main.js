// ELEMENTS
const add_btn = document.querySelector("#add_btn");
const unordered_list = document.querySelector("#unordered_list");
const completed_list = document.querySelector("#completed_list");
const user_input = document.querySelector("#user_input");

// EVENT LISTENERS
// let tasksList = [];
const tasksList = displayStoragedItems(unordered_list, completed_list);
add_btn.addEventListener("click", add_task);
unordered_list.addEventListener("click", delete_task);
unordered_list.addEventListener("click", check_item);
completed_list.addEventListener("click", delete_task);

// EVENT FUNCTIONS
function add_task(event) {
  event.preventDefault();
  const task_title = document.querySelector("#user_input").value.trim();
  if (!task_title) return;
  // TO-DO -> ADD TRY/CATCH | CASES : WHAT IF CREATTASK OR CREATELISTITEM THROWS?
  const task = createTask(task_title);
  const li = createListItem(task);
  unordered_list.append(li);
  document.querySelector("#user_input").value = "";
  // localStorage operation
  populateTasksList(tasksList, task);
  populateLocalStorage("tasks", tasksList);
}

function delete_task(event) {
  if (event.target.closest("[data-action]")) {
    const li = event.target.closest("[data-item]");
    li.remove();
    // localStorage operation
    removeTaskFromStorage(li, tasksList);
  }
}

function check_item(event) {
  if (event.target.closest(".checkbox")) {
    const li = event.target.closest("[data-item]");
    removeTaskAnimation(li);
    li.addEventListener("animationend", () => {
      const movedItem = removeListItem(unordered_list, li);
      movedItem.classList.remove("delete-animation");
      moveTo(completed_list, movedItem);
    });
    // localStorage operation
    modifyTaskState(li, tasksList);
    // TO-DOS
    // add animation | pending
  }
}
