'use client';

import './carousel.css';
import Image from 'next/image';
import { useEffect, useReducer } from 'react';
import type { CarouselProps } from './carousel.types';

// Match this with the CSS transition duration
const transitionDuration = 2000;

export function Carousel({
  height = 600,
  width = 380,
  changeTime = 5000,
  items,
  className,
}: CarouselProps): React.JSX.Element {
  const [state, moveStage] = useReducer(
    prevState => {
      if (prevState.stage === 'idle')
        return {
          ...prevState,
          stage: 'transition',
        };

      const newCurrentIndex = (prevState.currentIndex + 1) % items.length;
      const newNextIndex = (newCurrentIndex + 1) % items.length;
      return {
        ...prevState,
        currentIndex: newCurrentIndex,
        nextIndex: newNextIndex,
        stage: 'idle',
      };
    },
    {
      currentIndex: 0,
      nextIndex: 1,
      stage: 'idle',
    },
  );

  useEffect(() => {
    const timeoutId = setTimeout(
      moveStage,
      state.stage === 'transition' ? transitionDuration : changeTime,
    );
    return () => clearTimeout(timeoutId);
  }, [moveStage, state.stage, changeTime]);

  const currentItem = items[state.currentIndex];
  const nextItem = items[state.nextIndex];

  return (
    <div className={className}>
      <div
        className={`carousel ${state.stage === 'transition' ? 'transition' : ''}`}
        style={{ height, width }}
      >
        <Image
          className="rounded-[25px] current"
          height={height}
          width={width}
          src={currentItem.src}
          alt={currentItem.alt}
        />
        <Image
          className={'rounded-[25px] next'}
          height={height}
          width={width}
          src={nextItem.src}
          alt={nextItem.alt}
        />
      </div>
    </div>
  );
}
