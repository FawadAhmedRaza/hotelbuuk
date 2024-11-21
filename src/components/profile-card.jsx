import React from "react";
import { ProfileAvatar, Typography } from ".";

export const ProfileCard = React.memo(({ nomad }) => {
  return (
    <div className="flex justify-center items-center w-fit bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      <div className="flex flex-col items-center p-4">
        {/* Profile Picture */}
        <div className="flex-shrink-0">
          <ProfileAvatar
            src={nomad?.profile_img}
            effect="blur"
            iconSize="!size-16"
            type={"server"}
            className="h-28 w-28 rounded-full object-cover "
          />
        </div>

        {/* Profile Info */}
        <div className="ml-4">
          <Typography variant="h4" className="text font-semibold text-gray-800">
            {nomad?.first_name} {nomad?.last_name}
          </Typography>
          <Typography variant="p" className="text-gray-500 ">
            {nomad?.email}
          </Typography>
        </div>
      </div>
    </div>
  );
});
