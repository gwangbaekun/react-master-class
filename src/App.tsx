import styled from "styled-components";
import { motion } from "framer-motion";

export const Wrapper = styled.div`
  display: flex;
  max-width: 780px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const myVars = {
  start: {
    scale: 0,
  },
  end: {
    scale: 1,
    rotateZ: 360,
    transition: { type: "spring", duration: 0.8 },
  },
};

function App() {
  return (
    <Wrapper>
      <Box variants={myVars} initial="start" animate="end" />
    </Wrapper>
  );
}

export default App;
