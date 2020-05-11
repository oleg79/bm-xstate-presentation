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
    on: {
      B_TO_C: 'C'
    },
    initial: 'B1',
    states: {
      B1: {
        on: {
          B1_TO_B2: 'B2',
          B1_TO_B4: 'B4'
        }
      },
      B2: {
        on: {
          B2_TO_B1: 'B1',
          B2_TO_B3: 'B3'
        }
      },
      B3: {
        on: {
          B3_TO_B2: 'B2',
          B3_TO_B4: 'B4'
        }
      },
      B4: {
        on: {
          B4_TO_B3: 'B3',
          B4_TO_B1:'B1',
          B4_TO_C: '#hierarchical-machine.C'
        }
      }
    }
  }
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
