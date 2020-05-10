import React from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components';

const StyledMotionDiv = styled(motion.div)`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SlideContainer = ({children, name}) => (
  <AnimatePresence>
    <StyledMotionDiv
      key={name}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </StyledMotionDiv>
  </AnimatePresence>
)