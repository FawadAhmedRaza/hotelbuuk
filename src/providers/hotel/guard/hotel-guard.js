import { useState, useEffect, useCallback } from "react";

import { useRouter } from "next/navigation";
import { useAuthContext } from "../../auth/context/auth-context";

import PropTypes from "prop-types";
import { LoadingScreen } from "@/src/components/loading-screen";

// ----------------------------------------------------------------------

export function HotelDashboardGuard({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  console.log("isLoading",isLoading)

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

HotelDashboardGuard.propTypes = {
  children: PropTypes.node,
};

// ----------------------------------------------------------------------

function Container({ children, isLoading, setIsLoading }) {
  const router = useRouter();

  const { user, loading } = useAuthContext();

  const [checked, setChecked] = useState(false);

  const check = useCallback(async () => {
    if (user?.user_type === "HOTEL") {
      setChecked(true);
      setIsLoading(false);
    } else {
      setChecked(false);
      const homepage = "/";
      const href = `${homepage}`;
      router.replace(href);
    }
  }, [user, router]);

  useEffect(() => {
    if (!loading && user) {
      check();
    }
  }, [loading, user, check]);

  if (isLoading || !checked) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}

Container.propTypes = {
  children: PropTypes.node,
};
