import React from 'react';
import {Machine} from 'xstate';
import {useMachine} from '@xstate/react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import styled, {css} from 'styled-components';
import {green, teal} from 'material-ui-colors';
import { CopyBlock, dracula } from 'react-code-blocks';
import {SlideContainer} from '../components/SlideContainer';
import {AnimatedTitle} from '../components/SlideTitle';
import {
  trackerVariants,
  stateVariants,
  rightArrowVariants,
  leftArrowVariants,
  downArrowVariants,
  upArrowVariants
} from './animationVariants'

const ExampleContainer = styled(motion.div)`
  width: 600px;
  height: 600px;
  border: 4px solid ${green[400]};
  border-radius: 20px;
  align-self: flex-start;
  margin-left: 20px;
  position: relative;
`

const StateCircle = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  border: 4px solid ${green[400]};
  border-radius: 50%;
  position: absolute;

  ${p => (position => {
    switch (position) {
      case 'topLeft': return css`
        top: 25px;
        left: 25px
      `;
      case 'topRight': return css`
        top: 25px;
        right: 25px
      `;
      case 'bottomLeft': return css`
        bottom: 25px;
        left: 25px
      `;
      case 'bottomRight': return css`
        bottom: 25px;
        right: 25px
      `;
      default: return '';
    }
  })(p.position)}
`

const StateLabel = styled.div`
  font-size: 60px;
  position: relative;

  ${p => p.initial && css`
    &:after {
      position: absolute;
      content: '0';
      font-style: italic;
      font-size: 30px;
      bottom: -5px;
      right: -20px;
    }
  `}

  ${p => p.final && css`
    &:after {
      position: absolute;
      content: 'f';
      font-style: italic;
      font-size: 30px;
      bottom: -5px;
      right: -10px;
    }
  `}
`;

const ArrowBase = styled(motion.button)`
    border: solid ${teal[500]};
    border-width: 0 8px 8px 0;
    display: inline-block;
    padding: 8px;
    cursor: pointer;
    outline: none;
    background: transparent;
`;

const ArrowsContainer = styled.div`
  background-color: ${teal[500]};
  position: absolute;
  display: flex;
  justify-content: ${p => p.justifyContent || 'space-between'};
  align-items: center;

  ${p => (position => {
    switch (position) {
      case 'top': return css`
        top: 96px;
        height: 8px;
        width: 180px;
        left: 50%;
        transform: translateX(-50%);
      `;
      case 'bottom': return css`
        bottom: 96px;
        height: 8px;
        width: 180px;
        left: 50%;
        transform: translateX(-50%);
      `;
      case 'left': return css`
        left: 96px;
        height: 180px;
        width: 8px;
        top: 50%;
        transform: translateY(-50%);
        flex-direction: column;
      `;
      case 'right': return css`
        right: 96px;
        height: 180px;
        width: 8px;
        top: 50%;
        transform: translateY(-50%);
        flex-direction: column;
      `;
      default: return '';
    }
  })(p.position)}
