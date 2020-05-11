export const problemsOfFSMSlideState = {
  problemsOfFSM: {
    id: 'problems-of-fsm',
    initial: 'intro',
    states: {
      intro: {
        on: {
          PREV: '#finite-state-machines',
          NEXT: 'content'
        },
      },
      content: {
        initial: 'stateExlposionProblem',
        states: {
          stateExlposionProblem: {
            on: {
              PREV: '#problems-of-fsm.intro',
              NEXT: 'sideEffectsProblem'
            },
          },
          sideEffectsProblem: {
            on: {
              PREV: 'stateExlposionProblem',
              NEXT: '#statecharts'
            },
          }
        }
      }
    },
  }
}
