import React from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components';

const StyledMotionDiv = styled(motion.div)`
  width: 100%;
  height: 100vh;
  display: flex;
  ${p => p.handleContentCentering && 'align-items: center;'}
  ${p => p.handleContentCentering && 'justify-content: center;'}
  position: relative;
`;

export const SlideContainer = ({children, name, handleContentCentering = true}) => (
  <AnimatePresence>
    <StyledMotionDiv
      key={name}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      handleContentCentering={handleContentCentering}
    >
      {children}
    </StyledMotionDiv>
  </AnimatePresence>
)