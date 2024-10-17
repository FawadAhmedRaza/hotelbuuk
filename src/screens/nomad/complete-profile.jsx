import React from "react";

import { Layout } from "@/src/sections";
import { CompleteProfileView } from "@/src/sections/nomad/complete-profile";

const CompleteProfile = React.memo(() => {
  return (
    <Layout isNavBg={true}>
      <CompleteProfileView />
    </Layout>
  );
});

export default CompleteProfile;
