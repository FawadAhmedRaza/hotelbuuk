import React from "react";
import { Typography } from "./typography";

export const Breadcrumb = React.memo(
  ({ title, action, className, titleClass, ...other }) => {
    return (
      <div
        className={`flex flex-wrap  !items-center justify-between gap-2  ${className}`}
        {...other}
      >
        {/* Title */}
        {title && (
          <Typography
            variant="h3"
            className={`  ${titleClass}`}
          >
            {title}
          </Typography>
        )}

        {/* action */}
        {action && <div className=" grow flex justify-end "> {action}</div>}
      </div>
    );
  }
);
