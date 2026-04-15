import { useEffect, useState } from 'react';

export function useAsyncData(fetcher, dependencies = []) {
  const [state, setState] = useState({
    data: [],
    isLoading: true,
    error: null
  });

  useEffect(() => {
    let isActive = true;

    const loadData = async () => {
      setState({ data: [], isLoading: true, error: null });

      try {
        const result = await fetcher();
        if (isActive) {
          setState({ data: result, isLoading: false, error: null });
        }
      } catch (error) {
        if (isActive) {
          setState({ data: [], isLoading: false, error: 'Something went wrong. Please retry.' });
        }
      }
    };

    loadData();

    return () => {
      isActive = false;
    };
  }, dependencies);

  return state;
}
