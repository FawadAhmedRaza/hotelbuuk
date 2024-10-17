import React from "react";
import { ConditionsContent, Layout } from "../sections";
import { HeadingBanner } from "../components";

const TermsAndConditions = React.memo(() => {
  return (
    <main className="relative">
      <Layout>
        <HeadingBanner
          heading="Terms and Conditions"
          text="Last Updated on 7 Oct 2024"
          className="bg-terms"
        />
        <ConditionsContent />
      </Layout>
    </main>
  );
});
export default TermsAndConditions;
