"use client";

import React, { useEffect, useState } from "react";
import { ImpressumContent, Layout } from "../sections";
import { HeadingBanner } from "../components";
import { getStaticContentByType } from "../actions/staticContent.action";

const ImpressumScreen = React.memo(() => {
  const [impressum, setImpressum] = useState({
    description: "",
    updatedAt: new Date(),
  });

  const [impressumLoading, setImpressumLoading] = useState(true);


  const FetchImpressum = async () => {
    try {
      setImpressumLoading(true);
      const response = await getStaticContentByType("impressum");
      setImpressum(response?.staticContent);
    } catch (error) {
      console.log("error", error);
    } finally {
      setImpressumLoading(false);
    }
  };

  useEffect(() => {
    FetchImpressum();
  }, []);

  // Destructure staticContent from privacyAndPolicy state
  const { description, updatedAt } = impressum || {};

  return (
    <main className="relative">
      <Layout>
        <HeadingBanner heading="Impressum" className="bg-impressum" />
        <ImpressumContent
          description={description}
          impressumLoading={impressumLoading}
        />
      </Layout>
    </main>
  );
});
export default ImpressumScreen;
