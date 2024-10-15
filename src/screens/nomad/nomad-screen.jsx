import React from "react";
import { NavBar } from "@/src/sections";
import { NomadListView } from "@/src/sections/nomad";

const NomadScreen = React.memo(() => {
  return (
    <>
      <NavBar className="bg-primary static" />
      <NomadListView />
    </>
  );
});

export default NomadScreen;
