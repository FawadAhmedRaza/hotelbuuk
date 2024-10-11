import React from "react";
import { Pannel, Typography } from "../components";
import { firstPara, questions_answer } from "../_mock/_privacy-policy";

export const QAContent = React.memo(() => {
  return (
    <Pannel className="capitalize">
      <Typography variant="h2" className="mb-10 font-semibold">
        Privacy Policy
      </Typography>

      <Typography variant="h5" className="!leading-[40px]">
        {firstPara}
      </Typography>

      <div className="flex flex-col gap-20 mt-24">
        {questions_answer.map((qa, index) => {
          return (
            <div key={index} className="">
              <Typography variant="h4" className=" font-semibold mb-5">
                {qa.question}
              </Typography>
              <Typography variant="h5" className=" !leading-[40px]">
                {qa.answer}
              </Typography>
            </div>
          );
        })}
      </div>
    </Pannel>
  );
});
