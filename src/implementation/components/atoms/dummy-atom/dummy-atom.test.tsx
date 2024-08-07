import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { DummyAtom } from './dummy-atom';

describe('components:atoms:dummy-atom', () => {
  it('renders a heading', () => {
    render(<DummyAtom />);

    const heading = screen.getByText('Dummy Atom Content');

    expect(heading).toBeInTheDocument();
  });
});
