import PropTypes from "prop-types";

import { useFormContext, Controller } from "react-hook-form";
import UploadAvatarSquar from "../upload/upload-avatar-square";
import { Typography } from "..";

export function RHFWorkPermitUploader({
  name,
  sx,
  isEdit,
  className,
  label,
  ...other
}) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="relative w-full">
          {label && (
            <label className="text-15fs text-custom-black cursor-pointer select-none font-montserrat font-medium">
              {label}
            </label>
          )}

          <UploadAvatarSquar
            isEdit={isEdit}
            error={!!error}
            file={field.value}
            onChange={field.onChange}
            className={className}
            {...other}
          />

          {!!error && (
            <Typography
              variant="p"
              className="!text-xs text-red-400 transition-all duration-500"
            >
              {error.message}
            </Typography>
          )}
        </div>
      )}
    />
  );
}

RHFWorkPermitUploader.propTypes = {
  name: PropTypes.string,
};
