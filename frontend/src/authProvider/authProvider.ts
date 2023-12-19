import { gql } from "@amplicode/gql";
import {
  CheckAuthenticatedQuery,
  CheckAuthenticatedQueryVariables,
  UserInfoQuery,
  UserInfoQueryVariables,
  UserPermissionsQuery,
  UserPermissionsQueryVariables,
} from "@amplicode/gql/graphql";
import { ApolloQueryResult, TypedDocumentNode } from "@apollo/client";
import { GraphQLError } from "graphql";
import { AuthProvider } from "react-admin";
import { LOGIN_URI, LOGOUT_URI } from "../config";
import { apolloClient } from "../core/apollo/client";

export const TOKEN_KEY: "amplicode-auth" = "amplicode-auth";
export const PERMISSIONS_KEY: "amplicode-permissions" = "amplicode-permissions";

const USER_INFO: TypedDocumentNode<UserInfoQuery, UserInfoQueryVariables> = gql(`
  query userInfo {
   userInfo {
     id
     fullName
     avatar
   }
  }
`);

const USER_AUTHENTICATED: TypedDocumentNode<
  CheckAuthenticatedQuery,
  CheckAuthenticatedQueryVariables
> = gql(`
 query checkAuthenticated {
   checkAuthenticated
 }
`);

const USER_PERMISSIONS: TypedDocumentNode<UserPermissionsQuery, UserPermissionsQueryVariables> =
  gql(`
  query userPermissions {
   userPermissions
  }
`);

interface UserInfo {
  id: string;
  fullName?: string | null;
  avatar?: string | null;
}

// TODO importing from 'ra-core/src/types' break `npm run build` command
// import {UserIdentity} from "ra-core/src/types";
interface UserIdentity {
  id: string | number;
  fullName?: string;
  avatar?: string;
  [key: string]: any;
}

export const authProvider: AuthProvider = {
  login: async ({ username, password }): Promise<{ redirectTo?: string | boolean } | void> => {
    const request: Request = new Request(LOGIN_URI, {
      method: "POST",
      body: `username=${username}&password=${password}`,
      headers: new Headers({ "Content-Type": "application/x-www-form-urlencoded" }),
    });

    const response: Response = await fetch(request);
    if (response.status === 200) {
      localStorage.setItem(TOKEN_KEY, username);
    }
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(PERMISSIONS_KEY);
    await fetch(LOGOUT_URI);
  },

  checkError: async (error): Promise<void> => {
    // TODO code below assumes that GraphQL server returns
    // {"errors":[{"extensions":{"classification":"UNAUTHORIZED"}}], ...}
    // for not authenticated user
    // and
    // {"errors":[{"extensions":{"classification":"FORBIDDEN"}}], ...}
    // if user has not enough permissions for query.
    // If the server handles errors differently, or has a different response structure,
    // code below should be modified.

    const { graphQLErrors, networkError } = error;
    // redirect to login page if graphql returns UNAUTHORIZED error
    if (
      Array.isArray(graphQLErrors) &&
      graphQLErrors.some(
        (err: GraphQLError): boolean => err.extensions?.classification === "UNAUTHORIZED"
      )
    ) {
      throw new Error(`Request failed - unauthorized`);
    }
    // redirect to login page for network error with 401 status
    if (networkError?.statusCode === 401) {
      throw new Error(`Request failed - unauthorized`);
    }
    // do not handle error in other cases
  },

  checkAuth: async (): Promise<void> => {
    const token: string | null = localStorage.getItem(TOKEN_KEY);
    if (token == null) {
      throw new Error(`Check auth failed - no token`);
    }
    await apolloClient.query({ query: USER_AUTHENTICATED });
  },

  getPermissions: async (): Promise<string | null> => {
    let permissions: string | null = localStorage.getItem(PERMISSIONS_KEY);
    if (permissions != null) {
      return JSON.parse(permissions);
    }

    const authorities: ApolloQueryResult<UserPermissionsQuery> = await apolloClient.query({
      query: USER_PERMISSIONS,
    });

    permissions = authorities?.data?.userPermissions as string | null;
    if (permissions != null) {
      localStorage.setItem(PERMISSIONS_KEY, JSON.stringify(permissions));
    }
    return permissions;
  },

  getIdentity: async (): Promise<UserIdentity> => {
    const token: string | null = localStorage.getItem(TOKEN_KEY);
    if (token == null) {
      throw new Error(`Getting identity failed - no token`);
    }

    const response: ApolloQueryResult<UserInfoQuery> = await apolloClient.query({
      query: USER_INFO,
    });
    const userInfo: UserInfo | null | undefined | void = response?.data?.userInfo;
    return {
      id: userInfo?.id ?? "",
      fullName: userInfo?.fullName ?? "",
      avatar: userInfo?.avatar ?? "",
    };
  },
};
