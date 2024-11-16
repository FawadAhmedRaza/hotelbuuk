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
import RoomListSkeleton from "@/src/components/Skeleton/room-list-skeleton";
import { useBoolean } from "@/src/hooks";
import {
  deleteEventById,
  getAllHotelEvents,
} from "@/src/redux/hotel-event/thunk";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
      const res = await dispatch(deleteEventById(eventId)).unwrap();

      if (res.message === "success") {
      }
    } catch (error) {
      console.error("Error deleting room:", error);
    } finally {
      setIsOpen(false);
    }
  };

  const handleViewEvent = (id) => {
    router.push(`/hotel-dashboard/view-event/${id}?type=HOTEL`);
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
          title="My Listings"
          action={
            <Link href={paths.hotelDashboard.events.create}>
              <Button className="bg-blue-900">Create Listing</Button>
             
            </Link>
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
                  <td className="px-6 py-4">
                    <Typography variant="p" className="!text-nowrap">
                      {row?.title?.length > 30
                        ? `${row?.title?.slice(0, 30)}...`
                        : row?.title}
                    </Typography>
                  </td>
                  <td className="px-6 py-4">
                    <Typography
                      variant="p"
                      className="!text-nowrap !text-clip w-full"
                    >
                      {row?.description?.length > 40
                        ? `${row?.description?.slice(0, 40)}...`
                        : row?.description}
                    </Typography>
                  </td>
                  <td className="px-6 py-4">
                    <Typography variant="p" className="  !text-nowrap max-w-56">
                      {row?.business_category}
                    </Typography>
                  </td>
                  <td className="px-6 py-4">
                    <Typography variant="p" className="  !text-nowrap   ">
                      {row?.official_name?.length > 30
                        ? `${row?.official_name?.slice(0, 30)}...`
                        : row?.official_name?.length}
                    </Typography>
                  </td>
                  <td className="px-6 py-4">
                    <Typography variant="p" className="  !text-nowrap max-w-56">
                      ${row?.price}
                    </Typography>
                  </td>
                  <td className="px-6 py-4 max-w-full custom-scrollbar">
                    <div className="flex gap-2">
                      {row?.event_associated_amenities
                        ?.slice(0, 4)
                        ?.map((fac) => (
                          <span
                            className="p-2 rounded-lg text-xs text-black bg-[#F2F2F2] text-nowrap"
                            key={fac?.id}
                          >
                            {fac?.name}
                          </span>
                        ))}

                      {row?.event_associated_amenities?.length > 4 && (
                        <span className="p-2 rounded-lg text-xs text-black bg-[#F2F2F2] text-nowrap">
                          +{row?.event_associated_amenities?.length - 4} more
                        </span>
                      )}
                    </div>
                  </td>

                  <td className=" px-6 py-4">
                    <div className="flex gap-5">
                      <Iconify
                        onClick={() => handleViewEvent(row.id)}
                        iconName="icon-park-outline:preview-open"
                        className="text-blue-500 cursor-pointer"
                      />
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
