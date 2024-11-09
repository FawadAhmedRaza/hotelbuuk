import React from "react";
import { AnchorTag, Button, Iconify, Pannel, Typography } from "../components";
import { paths } from "../contants";
import Link from "next/link";

export const Banner = React.memo(() => {
  return (
    <Pannel className="flex flex-col md:flex-row w-full items-center gap-10 md:gap-3 h-full ">
      <div className="flex flex-col justify-center items-center md:items-start gap-3 lg:gap-6 h-full w-full grow">
        <Typography
          variant="h3"
          className="font-semibold  md:!leading-50ld text-center sm:text-start"
        >
          Are you taking your business abroad{" "}
          <br className=" hidden md:block" /> or opening a new branch?
        </Typography>
        <Typography variant="h6" className=" text-center sm:text-start">
          Find hotels with in-house consultants to walk you through.
        </Typography>
        <Link href={"#"}>
          <Button className="bg-[#25D366] px-5">
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
