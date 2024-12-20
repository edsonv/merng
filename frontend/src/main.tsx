import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { client } from './ApolloProvider';
import { Router } from './router';
import './styles/globals.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  </StrictMode>
);
