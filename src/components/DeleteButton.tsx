import { DataContext } from '@/context/DataContext';
import { useContext } from 'react';

type DeleteButtonProps = {
  prefix: string;
  closeModal: () => void;
};

const DeleteButton = ({ prefix, closeModal }: DeleteButtonProps) => {
  const { updateShortcuts } = useContext(DataContext);

  return (
    <button
      type='button'
      className='text-red-500 underline'
      onClick={() => {
        updateShortcuts(prefix, null);
        closeModal();
      }}
    >
      Delete
    </button>
  );
};

export default DeleteButton;
