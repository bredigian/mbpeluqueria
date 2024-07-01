import { useState } from 'react';

export const useDialog = () => {
  const [show, setShow] = useState(false);
  const handleDialog = () => setShow(!show);

  return {
    show,
    handleDialog,
  };
};
