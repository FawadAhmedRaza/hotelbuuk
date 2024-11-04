import React, { useState } from "react";

import { CustomTable, Pagination } from "@/src/components/custom-table";
import { Button,  ProfileAvatar, Typography } from "@/src/components";
import {  useSelector } from "react-redux";
import { calculateDaysBetweenDates } from "@/src/libs/helper";
import { formatDate } from "@/src/utils/formate-date";
import { useTranslation } from "react-i18next";

const header  = (t)=> [
  { id: 1, label: t("listing.labels.bki") },
  { id: 2, label: t("common.ev") },
  { id: 3, label: t("common.loc") },
  { id: 4, label: t("common.stat") },
  { id: 5, label: t("links.nd") },
  { id: 6, label: t("common.checkin") },
  { id: 7, label: t("common.checkout") },
  { id: 8, label: t("listing.labels.tg") },
  { id: 9, label: t('listing.labels.td')},
  { id: 10, label: t('listing.labels.ep') },
  { id: 11, label: t('listing.labels.sf')},
  { id: 12, label: t('listing.labels.tp') },
];

const GuestBookingList = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const {t} = useTranslation()
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
        TABLE_HEADER={header(t)}
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

export default GuestBookingList;
