import React from 'react';
import { 
    render, 
    screen 
} from '@testing-library/react';
import { 
    usePromiseTracker, 
} from 'react-promise-tracker';
import { 
    SpinnerComponent, 
} from './spinner.component';

// Sustituimos la librería react-promise-tracker por una versión falsa
vi.mock('react-promise-tracker', () => ({
  usePromiseTracker: vi.fn(),
}));

describe('common/components/spinner/SpinnerComponent', () => {

  it('debería mostrar el spinner cuando hay una promesa en curso', () => {

    // ARRANGE: le decimos al hook falso que devuelva que hay una promesa en curso
    vi.mocked(usePromiseTracker).mockReturnValue({ promiseInProgress: true });

    // ACT: dibujamos el spinner sin props
    render(<SpinnerComponent />);

    // ASSERT
    expect(screen.getByRole('presentation')).toBeTruthy();
  });

  it('no debería mostrar el spinner cuando no hay ninguna promesa en curso', () => {

    // ARRANGE: le decimos al hook falso que devuelva que no hay una promesa en curso
    vi.mocked(usePromiseTracker).mockReturnValue({ promiseInProgress: false });

    // ACT: dibujamos el spinner sin props
    render(<SpinnerComponent />);

    // ASSERT
    expect(screen.queryByRole('presentation')).toBeNull();
  });
});