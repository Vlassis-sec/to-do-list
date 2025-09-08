// ELEMENT RELATED
function createListItem(task) {
  const li = document.createElement("li");
  const input = document.createElement("input");
  const span = document.createElement("span");
  const delete_button = document.createElement("button");
  const icon = document.createElement("span");

  addClasses(li, [
    "tasks-list__list-item",
    "li-bg",
    "bo-rad-50",
    "li-width",
    "li-shad",
    "list-item",
  ]);
  addClasses(span, ["sp-font", "sp-width"]);
  addClasses(delete_button, ["btn-bg", "bo-none"]);
  addClasses(icon, ["material-symbols-outlined", "ic-size-35"]);
  delete_button.setAttribute("data-action", "delete");
  li.setAttribute("data-item", "list_item");
  li.setAttribute("data-id", task.id);
  input.setAttribute("type", "checkbox");
  input.setAttribute("class", "checkbox");
  task.completed && input.setAttribute("checked", "");

  icon.textContent = "delete";
  span.textContent = task.title;

  delete_button.append(icon);
  li.append(input);
  li.append(span);
  li.append(delete_button);

  return li;
}
// OBJECT RELATED
function createTask(title) {
  return {
    id: Date.now().toString(),
    title: title,
    completed: false,
  };
}
// ELEMENT RELATED
function addClasses(element, utlityClassesArray) {
  utlityClassesArray.forEach((utilClass) => {
    element.classList.add(utilClass);
  });
}
// ELEMENT RELATED
function removeListItem(parent, element) {
  const movedItem = parent.removeChild(element);
  return movedItem;
}
// NOT USED YET -> TO BE RELATED SOMEWHERE
function showMessage(parent) {
  const container = document.createElement("div");
  const message = document.createElement("span");
  addClasses(message, ["sp-font", "sp-width"]);
  addClasses(container, [
    "tasks-list__list-item",
    "li-bg",
    "bo-rad-50",
    "li-width",
    "li-shad",
    "delete-animation",
  ]);
  message.textContent = "Task moved to the completed list";
  container.append(message);
  parent.append(container);
}
// ELEMENT RELATED
function removeTaskAnimation(element) {
  element.classList.add("delete-animation");
}
// OBJECT RELATED
function populateTasksList(list, task) {
  list.push(task);
}
// STORAGE RELATED
function populateLocalStorage(key, value) {
  if (typeof value !== String) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, value);
  }
}
// STORAGE RELATED
function parseLocalStorage() {
  const tasksList = JSON.parse(localStorage.getItem("tasks"));
  return tasksList;
}
// THE BRIDGE TO CONNECT OBJECT WITH ELEMENT -> IN ORDER TO PERFORM SOMETHING
function matchElementWithObject(task, list) {
  const task_id = task.getAttribute("data-id");
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === task_id) {
      return {
        clicked_task: list[i],
        index: i,
      };
    }
  }
}
// OBJECT RELATED
function modifyTaskState(task, list) {
  const { clicked_task } = matchElementWithObject(task, list);
  clicked_task.completed = true;
  populateLocalStorage("tasks", list);
}
// STORAGE RELATED
function removeTaskFromStorage(task, list) {
  const { index } = matchElementWithObject(task, list);
  list.splice(index, 1);
  populateLocalStorage("tasks", list);
}
// STORAGE RELATED
function displayStoragedItems(list1, list2) {
  const tasksList = parseLocalStorage();
  if (!tasksList) return []; // if there is no tasks in storage, return an empty list
  tasksList.forEach((task) => {
    if (task.completed === false) {
      const li = createListItem(task);
      list1.append(li);
    } else {
      const li = createListItem(task);
      list2.append(li);
    }
  });
  return tasksList;
}
// ELEMENT RELATED
function moveTo(list, list_item) {
  list.append(list_item);
}
