import React from "react";
import { Pannel, Typography } from "../components";
import { Terms_Content } from "../contants";
import { terms_first_para } from "../contants/terms-content";
import { impressum_data } from "../_mock/_impressum";
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
              className="custom-html"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </Pannel>
        )}
      </>
    );
  }
);
