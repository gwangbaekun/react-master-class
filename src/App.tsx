import { useEffect } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import AddBoard from "./components/AddBoard";
import Board from "./components/Board";
import Trash from "./components/Trash";
import { getLocalToDos, setLocalToDos } from "./recoilPersist";
import { toDoState } from "./state";

export const Wrapper = styled.div`
  display: flex;
  max-width: 780px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;
    if (destination?.droppableId === "category") {
      console.log(info);
      return;
    }
    if (!destination) return;
    if (destination?.droppableId === "trash") {
      setToDos((prev) => {
        const trashToDos = [...prev[source.droppableId]];
        const erasedToDos = trashToDos.filter(
          (toDo) => toDo.id !== +draggableId
        );
        return {
          ...prev,
          [source.droppableId]: erasedToDos,
        };
      });
      return;
    }
    if (destination?.droppableId === source.droppableId) {
      setToDos((prev) => {
        const copyToDos = [...prev[source.droppableId]];
        const taskObj = copyToDos[source.index];
        copyToDos.splice(source.index, 1);
        copyToDos.splice(destination?.index, 0, taskObj);
        return {
          ...prev,
          [source.droppableId]: copyToDos,
        };
      });
    }
    if (destination?.droppableId !== source.droppableId) {
      setToDos((prev) => {
        const copyToDosBefore = [...prev[source.droppableId]];
        const copyToDosAfter = [...prev[destination?.droppableId]];
        const taskObj = copyToDosBefore[source.index];

        copyToDosBefore.splice(source.index, 1);
        copyToDosAfter.splice(destination?.index, 0, taskObj);
        return {
          ...prev,
          [source.droppableId]: copyToDosBefore,
          [destination?.droppableId]: copyToDosAfter,
        };
      });
    }
  };

  const onDragBoardEnd = (info: DropResult) => {
    console.log(info);
  };

  useEffect(() => {
    setToDos(getLocalToDos());
  }, []);

  useEffect(() => {
    setLocalToDos(toDos);
  }, [toDos]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <AddBoard />
      <Droppable droppableId={"category"}>
        {(p) => (
          <Wrapper ref={p.innerRef} {...p.droppableProps}>
            {p.placeholder}
            <Boards>
              {Object.keys(toDos).map((boardId, index) => (
                <Board
                  key={`${boardId}`}
                  index={index}
                  boardId={boardId}
                  toDos={toDos[boardId]}
                ></Board>
              ))}
            </Boards>
          </Wrapper>
        )}
      </Droppable>
      <Trash />
    </DragDropContext>
  );
}

export default App;
