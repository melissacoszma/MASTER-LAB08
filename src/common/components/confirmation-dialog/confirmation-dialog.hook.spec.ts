import { 
    renderHook, 
    act, 
} from '@testing-library/react';
import { 
    createEmptyLookup, 
} from '#common/models';
import { 
    useConfirmationDialog, 
} from './confirmation-dialog.hook';


describe('common/components/confirmation-dialog/useConfirmationDialog', () => {

  it('debería iniciar con el diálogo cerrado y sin elemento a borrar', () => {

    // ARRANGE: el hook no recibe parámetros!!!

    // ACT: renderHook ejecuta el hook dentro de un componente falso y result.current contiene lo que devuelve el hook
    const { result } = renderHook(() => useConfirmationDialog());

    // ASSERT: el estado inicial es el que esperamos toBe para un valor simple (true/false), toEqual para el objeto
    expect(result.current.isOpen).toBe(false);
    expect(result.current.itemToDelete).toEqual(createEmptyLookup());
  });

  it('debería abrir el diálogo y guardar el elemento cuando se llama a onOpenDialog', () => {

    // ARRANGE
    const item = { 
     id: '1', 
     name: 'Ana', 
    };
    const { result } = renderHook(() => useConfirmationDialog());

    // ACT: llamamos a onOpenDialog dentro de act() porque cambia el estado
    act(() => {
        result.current.onOpenDialog(item);
     });

    // ASSERT:
    expect(result.current.isOpen).toBe(true);
    expect(result.current.itemToDelete).toEqual(item);
  });

  it('debería cerrar el diálogo cuando se llama a onClose', () => {

    // ARRANGE: hook renderizado y diálogo abierto de antemano
    const item = { 
     id: '1', 
     name: 'Ana', 
    };
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
     result.current.onOpenDialog(item);
    });

    // ACT: llama a onClose dentro de act de nuevo
    act(() => {
     result.current.onClose();
    });

    // ASSERT: comprueba con toBe que isOpen es false
    expect(result.current.isOpen).toBe(false);
  });

  it('debería limpiar el elemento a borrar cuando se llama a onAccept', () => {
    
    // ARRANGE: hook renderizado y diálogo abierto con un elemento guardado
    const item = { 
     id: '1', 
     name: 'Ana', 
    };
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
     result.current.onOpenDialog(item);
    });

    // ACT: llama a onAccept dentro de act
    act(() => {
     result.current.onAccept();   
    })

    // ASSERT: comprueba con toEqual que itemToDelete es igual a un lookup vacío
     expect(result.current.itemToDelete).toEqual(createEmptyLookup());
  });  

});