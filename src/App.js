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
      initial: 'intro',
      states: {
        intro: {
          on: {
            PREV: '#presentation.intro',
            NEXT: 'content'
          }
        },
        content: {
          initial: 'interaction',
          states: {
            interaction: {
              on: {
                PREV: '#presentation.intro',
                NEXT: 'terms'
              },
            },
            terms: {
              on: {
                PREV: 'interaction',
                NEXT: 'configurationSample'
              },
            },
            configurationSample: {
              on: {
                PREV: 'terms',
                // NEXT: 'terms'
              },
            }
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
