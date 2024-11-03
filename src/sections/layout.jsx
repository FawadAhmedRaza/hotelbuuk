"use client";
import React from "react";
import { NavBar } from "./nav-bar";
import { Footer } from "./footer";

export const Layout = React.memo(
  ({ children, isNavBg = false, isFooter = true }) => {
    return (
      <React.Fragment>
        <NavBar className={isNavBg ? " px-5  z-50 " : ""} />
        <main className="w-full h-full pt-20">{children}</main>
        {isFooter && <Footer />}
      </React.Fragment>
    );
  }
);
