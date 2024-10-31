"use client";

import { useState } from "react";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";

import { Pannel } from "@/src/components";
import GuestProfileAlert from "./sections/profile-alert";
import MountChart from "../hotel-dashboard/sections/components/chart/mount-chart";
import ThisMonthBooking from "../hotel-dashboard/sections/components/chart/this-mount-bookin";
import { CheckInChart } from "../hotel-dashboard/sections/components/chart/check-In";
import { CheckOutChart } from "../hotel-dashboard/sections/components/chart/check-out";

const GuestDashboardSection = () => {
  const { user } = useAuthContext();

  const [alert, setShowAlert] = useState(false);

  return (
    <Pannel>
      {!user?.is_user_profile_completed && (
        <GuestProfileAlert setShowAlert={setShowAlert} />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <MountChart />
        </div>
        <div>
          <ThisMonthBooking />
        </div>
        <div>
          <CheckInChart />
        </div>
        <div>
          <CheckOutChart />
        </div>
      </div>
    </Pannel>
  );
};

export default GuestDashboardSection;