`

const Arrow = ({onTap, variants}) => (
  <ArrowBase
    initial='idle'
    variants={variants}
    whileTap='tapped'
    onTap={onTap}
  />
);

const Tracker = styled(motion.div)`
  width: 150px;
  height: 150px;
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  opacity: 0.2;
`

const interactionMachine = Machine({
  id: 'interaction-machine',
  initial: 'A',
  states: {
    A: {
      on: {
        A_TO_B: {
          target: 'B',
          actions: ['toBTrackerAnimation']
        },
      }
    },
    B: {
      on: {
        B_TO_C: {
          target: 'C',
          actions: ['toCTrackerAnimation']
        }
      }
    },
    C: {
      on: {
        C_TO_B: {
          target: 'B',
          actions: ['toBTrackerAnimation']
        },
        C_TO_D: {
          target: 'D',
          actions: ['toDTrackerAnimation']
        }
      }
    },
    D: {
      type: 'final'
    }
  }
});

const Example = () => {
  const animationControls = useAnimation();
  const [animateState, setAnimateState] = React.useState('topLeft');

  const toBTrackerAnimation = () => setAnimateState('topRight');
  const toCTrackerAnimation = () => setAnimateState('bottomRight');
  const toDTrackerAnimation = () => setAnimateState('bottomLeft');

  const [state, send] = useMachine(interactionMachine, {
    actions: {toBTrackerAnimation, toCTrackerAnimation, toDTrackerAnimation}
  });

  animationControls.start({
    transform: 'translateX(0%)',
    opacity: 1,
    transition: {delay: 0.5}
  });

  return (
    <AnimatePresence>
      <ExampleContainer
        initial={{ transform: 'translateX(-50%)', opacity: 0 }}
        animate={animationControls}
        exit={{ transform: 'translateX(-50%)', opacity: 0 }}
      >

        <Tracker
          initial='topLeft'
          animate={animateState}
          variants={trackerVariants}
        />

        <StateCircle
          position='topLeft'
          initial='active'
          animate={state.matches('A') ? 'active' : 'inactive'}
          variants={stateVariants}
        >
          <StateLabel initial>A</StateLabel>
        </StateCircle>

        <ArrowsContainer position='top' justifyContent='flex-end'>
          <Arrow variants={rightArrowVariants} onTap={() => send('A_TO_B')}/>
        </ArrowsContainer>

        <StateCircle
          position='topRight'
          initial='inactive'
          animate={state.matches('B') ? 'active' : 'inactive'}
          variants={stateVariants}
        >
          <StateLabel>B</StateLabel>
        </StateCircle>

        <ArrowsContainer position='right'>
          <Arrow variants={upArrowVariants} onTap={() => send('C_TO_B')}/>
          <Arrow variants={downArrowVariants} onTap={() => send('B_TO_C')}/>
        </ArrowsContainer>

        <StateCircle
          position='bottomRight'
          initial='inactive'
          animate={state.matches('C') ? 'active' : 'inactive'}
          variants={stateVariants}
        >
          <StateLabel>C</StateLabel>
        </StateCircle>

        <ArrowsContainer position='bottom'>
          <Arrow variants={leftArrowVariants} onTap={() => send('C_TO_D')}/>
        </ArrowsContainer>

        <StateCircle
          position='bottomLeft'
          initial='inactive'
          animate={state.matches('D') ? 'active' : 'inactive'}
          variants={stateVariants}
        >
          <StateLabel final>D</StateLabel>
        </StateCircle>
      </ExampleContainer>
    </AnimatePresence>
  );
};

const TermsContainer = styled(motion.div)`
  width: 600px;
  height: 600px;
  align-self: center;
  position: relative;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const CodeContainer = styled(TermsContainer)`
  width: 800px;
  height: 100vh;
  position: fixed;
  right: 0;
  overflow: auto;
`;

const TermText = styled(motion.div)`
  font-size: 30px;
  span {
    font-style: italic;
  }
`

const Terms = () => (
  <AnimatePresence>
    <TermsContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <TermText><span>Q</span> - set of all states</TermText>  
      <TermText><span>∑</span> - inputs</TermText>
      <TermText><span>q0</span> - initial state</TermText>
      <TermText><span>F</span> - set of final states</TermText>
      <TermText><span>δ</span> - transition function <span>Q*∑ -> Q</span></TermText>
    </TermsContainer>
  </AnimatePresence>
);

const Code = () => (
  <AnimatePresence>
    <CodeContainer
      initial={{ opacity: 0, right: '-800px' }}
      animate={{ opacity: 1, right: '0px' }}
      exit={{ opacity: 0, right: '0px' }}
    >
      <CopyBlock
        text={`
{
  id: 'interaction-machine',
  initial: 'A',
  states: {
    A: {
      on: {
        A_TO_B: 'B'
      }
    },
    B: {
      on: {
        B_TO_C: 'C'
      }
    },
    C: {
      on: {
        C_TO_B: 'B',
        C_TO_D: 'D'
      }
    },
    D: {
      type: 'final'
    }
  }

`}
        language='javascript'
        theme={dracula}
        codeBlock
      /> 
    </CodeContainer>
  </AnimatePresence>
);

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 0 50px;
  justify-content: space-between;
`

export const FiniteStateMachines = ({state}) => {
  return (
    <SlideContainer name='finite-state-machines'>
      <AnimatedTitle asTitle={state.matches('finiteStateMachines.intro')}>
        Finite State Machines
      </AnimatedTitle>
      <ContentContainer>
        {state.matches('finiteStateMachines.content') && <Example/>}
        {state.matches('finiteStateMachines.content.terms') && <Terms/>}
        {state.matches('finiteStateMachines.content.configurationSample') && <Code state={state}/>}
      </ContentContainer>
    </SlideContainer>
  );  
};
