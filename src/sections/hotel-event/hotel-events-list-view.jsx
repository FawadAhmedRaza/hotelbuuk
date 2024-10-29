"use client";
import React, { useEffect, useState } from "react";

// Components and Others...
import {
  AnchorTag,
  Breadcrumb,
  Button,
  DeleteModal,
  Iconify,
  Pannel,
  Typography,
} from "@/src/components";
import { paths } from "@/src/contants";
import { CustomTable, Pagination } from "@/src/components/custom-table";
import { useDispatch, useSelector } from "react-redux";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";
import { useRouter } from "next/navigation";
import RoomListSkeleton from "@/src/components/Skeleton/room-list-skeleton";
import { useBoolean } from "@/src/hooks";
import {
  deleteEventById,
  getAllHotelEvents,
} from "@/src/redux/hotel-event/thunk";

const header = [
  { id: 1, label: "Title" },
  { id: 2, label: "Description" },
  { id: 3, label: "Business category" },
  { id: 4, label: "Official name" },
  { id: 5, label: "Price" },
  { id: 6, label: "Amenities" },
  { id: 7, label: "Actions" },
];

const HotelEventsView = React.memo(() => {
  const { isOpen, setIsOpen, toggleDrawer } = useBoolean();
  const { user } = useAuthContext();
  const dispatch = useDispatch();
  const router = useRouter();

  const [eventId, setEventId] = useState("");
  const [eventName, setEventName] = useState("");

  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { hotelEvents } = useSelector((state) => state.hotelEvent);
  const { isLoading: deleteLoading } = useSelector(
    (state) => state.hotelEvent.deleteById
  );

  console.log("hotel events", hotelEvents);

  const totalPages = React.useMemo(() => {
    return Math.ceil(hotelEvents?.length / rowsPerPage);
  }, [hotelEvents, rowsPerPage]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return Array.isArray(hotelEvents) ? hotelEvents.slice(start, end) : [];
  }, [page, hotelEvents, rowsPerPage]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleEventEdit = (id) => {
    router.push(paths.hotelDashboard.events.edit(id));
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteEventById(eventId)).unwrap();
      router.refresh();
    } catch (error) {
      console.error("Error deleting room:", error);
    } finally {
      setIsOpen(false);
    }
  };

  const openDeleteModal = (id, name) => {
    setIsOpen(!isOpen);
    setEventId(id);
    setEventName(name);
  };

  return (
    <>
      <Pannel className="flex flex-col gap-10">
        <Breadcrumb
          title="Hotel Events"
          action={
            <AnchorTag href={paths.hotelDashboard.events.create}>
              <Button>Create Event</Button>
            </AnchorTag>
          }
        />
        <div className="border border-gray-200 rounded-xl">
          <CustomTable
            items={items}
            TABLE_HEADER={header}
            enableSelection={false}
            renderRow={(row) => {
              return (
                <>
                  <td className=" px-6 py-4">
                    <Typography variant="p" className="  !text-nowrap max-w-56">
                      {row?.title}
                    </Typography>
                  </td>
                  <td className="px-6 py-4">
                    <Typography variant="p" className="!text-nowrap max-w-56">
                      {row.description}
                    </Typography>
                  </td>
                  <td className="px-6 py-4">
                    <Typography variant="p" className="  !text-nowrap max-w-56">
                      {row?.business_category}
                    </Typography>
                  </td>
                  <td className="px-6 py-4">
                    <Typography variant="p" className="  !text-nowrap max-w-56">
                      {row?.official_name}
                    </Typography>
                  </td>
                  <td className="px-6 py-4">
                    <Typography variant="p" className="  !text-nowrap max-w-56">
                      {row?.price}
                    </Typography>
                  </td>
                  <td className="px-6 py-4 max-w-full custom-scrollbar">
                    <div className="flex gap-2">
                      {row?.event_associated_amenities
                        ?.slice(0, 4)
                        ?.map((fac) => (
                          <span
                            className="p-2 rounded-lg text-xs text-primary bg-[#feccf4] text-nowrap"
                            key={fac?.id}
                          >
                            {fac?.name}
                          </span>
                        ))}

                      {row?.event_associated_amenities?.length > 4 && (
                        <span className="p-2 rounded-lg text-xs text-primary bg-[#feccf4] text-nowrap">
                          +{row?.event_associated_amenities?.length - 4} more
                        </span>
                      )}
                    </div>
                  </td>

                  <td className=" px-6 py-4">
                    <div className="flex gap-5">
                      <Iconify
                        onClick={() => handleEventEdit(row.id)}
                        iconName="lucide:edit"
                        className="text-gray-500 cursor-pointer"
                      />

                      <Iconify
                        onClick={() => openDeleteModal(row?.id, row.title)}
                        iconName="fluent-mdl2:delete"
                        className="text-red-500 cursor-pointer"
                      />
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

        {isOpen && (
          <DeleteModal
            isLoading={deleteLoading}
            title="Delete Room"
            isOpen={isOpen}
            onClose={toggleDrawer}
            handleDelete={handleDelete}
          >
            <Typography variant="p">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{eventName}</span> ?
            </Typography>
          </DeleteModal>
        )}
      </Pannel>
    </>
  );
});

export default HotelEventsView;
