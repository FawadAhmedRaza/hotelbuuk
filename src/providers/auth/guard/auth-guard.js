"use client";
import { useState, useEffect, useCallback } from "react";

import { useRouter } from "next/navigation";
import { useAuthContext } from "../context/auth-context";

import PropTypes from "prop-types";
import { paths } from "@/src/contants";
import { LoadingScreen } from "@/src/components/loading-screen";

// ----------------------------------------------------------------------

const loginPaths = {
  login: paths.auth.login,
};

// ----------------------------------------------------------------------

export function AuthGuard({ children }) {
  const { loading } = useAuthContext();

  return <>{loading ? <LoadingScreen /> : <Container>{children}</Container>}</>;
}

AuthGuard.propTypes = {
  children: PropTypes.node,
};

// ----------------------------------------------------------------------

function Container({ children }) {
  const router = useRouter();

  const { authenticated, loading, user } = useAuthContext();

  const [checked, setChecked] = useState(false);

  const check = useCallback(async () => {
    if (!authenticated) {
      const loginPath = loginPaths.login;
      const href = `${loginPath}`;
      router.replace(href);
      setChecked(false);
    } else {
      setChecked(true);
    }
  }, [authenticated, loading, router]);

  useEffect(() => {
    check();
  }, [loading, authenticated, check, user]);

  if (!checked) {
    return null;
  }

  if (!user?.is_user_type_completed) {
    return router.push(paths.auth.set_user_type);
  }

  return <>{children}</>;
}

Container.propTypes = {
  children: PropTypes.node,
};
