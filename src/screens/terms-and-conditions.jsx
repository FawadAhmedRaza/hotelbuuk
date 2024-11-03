"use client";
import React, { useEffect, useState } from "react";
import { ConditionsContent, Footer, NavBar, TermsBanner } from "../sections";
import { HeadingBanner } from "../components";
import { getStaticContentByType } from "../actions/staticContent.action";
import { formatDate } from "../utils/dateFormate";

const TermsAndConditions = React.memo(() => {
  const [termsConditionDescription, setTermsConditionDescription] = useState({
    description: "",
    updatedAt: new Date(),
  });
  const [termsConditionLoading, setTermsConditionLoading] = useState(true);
  console.log("termsConditionDescription", termsConditionDescription);
  const FetchTermsAndCondition = async () => {
    try {
      setTermsConditionLoading(true);
      const response = await getStaticContentByType("termsAndConditions");
      setTermsConditionDescription(response?.staticContent);
    } catch (error) {
      console.log("error", error);
    } finally {
      setTermsConditionLoading(false);
    }
  };

  useEffect(() => {
    FetchTermsAndCondition();
  }, []);

  // Destructure staticContent from termsConditionDescription state
  const { description, updatedAt } = termsConditionDescription || {};

  return (
    <main className="relative">
      <NavBar />
      {/* <TermsBanner /> */}
      <HeadingBanner
        heading="Terms and Conditions"
        text={`Last Updated on ${formatDate(updatedAt)}`}
        className="bg-terms"
      />
      <ConditionsContent
        description={description}
        termsConditionLoading={termsConditionLoading}
      />
      <Footer />
    </main>
  );
});
export default TermsAndConditions;
