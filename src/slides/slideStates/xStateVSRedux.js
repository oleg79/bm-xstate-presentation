export const xStateVSRedux = {
  xStateVSRedux: {
    id: 'xstate-vs-redux',
    initial: 'intro',
    states: {
      intro: {
        on: {
          PREV: '#statecharts',
          NEXT: 'content'
        },
      },
      content: {
        initial: 'mindset',
        states: {
          mindset: {
            on: {
              PREV: '#statecharts.intro',
              NEXT: 'sideEffects'
            },
          },
          sideEffects: {
            on: {
              PREV: 'mindset',
              // NEXT: '#statecharts'
            },
          }
        }
      }
    },
  }
}