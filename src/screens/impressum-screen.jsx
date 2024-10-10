import React from "react";
import { Footer, ImpressumContent, NavBar, TermsBanner } from "../sections";
import ConditionsContent from "../sections/conditions-content";
import { HeadingBanner } from "../components";

const ImpressumScreen = React.memo(() => {
  return (
    <main className="relative">
      <NavBar className="bg-primary static" />
      {/* <TermsBanner /> */}
      <HeadingBanner
        heading="Impressum"
        // text="Last Updated on 7 Oct 2024"
        className="bg-impressum"
      />
      <ImpressumContent />

      <Footer />
    </main>
  );
});
export default ImpressumScreen;
