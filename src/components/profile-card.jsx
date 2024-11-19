import React from "react";
import { ProfileAvatar, Typography } from ".";

export const ProfileCard = React.memo(({ nomad }) => {
  return (
    <div className="w-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      <div className="flex items-center p-4">
        {/* Profile Picture */}
        <div className="flex-shrink-0">
          <ProfileAvatar
            src={nomad?.profile_img}
            effect="blur"
            iconSize="!size-16"
            type={"server"}
            className="h-16 w-16 rounded-full object-cover "
          />
        </div>

        {/* Profile Info */}
        <div className="ml-4">
          <Typography
            variant="h4"
            className="text-lg font-semibold text-gray-800"
          >
            {nomad?.first_name} {nomad?.last_name}
          </Typography>
          <Typography variant="p" className="text-gray-500 text-sm">
            {nomad?.email}
          </Typography>
        </div>
      </div>
    </div>
  );
});
