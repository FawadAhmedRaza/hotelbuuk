"use client";
import React from "react";

// Components and Others...
import { Breadcrumb, Button, Pannel, Typography } from "@/src/components";
import { CustomTable, Pagination } from "@/src/components/custom-table";
import { NomadList } from "@/src/_mock/nomad-list";
import Link from "next/link";
import { paths } from "@/src/contants";

const header = [
  { id: 1, label: "Date" },
  { id: 2, label: "Availability" },
  { id: 3, label: "Hotel / BNB" },
  { id: 4, label: "Status" },
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
        title="Your Listing"
        action={
          <Link href={paths.nomad.create}>
            <Button>Create</Button>
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
                <Typography variant="p" className="  !text-nowrap max-w-56">
                  {row.date}
                </Typography>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="  !text-nowrap max-w-56">
                  {row.availabilty}
                </Typography>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="   !text-nowrap max-w-56">
                  {row?.hotel}
                </Typography>
              </td>
              <td className="px-6 py-4">
                <Typography variant="p" className="   !text-nowrap truncate">
                  {row.status}
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
