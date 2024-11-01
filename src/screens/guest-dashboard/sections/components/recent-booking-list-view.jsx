import React, { useState } from "react";

import { CustomTable, Pagination } from "@/src/components/custom-table";
import { Button, ProfileAvatar, Typography } from "@/src/components";
import { useSelector } from "react-redux";
import { calculateDaysBetweenDates } from "@/src/libs/helper";
import { formatDate } from "@/src/utils/formate-date";
import { filterUpcomingEvents } from "./utils";

const header = [
  { id: 1, label: "Booking id" },
  { id: 2, label: "Event" },
  { id: 3, label: "Location" },
  { id: 4, label: "Status" },
  { id: 5, label: "Nomad" },
  { id: 6, label: "Check-in" },
  { id: 7, label: "Check-out" },
  { id: 8, label: "Total guests" },
  { id: 9, label: "Total days" },
  { id: 10, label: "Event price" },
  { id: 11, label: "Service fee" },
  { id: 12, label: "Total price" },
];

const RecentBookingListView = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { guestBookings: upcomingEvents } = useSelector(
    (state) => state.bookings
  );
  console.log("guest bookings", upcomingEvents);

  const guestBookings = filterUpcomingEvents(upcomingEvents || []);
  console.log("upcoming bookings", guestBookings);

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
    <div className="border border-gray-200 rounded-xl mt-4">
      <CustomTable
        items={items}
        TABLE_HEADER={header}
        enableSelection={false}
        renderRow={(row) => {
          let user =
            row?.hotel_event?.nomad ||
            (row?.nomad_event?.accomodation_type === "bnb"
              ? row?.user
              : row?.user);
          return (
            <>
              <td className=" px-6 py-4">
                <Typography variant="body1" className="!text-nowrap max-w-56">
                  #
                  {row?.hotel_event?.id?.slice(0, 6)?.toUpperCase() ||
                    row?.nomad_event?.id?.slice(0, 6)?.toUpperCase()}
                </Typography>
              </td>
              <td className=" px-6 py-4">
                <Typography variant="body1" className="!text-nowrap max-w-56">
                  {row?.hotel_event?.title || row?.nomad_event?.title}
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
                <div className="flex gap-2 max-w-60 md:w-52">
                  <ProfileAvatar
                    src={user?.profile_img}
                    type={"server"}
                    alt={user?.first_name || user?.hotel_name}
                    className="  h-10 w-10 rounded-full object-cover"
                  />
                  <div className="">
                    <Typography variant="p" className="!text-nowrap max-w-56">
                      {user?.first_name + "" + user?.last_name ||
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
                <Typography variant="p" className="!text-nowrap max-w-56">
                  {formatDate(
                    row?.hotel_event?.start_date || row?.nomad_event?.start_date
                  )}
                </Typography>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="!text-nowrap max-w-56">
                  {formatDate(
                    row?.hotel_event?.end_date || row?.nomad_event?.end_date
                  )}
                </Typography>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="  !text-nowrap max-w-56">
                  {row?.no_of_guests}
                </Typography>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="  !text-nowrap max-w-56">
                  {calculateDaysBetweenDates(
                    row?.hotel_event?.start_date ||
                      row?.nomad_event?.start_date,
                    row?.hotel_event?.end_date || row?.nomad_event?.end_date
                  )}
                </Typography>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="  !text-nowrap max-w-56">
                  $ {row?.hotel_event?.price || row?.nomad_event?.price}
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

export default RecentBookingListView;
