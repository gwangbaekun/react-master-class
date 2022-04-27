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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  hover: {
    scale: 2,
    rotateZ: 90,
  },
  onclick: {
    scale: 1.5,
    borderRadius: "100px",
  },
};

function App() {
  return (
    <Wrapper>
      <Box
        variants={boxVariants}
        whileHover={boxVariants.hover}
        whileTap={boxVariants.onclick}
      />
    </Wrapper>
  );
}

export default App;
