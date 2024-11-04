"use client";
import React from "react";
import { NavBar } from "./nav-bar";
import { Footer } from "./footer";

export const Layout = React.memo(
  ({ children, isNavBg = false, isFooter = true }) => {
    return (
      <main className="w-full h-full">
        <NavBar className={isNavBg ? "bg-primary static" : ""} />
        {children}
        {isFooter && <Footer />}
      </main>
    );
  }
);
