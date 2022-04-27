import { IToDoState } from "./state";

export async function setLocalToDos(value: IToDoState) {
  localStorage.setItem("recoil_todos", JSON.stringify(value));
}

export function getLocalToDos() {
  const localToDos = localStorage.getItem("recoil_todos");
  if (localToDos) {
    return JSON.parse(localToDos);
  }
  return {
    to_do: [],
    doing: [],
    done: [],
  };
}
