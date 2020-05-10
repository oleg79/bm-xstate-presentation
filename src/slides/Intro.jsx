import React from 'react';
import {Emoji} from '../components/Emoji';
import {SlideContainer} from '../components/SlideContainer';
import {SlideTitle} from '../components/SlideTitle';

export const Intro = () => {
  return (
    <SlideContainer name='intro'>
      <SlideTitle>
        <Emoji>✨</Emoji>
        <Emoji>🦄</Emoji>
        The beautiful world of XState
        <Emoji>🦄</Emoji>
        <Emoji>✨</Emoji>
      </SlideTitle>  
    </SlideContainer>
  );  
};