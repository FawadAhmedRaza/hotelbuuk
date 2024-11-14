"use client";

import { Breadcrumb, Notification, Pannel, Typography } from "@/src/components";
import NotificationSkeleton from "@/src/components/Skeleton/notification-skeleton";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";
import { getAllNotifications } from "@/src/redux/notifications/thunk";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const NotificationsSection = () => {
  const [isNoteLoading, setIsNoteLoading] = useState(true);
  const { user } = useAuthContext();
  const dispatch = useDispatch();

  const { notifications, isLoading } = useSelector(
    (state) => state.notifications
  );

  const sortedNots = [...notifications]?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  console.log("Sorted Nots", sortedNots);

  useEffect(() => {
    setIsNoteLoading(true);
    async function fetchNotifications() {
      await dispatch(getAllNotifications(user.id)).unwrap();
      setIsNoteLoading(false);
    }
    fetchNotifications();
  }, []);

  return (
    <Pannel className="flex flex-col gap-10">
      <Breadcrumb title="Notifications" />
      <div className="flex flex-col gap-5">
        {isNoteLoading ? (
          <>
            <NotificationSkeleton />
            <NotificationSkeleton />
          </>
        ) : !sortedNots || sortedNots?.length === 0 ? (
          <div className="flex flex-col justify-center items-center gap-4 p-4 border border-gray-200 rounded-md shadow-sm">
            <Typography variant="h3" className="text-gray-500 text-sm">
              No notifications available.
            </Typography>
          </div>
        ) : (
          sortedNots?.map((note) => <Notification key={note.id} note={note} />)
        )}
      </div>
    </Pannel>
  );
};

export default NotificationsSection;
