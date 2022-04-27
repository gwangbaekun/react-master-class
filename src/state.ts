import { atom, selector } from "recoil";
import { getLocalToDos } from "./recoilPersist";

export interface IToDoState {
  [key: string]: ITodo[];
}
export interface ITodo {
  id: number;
  text: string;
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: getLocalToDos(),
});
