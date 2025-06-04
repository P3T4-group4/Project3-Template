import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AuthService from './auth';

// 1) Point the HTTP link at the server's /graphql endpoint.
//    If you deploy your server to Render and it lives at https://your-app.onrender.com,
//    set HTTP_LINK_URI to that. During development, default to http://localhost:3001/graphql.
const HTTP_LINK_URI =
  process.env.NODE_ENV === 'production'
    ? '/graphql'
    : 'http://localhost:3001/graphql';

const httpLink = createHttpLink({
  uri: HTTP_LINK_URI,
});

// 2) Use setContext to attach JWT if present
const authLink = setContext((_, { headers }) => {
  const token = AuthService.getToken?.() || localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// 3) Instantiate ApolloClient
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // (Optional) If you need to merge paginated data or something similar,
          // set merge functions here. Otherwise default cache is fine.
        },
      },
    },
  }),
});

export default client;
