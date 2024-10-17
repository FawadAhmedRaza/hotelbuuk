"use client";
import React from "react";

// Components and Others...
import { Breadcrumb, Button, Pannel, Typography } from "@/src/components";
import { CustomTable, Pagination } from "@/src/components/custom-table";
import { ResentBooking } from "@/src/_mock/resent_booking";
import Link from "next/link";
import { paths } from "@/src/contants";

const header = [
  { id: 1, label: "Date" },
  { id: 2, label: "Time" },
  { id: 3, label: "Nomad Name" },
  { id: 4, label: "Booking status" },
  { id: 5, label: "Booking Price" },
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
          className=" rounded-none"
          items={items}
          TABLE_HEADER={header}
          enableSelection={false}
          renderRow={(row) => (
            <>
              <td className="px-6 py-4">
                <Typography variant="p" className="  !text-nowrap max-w-56">
                  {row.date}
                </Typography>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="  !text-nowrap max-w-56">
                  {row.time}
                </Typography>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="   !text-nowrap max-w-56">
                  {row?.nomad_name}
                </Typography>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="   !text-nowrap truncate">
                  {row?.booking_status}
                </Typography>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="   !text-nowrap truncate">
                  {row.booking_price}
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
