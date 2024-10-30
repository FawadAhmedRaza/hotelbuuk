import React from "react";
import { Pannel } from "../components";
import PrivacyAndTermsSkeleton from "../components/StaticContentSkeletons/PrivacyPolicySkeleton";
export const QAContent = React.memo(({ description, privacyPolicyLoading }) => {
  return (
    <>
    {privacyPolicyLoading ? (
      <PrivacyAndTermsSkeleton />
    ) : (
        <Pannel>
        <div
          className="custom-html"
          dangerouslySetInnerHTML={{ __html: description }}
          />
          </Pannel>
      )}
      </>
  );
});
