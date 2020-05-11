import React from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components';
import {red} from 'material-ui-colors';
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

const ContentContainer = styled(motion.div)`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const Text = styled.div`
  width: 100%;
  text-align: center;
  font-size: 40px;
`

const MapArrow = styled.div`
  width: 40%;
  height: 8px;
  background-color: ${red[700]};
  align-self: center;
  position: relative;
  &:after {
    position: absolute;
    right: 0;
    top: -8px;
    border: solid ${red[700]};
    border-width: 0 8px 8px 0;
    transform: rotate(-45deg);
    padding: 8px;
    content: '';
  }
`;

const TermMap = styled(({left, right, className}) => (
  <div className={className}>
    <Text>{left}</Text>
    <MapArrow/>
    <Text>{right}</Text>
  </div>
))`
  display: flex;
  justify-content: space-between;
  margin: 60px 0;
`

export const XStateVSRedux = ({state}) => {
  return (
    <SlideContainer name='state-charts'>
      <AnimatedTitle asTitle={state.matches('xStateVSRedux.intro')}>
        Redux <Emoji>🆚</Emoji > XState
        {state.matches('xStateVSRedux.content.sideEffects') && ' - Side Effects'}
      </AnimatedTitle>

      {state.matches('xStateVSRedux.content.mindset') &&
        <AnimatePresence>
          <ContentContainer
            initial={{opacity: 0}}
            animate={{opacity: 1}}
          >
            <TermMap left='State/Store' right='Context/Extended State'/>
            <TermMap left='Actions' right='Events'/> 
            <TermMap left='Reducers' right='Transitions/ Transitions + Effects'/> 
          </ContentContainer>
        </AnimatePresence> 
      }

      {state.matches('xStateVSRedux.content.sideEffects') &&
        <AnimatePresence>
          <ContentContainer
            initial={{opacity: 0}}
            animate={{opacity: 1}}
          >
            <TermMap
              left={<>redux-thunk? <Emoji>🤨</Emoji></>}
              right={<>Effects - Actions or Activities <Emoji>🥰</Emoji></>}
            />
            <TermMap
              left={<>redux-observable?? <Emoji>🙃</Emoji></>}
              right={<>Effects - Actions or Activities <Emoji>😍</Emoji></>}
            />
            <TermMap
              left={<>redux-saga??? <Emoji>🤯</Emoji></>}
              right={<>Effects - Actions or Activities <Emoji>🥳</Emoji></>}
            />
          </ContentContainer>
        </AnimatePresence> 
      }

    </SlideContainer>
  );  
};
