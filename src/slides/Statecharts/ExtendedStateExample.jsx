import React from 'react';
import {Machine, assign} from 'xstate';
import {useMachine} from '@xstate/react';
import { motion, AnimatePresence } from 'framer-motion'
import styled, {css} from 'styled-components';
import {green, teal} from 'material-ui-colors';
import {
  trackerVariants,
  stateVariants,
  rightArrowVariants,
  leftArrowVariants,
  downArrowVariants,
  upArrowVariants
} from '../animationVariants'

const ExampleContainer = styled(motion.div)`
  width: 600px;
  height: ${p => p.height || '600px'};
  ${p => p.withBorder && css`
    border: 4px solid ${green[400]};
    border-radius: 20px;
  `}
  position: relative;
  ${p => p.customStyles}
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
        width: ${p => p.width || '180px'};
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

const Container = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`

const Input = styled.input`
  width: 100%;
  height: 50px;
  font-size: 30px;
`;

const extendedStateMachine = Machine({
  id: 'extended-state-machine',
  initial: 'A',
  context: {
    inputValue: ''
  },
  states: {
    A: {
      on: {
        A_TO_B: 'B'
      }
    },
    B: {
      entry: ['toBTrackerAnimation', 'focusInput'],
      on: {
        B_TO_C: 'C',
        HANDLE_INPUT: {
          actions: assign({
            inputValue: (_, {data}) => data
          })
        }
      }
    },
    C: {
      entry: ['toCTrackerAnimation'],
      on: {
        C_TO_B: 'B',
        C_TO_D: 'D'
      }
    },
    D: {
      entry: ['toDTrackerAnimation'],
      type: 'final'
    }
  }
});

export const ExtendedStateExample = () => {
  const [animateState, setAnimateState] = React.useState('topLeft');
  const inputRef = React.useRef(null);

  const toBTrackerAnimation = () => setAnimateState('topRight');
  const toCTrackerAnimation = () => setAnimateState('bottomRight');
  const toDTrackerAnimation = () => setAnimateState('bottomLeft');

  const focusInput = () => {
    if (inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 0);
    }
  };

  const [state, send] = useMachine(extendedStateMachine, {
    actions: {
      toBTrackerAnimation,
      toCTrackerAnimation,
      toDTrackerAnimation,
      focusInput
    }
  });

  const {inputValue} = state.context;

  const handleChange = e => {
    send({type: 'HANDLE_INPUT', data: e.target.value})
  }

  return (
    <AnimatePresence>
      <Container
        initial={{ transform: 'translateX(-50%)', opacity: 0 }}
        animate={{transform: 'translateX(0%)', opacity: 1}}
        exit={{ transform: 'translateX(-50%)', opacity: 0 }}
      >
        <ExampleContainer withBorder>

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

        <ExampleContainer
          initial='inactive'
          variants={{active: {opacity: 1}, inactive: {opacity: 0.2}}}
          animate={state.matches('B') ? 'active' : 'inactive'}
        >

          <Input disabled={!state.matches('B')} ref={inputRef} value={inputValue} onChange={handleChange}/>

        </ExampleContainer>
      </Container>
    </AnimatePresence>
  );
};
