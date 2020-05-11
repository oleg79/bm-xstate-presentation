import React from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components';
import {Emoji} from '../components/Emoji';
import {SlideContainer} from '../components/SlideContainer';
import {AnimatedTitle} from '../components/SlideTitle';

const BigText = styled(motion.div)`
  width: 70%;
  font-size: 50px;
  margin: 0 auto;
`

const TextContainer = ({children}) => (
  <AnimatePresence>
    <BigText
      initial={{ opacity: 0, transform: 'translateY(-30%)' }}
      animate={{ opacity: 1, transform: 'translateY(0%)' }}
    >
      <p>{children}</p>
    </BigText>
  </AnimatePresence>
)

const ContentContainer = styled.div`
  width: 100%;
  height: 100vh;
  padding: 70px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`

export const ProblemsOfFSM = ({state}) => {
  return (
    <SlideContainer name='state-charts'>
      <AnimatedTitle asTitle={state.matches('problemsOfFSM.intro')}>
        Problems Of FSM
      </AnimatedTitle>
      <ContentContainer>
        {state.matches('problemsOfFSM.content') &&
        <TextContainer>- State Explosion <Emoji>💥</Emoji></TextContainer>}

        {state.matches('problemsOfFSM.content.sideEffectsProblem') &&
        <TextContainer>- What should we do with side effects? <Emoji>🤔</Emoji></TextContainer>}
      </ContentContainer>
    </SlideContainer>
  );  
};
