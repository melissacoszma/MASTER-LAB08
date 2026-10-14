import React from 'react';
import { 
    render, 
    screen,
    fireEvent,
 } from '@testing-library/react';
import { 
    ConfirmationDialogComponent, 
} from './confirmation-dialog.component';


describe('common/components/confirmation-dialog/ConfirmationDialogComponent', () => {

  it('no debería mostrar nada cuando isOpen es false', () => {

  // ARRANGE: las props que necesita el componente
  const props = {
    isOpen: false,
    onAccept: vi.fn(), // vi.fn() crea funciones espía 
    onClose: vi.fn(),
    title: 'Eliminar proyecto',
    labels: { 
        closeButton: 'Cancelar', 
        acceptButton: 'Aceptar' 
    },
  };

  // ACT: dibujamos el componente
  render(
    <ConfirmationDialogComponent {...props}>
      <p>¿Seguro que quieres eliminarlo?</p>
    </ConfirmationDialogComponent>
  );

  // ASSERT: comprueba con queryByText y toBeNull que el título Eliminar proyecto y el botón Cancelar no aparece en pantalla
  expect(screen.queryByText('Eliminar proyecto')).toBeNull();
  expect(screen.queryByText('Cancelar')).toBeNull();
});

  it('debería mostrar el título, el contenido y los botones cuando isOpen es true', () => {

    // ARRANGE: las props que necesita el componente
    const props = {
      isOpen: true,
      onAccept: vi.fn(), 
      onClose: vi.fn(),
      title: 'Eliminar proyecto',
      labels: { 
        closeButton: 'Cancelar', 
        acceptButton: 'Aceptar', 
      },
    };

    // ACT: dibujamos el componente
    render(
      <ConfirmationDialogComponent {...props}>
        <p>¿Seguro que quieres eliminarlo?</p>
      </ConfirmationDialogComponent>
    );

    // ASSERT: getByText busca el texto en pantalla y falla si no lo encuentra toBeTruthy() confirma que se encontró algo
    expect(screen.getByText('Eliminar proyecto')).toBeTruthy();
    expect(screen.getByText('¿Seguro que quieres eliminarlo?')).toBeTruthy();
    expect(screen.getByText('Cancelar')).toBeTruthy();
    expect(screen.getByText('Aceptar')).toBeTruthy();
  });

  it('debería llamar a onClose y no a onAccept cuando se pulsa el botón de cerrar', () => {

    // ARRANGE: las mismas props de antes, con funciones espía
    const props = {
        isOpen: true,
        onAccept: vi.fn(),
        onClose: vi.fn(),
        title: 'Eliminar proyecto',
        labels: { 
            closeButton: 'Cancelar', 
            acceptButton: 'Aceptar' 
        },
    };
    render(
    <ConfirmationDialogComponent {...props}>
      <p>¿Seguro que quieres eliminarlo?</p>
    </ConfirmationDialogComponent>
    );

    // ACT: pulsa el botón de cerrar 
    fireEvent.click(screen.getByText(props.labels.closeButton));

     // ASSERT: comprueba que props.onClose se llamó 1 vez y props.onAccept no se llamó
    expect(props.onClose).toHaveBeenCalledTimes(1);
    expect(props.onAccept).not.toHaveBeenCalled();
  });

  it('debería llamar a onAccept y a onClose cuando se pulsa el botón de aceptar', () => {

    // ARRANGE: las mismas props de antes, con funciones espía
    const props = {
        isOpen: true,
        onAccept: vi.fn(),
        onClose: vi.fn(),
        title: 'Eliminar proyecto',
        labels: { 
            closeButton: 'Cancelar', 
            acceptButton: 'Aceptar' 
        },
    };
    render(
    <ConfirmationDialogComponent {...props}>
      <p>¿Seguro que quieres eliminarlo?</p>
    </ConfirmationDialogComponent>
    );

    // ACT: pulsa el botón de cerrar 
    fireEvent.click(screen.getByText(props.labels.acceptButton));

    // ASSERT: comprueba que se llamó 1 vez a ambos
    expect(props.onClose).toHaveBeenCalledTimes(1);
    expect(props.onAccept).toHaveBeenCalledTimes(1);
  });

});