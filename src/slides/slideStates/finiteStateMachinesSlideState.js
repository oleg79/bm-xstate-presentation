export const finiteStateMachinesSlideState = {
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
              PREV: '#finite-state-machines.intro',
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
              NEXT: '#problems-of-fsm'
            },
          }
        }
      }
    }
  }
}
