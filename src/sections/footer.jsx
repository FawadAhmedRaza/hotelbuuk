import React from "react";
import { AnchorTag, Iconify, Pannel, Typography } from "../components";
import { BgIcon } from "../components/bg-icon";
import Image from "next/image";
import Link from "next/link";
import { paths } from "../contants";
import { fb_link, twitter_link } from "../_mock/_footer-content";

export const Footer = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="relative flex lg:flex-row flex-col xl:gap-[70px] lg:gap-x-8 md:gap-x-8 gap-y-6 bg-black bg-cover bg-no-repeat z-10 py-10 md:py-16 items-start px-5 sm:px-8 lg:px-14 xl:px-10 ">
        <Link href={paths.root}>
          <div className="h-full">
            <img
              src={
                "/assets/images/hotelbuuk-logo/hotelbuuk-white/hotelbuuk.png"
              }
              className=" w-28 lg:w-fit"
            />
          </div>
        </Link>

        <div className="flex flex-col gap-5 items-start md:items-center">
          <Typography
            variant="h5"
            className="w-full text-white text-wrap text-justify font-semibold"
          >
            Welcome to Hotelbuuk, where luxury meets productivity.
          </Typography>
          <Typography
            variant="p"
            className="w-full text-white text-wrap text-justify"
          >
            Elevate your business experience with our tailored tours and factory
            visitations designed for business owners seeking networking
            opportunities, business expansion, and seamless, high-end
            accommodations.
          </Typography>
        </div>

        <div className="flex flex-col">
          <Typography variant="h3" className="font-semibold text-white ">
            Legal
          </Typography>
          <div className="flex flex-col gap-y-3 mt-4">
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
              className="text-white text-nowrap font-poppins font-normal text-base"
              href="/terms"
            >
              Terms & Conditions
            </AnchorTag>
            <AnchorTag
              className="text-white font-poppins   text-nowrap font-normal text-base"
              href="/privacy-policy"
            >
              Privacy Policy
            </AnchorTag>
          </div>
        </div>

        <div className="flex flex-col gap-y-3">
          <Typography variant="h3" className="font-semibold text-white ">
            Social
          </Typography>

          <div className="flex gap-x-2">
            <Link href={fb_link} target="_blank" rel="noopener noreferrer">
              <div className="p-2 bg-white rounded-full w-min h-min text-2xl">
                <Iconify
                  iconName="ri:facebook-fill"
                  className="text-black !text-2xl"
                />
              </div>
            </Link>
            <Link href={twitter_link} target="_blank" rel="noopener noreferrer">
              <div className="p-2 bg-white rounded-full w-min h-min text-2xl">
                <Iconify
                  iconName="pajamas:twitter"
                  className="text-black !text-2xl"
                />
              </div>
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-y-3">
          <Typography variant="h3" className="font-semibold text-white ">
            Contact
          </Typography>
          <div className="flex gap-x-2 items-center">
            <BgIcon iconName="ic:baseline-email" iconClass="!text-black" />
            <AnchorTag
              className="text-white font-poppins font-normal text-base"
              href="mailto:buuk@hotelbuuk.com"
            >
              buuk@hotelbuuk.com
            </AnchorTag>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-t from-[#3d0f30] to-[#000000] w-full h-full flex flex-col  px-5 sm:px-8 lg:px-14 xl:px-20">
        <p
          className="!text-[#4b133c] leading-none font-lemonMilk lg:!text-[120px] md:!text-[90px] sm:!text-[60px] !text-[40px] pt-[16px] text-center font-extrabold"
          style={{ textShadow: "rgba(255, 255, 255, 0.5) 0px 3px 3px" }}
        >
          HOTELBUUK
        </p>

        <p
          className="!text-transparent leading-none font-poppins lg:!text-[40px] md:!text-[30px] sm:!text-[20px] !text-[20px] pb-[20px] text-center"
          style={{ textShadow: "rgba(255, 255, 255, 0.5) 0px 3px 3px" }}
        >
          TECHNOLOGIES
        </p>
      </div>

      <hr className="text-white" />

      <div className="py-5 bg-primary">
        <Typography
          variant="p"
          className="text-sm text-center text-white font-poppins opacity-90"
        >
          copyrights © Hotelbuuk Technologies all rights reserved.
        </Typography>
      </div>
    </div>
  );
};
