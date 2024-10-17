import PropTypes from "prop-types";

import { useFormContext, Controller } from "react-hook-form";
import UploadAvatar from "../upload/upload-avatar";

export function RHFUploadAvatar({ name, sx, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <UploadAvatar
            error={!!error}
            file={field.value}
            onChange={field.onChange}
            {...other}
          />
          {!!error && (
            <span sx={{ px: 2, textAlign: "center" }}>{error.message}</span>
          )}
        </div>
      )}
    />
  );
}

RHFUploadAvatar.propTypes = {
  name: PropTypes.string,
};
