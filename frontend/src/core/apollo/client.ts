import { ApolloClient, from, InMemoryCache } from "@apollo/client";
import { authLink } from "./links/authLink";
import { httpLink } from "./links/httpLink";
import { localeLink } from "./links/localeLink";

export const apolloClient = createApolloClient();

function createApolloClient() {
  return new ApolloClient({
    link: from([authLink, localeLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: "network-only",
      },
      watchQuery: {
        fetchPolicy: "network-only",
      },
    },
  });
}
