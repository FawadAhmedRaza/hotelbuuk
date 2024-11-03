import React from "react";
import { Pannel } from "../components";
import PrivacyAndTermsSkeleton from "../components/StaticContentSkeletons/PrivacyPolicySkeleton";

export const ConditionsContent = React.memo(
  ({ description, termsConditionLoading }) => {
    console.log("description in main component", description);
    return (
      <>
        {termsConditionLoading ? (
          <PrivacyAndTermsSkeleton />
        ) : (
          <Pannel className="capitalize ">
            <div
              className="custom-html min-h-20"
              dangerouslySetInnerHTML={{ __html: description }} // Renders the HTML content
            />
          </Pannel>
        )}
      </>
    );
  }
);