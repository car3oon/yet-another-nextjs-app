import '@/styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';

import { useAuthenticatedApolloClient } from '@saleor/auth-sdk/react/apollo';
import { 
  SaleorAuthProvider,
  useAuthChange,
  useSaleorAuthClient
 } from '@saleor/auth-sdk/react';
import { API_URI } from '@/lib/const';

import Navbar from "@/components/Navbar/Navbar";
import Header from "@/components/Header/Header";

export default function App({ Component, pageProps }: AppProps) {
  const saleorAuth = useSaleorAuthClient({
    saleorApiUrl: API_URI,
    storage: typeof window !== 'undefined' ? localStorage : undefined,
  });

  const { apolloClient, refetch, reset } = useAuthenticatedApolloClient({
    uri: API_URI,
    fetchWithAuth: saleorAuth.saleorAuthClient.fetchWithAuth,
  });

  useAuthChange({
    saleorApiUrl: API_URI,
    onSignedOut: () => reset(),
    onSignedIn: () => refetch(),
  });

  return (
    <SaleorAuthProvider {...saleorAuth}>
      <ApolloProvider client={apolloClient}>
        <Navbar />
        <Header />
        <main>
          <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>
          <Component {...pageProps} />
          </div>
        </main>
      </ApolloProvider>
    </SaleorAuthProvider>
  );
}
