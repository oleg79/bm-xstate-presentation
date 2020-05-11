import React from 'react';
import {Machine} from 'xstate';
import {useMachine} from '@xstate/react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import styled, {css} from 'styled-components';
import {green, teal} from 'material-ui-colors';
import {SlideContainer} from '../components/SlideContainer';
import {AnimatedTitle} from '../components/SlideTitle';

export const StateCharts = ({state}) => {
  return (
    <SlideContainer name='state-charts'>
      <AnimatedTitle asTitle={state.matches('stateCharts.intro')}>
        Statecharts
      </AnimatedTitle>
    </SlideContainer>
  );  
};
