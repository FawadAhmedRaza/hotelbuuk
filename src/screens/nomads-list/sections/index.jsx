"use client";
import React, { useEffect } from "react";
import {
  Breadcrumb,
  Iconify,
  Pannel,
  ProfileAvatar,
  Typography,
} from "@/src/components";
import { CustomTable, Pagination } from "@/src/components/custom-table";
import { useDispatch, useSelector } from "react-redux";
import { getNomadsProfile } from "@/src/redux/nomad-profile/thunk";
import RoomListSkeleton from "@/src/components/Skeleton/room-list-skeleton";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const header = (t) => [
  { id: 1, label: t("listing.labels.n") },
  { id: 2, label: t("listing.labels.em") },
  { id: 3, label: t("listing.labels.ph") },
  { id: 4, label: t("listing.labels.avl") },
  { id: 5, label: t("listing.labels.exp") },
  { id: 6, label: t("listing.labels.elec") },
  { id: 7, label: t("listing.labels.manuf") },
  { id: 8, label: t("listing.labels.fund") },
  { id: 9, label: t("listing.labels.rtl") },
  { id: 10, label: t("listing.labels.prj") },
  { id: 11, label: t("listing.labels.v") },
  { id: 12, label: t("listing.labels.smp") },
  { id: 13, label: t("listing.labels.act") },
];

const NomadsListSection = React.memo(() => {
  const dispatch = useDispatch();
  const router = useRouter()

  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { nomads, isLoading } = useSelector((state) => state.nomadProfile);
  const {t} = useTranslation()
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
          <Breadcrumb title={t("links.ndl")} />
          <div className="border border-gray-200 rounded-xl">
            <CustomTable
              items={items}
              TABLE_HEADER={header(t)}
              enableSelection={false}
              renderRow={(row) => (
                <>
                  <td key={row?.id} className=" px-6 py-4">
                    <div className="flex gap-2 items-center">
                      <ProfileAvatar
                        src={row?.profile_img}
                        type={"server"}
                        effect="blur"
                        alt={row?.first_name}
                        className="  h-10 w-10 rounded-full object-cover"
                      />
                      <div className="flex gap-1">
                        <Typography
                          variant="p"
                          className="  !text-nowrap max-w-56"
                        >
                          {row?.first_name}
                        </Typography>
                        <Typography
                          variant="p"
                          className="  !text-nowrap max-w-56"
                        >
                          {row?.last_name}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Typography variant="p" className="  !text-nowrap max-w-56">
                      {row?.email}
                    </Typography>
                  </td>
                  <td className="px-6 py-4">
                    <Typography variant="p" className="  !text-nowrap max-w-56">
                      {row?.phone_number}
                    </Typography>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-1">
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
                      {row?.experience}
                    </Typography>
                  </td>
                  <td className="px-6 py-4">
                    <Typography variant="p" className="  !text-nowrap max-w-56">
                      {row?.electronics}
                    </Typography>
                  </td>
                  <td className="px-6 py-4">
                    <Typography variant="p" className="  !text-nowrap max-w-56">
                      {row?.manufacturing}
                    </Typography>
                  </td>
                  <td className="px-6 py-4">
                    <Typography variant="p" className="  !text-nowrap max-w-56">
                      {row?.fundraising}
                    </Typography>
                  </td>
                  <td className="px-6 py-4">
                    <Typography variant="p" className="  !text-nowrap max-w-56">
                      {row?.retails}
                    </Typography>
                  </td>
                  <td className="px-6 py-4">
                    <Typography variant="p" className="  !text-nowrap max-w-56">
                      {row?.projector}
                    </Typography>
                  </td>
                  <td className="px-6 py-4">
                    <Typography variant="p" className="  !text-nowrap max-w-56">
                      {row?.video}
                    </Typography>
                  </td>
                  <td className="px-6 py-4">
                    <Typography variant="p" className="  !text-nowrap max-w-56">
                      {row?.sample}
                    </Typography>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1 items-center">
                      <Iconify
                        iconName="tabler:mail-filled"
                        onClick={() => router.push(`/chat/${row.userId}`)}
                        className="!size-7  cursor-pointer rounded-full object-cover text-blue-500"
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
        </Pannel>
      ) : (
        <RoomListSkeleton />
      )}
    </>
  );
});

export default NomadsListSection;
