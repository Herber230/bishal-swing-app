export interface CarouselItemProps {
  src: string;
  alt: string;
}

export interface CarouselProps {
  items: Array<CarouselItemProps>;
  changeTime?: number;
  height?: number;
  width?: number;
  className?: string;
}
