// PRODUCE UI

const Renderer = {
  addClasses(element, utlityClassesArray) {
    utlityClassesArray.forEach((utilClass) => {
      element.classList.add(utilClass);
    });
  },

  createListItem(task) {
    const li = document.createElement("li");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const delete_button = document.createElement("button");
    const icon = document.createElement("span");

    this.addClasses(li, [
      "tasks-list__list-item",
      "li-bg",
      "bo-rad-50",
      "li-width",
      "li-shad",
      "list-item",
    ]);
    this.addClasses(span, ["sp-font", "sp-width"]);
    this.addClasses(delete_button, ["btn-bg", "bo-none"]);
    this.addClasses(icon, ["material-symbols-outlined", "ic-size-35"]);

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
  },

  removeTaskAnimation(element) {
    element.classList.add("delete-animation");
  },

  getListItemId(element) {
    return element.getAttribute("data-id");
  },

  sortByTaskState(object, uiList1, uiList2) {
    if (object.completed === false) {
      const li = this.createListItem(object);
      uiList1.append(li);
    } else {
      const li = this.createListItem(object);
      uiList2.append(li);
    }
  },

  getSpan(uiList) {
    for (let element of uiList.children) {
      if (
        element.textContent === "Tasks" ||
        element.textContent === "Completed"
      ) {
        return element;
      }
    }
  },

  cleanList(uiList) {
    while (uiList.firstChild) {
      uiList.removeChild(uiList.firstChild);
    }
  },

  getCleanList(uiList) {
    const span = this.getSpan(uiList);
    this.cleanList(uiList);
    uiList.append(span);
  },

  toggleCompletedListVisibility(visibility, list, icon) {
    if (visibility === true) {
      list.classList.remove("vi-hid");
      icon.textContent = "visibility";
    } else {
      list.classList.add("vi-hid");
      icon.textContent = "visibility_off";
    }
  },
  displayTheList(tasksList, uiList1, uiList2) {
    this.getCleanList(uiList1);
    this.getCleanList(uiList2);
    tasksList.forEach((task) => {
      this.sortByTaskState(task, uiList1, uiList2);
    });
  },

  renderPersistedTasks(dataList, uiList1, uiList2, visibility, icon) {
    this.toggleCompletedListVisibility(visibility, uiList2, icon);
    if (dataList.length === 0) {
      return;
    } else {
      dataList.forEach((object) => {
        this.sortByTaskState(object, uiList1, uiList2);
      });
    }
  },
};

export default Renderer;
