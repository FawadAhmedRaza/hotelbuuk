import React from "react";
import { AnchorTag, Pannel, Typography } from "../components";
import { BgIcon } from "../components/bg-icon";

export const Footer = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <Pannel className=" flex flex-col md:flex-row items-start md:items-center justify-between gap-10 w-full md:h-96 bg-footer bg-cover ">
        <span className="grow">
          <Typography variant="p" className="text-sm sm:!w-80 text-white text-wrap">
            The printing and typesetting industry. Lorem Ipsum has been
          </Typography>
        </span>
        <div className=" flex flex-col md:flex-row  items-start gap-12 w-full lg:w-[30%] bg-cover grow justify-between">
          <div className="flex flex-col gap-5">
            <Typography variant="h3" className="font-semibold text-white ">
              Legal
            </Typography>
            <span className="flex flex-col gap-3">
              <AnchorTag
                className="text-white font-poppins font-normal text-base"
                href="#"
              >
                About Us
              </AnchorTag>
              <AnchorTag
                className="text-white font-poppins font-normal text-base"
                href="#"
              >
                Impressum
              </AnchorTag>
              <AnchorTag
                className="text-white font-poppins font-normal text-base"
                href="#"
              >
                Terms & Conditions
              </AnchorTag>
              <AnchorTag
                className="text-white font-poppins font-normal text-base"
                href="#"
              >
                Privacy Policy
              </AnchorTag>
            </span>
          </div>
          <div className="flex flex-col justify-start gap-5 md:h-44">
            <Typography variant="h3" className="font-semibold text-white ">
              Contact
            </Typography>
            <span className="flex items-center gap-3">
              <BgIcon iconName="ic:baseline-email" iconClass="!text-black" />
              <AnchorTag
                className="text-white font-poppins font-normal text-base"
                href="#"
              >
                lorumispum@lorum.com
              </AnchorTag>
            </span>
          </div>
        </div>
      </Pannel>
      <div className="bg-primary w-full py-2">
        <Typography
          variant="p"
          className="text-sm text-center text-white font font-poppins  opacity-90"
        >
          copyright © 2024 all rights reserved @HOTELBUUK
        </Typography>
      </div>
    </div>
  );
};
