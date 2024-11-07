import { Pannel, Typography } from "@/src/components";
import Image from "next/image";
import React from "react";

import ImageRender from "@/src/components/ImageRenderer";
import DOMPurify from "dompurify";

export const MissionStatement = React.memo(({ about }) => {

  const sanitizedContent = DOMPurify.sanitize(about?.description);

  return (
    <Pannel className="grid lg:grid-cols-2 gap-5 md:flex-row w-full items-center sm:gap-3 h-full">
      <div className="relative flex">
        <div className=" h-64 md:h-96 w-full md:w-[80%] lg:w-[80%]">
          <ImageRender
            src={about?.main_img_url}
            type={"server"}
            alt={`Uploaded Image`}
            ratio="4/3"
            delayTime={300}
            threshold={200}
            effect="blur"
            wrapperProps={{ style: { transitionDelay: "0.5s" } }}
            className="h-full w-full   "
          />
        </div>
        <div className="absolute hidden md:flex justify-end items-center w-full h-full  -ml-5 ">
          <div className="hidden md:block w-60 h-48 object-cover">
            <ImageRender
              src={about?.sub_img_url}
              type={"server"}
              alt={`Uploaded Image`}
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
      <div className="flex flex-col justify-center gap-5">
        <Typography variant="h4" className="font-bold">
          {about?.title}
        </Typography>

        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />

        {/* <Typography variant="h6" className="leading-[35px]">
          the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s, when an unknown
          printer took a galley of type and scrambled it to make a type specimen
          bookthe printing and typesetting industry.{" "}
        </Typography> */}
      </div>
    </Pannel>
  );
});
