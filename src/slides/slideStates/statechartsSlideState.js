const agendaState = {
  agenda: {
    id: 'statecharts-content-agenda',
    initial: 'stateTypes',
    states: {
      stateTypes: {
        on: {
          PREV: '#statecharts.intro',
          NEXT: 'extendedState'
        }
      },
      extendedState: {
        on: {
          PREV: 'stateTypes',
          NEXT: '#statecharts-content-examples'
        }
      },
    }
  },
};


const examplesState = {
  examples: {
    id: 'statecharts-content-examples',
    initial: 'hierarchical',
    states: {
      hierarchical: {
        id: 'statecharts-content-examples-hierarchical',
        initial: 'interaction',
        states: {
          interaction: {
            on: {
              PREV: '#statecharts-content-agenda.extendedState',
              NEXT: 'code'
            }
          },
          code: {
            on: {
              PREV: 'interaction',
              NEXT: '#statecharts-content-examples-parallel'
            }
          }
        },
      },

      parallel: {
        id: 'statecharts-content-examples-parallel',
        initial: 'interaction',
        states: {
          interaction: {
            on: {
              PREV: '#statecharts-content-examples-hierarchical',
              NEXT: 'code'
            }
          },
          code: {
            on: {
              PREV: 'interaction',
              NEXT: '#statecharts-content-examples-extendedState'
            }
          }
        },
      },

      extendedState: {
        id: 'statecharts-content-examples-extendedState',
        initial: 'interaction',
        states: {
          interaction: {
            on: {
              PREV: '#statecharts-content-examples-parallel',
              NEXT: 'code'
            }
          },
          code: {
            on: {
              PREV: 'interaction',
              NEXT: '#xstate-vs-redux'
            }
          }
        }
      }
    },
  }
}


export const statechartsSlideState = {
  statecharts: {
    id: 'statecharts',
    initial: 'intro',
    states: {
      intro: {
        on: {
          PREV: '#problems-of-fsm',
          NEXT: 'content'
        }
      },

      content: {
        initial: 'agenda',
        states: {
          ...agendaState,
          ...examplesState
        }
      },
    }
  }
}
