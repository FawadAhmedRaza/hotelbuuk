import React from "react";
import { Button, Pannel, Typography } from "../components";
import { PreviewHotels } from "./preview-hotels";
import { paths } from "../contants";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export const PreviewHotelsSection = React.memo(() => {
  const { t } = useTranslation();

  return (
    <Pannel className="flex flex-col gap-10   ">
      <div className="flex justify-start  flex-col mt-5">
        <Typography
          variant="h2"
          className="font-semibold text-start !text-black"
        >
          {t("home.hotelPreview.title")}
        </Typography>
        <Typography
          variant="h6"
          className="font-normal text-start mt-2 text-neutral-400"
        >
          {t("home.hotelPreview.shortDes")}
        </Typography>
      </div>

      <PreviewHotels />

      <div className="flex flex-col justify-center items-center gap-5">
        <Typography variant="h4" className="font-semibold text-center mt-2">
          {t("home.hotelPreview.actionDes")}
        </Typography>
        <Link href={paths.hotels.root}>
          <Button className=" w-full sm:w-fit">
            {t("common.showmore")}
          </Button>
        </Link>
      </div>
    </Pannel>
  );
});
