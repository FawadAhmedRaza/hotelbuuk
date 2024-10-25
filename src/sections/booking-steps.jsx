import React from "react";
import { Card, Pannel, Typography } from "../components";
import { BookingStepsData } from "../_mock/_booking-steps";
import Image from "next/image";

export const BookingSteps = () => {
  return (
    <Pannel className="flex flex-col gap-10 px-3 md:!px-5 py-3 md:!py-6 justify-center items-center bg-white">
      <Typography variant="h3" className="font-semibold">
        Book in 3 Simple Steps
      </Typography>

      {/* <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
        {BookingStepsData?.map((item) => (
          <Card
            className="flex flex-col sm:flex-row lg:flex-col justify-start  gap-3 w-full sm:h-full  lg:h-96"
            key={item?.id}
          >
            <img src={item?.img} alt="img" className=" " />
            <span className=" flex flex-col justify-start gap-1 sm:gap-3 ">
              <Typography
                variant="h4"
                className="font-semibold text-center sm:text-start lg:text-center"
              >
                {item?.title}
              </Typography>
              <Typography
                variant="p"
                className=" text-center sm:text-start lg:text-center text-secondary lg:mt-5"
              >
                {item?.description}
              </Typography>
            </span>
          </Card>
        ))}
      </div> */}

      <div className=" md:px-10 space-y-10">
        <Card className="w-full px-3 sm:px-6  shadow-md py-4 f rounded-md border  md:flex-row flex-col gap-[30px] items-start">
          <div className="  w-full md:w-[20%] flex justify-center items-center">
            <Image
              src={"/assets/images/hotel-det-3.png"}
              height={200}
              width={250}
              className="rounded-md object-fill h-full md:h-[160px] w-full"
              alt="Hotel"
            />
          </div>
          <div className="  w-full  md:w-[80%] p-">
            <Typography variant="h3">Luxury Business Hotel</Typography>

            <Typography variant="p" className="mt-3 font-medium">
              Free High-Speed Wi-Fi, Complimentary Airport Shuttle Service,
              Fully Equipped Meeting Rooms, Luxury Spa and Wellness Center, 24/7
              In-Room Dining and Room Service, Dedicated Concierge Services,
              State-of-the-Art Fitness Center, Fine Dining Restaurant with
              Gourmet Cuisine, Outdoor Swimming Pool,Fine Dining Restaurant with
              Gourmet Cuisine, Outdoor Swimming Pool,
            </Typography>
          </div>
        </Card>

        <Card className="w-full shadow-md py-4 flex-col md:flex-row-reverse    gap-[30px] items-start rounded-md border">
          <div className=" w-full md:w-[20%] flex justify-center items-center">
            <Image
              src={"/assets/images/hotel-det-3.png"}
              height={200}
              width={250}
              className="rounded-md object-fill h-full md:h-[160px] w-full"
              alt="Hotel"
            />
          </div>
          <div className="   w-full  md:w-[80%] ">
            <Typography variant="h3"> Budget-Friendly Hotel</Typography>

            <Typography variant="p" className=" font-medium mt-2">
              Enjoy a comfortable and affordable stay with essential services
              for business travelers. Our budget-friendly hotel provides all the
              basics, making it ideal for short stays without breaking the bank
              Dedicated Concierge Services, State-of-the-Art Fitness Center,
              Fine Dining Restaurant with Gourmet Cuisine, Outdoor Swimming
              Pool, Fine Dining Restaurant with Gourmet Cuisine,
            </Typography>
          </div>
        </Card>

        <Card className="w-full shadow-md py-5 f md:flex-row flex-col gap-[30px] items-start   rounded-md border">
          <div className="  w-full md:w-[20%] flex justify-center items-center">
            <Image
              src={"/assets/images/hotel-det-3.png"}
              height={100}
              width={100}
              className="rounded-md object-fill h-full md:h-[160px] w-full"
              alt="Hotel"
            />
          </div>
          <div className="  w-full  md:w-[80%] ">
            <Typography variant="h3">Boutique Hotel</Typography>

            <Typography variant="p" className="mt-2 font-medium">
              A unique boutique hotel that blends modern style with personal
              service, perfect for those who want a more intimate, exclusive
              experience. Located in the city center, this hotel offers a cozy
              atmosphere with luxurious touches. Dedicated Concierge Services,
              State-of-the-Art Fitness Center, Fine Dining Restaurant with
              Gourmet Cuisine, Outdoor Swimming Pool,
            </Typography>
          </div>
        </Card>
      </div>
    </Pannel>
  );
};
