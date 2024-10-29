"use client";

import { AuthGuard } from "@/src/providers/auth/guard";

import { GuestDashboardGuard } from "@/src/providers/guest/guard";
import GuestDashboardLayout from "@/src/layout/guest-dashboard";

import PropTypes from "prop-types";

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <AuthGuard>
      <GuestDashboardGuard>
        <GuestDashboardLayout>{children}</GuestDashboardLayout>
      </GuestDashboardGuard>
    </AuthGuard>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
