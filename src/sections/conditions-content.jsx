"use client";

import React from "react";
import { Pannel } from "../components";
import PrivacyAndTermsSkeleton from "../components/StaticContentSkeletons/PrivacyPolicySkeleton";

export const ConditionsContent = React.memo(
  ({ description, termsConditionLoading }) => {
    return (
      <>
        {termsConditionLoading ? (
          <PrivacyAndTermsSkeleton />
        ) : (
          <Pannel className="capitalize  space-y-6 ">
            <div
              className="custom-html min-h-20  space-y-7 term-and-conditions"
              dangerouslySetInnerHTML={{ __html: description }} // Renders the HTML content
            />
          </Pannel>
        )}
      </>
    );
  }
);
