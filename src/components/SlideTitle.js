import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion'

export const SlideTitle = styled.h1`
  font-size: 70px;
  height: fit-content;
`;

const titleVariants = {
  asTitle: {
    top: '50%',
    left: '50%',
    transform: 'translateY(-50%) translateX(-50%)',
    fontSize: '70px',
    opacity: 1
  },
  asHeader: {
    top: '10px',
    left: '20px',
    transform: 'translateY(0%) translateX(0%)',
    fontSize: '20px',
    opacity: 1
  }
};

const AnimatedTitleBase = styled(motion.h1)`
  position: absolute;
  opacity: 0;
`;

export const AnimatedTitle = ({children, asTitle}) => (
  <AnimatedTitleBase
    animate={asTitle ? 'asTitle' : 'asHeader'}
    initial='asTitle'
    variants={titleVariants}
    transition={{ duration: 0.5 }}
  >
    {children}
  </AnimatedTitleBase>
);


