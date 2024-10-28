"use client";
import React from "react";
import { AnchorTag, Button, Card, Pannel, Typography } from "@/src/components";
import { guestReviewsData } from "@/src/_mock/_guest-review";

export const GuestReviews = () => {
  const [visibleReview, setVisibleReview] = React.useState(2);

  const visibleReviewList = guestReviewsData?.slice(0, visibleReview);

  const handleLoadReview = (e) => {
    e.preventDefault();
    if (visibleReview < guestReviewsData?.length) {
      setVisibleReview((prevList) => prevList + 2);
    } else {
      setVisibleReview(2);
    }
  };
  return (
    <Pannel className="flex flex-col gap-10 justify-start items-start  ">
      {/* Header */}
      <Typography variant="h3" className="font-semibold">
        Guests Reviews
      </Typography>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-10">
        {visibleReviewList?.map((review) => (
          <Card
            key={review.id}
            className="flex flex-col justify-start items-start gap-2"
          >
            {/* Guest Info */}
            <div className="flex gap-4 items-center w-fit">
              <img
                src={review?.user}
                alt={review.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <Typography variant="p" className="font-semibold">
                  {review.name}
                </Typography>
                <Typography variant="h6">{review.location}</Typography>
              </div>
            </div>
            {/* Review Content */}
            <span className="flex items-center gap-3">
              <Typography variant="p" className="text-black text-sm">
                {"★".repeat(review.rating)}
              </Typography>

              <Typography
                variant="p"
                className="text-black text-sm font-medium"
              >
                {review.date}
              </Typography>
            </span>

            <Typography className="text-secondary" variant="p">
              {review?.review}
            </Typography>

            {/* Show More */}
            <AnchorTag href="#">Show More</AnchorTag>
          </Card>
        ))}
      </div>
      <span className="w-full  flex justify-start">
        <Button onClick={handleLoadReview}>
          {guestReviewsData?.length > visibleReviewList?.length
            ? ` Show All ${guestReviewsData?.length - visibleReview} Reviews`
            : "Show less"}
        </Button>
      </span>
    </Pannel>
  );
};
