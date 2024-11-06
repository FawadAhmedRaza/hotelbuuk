import { Pannel, Typography } from "@/src/components";
import { Layout } from "@/src/sections";
import React from "react";

const WishlistScreen = () => {
  return (
    <div>
      <Layout>
        <Pannel className="flex flex-col gap-10   ">
          <div className="flex justify-start  flex-col mt-5">
            <Typography
              variant="h2"
              className="font-semibold text-start !text-black"
            >
              Wishlist
            </Typography>
            <Typography
              variant="h6"
              className="font-normal text-start mt-2 text-neutral-400"
            >
              Find Business Hotels with Local Market Insights.
            </Typography>
          </div>
        </Pannel>
      </Layout>
    </div>
  );
};

export default WishlistScreen;
