// ELEMENTS
const add_btn = document.querySelector("#add_btn");
const unordered_list = document.querySelector("#unordered_list");

// EVENT LISTENERS

add_btn.addEventListener("click", add_task);

// EVENT FUNCTIONS

function add_task(event) {
  event.preventDefault();
  const task_title = document.querySelector("#user_input").value.trim();
  if (!task_title) return;
  const li = createListItem(task_title);
  unordered_list.append(li);
  document.querySelector("#user_input").value = "";
}
