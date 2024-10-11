import React from "react";
import { Pannel, Typography } from "../components";
import { Terms_Content } from "../contants";
import { terms_first_para } from "../contants/terms-content";

export const ConditionsContent = React.memo(() => {
  return (
    <Pannel className=" capitalize">
      <Typography variant="h2" className="mb-10 font-semibold">
        Terms and Conditions
      </Typography>

      <Typography
        variant="p"
        className="!text-[20px] !leading-[40px] !tracking-[5%]"
      >
        {terms_first_para}
      </Typography>

      <div className="flex flex-col gap-20 mt-24">
        {Terms_Content.map((term) => {
          return (
            <div className="">
              <Typography
                variant="h3"
                className="!text-[26px] font-semibold mb-5"
              >
                {term.title}
              </Typography>
              <Typography variant="p" className="!text-[20px] !leading-[40px]">
                {term.text}
              </Typography>
            </div>
          );
        })}
      </div>
    </Pannel>
  );
});
