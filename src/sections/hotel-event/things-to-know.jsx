"use client";
import React from "react";

import { useFormContext } from "react-hook-form";
import { useModal } from "@/src/hooks/use-modal";

import { useSelector } from "react-redux";

import CreateEditEventRules from "./modals/create-edit-event-rules";
import CreateEditEventSafetyPolicy from "./modals/create-edit-safety-policy";
import CreateEventCancellationPolicies from "./modals/create-edit-cancel-policy";

import { Typography } from "@/src/components";

export const ThingsToKnow = () => {
  const { watch, setValue } = useFormContext();

  const openRulesModal = useModal();
  const openSafetyModal = useModal();
  const openCancelPolicyModal = useModal();

  const { rules } = useSelector((state) => state.eventThings.eventRules);
  // const { safetyArr } = useSelector((state) => state.eventThings.safety);
  const { policyArr } = useSelector((state) => state.eventThings.policy);

  const selectedRules = watch("rules") || [];
  // const selectedSafeties = watch("safeties") || [];
  const selectedCancelPolicies = watch("cancelPolicies") || [];

  const handleRulesChange = (key, checked) => {
    setValue(
      "rules",
      checked
        ? [...selectedRules, key] // add item if checked
        : selectedRules.filter((selected) => selected.name !== key.name) // remove item if unchecked
    );
  };

  // const handleSafetyChange = (key, checked) => {
  //   setValue(
  //     "safeties",
  //     checked
  //       ? [...selectedSafeties, key] // add item if checked
  //       : selectedSafeties.filter((selected) => selected.name !== key.name) // remove item if unchecked
  //   );
  // };

  const handlePolicyChange = (key, checked) => {
    setValue(
      "cancelPolicies",
      checked
        ? [...selectedCancelPolicies, key] // add item if checked
        : selectedCancelPolicies.filter(
            (selected) => selected.name !== key.name
          ) // remove item if unchecked
    );
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col  justify-between items-start gap-5 lg:gap-20 w-full h-full">
        {/* left  */}
        <div className="flex flex-col gap-5 w-full">
          <div className="flex flex-col gap-5 ">
            <div className="flex gap-3 justify-start items-center">
              <Typography variant="h4" className="font-semibold">
                House Rules
              </Typography>
              <Typography
                variant="h5"
                className="font-semibold !text-gray-500 cursor-pointer"
                onClick={openRulesModal.onTrue}
              >
                Add more
              </Typography>
            </div>
            <div className="flex flex-col gap-3 py-5 lg:py-0">
              {rules?.map((rule, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    id={rule?.name}
                    type="checkbox"
                    checked={selectedRules?.some(
                      (selected) => selected?.name === rule?.name
                    )} // check if the facility is selected
                    onChange={(e) => handleRulesChange(rule, e.target.checked)}
                    className="h-4 w-4 rounded-xl border border-black accent-black transition-colors duration-200"
                  />
                  <label
                    className="text-sm text-gray-700 cursor-pointer select-none font-montserrat font-medium"
                    htmlFor={rule?.name}
                  >
                    {rule?.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Right  */}

        {/* <div className="flex flex-col justify-between items-start gap-10 w-full h-full">
          <div className="flex flex-col gap-5 ">
            <div className="flex gap-3 justify-start items-center">
              <Typography variant="h4" className="font-semibold">
                Safety and Property
              </Typography>
              <Typography
                variant="h5"
                className="font-semibold !text-gray-500 cursor-pointer"
                onClick={openSafetyModal.onTrue}
              >
                Add more
              </Typography>
            </div>
            <div className="grid grid-cols-1  md:grid-cols-3 gap-3 py-5 lg:py-0">
              {safetyArr?.map((rule, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    id={rule?.name}
                    type="checkbox"
                    checked={selectedSafeties?.some(
                      (selected) => selected?.name === rule?.name
                    )}
                    onChange={(e) => handleSafetyChange(rule, e.target.checked)}
                    className="h-4 w-4 rounded-xl border border-black accent-black transition-colors duration-200"
                  />
                  <label
                    className="text-sm text-gray-700 cursor-pointer select-none font-montserrat font-medium"
                    htmlFor={rule?.name}
                  >
                    {rule?.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div> */}

        <div className="flex flex-col gap-5 w-full">
          <div className="flex flex-col gap-5 ">
            <div className="flex gap-3 justify-start items-center">
              <Typography variant="h4" className="font-semibold">
                Cancellation policies
              </Typography>
              <Typography
                variant="h5"
                className="font-semibold !text-gray-500 cursor-pointer"
                onClick={openCancelPolicyModal.onTrue}
              >
                Add more
              </Typography>
            </div>
            <div className="flex flex-col gap-3 py-5 lg:py-0">
              {policyArr?.map((rule, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    id={rule?.name}
                    type="checkbox"
                    checked={selectedCancelPolicies?.some(
                      (selected) => selected?.name === rule?.name
                    )} // check if the facility is selected
                    onChange={(e) => handlePolicyChange(rule, e.target.checked)}
                    className="h-4 w-4 rounded-xl border border-black accent-black transition-colors duration-200"
                  />
                  <label
                    className="text-sm text-gray-700 cursor-pointer select-none font-montserrat font-medium"
                    htmlFor={rule?.name}
                  >
                    {rule?.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col lg:flex-row justify-between items-start gap-5 lg:gap-10 w-full h-full"> */}
      {/* left  */}
      {/* <div className="flex flex-col gap-5 w-full">
          <div className="flex flex-col gap-5 ">
            <div className="flex gap-3 justify-start items-center">
              <Typography variant="h4" className="font-semibold">
                Cancellation policies
              </Typography>
              <Typography
                variant="h5"
                className="font-semibold !text-gray-500 cursor-pointer"
                onClick={openCancelPolicyModal.onTrue}
              >
                Add more
              </Typography>
            </div>
            <div className="grid grid-cols-1  md:grid-cols-3 gap-3 py-5 lg:py-0">
              {policyArr?.map((rule, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    id={rule?.name}
                    type="checkbox"
                    checked={selectedCancelPolicies?.some(
                      (selected) => selected?.name === rule?.name
                    )} // check if the facility is selected
                    onChange={(e) => handlePolicyChange(rule, e.target.checked)}
                    className="h-4 w-4 rounded-xl border border-black accent-black transition-colors duration-200"
                  />
                  <label
                    className="text-sm text-gray-700 cursor-pointer select-none font-montserrat font-medium"
                    htmlFor={rule?.name}
                  >
                    {rule?.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      {/* Right  */}
      {/* <div className="flex flex-col justify-between items-start gap-10 w-full h-full"></div>
      </div> */}

      {openRulesModal.onTrue && (
        <CreateEditEventRules
          isOpen={openRulesModal.value}
          onClose={openRulesModal.onFalse}
        />
      )}

      {openSafetyModal.onTrue && (
        <CreateEditEventSafetyPolicy
          isOpen={openSafetyModal.value}
          onClose={openSafetyModal.onFalse}
        />
      )}

      {openCancelPolicyModal.onTrue && (
        <CreateEventCancellationPolicies
          isOpen={openCancelPolicyModal.value}
          onClose={openCancelPolicyModal.onFalse}
        />
      )}
    </div>
  );
};
