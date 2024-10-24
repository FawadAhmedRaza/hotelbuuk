"use client";
import React, { useEffect, useState } from "react";

// Components and Others...
import {
  AnchorTag,
  Breadcrumb,
  Button,
  Iconify,
  Pannel,
  Typography,
} from "@/src/components";
import Link from "next/link";
import { paths } from "@/src/contants";
import { CustomTable, Pagination } from "@/src/components/custom-table";
import { useDispatch, useSelector } from "react-redux";
import { getHotelInfo } from "@/src/redux/hotel-info/thunk";
import { StarRating } from "@/src/components/star-rating";

const header = [
  { id: 1, label: "Name" },
  { id: 2, label: "Email" },
  { id: 3, label: "Contact" },
  { id: 4, label: "Location" },
  { id: 5, label: "Description" },
  { id: 6, label: "Rating" },
  { id: 7, label: "Facilities" },
];
const HotelsListSection = React.memo(() => {
  const dispatch = useDispatch();

  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { hotels } = useSelector((state) => state.hotelInfo);
  console.log("hotel list", hotels);

  const totalPages = React.useMemo(() => {
    return Math.ceil(hotels?.length / rowsPerPage);
  }, [hotels, rowsPerPage]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return hotels?.slice(start, end);
  }, [page, hotels, rowsPerPage]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const fetchHotels = async () => {
    try {
      await dispatch(getHotelInfo()).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <Pannel className="flex flex-col gap-10">
      <Breadcrumb title="Hotels List" />
      <div className="border border-gray-200 rounded-xl">
        <CustomTable
          items={items}
          TABLE_HEADER={header}
          enableSelection={false}
          renderRow={(row) => (
            <>
              <td className=" px-6 py-4">
                <div className="flex gap-2 items-center">
                  <img
                    src="/assets/images/hotel-det-1.png"
                    alt="avatar"
                    className="h-8 w-8 rounded-full"
                  />
                  <Typography variant="p" className="  !text-nowrap max-w-56">
                    {row.hotel_name}
                  </Typography>
                </div>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="  !text-nowrap max-w-56">
                  {row.contact_email}
                </Typography>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="  !text-nowrap max-w-56">
                  {row.hotel_contact_no}
                </Typography>
              </td>

              <td className="px-6 py-4">
                <div className="flex gap-1">
                  <Typography variant="p" className="  !text-nowrap max-w-56">
                    {row.country},
                  </Typography>
                  <Typography variant="p" className="  !text-nowrap max-w-56">
                    {row.city}
                  </Typography>
                </div>
                <span className="text-xs text-gray-500 text-nowrap">
                  {row.address}
                </span>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="  !text-nowrap max-w-56">
                  {row.description}
                </Typography>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-1 items-center">
                  <Typography variant="p" className=" !text-nowrap max-w-56">
                    {row.stars}
                  </Typography>
                  <StarRating rating={row.stars} className="!text-lg" />
                </div>
              </td>
              <td className="px-6 py-4 overflow-x-scroll max-w-60 custom-scrollbar">
                <div className="flex gap-2">
                  {row?.hotelFacilites.map((fac) => (
                    <span className="p-2 rounded-lg text-xs text-primary bg-[#feccf4] text-nowrap">
                      {fac.name}
                    </span>
                  ))}
                </div>
              </td>
            </>
          )}
        />
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      </div>
    </Pannel>
  );
});

export default HotelsListSection;
