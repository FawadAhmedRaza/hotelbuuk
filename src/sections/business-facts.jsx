"use client";

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Button, Pannel, ProfileAvatar, Typography } from "../components";
import { BusinessFactsData } from "../_mock/_business-facts";
import { cn } from "@/lib/utils";
import { CustomCollapsible } from "../components/custom-collapsible";
import { enqueueSnackbar } from "notistack";
import axiosInstance from "../utils/axios";
import { calculateDaysBetweenDates } from "../libs/helper";
import BusinessFactsSkeleton from "../components/Skeleton/business-facts-skeleton";
import { useAuthContext } from "../providers/auth/context/auth-context";
import { useRouter } from "next/navigation";
import { paths } from "../contants";

export const BusinessFacts = React.memo(({ className }) => {
  const router = useRouter();
  const { user } = useAuthContext();
  const [visibleFacts, setVisibleFacts] = React.useState(4);
  const [isOpen, setIsOpen] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [businessFacts, setBusinessFacts] = useState([]);

  const fetchBusinssFacts = async () => {
    try {
      setIsLoading(true);
      const request = await axiosInstance.get("/business-facts");
      setBusinessFacts(request?.data?.list);
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.message, { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinssFacts();
  }, []);

  const handleVisibleFacts = () => {
    setIsOpen(true);
    if (visibleFacts < BusinessFactsData?.length) {
      setVisibleFacts((prevNum) => prevNum + 2);
    } else {
      setVisibleFacts(4);
    }
  };

  const handleAsk = (item) => {
    if (user) {
      router.push(paths?.chats?.chatsById(item?.user?.id));
    } else {
      router.push(paths?.auth?.login);
    }
  };

  return (
    <Pannel
      className={cn(
        "w-full flex flex-col gap-10 bg-white  px-0 sm:px-3 lg:px-9 xl:px-5",
        className
      )}
    >
      {isLoading ? (
        <BusinessFactsSkeleton />
      ) : (
        <>
          <div className="flex flex-col gap-2 px-8">
            <Typography
              variant="h2"
              className="font-semibold text-start !text-black"
            >
              Business Facts
            </Typography>
            <Typography
              variant="h6"
              className="font-normal text-start  text-neutral-400"
            >
              Our journey in numbers and highlights.
            </Typography>
          </div>
          {/* <CustomCollapsible isOpen={isOpen}> */}
            <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5">
              {businessFacts?.slice(0, visibleFacts)?.map((item, index) => (
                <div
                  key={index + 1}
                  className={cn(
                    " flex flex-col gap-4 w-full p-5 rounded-2xl !shadow-custom-shadow-sm x bg-white ",
                    [1, 2, 5].includes(index) &&
                      "!bg-white  !shadow-custom-shadow-sm"
                  )}
                >
                  <div className="flex flex-col min-500:flex-row gap-3 min-500:gap-5 items-start">
                    <ProfileAvatar
                      src={item?.cover_img}
                      type={"server"}
                      effect="blur"
                      alt={item?.title}
                      className="w-full min-500:w-36 h-full rounded"
                    />
                    <span className="flex flex-col gap-1">
                      <Typography variant="h4" className="font-semibold">
                        {item?.title}
                      </Typography>
                      <Typography
                        variant="p"
                        className="font-medium  !text-sm "
                      >
                        {item?.description}
                      </Typography>
                    </span>
                  </div>
                  <ul className="list-disc list-inside flex flex-col  ">
                    {item?.business_facts_amenities?.map((point, index) => (
                      <li key={index} className="text-sm">
                        {point?.name}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Typography variant="p" className="font-medium text-start">
                      ${item?.price} for{" "}
                      {calculateDaysBetweenDates(
                        item?.start_date,
                        item?.end_date
                      )}{" "}
                      days per guest
                    </Typography>
                    <Button
                      onClick={() => handleAsk(item)}
                      className="py-1.5 px-4 mx-auto min-450:mx-0"
                    >
                      Ask {item?.user?.nomad[0].first_name}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          {/* </CustomCollapsible> */}
          <div className="flex flex-col justify-center items-center gap-5">
            <Typography variant="h4" className="font-semibold text-center mt-2">
              Explore More Business Facts
            </Typography>
            <Button onClick={handleVisibleFacts}>
              {visibleFacts === businessFacts?.length
                ? "Show less "
                : "Show More"}
            </Button>
          </div>
        </>
      )}
    </Pannel>
  );
});

export default BusinessFacts;
