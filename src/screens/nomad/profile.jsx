"use client";
import React from "react";

import { NomadProfile } from "../../sections/nomad";

const NomadProfileScreen = React.memo(({ defaultValues, isEdit }) => {
  return <NomadProfile defaultValues={defaultValues} isEdit={isEdit} />;
});

export default NomadProfileScreen;
