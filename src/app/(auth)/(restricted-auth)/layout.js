"use client";

import { useAuthContext } from "@/src/providers/auth/context/auth-context";
import { useRouter } from "next/navigation";

const layout = ({ children }) => {
  const { user } = useAuthContext();
  const router = useRouter();
  if (user) {
    if (user.user_type === "NOMAD") {
      router.push("/nomad-dashboard");
    } else if (user.user_type === "HOTEL") {
      router.push("/hotel-dashboard");
    } else {
      router.push("/guest-dashboard");
    }
  }

  return children;
};

export default layout;
