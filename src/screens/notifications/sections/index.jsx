"use client";

import { Breadcrumb, Notification, Pannel, Typography } from "@/src/components";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";
import { getAllNotifications } from "@/src/redux/notifications/thunk";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const NotificationsSection = () => {
  const { user } = useAuthContext();
  const dispatch = useDispatch();
  const {t} = useTranslation()
  const { notifications, isLoading } = useSelector(
    (state) => state.notifications
  );


  useEffect(() => {
    async function fetchNotifications() {
      await dispatch(getAllNotifications(user.id)).unwrap();
    }
    fetchNotifications();
  }, []);

  return (
    <Pannel className="flex flex-col gap-10">
      <Breadcrumb title={t("links.nt")} />
      <div className="flex flex-col gap-5">
        {!notifications || notifications.length === 0 ? (
          <div className="flex flex-col justify-center items-center gap-4 p-4 border border-gray-200 rounded-md shadow-sm">
            <Typography variant="h3" className="text-gray-500 text-sm">
              {t("common.noNtf")}
            </Typography>
          </div>
        ) : (
          notifications?.map((note) => <Notification note={note} />)
        )}
      </div>
    </Pannel>
  );
};

export default NotificationsSection;
