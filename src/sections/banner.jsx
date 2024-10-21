import React from "react";
import { AnchorTag, Button, Pannel, Typography } from "../components";
import { paths } from "../contants";

export const Banner = React.memo(() => {
  return (
    <div className="flex items-center  bg-banner bg-cover bg-center bg-no-repeat w-full h-96 sm:h-80">
      <Pannel className="flex flex-col md:flex-row w-full items-center gap-3 sm:gap-3 h-full">
        <div className="flex flex-col justify-center items-center md:items-start gap-3 lg:gap-6 h-full w-full grow">
          <Typography
            variant="h3"
            className="font-semibold text-white md:!leading-50ld text-center sm:text-start"
          >
            Are you taking your business abroad <br /> or opening a new branch ?
          </Typography>
          <Typography
            variant="h6"
            className="text-white text-center sm:text-start"
          >
            Find hotels with in-house consultants to walk you through.
          </Typography>
        </div>
        <AnchorTag href={paths.auth.signUp}>
          <Button>Signup Now</Button>
        </AnchorTag>
      </Pannel>
    </div>
  );
});
