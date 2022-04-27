import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const TrashCan = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  bottom: 0px;
  right: 0px;
  background-color: white;
  overflow: hidden;
`;

function Trash() {
  return (
    <Droppable droppableId="trash">
      {(provided, info) => (
        <TrashCan ref={provided.innerRef}>{provided.placeholder}</TrashCan>
      )}
    </Droppable>
  );
}

export default Trash;
