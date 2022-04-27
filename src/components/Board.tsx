import {
  Draggable,
  Droppable,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import DraggableCard from "./DraggableCard";
import styled from "styled-components";
import { useRef } from "react";
import { ITodo, toDoState } from "../state";
import { useSetRecoilState } from "recoil";

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
  index: number;
}

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

interface IForm {
  toDo: string;
}

const Wrapper = styled.div`
  width: 300px;
  padding: 20px 10px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

function Board({ toDos, boardId, index }: IBoardProps) {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((prev) => {
      return {
        ...prev,
        [boardId]: [newToDo, ...prev[boardId]],
      };
    });
    setValue("toDo", "");
  };
  return (
    <>
      <Draggable draggableId={`category-${boardId}`} index={index}>
        {(p, s) => (
          <Wrapper
            ref={p.innerRef}
            {...p.dragHandleProps}
            {...p.draggableProps}
          >
            <Title>{boardId}</Title>
            <Form onSubmit={handleSubmit(onValid)}>
              <input
                {...register("toDo", { required: true })}
                type="text"
                placeholder={`Add task on ${boardId}`}
              />
            </Form>
            <Droppable droppableId={boardId}>
              {(magic, info) => (
                <Area
                  isDraggingOver={info.isDraggingOver}
                  isDraggingFromThis={Boolean(info.draggingFromThisWith)}
                  ref={magic.innerRef}
                  {...magic.droppableProps}
                >
                  {toDos.map((toDo, index) => (
                    <DraggableCard
                      key={toDo.id}
                      index={index}
                      toDoId={toDo.id}
                      toDoText={toDo.text}
                    />
                  ))}
                  {magic.placeholder}
                </Area>
              )}
            </Droppable>
          </Wrapper>
        )}
      </Draggable>
    </>
  );
}

export default Board;
