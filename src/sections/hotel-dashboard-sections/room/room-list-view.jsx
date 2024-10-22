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
import { getHotelById, getHotelInfo } from "@/src/redux/hotel-info/thunk";
import { StarRating } from "@/src/components/star-rating";
import { getAllRooms, getRooms } from "@/src/redux/hotel-rooms/thunk";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";
import { useRouter } from "next/navigation";

const header = [
  { id: 1, label: "Room Name" },
  { id: 2, label: "Description" },
  { id: 3, label: "Maximum Occupancy" },
  { id: 4, label: "Room Type" },
  { id: 5, label: "Price" },
];
const RoomsListView = React.memo(() => {
  const { user } = useAuthContext();
  const dispatch = useDispatch();
  const router = useRouter();

  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { rooms, isLoading } = useSelector((state) => state.rooms.getAllRooms);

  const { hotel } = useSelector((state) => state.hotelInfo.getById);

  const totalPages = React.useMemo(() => {
    return Math.ceil(rooms?.length / rowsPerPage);
  }, [rooms, rowsPerPage]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return rooms?.slice(start, end);
  }, [page, rooms, rowsPerPage]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        await dispatch(getHotelById(user.id)).unwrap();
      } catch (error) {
        console.log("Error fetching hotel:", error);
      }
    };
    fetchHotel();
  }, [dispatch, user.id]);

  useEffect(() => {
    if (hotel?.id) {
      const fetchRooms = async () => {
        try {
          await dispatch(getRooms(hotel.id)).unwrap();
        } catch (error) {
          console.log("Error fetching rooms:", error);
        }
      };
      fetchRooms();
    }
  }, [dispatch, hotel.id]);

  return (
    <Pannel className="flex flex-col gap-10">
      <Breadcrumb
        title="Rooms List"
        action={
          <Button onClick={() => router.push("/create-room")}>
            Create New room
          </Button>
        }
      />
      <div className="border border-gray-200 rounded-xl">
        <CustomTable
          items={items}
          TABLE_HEADER={header}
          enableSelection={false}
          renderRow={(row) => (
            <>
              <td className=" px-6 py-4">
                <Typography variant="p" className="  !text-nowrap max-w-56">
                  {row.room_name}
                </Typography>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="  !text-nowrap max-w-56">
                  {row.description}
                </Typography>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="  !text-nowrap max-w-56">
                  {row.maximum_occupancy}
                </Typography>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="  !text-nowrap max-w-56">
                  {row.room_type}
                </Typography>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="  !text-nowrap max-w-56">
                  {row.price}
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
  );
});

export default RoomsListView;
