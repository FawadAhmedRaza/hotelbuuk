import React from "react";

import { Layout } from "@/src/sections";
import { NomadProfile } from "../../sections/nomad";

const NomadProfileScreen = React.memo(() => {
  return (
    <Layout isNavBg={true}>
      <NomadProfile />
    </Layout>
  );
});

export default NomadProfileScreen;