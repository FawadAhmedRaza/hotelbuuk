import { Pannel, Typography } from "@/src/components";
import React from "react";

import ImageRender from "@/src/components/ImageRenderer";
import DOMPurify from "dompurify";

export const Vision = React.memo(({ about }) => {
  const sanitizedContent = DOMPurify.sanitize(about?.description);

  return (
    <Pannel className="grid lg:grid-cols-2 gap-5 md:flex-row w-full items-center sm:gap-3 h-full">
      {/* Left Side - Text Content */}
      <div className="flex flex-col justify-center gap-5">
        <Typography variant="h4" className="font-bold">
          {about?.title}
        </Typography>

        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </div>

      {/* Right Side - Main Image and Overlayed Sub Image */}
      <div className="relative flex">
        {/* Main Image */}
        <div className="flex justify-end w-full">
          <div className="h-64 md:h-96 w-full md:w-[80%] lg:w-[80%]">
            <ImageRender
              src={about?.main_img_url}
              type={"server"}
              alt="Vision Main Image"
              ratio="4/3"
              delayTime={300}
              threshold={200}
              effect="blur"
              wrapperProps={{ style: { transitionDelay: "0.5s" } }}
              className="h-full w-full"
            />
          </div>
        </div>

        {/* Sub Image (Overlayed on the Left) */}
        <div className="absolute hidden md:flex justify-start items-center w-full h-full -mr-5">
          <div className="hidden md:block w-60 h-48 object-cover">
            <ImageRender
              src={about?.sub_img_url}
              type={"server"}
              alt="Vision Sub Image"
              ratio="4/3"
              delayTime={300}
              threshold={200}
              effect="blur"
              wrapperProps={{ style: { transitionDelay: "0.5s" } }}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </Pannel>
  );
});
