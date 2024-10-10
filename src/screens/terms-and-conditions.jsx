import React from "react";
import { ConditionsContent, Footer, NavBar, TermsBanner } from "../sections";
import { HeadingBanner } from "../components";

const TermsAndConditions = React.memo(() => {
  return (
    <main className="relative">
      <NavBar />
      {/* <TermsBanner /> */}
      <HeadingBanner
        heading="Term & Condition"
        text="Last Updated on 7 Oct 2024"
        className="bg-terms"
      />
      <ConditionsContent />

      <Footer />
    </main>
  );
});
export default TermsAndConditions;
