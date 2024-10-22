"use client";
import React, { useState, useEffect } from "react";

// Components and Others...
import { TableHead } from "./table-head";
import { Iconify } from "../iconify";

export const CustomTable = React.memo(
  ({
    items,
    enableSelection = false,
    renderRow,
    TABLE_HEADER,
    isLoading = false,
    onCheckBoxChange,
    className,
    action,
  }) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
      setSelectAll(
        items?.length > 0 && selectedItems?.length === items?.length
      );
    }, [selectedItems, items]);

    const handleSelectItem = (itemId, row) => {
      const isDuplicate = selectedItems?.includes(row?.id);
      if (!isDuplicate) {
        onCheckBoxChange(row);
      }

      setSelectedItems((prevSelected) => {
        const isSelected = prevSelected.includes(itemId);
        const newSelected = isSelected
          ? prevSelected?.filter((id) => id !== itemId)
          : [...prevSelected, itemId];
        return newSelected;
      });
    };

    const handleSelectAll = () => {
      if (selectAll) {
        setSelectedItems([]);
      } else {
        setSelectedItems(items?.map((item) => item?.id));
        onCheckBoxChange(items);
      }
    };

    return (
      <div
        className={`relative overflow-x-auto hide-scrollbar w-full  ${className}`}
      >
        <table className="min-w-full table-auto rtl:text-right divide-y divide-dashed divide-gray-200   rounded-t-xl overflow-hidden ">
          <TableHead
            enableSelection={enableSelection}
            onSelectAll={handleSelectAll}
            selectedItems={selectedItems}
            allSelected={selectAll}
            TABLE_HEADER={TABLE_HEADER}
            action={action}
          />
          <tbody className="divide-y divide-gray-200 divide-dashed  ">
            {isLoading ? (
              <tr>
                <td colSpan={TABLE_HEADER?.length} className="text-center py-5">
                  <div className=" flex items-center justify-center gap-2 py-2 w-full">
                    <Iconify
                      iconName="eos-icons:loading"
                      className="animate-spin"
                    />
                    loading....
                  </div>
                </td>
              </tr>
            ) : items?.length > 0 ? (
              items.map((row) => {
                return (
                  <tr
                    key={row.id}
                    className={`h-16 ${
                      selectedItems.includes(row.id)
                        ? "text-primary bg-custom-grey"
                        : "odd:bg-white even:bg-tertiary"
                    }`}
                  >
                    {/* {enableSelection && (
                    <td className="px-6 py-4">
                      <CustomCheckbox
                        checked={selectedItems.includes(row?.id)}
                        onChange={() => {
                          handleSelectItem(row?.id, row);
                        }}
                      />
                    </td>
                  )} */}
                    {renderRow(
                      row,
                      handleSelectItem,
                      onCheckBoxChange,
                      selectedItems
                    ) || null}
                  </tr>
                );
              })
            ) : (
              <tr className="text-center !my-5">
                <td
                  colSpan={(enableSelection ? 1 : 0) + TABLE_HEADER?.length}
                  className="text-center !my-5"
                >
                  <div className="py-2 bg-gray-200 font-medium w-full ">
                    No Entries Found
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
);
