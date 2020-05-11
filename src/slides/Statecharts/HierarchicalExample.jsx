import React from 'react';
import {Machine} from 'xstate';
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

const bState = {
  B: {
    on: {
      B_TO_C: {
        target: 'C',
        actions: ['toCTrackerAnimation']
      }
    },
    initial: 'B1',
    states: {
      B1: {
        on: {
          B1_TO_B2: {
            target: 'B2',
            actions: ['toB2TrackerAnimation']
          },
          B1_TO_B4: {
            target: 'B4',
            actions: ['toB4TrackerAnimation']
          },
        }
      },
      B2: {
        on: {
          B2_TO_B1: {
            target: 'B1',
            actions: ['toB1TrackerAnimation']
          },
          B2_TO_B3: {
            target: 'B3',
            actions: ['toB3TrackerAnimation']
          },
        }
      },
      B3: {
        on: {
          B3_TO_B2: {
            target: 'B2',
            actions: ['toB2TrackerAnimation']
          },
          B3_TO_B4: {
            target: 'B4',
            actions: ['toB4TrackerAnimation']
          },
        }
      },
      B4: {
        on: {
          B4_TO_B3: {
            target: 'B3',
            actions: ['toB3TrackerAnimation']
          },
          B4_TO_B1: {
            target: 'B1',
            actions: ['toB1TrackerAnimation']
          },
          B4_TO_C: {
            target: '#hierarchical-machine.C',
            actions: ['toB1TrackerAnimation', 'toCTrackerAnimation']
          }
        }
      }
    }
  },
}

const hierarchicalMachine = Machine({
  id: 'hierarchical-machine',
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
    ...bState,
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

export const HierarchicalExample = () => {
  const [animateState, setAnimateState] = React.useState('topLeft');
  const [animateBState, setAnimateBState] = React.useState('topLeft');

  const toBTrackerAnimation = () => setAnimateState('topRight');
  const toCTrackerAnimation = () => setAnimateState('bottomRight');
  const toDTrackerAnimation = () => setAnimateState('bottomLeft');

  const toB1TrackerAnimation = () => setAnimateBState('topLeft');
  const toB2TrackerAnimation = () => setAnimateBState('topRight');
  const toB3TrackerAnimation = () => setAnimateBState('bottomRight');
  const toB4TrackerAnimation = () => setAnimateBState('bottomLeft');

  const [state, send] = useMachine(hierarchicalMachine, {
    actions: {
      toBTrackerAnimation,
      toCTrackerAnimation,
      toDTrackerAnimation,
      toB1TrackerAnimation,
      toB2TrackerAnimation,
      toB3TrackerAnimation,
      toB4TrackerAnimation,
    }
  });

  return (
    <AnimatePresence>
      <Container
        initial={{ transform: 'translateX(-50%)', opacity: 0 }}
        animate={{transform: 'translateX(0%)', opacity: 1}}
        exit={{ transform: 'translateX(-50%)', opacity: 0 }}
      >
        <ExampleContainer>

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

        <ArrowsContainer position='bottom' width='130px'>
          <Arrow variants={leftArrowVariants} onTap={() => send('B4_TO_C')}/>
        </ArrowsContainer>

        <ExampleContainer
          initial='inactive'
          variants={{active: {opacity: 1}, inactive: {opacity: 0.2}}}
          animate={state.matches('B') ? 'active' : 'inactive'}
        >

          <Tracker
            initial='topLeft'
            animate={animateBState}
            variants={trackerVariants}
          />

          <StateCircle
            position='topLeft'
            initial='active'
            animate={state.matches('B.B1') ? 'active' : 'inactive'}
            variants={stateVariants}
          >
            <StateLabel initial>B1</StateLabel>
          </StateCircle>

          <ArrowsContainer position='top'>
            <Arrow variants={leftArrowVariants} onTap={() => send('B2_TO_B1')}/>
            <Arrow variants={rightArrowVariants} onTap={() => send('B1_TO_B2')}/>
          </ArrowsContainer>

          <StateCircle
            position='topRight'
            initial='inactive'
            animate={state.matches('B.B2') ? 'active' : 'inactive'}
            variants={stateVariants}
          >
            <StateLabel>B2</StateLabel>
          </StateCircle>

          <ArrowsContainer position='right'>
            <Arrow variants={upArrowVariants} onTap={() => send('B3_TO_B2')}/>
            <Arrow variants={downArrowVariants} onTap={() => send('B2_TO_B3')}/>
          </ArrowsContainer>

          <StateCircle
            position='bottomRight'
            initial='inactive'
            animate={state.matches('B.B3') ? 'active' : 'inactive'}
            variants={stateVariants}
          >
            <StateLabel>B3</StateLabel>
          </StateCircle>

          <ArrowsContainer position='bottom'>
            <Arrow variants={leftArrowVariants} onTap={() => send('B3_TO_B4')}/>
            <Arrow variants={rightArrowVariants} onTap={() => send('B4_TO_B3')}/>
          </ArrowsContainer>

          <StateCircle
            position='bottomLeft'
            initial='inactive'
            animate={state.matches('B.B4') ? 'active' : 'inactive'}
            variants={stateVariants}
          >
            <StateLabel>B4</StateLabel>
          </StateCircle>

          <ArrowsContainer position='left'>
            <Arrow variants={upArrowVariants} onTap={() => send('B4_TO_B1')}/>
            <Arrow variants={downArrowVariants} onTap={() => send('B1_TO_B4')}/>
          </ArrowsContainer>

        </ExampleContainer>
      </Container>
    </AnimatePresence>
  );
};
