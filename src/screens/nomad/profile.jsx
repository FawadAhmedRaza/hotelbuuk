"use client";
import React from "react";

import { NomadProfile } from "../../sections/nomad";
import NomadProfileSkeleton from "@/src/components/Skeleton/nomad-profile-skeleton";
import { Breadcrumb } from "@/src/components";

const NomadProfileScreen = React.memo(({ defaultValues, isEdit }) => {
  return (
    <div>
      
      <NomadProfile defaultValues={defaultValues} isEdit={isEdit} />
      {/* Skeleton */}
      {/* <NomadProfileSkeleton /> */}
    </div>
  );
});

export default NomadProfileScreen;
