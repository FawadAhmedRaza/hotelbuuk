"use client"

import { Pannel, Typography } from "@/src/components";
import { useSearchParams } from "next/navigation";

const page = () => {
  const params = useSearchParams();
  console.log("params", params);

  return (
    <Pannel>
      <div className="flex justify-center items-center">
        <h1>Congratulations</h1>
        <Typography variant="h6">
          You have joined hotel as their internal nomad
        </Typography>
      </div>
    </Pannel>
  );
};

export default page;
