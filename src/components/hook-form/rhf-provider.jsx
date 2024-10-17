import React from "react";
import { FormProvider } from "react-hook-form";

export const RHFFormProvider = React.memo(
  ({ children, onSubmit, methods, className }) => {
    return (
      <FormProvider {...methods}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onSubmit(event);
          }}
          autoComplete="off"
          className={`w-full  ${className}`}
        >
          {children}
        </form>
      </FormProvider>
    );
  }
);
