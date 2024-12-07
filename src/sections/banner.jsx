import React from "react";
import { AnchorTag, Button, Iconify, Pannel, Typography } from "../components";
import { paths } from "../contants";
import Link from "next/link";
import { whatsapp_link } from "../_mock/_footer-content";

export const Banner = React.memo(() => {
  return (
    <Pannel className="flex flex-col md:flex-row w-full items-center gap-10 md:gap-3 h-full ">
      <div className="flex flex-col justify-center items-center md:items-start gap-3 lg:gap-6 h-full w-full grow">
        <Typography
          variant="h2"
          className="font-semibold  !capitalize md:!leading-50ld text-center sm:text-start"
        >
          GLOBAL <span className="text-green-500">DESTINATIONS</span> AWAIT
        </Typography>
        <Typography variant="h6" className=" text-center sm:text-start">
          Find hotels with in-house consultants to walk you through.
        </Typography>
        <Link href={whatsapp_link} target="_blank" rel="noopener noreferrer">
          <Button className="bg-[#25D366] px-5 !font-semibold">
            {" "}
            <Iconify
              iconName="ic:baseline-whatsapp"
              className="!text-white !size-8"
            />{" "}
            Chat with us
          </Button>
        </Link>
      </div>
      <div className=" overflow-hidden h-full sm:h-60  w-full  rounded-md sm:w-[650px] relative z-10">
        <img
          src="/assets/images/square4.jpeg"
          className="h-full w-full object-cover rounded-md"
        />
      </div>
    </Pannel>
  );
});
