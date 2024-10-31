import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { updateBookingStatus } from "@/src/redux/bookings/thunk";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";

import { enqueueSnackbar } from "notistack";

import { CustomTable, Pagination } from "@/src/components/custom-table";
import { Button, ProfileAvatar, Typography } from "@/src/components";
import { calculateDaysBetweenDates } from "@/src/libs/helper";

const header = [
  { id: 1, label: "Guest" },
  { id: 2, label: "E-mail" },
  { id: 3, label: "Total guests" },
  { id: 4, label: "Event days" },
  { id: 5, label: "Event price" },
  { id: 6, label: "Service fee" },
  { id: 7, label: "Total price" },
  { id: 8, label: "Event" },
  { id: 9, label: "Status" },
];

const NomadBookingList = () => {
  const dispatch = useDispatch();
  const { user } = useAuthContext();

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { allBookings } = useSelector((state) => state.bookings);

  const { isLoading } = useSelector((state) => state.bookings.updateStatus);

  const totalPages = React.useMemo(() => {
    return Math.ceil(allBookings?.length / rowsPerPage);
  }, [allBookings, rowsPerPage]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return allBookings?.slice(start, end);
  }, [page, allBookings, rowsPerPage]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const updateStatus = async (row, status) => {
    try {
      let data = {
        guest: row?.guest,
        organizer: user,
        eventTitle: row?.nomad_event?.title,
        event_type: "NOMAD",
        status,
      };
      await dispatch(updateBookingStatus({ id: row?.id, data: data })).unwrap();
      enqueueSnackbar(
        `Booking ${
          status === "ACCEPTED" ? "accepted" : "rejected"
        } successfully`,
        { variant: "success" }
      );
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.message, { variant: "error" });
    }
  };

  return (
    <div className="border border-gray-200 rounded-xl">
      <CustomTable
        items={items}
        TABLE_HEADER={header}
        enableSelection={false}
        renderRow={(row) => {
          console.log("row", row);
          return (
            <>
              <td className=" px-6 py-4">
                <div className="flex gap-2 items-center">
                  <ProfileAvatar
                    src={row?.guest?.profile_img}
                    type={"server"}
                    effect="blur"
                    alt={row?.guest?.first_name}
                    className="  h-10 w-10 rounded-full object-cover"
                  />
                  <div className="flex gap-1">
                    <Typography variant="p" className="!text-nowrap max-w-56">
                      {row?.guest?.first_name}
                    </Typography>
                    <Typography variant="p" className="!text-nowrap max-w-56">
                      {row?.guest?.last_name}
                    </Typography>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="!text-nowrap max-w-56">
                  {row?.guest?.email}
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
              <td className="px-6 py-4">
                <Typography variant="p" className="  !text-nowrap max-w-56">
                  {row?.nomad_event?.title}
                </Typography>
              </td>
              <td className=" px-6 py-4">
                <div className="flex gap-2">
                  {row?.booking_status === "PENDING" ? (
                    <>
                      <Button
                        className="!px-4 !py-1.5 !text-sm"
                        onClick={() => updateStatus(row, "ACCEPTED")}
                        disabled={isLoading}
                      >
                        Accept
                      </Button>
                      <Button
                        className="!px-4 !py-1.5 !text-sm !bg-red-500"
                        onClick={() => updateStatus(row, "REJECTED")}
                        disabled={isLoading}
                      >
                        Reject
                      </Button>
                    </>
                  ) : row?.booking_status === "ACCEPTED" ? (
                    <Button className="!px-4 !py-1.5 !text-sm !bg-green-700">
                      Accepted
                    </Button>
                  ) : (
                    <Button className="!px-4 !py-1.5 !text-sm !bg-red-700">
                      Rejected
                    </Button>
                  )}
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
};

export default NomadBookingList;
