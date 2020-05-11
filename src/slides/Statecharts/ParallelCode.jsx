import React from 'react';
import styled, {css} from 'styled-components';
import { CopyBlock, dracula } from 'react-code-blocks';
import { motion } from 'framer-motion';

const StyledCopyBlock = styled.div`
  width: 480px;
  & > div {
    height: 100vh;
  }
`

const mainState = `{
  id: 'hierarchical-machine',
  initial: 'A',
  states: {
    A: {
      on: {
        A_TO_B: 'B',
      }
    },
    ...bState,
    C: {
      on: {
        C_TO_B: 'B',
        C_TO_D: 'D'
      }
    },
    D: {
      type: 'final'
    }
  }
}`

const bState = `{
  B: {
    type: 'parallel',
    on: {
      B_TO_C: 'C'
    },
    states: {
      size: {
        initial: 'normal',
        states: {
          normal: {},
          small: {},
          big: {}
        },
        on: {
          SMALL:  '.small',
          NORMAL: '.normal',
          BIG:    '.big'
        }
      },
      background: {
        initial: 'transparent',
        states: {
          transparent: {},
          cyan: {},
          lightBlue: {},
          teal: {}
        },
        on: {
          TRANSPARENT:  '.transparent',
          CYAN:         '.cyan',
          LIGHT_BLUE:   '.lightBlue',
          TEAL:         '.teal'
        }
      }
    }
  },
}`

const ParallelCodeContainer = styled(motion.div)`
  display: flex;
  width: 1000px;
  justify-content: space-between;
`;

export const ParallelCode = () => (
  <ParallelCodeContainer>
    <StyledCopyBlock>
      <CopyBlock
        text={mainState}
        language='javascript'
        theme={dracula}
        codeBlock
      />
    </StyledCopyBlock>

    <StyledCopyBlock>
      <CopyBlock
        text={bState}
        language='javascript'
        theme={dracula}
        codeBlock
      />
    </StyledCopyBlock>
  </ParallelCodeContainer>
);
