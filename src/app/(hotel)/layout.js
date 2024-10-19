"use client";

import { AuthGuard } from "@/src/providers/auth/guard";

import { HotelDashboardGuard } from "@/src/providers/hotel/guard";
import HotelDashboardLayout from "@/src/layout/hotel-dashboard";

import PropTypes from "prop-types";

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <AuthGuard>
      <HotelDashboardGuard>
        <HotelDashboardLayout>{children}</HotelDashboardLayout>
      </HotelDashboardGuard>
    </AuthGuard>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
