function createListItem(title) {
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
  ]);
  addClasses(span, ["sp-font", "sp-width"]);
  addClasses(delete_button, ["btn-bg", "bo-none"]);
  addClasses(icon, ["material-symbols-outlined", "ic-size-35"]);
  input.setAttribute("type", "checkbox");
  li.setAttribute("id", "list_item");
  delete_button.setAttribute("id", "delete_btn");
  icon.textContent = "delete";
  span.textContent = title;

  delete_button.append(icon);
  li.append(input);
  li.append(span);
  li.append(delete_button);

  return li;
}

function addClasses(element, utlityClassesArray) {
  utlityClassesArray.forEach((utilClass) => {
    element.classList.add(utilClass);
  });
}
