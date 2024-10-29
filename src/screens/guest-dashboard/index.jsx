"use client";

import { useState } from "react";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";

import { Pannel } from "@/src/components";
import GuestProfileAlert from "./sections/profile-alert";

const GuestDashboardSection = () => {
  const { user } = useAuthContext();

  const [alert, setShowAlert] = useState(false);

  return (
    <Pannel>
      {!user?.is_user_profile_completed && (
        <GuestProfileAlert setShowAlert={setShowAlert} />
      )}
    </Pannel>
  );
};

export default GuestDashboardSection;
