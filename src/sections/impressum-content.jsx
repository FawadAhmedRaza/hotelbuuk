"use client"

import React from "react";
import { Pannel } from "../components";
import PrivacyAndTermsSkeleton from "../components/StaticContentSkeletons/PrivacyPolicySkeleton";

export const ImpressumContent = React.memo(
  ({ description, impressumLoading }) => {
    return (
      <>
        {impressumLoading ? (
          <PrivacyAndTermsSkeleton />
        ) : (
          <Pannel className="flex flex-col gap-20  capitalize">
            <div
              className="custom-html term-and-conditions  space-y-3"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </Pannel>
        )}
      </>
    );
  }
);
