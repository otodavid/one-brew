'use client';
import { loadLocalStorage } from '@/lib/utils';
import { updateCartWithLocalStorage } from '@/store/features/cartSlice';
import type { AppStore } from '@/store/store';
import { makeStore } from '@/store/store';
import { setupListeners } from '@reduxjs/toolkit/query';
import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';

interface Props {
  readonly children: ReactNode;
}

export const ReduxProvider = ({ children }: Props) => {
  const storeRef = useRef<AppStore | null>(null);
  const hasComponentMounted = useRef<boolean>(true);

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  useEffect(() => {
    if (storeRef.current != null) {
      // configure listeners using the provided defaults
      // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return unsubscribe;
    }
  }, []);

  useEffect(() => {
    if (storeRef.current && hasComponentMounted.current) {
      if (typeof window !== 'undefined') {
        const state = loadLocalStorage();
        storeRef.current.dispatch(updateCartWithLocalStorage(state));
      }

      hasComponentMounted.current = false;
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
};
