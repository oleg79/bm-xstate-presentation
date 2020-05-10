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
    box-sizing: border-box;
  }

  body {
    background-color: ${blueGrey[800]};
    color: ${blueGrey[50]};
    font-family: 'Roboto', sans-serif;
    overflow: hidden;
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
      id: 'finite-state-machines',
      initial: 'title',
      states: {
        title: {
          on: {
            PREV: '#presentation.intro',
            NEXT: 'example'
          }
        },
        example: {
          on: {
            PREV: 'title',
            // NEXT: 'finiteStateMachines'
          }
        }
      }
    },
  }
});

const Presentation = () => {
  const [state, send] = useMachine(presentationMachine);

  const navigate = ({code}) => {
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
      {state.matches('intro') &&<Intro/>}

      {state.matches('finiteStateMachines') && <FiniteStateMachines state={state}/>}
    </>
  );
};

export default Presentation;
