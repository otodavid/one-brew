'use client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getQueryClient } from '@/app/get-query-client';
import { ReduxProvider } from './reduxProvider';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import UserInfoProvider from '@/components/UserInfoProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider>
        <UserProvider>
          <UserInfoProvider>{children}</UserInfoProvider>
        </UserProvider>
      </ReduxProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
