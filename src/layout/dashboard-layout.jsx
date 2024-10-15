import React from "react";
import { Footer, NavBar } from "../sections";

const mainLayout = ({ children }) => {
  return (
    <main className="relative">
      <NavBar />
      {children}
      <Footer />
    </main>
  );
};

export default mainLayout;
