import React from 'react';
import {Emoji} from '../components/Emoji';
import {SlideContainer} from '../components/SlideContainer';
import {SlideTitle} from '../components/SlideTitle';

export const Intro = () => {
  return (
    <SlideContainer>
      <SlideTitle>
        <Emoji>✨</Emoji>
        The beautiful world of XState
        <Emoji>✨</Emoji>
      </SlideTitle>  
    </SlideContainer>
  );  
};