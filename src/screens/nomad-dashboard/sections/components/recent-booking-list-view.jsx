"use client";
import React from "react";

// Components and Others...
import {
  Avatar,
  Breadcrumb,
  Button,
  Pannel,
  Typography,
} from "@/src/components";
import { CustomTable, Pagination } from "@/src/components/custom-table";
import { ResentBooking } from "@/src/_mock/resent_booking";
import Link from "next/link";
import { paths } from "@/src/contants";

const header = [
  { id: 1, label: "Guest Name" },
  { id: 1, label: "Booking ID#" },
  { id: 2, label: "Check-in" },
  { id: 3, label: "CheckOut" },
  { id: 4, label: "Total Night" },
  { id: 5, label: "Nomad  Name" },
  { id: 6, label: "Booking Status  " },
  { id: 7, label: "Amount  " },
  { id: 8, label: "Hotel Income  " },
  { id: 9, label: "Nomad Income  " },
];
export const RecentBookingListView = React.memo(() => {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const totalPages = React.useMemo(() => {
    return Math.ceil(ResentBooking?.length / rowsPerPage);
  }, [ResentBooking, rowsPerPage]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return ResentBooking?.slice(start, end);
  }, [page, ResentBooking, rowsPerPage]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="flex flex-col gap-10 mt-5">
      <div>
        <CustomTable
          items={items}
          TABLE_HEADER={header}
          enableSelection={false}
          renderRow={(row) => (
            <>
              <td className="px-6 py-4">
                <div className=" flex gap-2 max-w-60 md:w-52">
                  <Avatar
                    src="/assets/images/man15.jpeg"
                    className=" shadow-custom-shadow-xs border-none size-10"
                  />
                  <div>
                    <Typography variant="p" className="  !text-nowrap ">
                      {row.guest_name}
                    </Typography>
                    <Typography variant="p" className="  !text-xs">
                      {/* {row.guest_name} */}
                      anasraza@gmail.com
                    </Typography>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="  !text-nowrap max-w-56">
                  {row.booking_id}
                </Typography>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="   !text-nowrap max-w-56">
                  {row?.check_in}
                </Typography>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="   !text-nowrap truncate">
                  {row?.check_out}
                </Typography>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="   !text-nowrap truncate">
                  {row.total_night}
                </Typography>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="   !text-nowrap truncate">
                  {row.nomad_name}
                </Typography>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="   !text-nowrap truncate">
                  {row.booking_status}
                </Typography>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="   !text-nowrap truncate">
                  {row.amount}
                </Typography>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="   !text-nowrap truncate">
                  {row.hotel_income}
                </Typography>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="   !text-nowrap truncate">
                  {row.nomad_income}
                </Typography>
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
    </div>
  );
});
