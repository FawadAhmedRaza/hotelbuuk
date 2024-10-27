import React from "react";
import { HotelsThings } from "@/src/_mock/_hotels-things";
import { AnchorTag, Pannel, Typography } from "@/src/components";

export const ThingsKnow = () => {
  const { rules, safety, cancellationPolicy } = HotelsThings[0];

  return (
    <Pannel className="flex flex-col flex-wrap gap-5 md:gap-8 p-5 bg-section-bg">
      {/* Header */}
      <Typography variant="h3" className="font-semibold">
        Things to Know
      </Typography>

      {/* Main content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center items-center gap-5 w-full">
        {/* House Rules */}
        <div className="flex flex-col justify-center items-start sm:justify-start sm:items-start gap-2 h-full">
          <div className="flex flex-col jus gap-2 grow">
            <Typography variant="h5" className="font-semibold">
              House Rules
            </Typography>
            <Typography variant="p">{rules.checkIn}</Typography>
            <Typography variant="p">{rules.checkOut}</Typography>
            <Typography variant="p">{rules.guests}</Typography>
          </div>
          <AnchorTag href="#" className=" text-base lg:text-lg underline font-semibold">
            {safety.showMore}
          </AnchorTag>
        </div>

        {/* Safety & Property */}
        <div className="flex flex-col justify-center items-start sm:justify-start sm:items-start gap-2 h-full">
          <div className="flex flex-col jus gap-2 grow">
            <Typography variant="h5" className="font-semibold">
              Safety & Property
            </Typography>
            <Typography variant="p">{safety.carbonMonoxideAlarm}</Typography>
            <Typography variant="p">{safety?.smokeAlarm}</Typography>
          </div>

          <AnchorTag href="#" className="text-base lg:text-lg underline font-semibold">
            {safety.showMore}
          </AnchorTag>
        </div>

        {/* Cancellation Policy */}
        <div className="flex flex-col justify-center items-start sm:justify-start sm:items-start gap-2 h-full">
          <div className="flex flex-col justify-center items-start sm:justify-start sm:items-start   gap-2 grow">
            <Typography variant="h5" className="font-semibold">
              Cancellation Policy
            </Typography>
            <Typography variant="p">{cancellationPolicy.policy}</Typography>
            <Typography variant="p">{cancellationPolicy.details}</Typography>
          </div>
          <AnchorTag href="#" className=" text-base lg:text-lg underline font-semibold">
            {safety.showMore}
          </AnchorTag>
        </div>
      </div>
    </Pannel>
  );
};
