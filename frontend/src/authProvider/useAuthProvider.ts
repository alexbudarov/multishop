import { useEffect, useState } from "react";
import { AuthProvider } from "react-admin";
import { authProvider as defaultAuthProvider } from "./authProvider";

type UseAuthProvider = {
  loading: boolean;
  authProvider?: AuthProvider;
};

// TODO explain why we add this
export function useAuthProvider(): UseAuthProvider {
  const [authProvider, setAuthProvider] = useState<AuthProvider>();

  useEffect(() => {
    setAuthProvider(defaultAuthProvider);
  }, []);

  return {
    authProvider,
    loading: false,
  };
}
