"use client";

import React, { useEffect, useState } from "react";
import { useModal } from "@/src/hooks/use-modal";

import InviteNomadModal from "../modals/invite-nomad-modal";
import {
  Breadcrumb,
  Button,
  Iconify,
  Pannel,
  ProfileAvatar,
  Typography,
} from "@/src/components";
import { useDispatch, useSelector } from "react-redux";
import {
  getInternalNomad,
  getNomadsProfile,
} from "@/src/redux/nomad-profile/thunk";
import { CustomTable, Pagination } from "@/src/components/custom-table";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";
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

const InternalNomadsListView = () => {
  const inviteModal = useModal();
  const dispatch = useDispatch();
  const { user } = useAuthContext();

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { nomads, isLoading } = useSelector((state) => state.nomadProfile);

  const totalPages = React.useMemo(() => {
    return Math.ceil(nomads?.length / rowsPerPage);
  }, [nomads, rowsPerPage]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return nomads?.slice(start, end);
  }, [page, nomads, rowsPerPage]);

  console.log("All internal nomads", items);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const fetchInternalNomads = async () => {
    try {
      await dispatch(getInternalNomad(user?.hotels[0].id)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInternalNomads();
  }, []);

  return (
    <Pannel className="flex flex-col gap-10 !py-8">
      <Breadcrumb
        title="Internal Nomads"
        action={
          <Button type="button" onClick={inviteModal.onTrue}>
            Invite Nomad
          </Button>
        }
      />

      {inviteModal.onTrue && (
        <InviteNomadModal
          isOpen={inviteModal.value}
          onClose={inviteModal.onFalse}
        />
      )}

      {!isLoading ? (
        <div className="border border-gray-200 rounded-xl">
          <CustomTable
            items={items}
            TABLE_HEADER={header}
            enableSelection={false}
            renderRow={({ nomad }) => (
              <>
                <td className=" px-6 py-4">
                  <div className="flex gap-2 items-center">
                    {!nomad?.profile_img ? (
                      <Iconify
                        iconName="carbon:user-avatar-filled"
                        className="!size-10   rounded-full object-cover text-gray-500"
                      />
                    ) : (
                      <ProfileAvatar
                        src={nomad?.profile_img}
                        type={"server"}
                        alt={nomad?.first_name}
                        className="  h-10 w-10 rounded-full object-cover"
                      />
                    )}

                    <div className="flex gap-1">
                      <Typography
                        variant="p"
                        className="  !text-nowrap max-w-56"
                      >
                        {nomad?.first_name}
                      </Typography>
                      <Typography
                        variant="p"
                        className="  !text-nowrap max-w-56"
                      >
                        {nomad?.last_name}
                      </Typography>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Typography variant="p" className="  !text-nowrap max-w-56">
                    {nomad?.email}
                  </Typography>
                </td>
                <td className="px-6 py-4">
                  <Typography variant="p" className="  !text-nowrap max-w-56">
                    {nomad?.phone_number}
                  </Typography>
                </td>

                <td className="px-6 py-4">
                  <div className="flex gap-1">
                    <Typography variant="p" className="  !text-nowrap max-w-56">
                      {nomad?.start_date.toString().slice(0, 10)}
                    </Typography>
                    <span>-</span>
                    <Typography variant="p" className="  !text-nowrap max-w-56">
                      {nomad?.end_date.toString().slice(0, 10)}
                    </Typography>
                  </div>
                  <div className="flex gap-1">
                    <Typography variant="p" className="  !text-nowrap max-w-56">
                      {nomad?.start_time}
                    </Typography>
                    <span>-</span>
                    <Typography variant="p" className="  !text-nowrap max-w-56">
                      {nomad?.end_time}
                    </Typography>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Typography variant="p" className="  !text-nowrap max-w-56">
                    {nomad?.experience}
                  </Typography>
                </td>
                <td className="px-6 py-4">
                  <Typography variant="p" className="  !text-nowrap max-w-56">
                    {nomad?.electronics}
                  </Typography>
                </td>
                <td className="px-6 py-4">
                  <Typography variant="p" className="  !text-nowrap max-w-56">
                    {nomad?.manufacturing}
                  </Typography>
                </td>
                <td className="px-6 py-4">
                  <Typography variant="p" className="  !text-nowrap max-w-56">
                    {nomad?.fundraising}
                  </Typography>
                </td>
                <td className="px-6 py-4">
                  <Typography variant="p" className="  !text-nowrap max-w-56">
                    {nomad?.retails}
                  </Typography>
                </td>
                <td className="px-6 py-4">
                  <Typography variant="p" className="  !text-nowrap max-w-56">
                    {nomad?.projector}
                  </Typography>
                </td>
                <td className="px-6 py-4">
                  <Typography variant="p" className="  !text-nowrap max-w-56">
                    {nomad?.video}
                  </Typography>
                </td>
                <td className="px-6 py-4">
                  <Typography variant="p" className="  !text-nowrap max-w-56">
                    {nomad?.sample}
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
      ) : (
        <RoomListSkeleton />
      )}
    </Pannel>
  );
};

export default InternalNomadsListView;
