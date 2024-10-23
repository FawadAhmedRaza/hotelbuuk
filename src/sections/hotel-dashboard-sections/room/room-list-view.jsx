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
import {
  deleteRoom,
  getAllRooms,
  getRooms,
} from "@/src/redux/hotel-rooms/thunk";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";
import { useRouter } from "next/navigation";
import RoomListSkeleton from "@/src/components/Skeleton/room-list-skeleton";

const header = [
  { id: 1, label: "Room Name" },
  { id: 2, label: "Description" },
  { id: 3, label: "Maximum Occupancy" },
  { id: 4, label: "Room Type" },
  { id: 5, label: "Price" },
  { id: 6, label: "" },
];
const RoomsListView = React.memo(() => {
  const [roomId, setRoomId] = useState("");
  const [roomName, setRoomName] = useState("");
  const { user } = useAuthContext();
  const dispatch = useDispatch();
  const router = useRouter();

  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { rooms, isLoading } = useSelector((state) => state.rooms.getAllRooms);

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

  //Edit room
  const handleRoomEdit = (id) => {
    console.log(id);
    router.push(paths.createRooms.edit(id));
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteRoom(roomId)).unwrap(); // Dispatch delete action

      router.refresh();
    } catch (error) {
      console.error("Error deleting room:", error); // Handle error properly
    } finally {
      setIsOpen(false); // Close the modal
    }
  };

  const openDeleteModal = (id, name) => {
    setIsOpen(!isOpen);
    setRoomId(id);
    setRoomName(name);
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        await dispatch(getRooms(user?.hotels?.[0].id)).unwrap();
      } catch (error) {
        console.log("Error fetching rooms:", error);
      }
    };
    fetchRooms();
  }, []);

  return (
    <>
      {!isLoading ? (
        <Pannel className="flex flex-col gap-10">
          <Breadcrumb
            title="Rooms List"
            action={
              <AnchorTag href={paths.createRooms.root}>
                <Button>Create Room</Button>
              </AnchorTag>
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
                  <td className=" px-6 py-4">
                    <div className="flex gap-5">
                      <Iconify
                        onClick={() => handleRoomEdit(row.id)}
                        iconName="lucide:edit"
                        className="text-gray-500 cursor-pointer"
                      />

                      <Iconify
                        onClick={() => openDeleteModal(row.id, row.room_name)}
                        iconName="fluent-mdl2:delete"
                        className="text-red-500 cursor-pointer"
                      />
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

          {isOpen && (
            <DeleteModal
              isLoading={isLoading}
              title="Delete Room"
              isOpen={isOpen}
              onClose={toggleDrawer}
              handleDelete={handleDelete}
            >
              <Typography variant="p">
                Are you sure you want to delete {roomName}?
              </Typography>
            </DeleteModal>
          )}
        </Pannel>
      ) : (
        <RoomListSkeleton />
      )}
    </>
  );
});

export default RoomsListView;
