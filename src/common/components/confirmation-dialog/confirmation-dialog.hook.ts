import React from 'react';
import { createEmptyLookup, Lookup } from '#common/models';

export const useConfirmationDialog = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState(createEmptyLookup());

  return {
    isOpen,
    itemToDelete,
    onAccept: () => { // después de abrir con un item el lookup vuelve a dejarlo vacío
      setItemToDelete(createEmptyLookup());
    },
    onClose: () => setIsOpen(false), // después de haberlo abierto se marca como cerrado
    onOpenDialog: (item: Lookup) => { // se abre con un item y lo guarda
      setIsOpen(true);
      setItemToDelete(item);
    },
  };
};
