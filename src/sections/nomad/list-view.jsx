"use client";
import React from "react";

// Components and Others...
import {
  AnchorTag,
  Breadcrumb,
  Button,
  Iconify,
  Pannel,
  Typography,
} from "@/src/components";
import { CustomTable, Pagination } from "@/src/components/custom-table";
import { NomadList } from "@/src/_mock/nomad-list";
import Link from "next/link";
import { paths } from "@/src/contants";
import { RHFCheckbox } from "@/src/components/hook-form";

const header = [
  { id: 1, label: "" },
  { id: 2, label: "Date" },
  { id: 3, label: "Listing Title" },
  { id: 4, label: "Availability" },
  { id: 5, label: "Guest Profile" },
  { id: 6, label: "Hotel Name" },
  { id: 7, label: "Accommodation Type" },
  { id: 8, label: "Status" },
  { id: 9, label: "" },
];
export const NomadListView = React.memo(() => {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const totalPages = React.useMemo(() => {
    return Math.ceil(NomadList?.length / rowsPerPage);
  }, [NomadList, rowsPerPage]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return NomadList?.slice(start, end);
  }, [page, NomadList, rowsPerPage]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <Pannel className="flex flex-col gap-10">
      <Breadcrumb
        title="Nomad Listing"
        action={
          <Link href={paths.nomad.create}>
            <Button>Create New Listing</Button>
          </Link>
        }
      />
      <div className="border border-gray-200 rounded-xl">
        <CustomTable
          items={items}
          TABLE_HEADER={header}
          enableSelection={false}
          renderRow={(row) => (
            <>
              <td className="px-6 py-4">
                <span>
                  <input
                    type="checkbox"
                    value="hello"
                    className="h-5 w-5 rounded-xl border border-black accent-primary transition-colors duration-200"
                  />
                </span>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="  !text-nowrap max-w-56">
                  {row.date}
                </Typography>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="  !text-nowrap max-w-56">
                  {row.title}
                </Typography>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="  !text-nowrap max-w-56">
                  {row.availability}
                </Typography>
              </td>
              <td className="flex items-center gap-1 px-6 py-4">
                <div className="h-8 w-8 ">
                  <img
                    src={row?.guest.image}
                    alt={row?.guest.name}
                    className="w-full h-full rounded-full"
                  />
                </div>
                <AnchorTag href="#">
                  <Typography
                    variant="p"
                    className="!text-xs   !text-nowrap max-w-56"
                  >
                    {row?.guest.name},
                  </Typography>
                </AnchorTag>
                <Typography
                  variant="p"
                  className="!text-xs   !text-nowrap max-w-56"
                >
                  {row?.guest.country}
                </Typography>
              </td>
              <td className=" px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8">
                    <img
                      src={row?.hotel.image}
                      alt={row?.hotel.name}
                      className="w-full h-full rounded-lg object-cover"
                    />
                  </div>
                  <Typography
                    variant="p"
                    className=" text-nowrap truncate max-w-56"
                  >
                    {row?.hotel.name}
                  </Typography>
                </div>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="   !text-nowrap truncate">
                  {row?.accommodation_type}
                </Typography>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="   !text-nowrap truncate">
                  {row.status}
                </Typography>
              </td>
              <td className="flex  gap-5 px-6 py-4">
                <Iconify iconName="lucide:edit" className="text-gray-500" />
                <Iconify
                  iconName="fluent-mdl2:delete"
                  className="text-red-500"
                />
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
