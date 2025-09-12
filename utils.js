import Storage from "./Storage.js";
import StateManager from "./StateManager.js";

export function getInitialTasksList() {
  let keys = Storage.checkStorage();
  if (keys.includes("tasks")) {
    const list = Storage.parseLocalStorage("tasks");
    StateManager.tasksList = list;
  }
  if (keys.includes("visibility")) {
    const visibility = Storage.parseLocalStorage("visibility");
    StateManager.visibility = visibility;
  }
}
