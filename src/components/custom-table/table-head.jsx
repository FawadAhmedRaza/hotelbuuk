import React from "react";
import { Typography } from "../typography";

export const TableHead = React.memo(({ TABLE_HEADER, enableSelection, onSelectAll, allSelected, selectedItems, action }) => {
  return (
    <thead className="bg-primary h-16 sticky top-0 z-10 backdrop-blur-md ">
      <tr>
        {enableSelection && (
          <th scope="col" className="px-6 text-left font-medium text-white tracking-wider">
            {/* <Checkbox
              checked={allSelected}
              onChange={onSelectAll}
            /> */}
            #
          </th>
        )}
        {
          TABLE_HEADER?.map((headerItem) => (
            <th
              scope="col"
              key={headerItem?.id}
              className="px-6 text-left  tracking-wider"
            >
              <Typography variant="p" className=" whitespace-nowrap font-medium text-white">
                {headerItem?.label}
              </Typography>
            </th>
          ))
        }
      </tr>
    </thead>
  );
})
