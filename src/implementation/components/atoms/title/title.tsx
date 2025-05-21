import type { TitleProps } from './title.types';

export function Title({ children, variation }: TitleProps): React.JSX.Element {
  if (variation)
    return (
      <p className="font-primary text-lg leading-none font-bold text-center">
        {children}
      </p>
    );

  return (
    <p className="font-primary text-2xl leading-none font-bold text-center">
      {children}
    </p>
  );
}
