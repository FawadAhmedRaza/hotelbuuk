import React from "react";
import { Layout } from "@/src/sections";
import { NomadListView } from "@/src/sections/nomad";

const NomadScreen = React.memo(() => {
  return (
    <Layout isNavBg={true}>
      <NomadListView />
    </Layout>
  );
});

export default NomadScreen;
