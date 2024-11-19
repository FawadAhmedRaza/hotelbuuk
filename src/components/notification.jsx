import React from "react";
import PropTypes from "prop-types";
import { cn } from "@/src/libs/cn"; // Utility for combining class names
import { Typography } from ".";

// Badge component to render status with different colors
const Badge = ({ message }) => {
  // Mapping specific messages to status
  const messageToStatusMap = {
    "Event booking Accepted": "accepted",
    "Event booking request": "pending",
    "Event booking Rejected": "rejected",
  };

  // Determine the status based on the message
  const status = messageToStatusMap[message] || "unknown";

  // Colors for each status
  const statusColors = {
    accepted: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    rejected: "bg-red-100 text-red-700",
    unknown: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={cn(
        "px-2 py-1 rounded text-sm font-semibold",
        statusColors[status]
      )}
    >
      {message}
    </span>
  );
};

Badge.propTypes = {
  message: PropTypes.string.isRequired,
};

// Main Notification Component
export const Notification = ({ note }) => {
  const date = new Date(note?.createdAt);
  return (
    <div className="flex flex-col justify-start  gap-4 p-4 border border-gray-200 rounded-md shadow-sm">
      <div className="flex justify-between items-center w-full">
        <Badge message={note?.subject} />
        <p className="text-gray-800 text-sm">{date.toDateString()}</p>
      </div>
      <div>
        <Typography variant="p" className="text-gray-800 text-sm text-start">
          {note?.message}
        </Typography>
      </div>
    </div>
  );
};

Notification.propTypes = {
  note: PropTypes.shape({
    message: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default Notification;
