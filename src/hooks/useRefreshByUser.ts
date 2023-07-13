import { useState } from 'react';

type Refetch = () => void;

export function useRefreshByUser(refetch?: Refetch) {
  const [isRefetchingByUser, setIsRefetchingByUser] = useState(false);

  async function refetchByUser() {
    if (!refetch) return;
    setIsRefetchingByUser(true);

    try {
      await refetch();
    } finally {
      setIsRefetchingByUser(false);
    }
  }

  return {
    isRefetchingByUser,
    refetchByUser,
  };
}
