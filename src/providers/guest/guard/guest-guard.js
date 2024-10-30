import { useState, useEffect, useCallback } from "react";

import { useRouter } from "next/navigation";
import { useAuthContext } from "../../auth/context/auth-context";

import PropTypes from "prop-types";
import { LoadingScreen } from "@/src/components/loading-screen";

// ----------------------------------------------------------------------

export function GuestDashboardGuard({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Container isLoading={isLoading} setIsLoading={setIsLoading}>
          {children}
        </Container>
      )}
    </>
  );
}

GuestDashboardGuard.propTypes = {
  children: PropTypes.node,
};

// ----------------------------------------------------------------------

function Container({ children, isLoading, setIsLoading }) {
  const router = useRouter();

  const { user, loading } = useAuthContext();

  const [checked, setChecked] = useState(false);

  const check = useCallback(async () => {
    if (user?.user_type === "GUEST") {
      setChecked(true);
    } else {
      setChecked(false);
      router.back();
    }
    setIsLoading(false);
  }, [user, router, setIsLoading]);

  useEffect(() => {
    check();
  }, [loading, user, check]);

  if (isLoading || !checked) {
    return null;
  }

  return <>{children}</>;
}

Container.propTypes = {
  children: PropTypes.node,
};
