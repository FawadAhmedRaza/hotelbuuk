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
        <div className="relative">
          <UploadAvatar
            isEdit={isEdit}
            error={!!error}
            file={field.value}
            onChange={field.onChange}
            {...other}
          />

          {!!error && (
            <span sx={{ px: 2, textAlign: "center" }} className="text-red-500">
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
