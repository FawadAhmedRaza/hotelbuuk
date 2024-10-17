import React from "react";
import { ImpressumContent, Layout } from "../sections";
import { HeadingBanner } from "../components";

const ImpressumScreen = React.memo(() => {
  return (
    <main className="relative">
      <Layout>
        <HeadingBanner heading="Impressum" className="bg-impressum" />
        <ImpressumContent />
      </Layout>
    </main>
  );
});
export default ImpressumScreen;
