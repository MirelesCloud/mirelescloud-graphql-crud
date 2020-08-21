import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { onError } from "apollo-link-error"


const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  errorLink,
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <App/>
    </ApolloHooksProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
