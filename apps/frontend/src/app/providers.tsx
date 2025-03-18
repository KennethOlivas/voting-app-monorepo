"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { SessionProvider } from "next-auth/react";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <SessionProvider>
       <NuqsAdapter>
       <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
       </NuqsAdapter>
    </SessionProvider>
  );
}
