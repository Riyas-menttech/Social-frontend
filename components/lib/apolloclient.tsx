"use client";
import { ApolloLink, HttpLink, NormalizedCacheObject } from "@apollo/client";
import {
  ApolloNextAppProvider,
  SSRMultipartLink,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import { setContext } from "@apollo/client/link/context";
function makeClient() {
  const URL = "http://localhost:3000/graphql";
  const httpLink = new HttpLink({
    uri: URL,
  });
  const authLink = setContext((_, { headers }) => {
    // Get the authentication token from local storage if it exists
    // const sampleToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpeWF6QG1lbnQudGVjaCIsImlhdCI6MTcxODEwNjcyOSwiZXhwIjoxNzE4MTkzMTI5fQ.Xcji8s1lfWdFfKNYLkQgnDySolV8ucPCoxlJe14ungE';
    // localStorage.setItem('token', sampleToken);
    const newToken = localStorage.getItem("token");
    return {
      headers: {
        ...headers,
        authorization: newToken ? `${newToken}` : "",
      },
    };
  });
  const link = ApolloLink.from([authLink, httpLink]);
  // const client = new ApolloClient({
  //   link,
  //   cache: new InMemoryCache(),
  // });
  return new ApolloClient({
    cache: new InMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            link,
          ])
        : link,
  });
}
export function ApolloWrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
