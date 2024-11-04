import React from "react";
import { Footer, Layout, NavBar, QAContent } from "../sections";
import ConditionsContent from "../sections/conditions-content";
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
      <Layout>
        <HeadingBanner
          heading="Privacy Policy"
          text="We care about your privacy. Seriously!"
          className="bg-privacy"
        />
        <QAContent />
      </Layout>
    </main>
  );
});

export default PrivacyPolicy;
