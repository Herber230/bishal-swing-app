import type { ErrorLabelProps } from './error-label.types';

import type { JSX } from "react";

export function ErrorLabel({
  error,
  className,
}: ErrorLabelProps): JSX.Element | null {
  if (!error) {
    return null;
  }

  const errorsToRender = Array.isArray(error) ? error : [error];

  return (
    <ul className={`text-red-500 text-xs list-disc ml-5 ${className}`}>
      {errorsToRender.map((error, index) => (
        <li key={`error-item-${index}`}>{error}</li>
      ))}
    </ul>
  );
}
