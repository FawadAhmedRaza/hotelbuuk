"use client";
import React, { useEffect, useState } from "react";

import { useBoolean } from "@/src/hooks";
import { useDispatch, useSelector } from "react-redux";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";
import { useRouter } from "next/navigation";

import { deleteEvent, getAllNomadEvents } from "@/src/redux/events/thunk";

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
import RoomListSkeleton from "@/src/components/Skeleton/room-list-skeleton";

const header = [
  { id: 1, label: "Title" },
  { id: 2, label: "Description" },
  { id: 3, label: "Business Category" },
  { id: 4, label: "Official Name" },
  { id: 5, label: "Accommodation Type" },
  { id: 6, label: "Address" },
  { id: 7, label: "Availibility" },
  { id: 8, label: "Price" },
  { id: 9, label: "Amenities" },
  { id: 10, label: "Rules" },
  { id: 11, label: "" },
];
const NomadEventsView = React.memo(() => {
  const { isOpen, setIsOpen, toggleDrawer } = useBoolean();
  const { user } = useAuthContext();
  const dispatch = useDispatch();
  const router = useRouter();

  const [eventId, setEventId] = useState("");
  const [eventName, setEventName] = useState("");

  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { events, isLoading } = useSelector((state) => state.nomadEvents);

  const { isLoading: deleteLoading } = useSelector(
    (state) => state.nomadEvents.deleteById
  );

  const totalPages = React.useMemo(() => {
    return Math.ceil(events?.length / rowsPerPage);
  }, [events, rowsPerPage]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return events?.slice(start, end);
  }, [page, events, rowsPerPage]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  //Edit room
  const handleEventEdit = (id) => {
    router.push(paths.nomadDashboard.events.edit(id));
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteEvent(eventId)).unwrap(); // Dispatch delete action

      router.refresh();
    } catch (error) {
      console.error("Error deleting room:", error); // Handle error properly
    } finally {
      setIsOpen(false); // Close the modal
    }
  };

  const handleViewEvent = (id) => {
    router.push(`/nomad-dashboard/view-event/${id}?type=NOMAD`);
  };

  const openDeleteModal = (id, name) => {
    setIsOpen(!isOpen);
    setEventId(id);
    setEventName(name);
  };

  useEffect(() => {
    const fetchNomadEvents = async () => {
      try {
        await dispatch(getAllNomadEvents(user?.id)).unwrap();
      } catch (error) {
        console.log("Error fetching rooms:", error);
      }
    };
    fetchNomadEvents();
  }, []);

  return (
    <>
      {!isLoading ? (
        <Pannel className="flex flex-col gap-10">
          <Breadcrumb
            title="Nomads Events"
            action={
              <AnchorTag href={paths.nomadDashboard.events.create}>
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
                const rules = {
                  check_in: row.check_in,
                  cancellation_policy: row.cancellation_policy,
                  check_out: row.check_out,
                  no_smoking: row.no_smoking,
                  pets_policy: row.pets_policy,
                  quiet_hours: row.quiet_hours,
                  pool_usage: row.pool_usage,
                  payment_policy: row.payment_policy,
                };

                const trueRules = Object.entries(rules).filter(
                  ([key, value]) => value === true
                );

                return (
                  <>
                    <td className=" px-6 py-4">
                      <Typography
                        variant="p"
                        className="  !text-nowrap max-w-56"
                      >
                        {row?.title}
                      </Typography>
                    </td>
                    <td className="px-6 py-4">
                      <Typography variant="p" className="!text-nowrap ">
                        {row?.description?.length > 40
                          ? `${row?.description?.slice(0, 40)}...`
                          : row?.description}
                      </Typography>
                    </td>
                    <td className="px-6 py-4">
                      <Typography
                        variant="p"
                        className="  !text-nowrap max-w-56"
                      >
                        {row?.business_category}
                      </Typography>
                    </td>
                    <td className="px-6 py-4">
                      <Typography
                        variant="p"
                        className="  !text-nowrap max-w-56"
                      >
                        {row?.official_name}
                      </Typography>
                    </td>
                    <td className="px-6 py-4">
                      <Typography
                        variant="p"
                        className="  !text-nowrap max-w-56"
                      >
                        {row?.accomodation_type}
                      </Typography>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex flex-col">
                        <span className="flex gap-1">
                          <Typography
                            variant="p"
                            className="  !text-nowrap max-w-56"
                          >
                            {row?.city},{" "}
                          </Typography>
                          <Typography
                            variant="p"
                            className="  !text-nowrap max-w-56"
                          >
                            {row?.country}
                          </Typography>
                        </span>
                        <Typography
                          variant="p"
                          className="  !text-nowrap max-w-56"
                        >
                          {row?.address}
                        </Typography>
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="flex gap-1">
                        <Typography
                          variant="p"
                          className="  !text-nowrap max-w-56"
                        >
                          {row?.start_date?.toString().slice(0, 10)}
                        </Typography>
                        <span>-</span>
                        <Typography
                          variant="p"
                          className="  !text-nowrap max-w-56"
                        >
                          {row?.end_date?.toString().slice(0, 10)}
                        </Typography>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Typography
                        variant="p"
                        className="  !text-nowrap max-w-56"
                      >
                        {row.price}
                      </Typography>
                    </td>
                    <td className="px-6 py-4 max-w-full custom-scrollbar">
                      <span className="flex gap-2">
                        {row?.amenities?.slice(0, 4)?.map((amenity) => (
                          <span
                            className="p-2 rounded-lg text-xs text-primary bg-[#feccf4] text-nowrap"
                            key={amenity?.id}
                          >
                            {amenity?.name}
                          </span>
                        ))}

                        {row?.amenities?.length > 4 && (
                          <span className="p-2 rounded-lg text-xs text-primary bg-[#feccf4] text-nowrap">
                            +{row?.amenities?.length - 4} more
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 max-w-full custom-scrollbar">
                      <span className="flex gap-2">
                        {trueRules?.slice(0, 4)?.map((rule, index) => (
                          <span
                            className="p-2 rounded-lg text-xs text-primary bg-[#feccf4] text-nowrap"
                            key={index}
                          >
                            {rule[0]}
                          </span>
                        ))}

                        {trueRules?.length > 4 && (
                          <span className="p-2 rounded-lg text-xs text-primary bg-[#feccf4] text-nowrap">
                            +{trueRules?.length - 4} more
                          </span>
                        )}
                      </span>
                    </td>
                    <td className=" px-6 py-4">
                      <span className="flex gap-5">
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
                          onClick={() => openDeleteModal(row.id, row?.title)}
                          iconName="fluent-mdl2:delete"
                          className="text-red-500 cursor-pointer"
                        />
                      </span>
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
      ) : (
        <RoomListSkeleton />
      )}
    </>
  );
});

export default NomadEventsView;
