import React, { useState } from "react";

import { CustomTable, Pagination } from "@/src/components/custom-table";
import { Button, Iconify, ProfileAvatar, Typography } from "@/src/components";
import { useDispatch, useSelector } from "react-redux";
import { calculateDaysBetweenDates } from "@/src/libs/helper";

const header = [
  { id: 1, label: "Event" },
  { id: 2, label: "Location" },
  { id: 3, label: "Booking Status" },
  { id: 4, label: "Guests" },
  { id: 4, label: "Total" },
];

const GuestBookingList = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { guestBookings } = useSelector((state) => state.bookings);

  const totalPages = React.useMemo(() => {
    return Math.ceil(guestBookings?.length / rowsPerPage);
  }, [guestBookings, rowsPerPage]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return guestBookings?.slice(start, end);
  }, [page, guestBookings, rowsPerPage]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="border border-gray-200 rounded-xl">
      <CustomTable
        items={items}
        TABLE_HEADER={header}
        enableSelection={false}
        renderRow={(row) => {
          return (
            <>
              <td className=" px-6 py-4">
                <Typography variant="body1" className="!text-nowrap max-w-56">
                  {row?.nomad_event?.title || row?.hotel_event?.title}
                </Typography>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="!text-nowrap max-w-full">
                  {row?.hotel_event
                    ? `${row?.hotel_event?.hotel?.address}, ${row?.hotel_event?.hotel?.city}, ${row?.hotel_event?.hotel?.country}`
                    : row?.nomad_event?.accomodation_type !== "bnb"
                    ? `${row?.nomad_event?.hotel?.address}, ${row?.nomad_event?.hotel?.city}, ${row?.nomad_event?.hotel?.country}`
                    : `${row?.nomad_event?.address}, ${row?.nomad_event?.city}, ${row?.nomad_event?.country}`}
                </Typography>
              </td>
              <td className=" px-6 py-4 w-full">
                <Typography variant="body1" className="!text-nowrap max-w-56">
                  <Button
                    className={`!text-sm !px-4 !py-1.5 ${
                      row?.booking_status === "ACCEPTED"
                        ? "!bg-green-800"
                        : row?.booking_status === "REJECTED"
                        ? "!bg-red-700"
                        : "!bg-yellow-500"
                    }`}
                  >
                    {row?.booking_status}
                  </Button>
                </Typography>
              </td>
              <td className=" px-6 py-4">
                <Typography variant="body1" className="!text-nowrap max-w-56">
                  {row?.no_of_guests}
                </Typography>
              </td>
              <td className=" px-6 py-4">
                <Typography variant="body1" className="!text-nowrap max-w-56">
                  $ {row?.total_price}
                </Typography>
              </td>
            </>
          );
        }}
      />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
    </div>
  );
};

export default GuestBookingList;
