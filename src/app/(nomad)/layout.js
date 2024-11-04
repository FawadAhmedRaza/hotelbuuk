"use client";

import NomadDashboardLayout from "@/src/layout/nomad-dashboard";
import { AuthGuard } from "@/src/providers/auth/guard";
import { NomadDashboardGuard } from "@/src/providers/nomad/guard";

import PropTypes from "prop-types";

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <AuthGuard>
      <NomadDashboardGuard>
        <NomadDashboardLayout>{children}</NomadDashboardLayout>
      </NomadDashboardGuard>
    </AuthGuard>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
