import React from "react";
import { Footer, NavBar, QAContent } from "../sections";
import ConditionsContent from "../sections/conditions-content";
import { HeadingBanner } from "../components";

const PrivacyPolicy = React.memo(() => {
  return (
    <main className="relative">
      <NavBar />
      <HeadingBanner
        heading="Privacy Policy"
        text="We care about your privacy. Seriously!"
        className="bg-privacy"
      />
      <QAContent />

      <Footer />
    </main>
  );
});

export default PrivacyPolicy;
