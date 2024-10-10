import React from "react";
import { Pannel, Typography } from "../components";
import { Terms_Content } from "../contants";
import { terms_first_para } from "../contants/terms-content";
import { impressum_data } from "../_mock/_impressum";

export const ImpressumContent = React.memo(() => {
  return (
    <Pannel className="flex flex-col gap-20  capitalize">
      <div>
        <Typography variant="h4" className=" font-semibold">
          Service provider within the meaning of § 5 TMG:
        </Typography>
        <div className="flex flex-col gap-3 !font-light mt-5">
          <Typography variant="h5" className=" leading-[50px]">
            Company Name
          </Typography>
          <Typography variant="h5" className=" leading-[50px]">
            Address
          </Typography>
        </div>
      </div>

      <div>
        <Typography variant="h4" className="font-semibold">
          Contact Information:{" "}
        </Typography>
        <div className="flex flex-col gap-3 !font-light mt-5">
          <Typography variant="h5" className=" leading-[50px]">
            Phone: [Phone Number]{" "}
          </Typography>
          <Typography variant="h5" className=" leading-[50px]">
            Fax: [Fax Number]
          </Typography>
          <Typography variant="h5" className=" leading-[50px]">
            Email: [Email Address]{" "}
          </Typography>
        </div>
      </div>

      <div>
        <Typography variant="h4" className="!text-[26px] font-semibold">
          Authorized Representatives:
        </Typography>
        <div className="flex flex-col gap-3 !font-light mt-5">
          <Typography variant="h5" className="!text-[20px] leading-[50px]">
            Registered office: [Country]{" "}
          </Typography>
          <Typography variant="h5" className="!text-[20px] leading-[50px]">
            Registration court: [Court Name]
          </Typography>
          <Typography variant="h5" className="!text-[20px] leading-[50px]">
            Commercial registration number: [Number]{" "}
          </Typography>
          <Typography variant="h5" className="!text-[20px] leading-[50px]">
            VAT ID: [ID Number]{" "}
          </Typography>
          <Typography variant="h5" className="!text-[20px] leading-[50px]">
            Tax ID: [ID Number]{" "}
          </Typography>
        </div>
      </div>

      {/* <Typography
        variant="p"
        className="!text-[20px] !leading-[40px] !tracking-[5%]"
      >
        {terms_first_para}
      </Typography> */}

      {/* <div className="flex flex-col gap-20 mt-24">
        {Terms_Content.map((term) => {
          return (
            <div className="">
              <Typography
                variant="h3"
                className="text-[26px] font-semibold mb-5"
              >
                {term.title}
              </Typography>
              <Typography variant="p" className="!text-[20px] !leading-[40px]">
                {term.text}
              </Typography>
            </div>
          );
        })}
      </div> */}
    </Pannel>
  );
});
