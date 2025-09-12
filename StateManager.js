// PRODUCE OBJECTS AND LISTS
// SERVE THEM
import Storage from "./Storage.js";

const StateManager = {
  _visibility: true,
  _completed: false,
  _tasksList: [],

  get tasksList() {
    return this._tasksList;
  },

  set tasksList(newList) {
    newList = this.copyList(newList);
    this._tasksList = newList;
  },

  get visibility() {
    return this._visibility;
  },

  set visibility(boolean) {
    this._visibility = boolean;
  },

  copyList(list) {
    return JSON.parse(JSON.stringify(list));
  },

  createTask(title) {
    return {
      id: Date.now().toString(),
      title: title,
      completed: false,
    };
  },

  createTasksList() {
    const tasksList = [];
    return tasksList;
  },

  matchElementWithObject(elementID, dataList) {
    for (let i = 0; i < dataList.length; i++) {
      if (dataList[i].id === elementID) {
        console.log("Found a match of Element and Data ids");
        return {
          clicked_task: dataList[i],
          index: i,
        };
      } else {
        console.log("Did not find any match");
      }
    }
  },

  updateList(oldList, newList) {
    oldList = [...newList];
    return oldList;
  },

  addTaskToList(task) {
    const copy = this.copyList(this._tasksList);
    copy.push(task);
    this._tasksList = this.updateList(this._tasksList, copy);
  },

  removeTaskFromList(id) {
    const copy = this.copyList(this._tasksList);
    const { index } = this.matchElementWithObject(id, copy);
    copy.splice(index, 1);
    this._tasksList = this.updateList(this._tasksList, copy);
  },

  modifyTaskState(id) {
    const copy = this.copyList(this._tasksList);
    const { clicked_task } = this.matchElementWithObject(id, copy);
    this._completed = this._complete ? false : true;
    clicked_task.completed = this._completed;
    this._tasksList = this.updateList(this._tasksList, copy);
  },

  toggleVisiblity() {
    this._visibility = this._visibility ? false : true;
  },
};

export default StateManager;
