import React from 'react';
import {Machine} from 'xstate';
import {useMachine} from '@xstate/react';
import {createGlobalStyle} from 'styled-components';
import {blueGrey} from 'material-ui-colors';


import {Intro} from './slides/Intro';
import {FiniteStateMachines} from './slides/FiniteStateMachines';

const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
  }

  body {
    background-color: ${blueGrey[800]};
    color: ${blueGrey[50]};
    font-family: 'Roboto', sans-serif;
  }
`;

const presentationMachine = Machine({
  id: 'presentation',
  initial: 'intro',
  states: {
    intro: {
      on: {
        NEXT: 'finiteStateMachines'
      }
    },
    finiteStateMachines: {
      on: {
        PREV: 'intro'
      }
    },
  }
});

const Presentation = () => {
  const [state, send] = useMachine(presentationMachine);

  const navigate = ({code}) => {
    console.log(code);
    switch(code) {
      case 'ArrowLeft': send('PREV');
      break;
      case 'ArrowRight': send('NEXT');
      break;
      default: return;
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', navigate);

    return () => document.removeEventListener('keydown', navigate);
  }, []);

  return (
    <>
      <GlobalStyles/>
      {state.matches('intro') && <Intro name='intro'/>}
      {state.matches('finiteStateMachines') && <FiniteStateMachines name='finite-state-machines'/>}
    </>
  );
};

export default Presentation;
