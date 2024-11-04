import React from "react";
import { ConditionsContent, Layout } from "../sections";
import { HeadingBanner } from "../components";
import { getStaticContentByType } from "../actions/staticContent.action";
import { formatDate } from "../utils/dateFormate";

const TermsAndConditions = React.memo(() => {
  const [termsConditionDescription, setTermsConditionDescription] = useState({
    description: "",
    updatedAt: new Date() ,
  });
  const [termsConditionLoading, setTermsConditionLoading] = useState(true);
  console.log("termsConditionDescription", termsConditionDescription);
  const FetchTermsAndCondition = async () => {
    try {
      setTermsConditionLoading(true)
      const response = await getStaticContentByType("termsAndConditions");
      setTermsConditionDescription(response?.staticContent);
    } catch (error) {
      console.log("error", error);
    }
    finally{
      setTermsConditionLoading(false)
    }
  };

  useEffect(() => {
    FetchTermsAndCondition();
  }, []);

  // Destructure staticContent from termsConditionDescription state
  const { description,updatedAt } = termsConditionDescription;

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
