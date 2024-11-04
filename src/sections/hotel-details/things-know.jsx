import React, { useState } from "react";
import { HotelsThings } from "@/src/_mock/_hotels-things";
import { AnchorTag, Pannel, Typography } from "@/src/components";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export const ThingsKnow = () => {
  const { rules, safety, cancellationPolicy } = HotelsThings[0];
  const { event } = useSelector((state) => state.allEvents.getById);

  // State for toggling each section
  const [showFullRules, setShowFullRules] = useState(false);
  const [showFullSafety, setShowFullSafety] = useState(false);
  const [showFullCancellation, setShowFullCancellation] = useState(false);

  // Helper function to render truncated content
  const renderTruncatedList = (list, limit, showFull) => {
    if (!list) return null;
    return showFull ? list : list.slice(0, limit);
  };

  const { t } = useTranslation();
  return (
    <Pannel className="flex flex-col flex-wrap gap-5 md:gap-8 p-5">
      {/* Header */}
      <Typography variant="h3" className="font-semibold">
        {t("hotelDetail.thingsKnow.thingsKnowHead")}
      </Typography>

      {/* Main content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center items-center gap-5 w-full">
        {/* House Rules */}
        <div className="flex flex-col justify-center items-start gap-2 h-full">
          <Typography variant="h5" className="font-semibold">
            {t("hotelDetail.thingsKnow.houseRules")}
          </Typography>
          {renderTruncatedList(
            event?.event_associated_rules,
            5,
            showFullRules
          )?.map((item, index) => (
            <Typography key={index} variant="p">
              {item?.name}
            </Typography>
          ))}
          {event?.event_associated_rules?.length > 5 && (
            <AnchorTag
              href="#"
              onClick={() => setShowFullRules(!showFullRules)}
              className="text-base lg:text-lg underline font-semibold"
            >
              {showFullRules ? "Show less" : "Show more"}
            </AnchorTag>
          )}
        </div>

        {/* Safety & Property */}
        <div className="flex flex-col justify-center items-start gap-2 h-full">
          <Typography variant="h5" className="font-semibold">
            {t("hotelDetail.thingsKnow.safetyProperty")}
          </Typography>
          {renderTruncatedList(
            event?.event_associated_safeties,
            5,
            showFullSafety
          )?.map((item, index) => (
            <Typography key={index} variant="p">
              {item?.name}
            </Typography>
          ))}
          {event?.event_associated_safeties?.length > 5 && (
            <AnchorTag
              href="#"
              onClick={() => setShowFullSafety(!showFullSafety)}
              className="text-base lg:text-lg underline font-semibold"
            >
              {showFullSafety ? t("common.showLess") : t("common.showAll")}
            </AnchorTag>
          )}
        </div>

        {/* Cancellation Policy */}
        <div className="flex flex-col justify-center items-start gap-2 h-full">
          <Typography variant="h5" className="font-semibold">
            {t("hotelDetail.thingsKnow.cancellationPolicy")}
          </Typography>
          {renderTruncatedList(
            event?.event_associated_cancel_policies,
            5,
            showFullCancellation
          )?.map((item, index) => (
            <Typography key={index} variant="p">
              {item?.name}
            </Typography>
          ))}
          {event?.event_associated_cancel_policies?.length > 5 && (
            <AnchorTag
              href="#"
              onClick={() => setShowFullCancellation(!showFullCancellation)}
              className="text-base lg:text-lg underline font-semibold"
            >
              {showFullCancellation
                ? t("common.showLess")
                : t("common.showAll")}
            </AnchorTag>
          )}
        </div>
      </div>
    </Pannel>
  );
};
