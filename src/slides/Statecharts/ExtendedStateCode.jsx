import React from 'react';
import styled, {css} from 'styled-components';
import { CopyBlock, dracula } from 'react-code-blocks';
import { motion } from 'framer-motion';

const StyledCopyBlock = styled.div`
  width: 100%;
  & > div {
    height: 100vh;
  }
`

const mainState = `{
  id: 'extended-state-machine',
  initial: 'A',
  context: {
    inputValue: ''
  },
  states: {
    A: {
      on: {
        A_TO_B: 'B'
      }
    },
    B: {
      on: {
        B_TO_C: 'C',
        HANDLE_INPUT: {
          actions: assign({
            inputValue: (_, {data}) => data
          })
        }
      }
    },
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

const HierarchicalCodeContainer = styled(motion.div)`
  display: flex;
  width: 1000px;
  justify-content: space-between;
`;

export const ExtendedStateCode = () => (
  <HierarchicalCodeContainer>
    <StyledCopyBlock>
      <CopyBlock
        text={mainState}
        language='javascript'
        theme={dracula}
        codeBlock
      />
    </StyledCopyBlock>
  </HierarchicalCodeContainer>
);
