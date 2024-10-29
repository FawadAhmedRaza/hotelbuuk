import PropTypes from "prop-types";

import { useFormContext, Controller } from "react-hook-form";
import UploadAvatar from "../upload/upload-avatar";
import { Iconify } from "..";

export function RHFUploadAvatar({ name, sx, isEdit, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="relative w-full">
          <UploadAvatar
            isEdit={isEdit}
            error={!!error}
            file={field.value}
            onChange={field.onChange}
            {...other}
          />

          {!!error && (
            <span className="px-2 text-red-500 !text-center items-center w-full">
              {error.message}
            </span>
          )}
        </div>
      )}
    />
  );
}

RHFUploadAvatar.propTypes = {
  name: PropTypes.string,
};
