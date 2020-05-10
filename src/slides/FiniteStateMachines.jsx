import React from 'react';
import {Machine} from 'xstate';
import {useMachine} from '@xstate/react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import styled, {css} from 'styled-components';
import {green, teal} from 'material-ui-colors';
import {SlideContainer} from '../components/SlideContainer';

const Title = styled(motion.h1)`
  position: absolute;
  opacity: 0;
`;

const ExampleContainer = styled(motion.div)`
  width: 600px;
  height: 600px;
  border: 4px solid ${green[400]};
  border-radius: 20px;
  align-self: center;
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
      content: 'i';
      font-style: italic;
      font-size: 30px;
      bottom: -5px;
      right: -10px;
    }
  `}

  ${p => p.final && css`
    &:after {
      position: absolute;
      content: 'F';
      font-style: italic;
      font-size: 30px;
      bottom: -5px;
      right: -15px;
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

const stateVariants = {
  active: {
    opacity: 1
  },
  inactive: {
    opacity: 0.4
  }
};

const leftArrowVariants = {
  idle: {
    rotate: 135,
    scale: 1
  },
  tapped: {
    rotate: 135,
    scale: 1.5,
    borderColor: teal[700]
  }
};

const rightArrowVariants = {
  idle: {
    rotate: -45,
    scale: 1
  },
  tapped: {
    rotate: -45,
    scale: 1.5,
    borderColor: teal[700]
  }
};

const upArrowVariants = {
  idle: {
    rotate: -135,
    scale: 1
  },
  tapped: {
    rotate: -135,
    scale: 1.5,
    borderColor: teal[700]
  }
}

const downArrowVariants = {
  idle: {
    rotate: 45,
    scale: 1
  },
  tapped: {
    rotate: 45,
    scale: 1.5,
    borderColor: teal[700]
  }
}

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

const exampleMachine = Machine({
  id: 'example-machine',
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

const trackerVariants = {
  topLeft: {
    top: '25px',
    left: '25px'
  },
  topRight: {
    top: '25px',
    left: '417px'
  },
  bottomRight: {
    top: '417px',
    left: '417px'
  },
  bottomLeft: {
    top: '417px',
    left: '25px'
  }
};

const Example = () => {
  const animationControls = useAnimation();
  const [animateState, setAnimateState] = React.useState('topLeft');

  const toBTrackerAnimation = () => setAnimateState('topRight');
  const toCTrackerAnimation = () => setAnimateState('bottomRight');
  const toDTrackerAnimation = () => setAnimateState('bottomLeft');

  const [state, send] = useMachine(exampleMachine, {
    actions: {
      toBTrackerAnimation,
      toCTrackerAnimation,
      toDTrackerAnimation
    }
  });

  animationControls.start({
    transform: 'translateX(0%)',
    opacity: 1,
    transition: {
      delay: 0.5
    }
  })
  

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

export const FiniteStateMachines = ({state}) => {
  return (
    <SlideContainer name='finite-state-machines' handleContentCentering={false}>
      <Title
        animate={state.matches('finiteStateMachines.title') ? 'asTitle' : 'asHeader'}
        initial='asTitle'
        variants={titleVariants}
        transition={{ duration: 0.5 }}
      >
        Finite State Machines
      </Title>
      {state.matches('finiteStateMachines.example') && <Example/>}
    </SlideContainer>
  );  
};
