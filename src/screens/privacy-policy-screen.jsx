'use client'
import React, { useEffect, useState } from "react";
import { Footer, NavBar, QAContent } from "../sections";
import { HeadingBanner } from "../components";
import { getStaticContentByType } from "../actions/staticContent.action";

const PrivacyPolicy = React.memo(() => {
  const [privacyAndPolicy, setPrivacyAndPolicy] = useState({
    description: "",
    updatedAt: new Date() ,
  });
  const [privacyPolicyLoading, setPrivacyPolicyLoading] = useState(true);
  console.log("privacyAndPolicy", privacyAndPolicy);
  const FetchPrivacyANdPolicy = async () => {
    try {
      setPrivacyPolicyLoading(true)
      const response = await getStaticContentByType("privacyPolicy");
      setPrivacyAndPolicy(response?.staticContent);
    } catch (error) {
      console.log("error", error);
    }
    finally{
      setPrivacyPolicyLoading(false)
    }
  };

  useEffect(() => {
    FetchPrivacyANdPolicy();
  }, []);

  // Destructure staticContent from privacyAndPolicy state
  const { description,updatedAt } = privacyAndPolicy;
  return (
    <main className="relative">
      <NavBar />
      <HeadingBanner
        heading="Privacy Policy"
        text="We care about your privacy. Seriously!"
        // text={`Last Updated on ${formatDate(updatedAt)}`}
        className="bg-privacy"
      />
      <QAContent  description={description} privacyPolicyLoading={privacyPolicyLoading}/>

      <Footer />
    </main>
  );
});

export default PrivacyPolicy;
