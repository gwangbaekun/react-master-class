import { memo } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface IDraggableCard {
  toDoId: number;
  toDoText: string;
  index: number;
}

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
  background-color: ${(props) =>
    props.isDragging ? "#e4f2ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
`;

function DraggableCard({ toDoId, toDoText, index }: IDraggableCard) {
  console.log("rerender");
  return (
    <>
      <Draggable draggableId={`${toDoId}`} index={index}>
        {(magic, info) => (
          <Card
            isDragging={info.isDragging}
            ref={magic.innerRef}
            {...magic.dragHandleProps}
            {...magic.draggableProps}
          >
            {toDoText}
          </Card>
        )}
      </Draggable>
    </>
  );
}

export default memo(DraggableCard);
