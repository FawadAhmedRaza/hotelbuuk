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
import { getNomadsProfile } from "@/src/redux/nomad-profile/thunk";
import RoomListSkeleton from "@/src/components/Skeleton/room-list-skeleton";

const header = [
  { id: 1, label: "Name" },
  { id: 2, label: "Email" },
  { id: 3, label: "Phone" },
  { id: 4, label: "Availibility" },
  { id: 5, label: "Experience" },
  { id: 6, label: "Electronics" },
  { id: 7, label: "Manufacturing" },
  { id: 8, label: "Fundraising" },
  { id: 9, label: "Retails" },
  { id: 10, label: "Projector" },
  { id: 11, label: "Video" },
  { id: 12, label: "Sample" },
];
const NomadsListSection = React.memo(() => {
  const dispatch = useDispatch();

  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { nomads, isLoading } = useSelector((state) => state.nomadProfile);
  console.log("nomads list", nomads);

  const totalPages = React.useMemo(() => {
    return Math.ceil(nomads?.length / rowsPerPage);
  }, [nomads, rowsPerPage]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return nomads?.slice(start, end);
  }, [page, nomads, rowsPerPage]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const fetchNomads = async () => {
    try {
      await dispatch(getNomadsProfile()).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNomads();
  }, []);

  return (
    <>
      {!isLoading ? (
        <Pannel className="flex flex-col gap-10">
          <Breadcrumb title="Nomads List" />
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
                      <div className="flex gap-1">
                        <Typography
                          variant="p"
                          className="  !text-nowrap max-w-56"
                        >
                          {row.first_name}
                        </Typography>
                        <Typography
                          variant="p"
                          className="  !text-nowrap max-w-56"
                        >
                          {row.last_name}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Typography variant="p" className="  !text-nowrap max-w-56">
                      {row.email}
                    </Typography>
                  </td>
                  <td className="px-6 py-4">
                    <Typography variant="p" className="  !text-nowrap max-w-56">
                      {row.phone_number}
                    </Typography>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      <Typography
                        variant="p"
                        className="  !text-nowrap max-w-56"
                      >
                        {row?.start_date.toString().slice(0, 10)}
                      </Typography>
                      <span>-</span>
                      <Typography
                        variant="p"
                        className="  !text-nowrap max-w-56"
                      >
                        {row?.end_date.toString().slice(0, 10)}
                      </Typography>
                    </div>
                    <div className="flex gap-1">
                      <Typography
                        variant="p"
                        className="  !text-nowrap max-w-56"
                      >
                        {row?.start_time}
                      </Typography>
                      <span>-</span>
                      <Typography
                        variant="p"
                        className="  !text-nowrap max-w-56"
                      >
                        {row?.end_time}
                      </Typography>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Typography variant="p" className="  !text-nowrap max-w-56">
                      {row.experience}
                    </Typography>
                  </td>
                  <td className="px-6 py-4">
                    <Typography variant="p" className="  !text-nowrap max-w-56">
                      {row.electronics}
                    </Typography>
                  </td>
                  <td className="px-6 py-4">
                    <Typography variant="p" className="  !text-nowrap max-w-56">
                      {row.manufacturing}
                    </Typography>
                  </td>
                  <td className="px-6 py-4">
                    <Typography variant="p" className="  !text-nowrap max-w-56">
                      {row.fundraising}
                    </Typography>
                  </td>
                  <td className="px-6 py-4">
                    <Typography variant="p" className="  !text-nowrap max-w-56">
                      {row.retails}
                    </Typography>
                  </td>
                  <td className="px-6 py-4">
                    <Typography variant="p" className="  !text-nowrap max-w-56">
                      {row.projector}
                    </Typography>
                  </td>
                  <td className="px-6 py-4">
                    <Typography variant="p" className="  !text-nowrap max-w-56">
                      {row.video}
                    </Typography>
                  </td>
                  <td className="px-6 py-4">
                    <Typography variant="p" className="  !text-nowrap max-w-56">
                      {row.sample}
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
        </Pannel>
      ) : (
        <RoomListSkeleton />
      )}
    </>
  );
});

export default NomadsListSection;
