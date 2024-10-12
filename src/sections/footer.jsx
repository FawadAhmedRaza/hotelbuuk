import React from "react";
import { AnchorTag, Iconify, Pannel, Typography } from "../components";
import { BgIcon } from "../components/bg-icon";

export const Footer = () => {
  return (
    <div className=" flex flex-col w-full h-full">
      <Pannel className="relative flex flex-col lg:flex-row items-start  gap-10 w-full h-auto lg:h-96 bg-footer bg-cover bg-no-repeat  z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-black  opacity-55 -z-20" />
        {/* Logo */}

        <div className="flex flex-col lg:flex-row gap-5">
          <div className="h-full  lg:mt-4  ">
            <Typography
              variant="h3"
              className="!text-3xl md:!text-4xl font-bold text-white text-start   "
            >
              Hotelbuuk
            </Typography>
          </div>

          {/* Content */}

          <div className="flex items-start md:items-center  lg:mt-4">
            <Typography
              variant="p"
              className="text-sm w-full  lg:!w-80 text-white text-wrap text-justify"
            >
              The printing and typesetting industry. Lorem Ipsum has been The
              printing and typesetting industry. Lorem Ipsum has been The
              printing and typesetting industry. Lorem Ipsum has been The
              printing and typesetting industry. Lorem Ipsum has been The
              printing and typesetting industry. Lorem Ipsum has been
            </Typography>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between lg:items-center w-full h-auto lg:h-full gap-5 flex-1">
          {/* Legal */}
          <div className="flex flex-col gap-5 ">
            <Typography variant="h3" className="font-semibold text-white ">
              Legal
            </Typography>
            <span className="flex flex-col gap-3">
              <AnchorTag
                className="text-white font-poppins font-normal text-base"
                href="/about"
              >
                About Us
              </AnchorTag>
              <AnchorTag
                className="text-white font-poppins font-normal text-base"
                href="/impressum"
              >
                Impressum
              </AnchorTag>
              <AnchorTag
                className="text-white font-poppins font-normal text-base"
                href="/terms"
              >
                Terms & Conditions
              </AnchorTag>
              <AnchorTag
                className="text-white font-poppins font-normal text-base"
                href="/privacy-policy"
              >
                Privacy Policy
              </AnchorTag>
            </span>
          </div>

          <div className="flex flex-col -mt-5">
            <Typography variant="h3" className="font-semibold text-white ">
              Social
            </Typography>

            <div className="flex  items-start gap-6 my-10">
              <div className=" p-2 bg-white rounded-full w-min h-min text-2xl">
                <Iconify
                  iconName="ri:facebook-fill"
                  className="text-black !text-2xl"
                />
              </div>

              <div className=" p-2 bg-white rounded-full w-min h-min text-2xl">
                <Iconify
                  iconName="pajamas:twitter"
                  className="text-black !text-2xl"
                />
              </div>
            </div>
          </div>
          {/* Contact */}
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
          copyrights © Hotelbuuk Technologies all rights reserved.
        </Typography>
      </div>
    </div>
  );
};
