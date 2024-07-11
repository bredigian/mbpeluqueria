import { useState } from 'react';

type TLoadingStatus = 'pending' | 'ready' | 'error';

export const useLoading = () => {
  const [status, setStatus] = useState<TLoadingStatus>('pending');
  const handleStatus = (status: TLoadingStatus) => setStatus(status);

  return { status, handleStatus };
};
