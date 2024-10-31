"use client";
import React, { useState } from "react";

// Components and Others...
import { Button, ProfileAvatar, Typography } from "@/src/components";
import { CustomTable, Pagination } from "@/src/components/custom-table";
import { useSelector } from "react-redux";
import { formatDate } from "@/src/utils/formate-date";
import { calculateDaysBetweenDates } from "@/src/libs/helper";

const header = [
  { id: 1, label: "Guest" },
  { id: 2, label: "Booking id" },
  { id: 3, label: "Event" },
  { id: 4, label: "Check-in" },
  { id: 5, label: "Check-out" },
  { id: 6, label: "Nomad" },
  { id: 7, label: "Total guests" },
  { id: 8, label: "Total days" },
  { id: 9, label: "Event price" },
  { id: 10, label: "Service fee" },
  { id: 11, label: "Total price" },
  { id: 12, label: "Status" },
];

export const RecentBookingListView = React.memo(() => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { recentBookingsList } = useSelector((state) => state.bookings);

  const totalPages = React.useMemo(() => {
    return Math.ceil(recentBookingsList?.length / rowsPerPage);
  }, [recentBookingsList, rowsPerPage]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return recentBookingsList?.slice(start, end);
  }, [page, recentBookingsList, rowsPerPage]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="border border-gray-200 rounded-xl mt-5">
      <CustomTable
        items={items}
        TABLE_HEADER={header}
        enableSelection={false}
        renderRow={(row) => {
          let accomodationType = row?.nomad_event?.accomodation_type;
          let user =
            accomodationType === "bnb" ? row?.user : row?.nomad_event?.hotel;
          return (
            <>
              <td className=" px-6 py-4">
                <div className="flex gap-2 max-w-60 md:w-52">
                  <ProfileAvatar
                    src={row?.guest?.profile_img}
                    type={"server"}
                    alt={row?.guest?.first_name}
                    className="  h-10 w-10 rounded-full object-cover"
                  />
                  <div className="">
                    <Typography variant="p" className="!text-nowrap max-w-56">
                      {row?.guest?.first_name + "" + row?.guest?.last_name}
                    </Typography>
                    <Typography
                      variant="p"
                      className="!text-xs !text-nowrap max-w-56"
                    >
                      {row?.guest?.email}
                    </Typography>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="!text-nowrap max-w-56">
                  #{row?.nomad_event?.id?.slice(0, 6)?.toUpperCase()}
                </Typography>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="  !text-nowrap max-w-56">
                  {row?.nomad_event?.title}
                </Typography>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="!text-nowrap max-w-56">
                  {formatDate(row?.nomad_event?.start_date)}
                </Typography>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="!text-nowrap max-w-56">
                  {formatDate(row?.nomad_event?.end_date)}
                </Typography>
              </td>
              <td className=" px-6 py-4">
                <div className="flex gap-2 max-w-60 md:w-52">
                  <ProfileAvatar
                    src={user?.profile_img}
                    type={"server"}
                    alt={user?.first_name || user?.hotel_name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="">
                    <Typography variant="p" className="!text-nowrap max-w-56">
                      {user?.first_name + " " + user?.last_name ||
                        user?.hotel_name}
                    </Typography>
                    <Typography
                      variant="p"
                      className="!text-xs !text-nowrap max-w-56"
                    >
                      {user?.email}
                    </Typography>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="  !text-nowrap max-w-56">
                  {row?.no_of_guests}
                </Typography>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="  !text-nowrap max-w-56">
                  {calculateDaysBetweenDates(
                    row?.nomad_event?.start_date,
                    row?.nomad_event?.end_date
                  )}
                </Typography>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="  !text-nowrap max-w-56">
                  $ {row?.nomad_event?.price}
                </Typography>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="  !text-nowrap max-w-56">
                  20 %
                </Typography>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="  !text-nowrap max-w-56">
                  $ {row?.total_price}
                </Typography>
              </td>
              <td className=" px-6 py-4">
                <div className="flex gap-2">
                  <Button
                    className={`!text-sm !px-4 !py-1.5 ${
                      row?.booking_status === "ACCEPTED"
                        ? "!bg-green-800"
                        : row?.booking_status === "REJECTED"
                        ? "!bg-red-700"
                        : "!bg-yellow-500"
                    }`}
                  >
                    {row?.booking_status === "ACCEPTED"
                      ? "Accepted"
                      : row?.booking_status === "PENDING"
                      ? "Pending"
                      : "Rejected"}
                  </Button>
                </div>
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
});
