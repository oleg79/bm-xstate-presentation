import React from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components';
import {Emoji} from '../../components/Emoji';
import {SlideContainer} from '../../components/SlideContainer';
import {AnimatedTitle} from '../../components/SlideTitle';
import {HierarchicalExample} from './HierarchicalExample';
import {HierarchicalCode} from './HierarchicalCode';
import {ParallelExample} from './ParallelExample';
import {ParallelCode} from './ParallelCode';

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

export const Statecharts = ({state}) => {
  return (
    <SlideContainer name='state-charts'>
      <AnimatedTitle asTitle={state.matches('statecharts.intro')}>
        Statecharts <Emoji>🤓</Emoji>
        {state.matches('statecharts.content.examples.hierarchical') && ' - hierarchical states'}
        {state.matches('statecharts.content.examples.parallel') && ' - parallel states'}
        {state.matches('statecharts.content.examples.extendedState') && ' - extended state'}
      </AnimatedTitle>

      {state.matches('statecharts.content.agenda') &&
        <ContentContainer>
          <TextContainer>- Hierarchical and Parallel states <Emoji>🤩</Emoji></TextContainer>
  
          {state.matches('statecharts.content.agenda.extendedState') &&
          <TextContainer>- Extended State a.k.a. Context <Emoji>😍</Emoji></TextContainer>}
        </ContentContainer>
      }

      {state.matches('statecharts.content.examples.hierarchical.interaction') && <HierarchicalExample/>}
      {state.matches('statecharts.content.examples.hierarchical.code') && <HierarchicalCode/>}

      {state.matches('statecharts.content.examples.parallel.interaction') && <ParallelExample/>}
      {state.matches('statecharts.content.examples.parallel.code') && <ParallelCode/>}

    </SlideContainer>
  );  
};
