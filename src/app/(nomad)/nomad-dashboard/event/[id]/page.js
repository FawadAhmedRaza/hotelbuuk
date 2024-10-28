"use client";

import { LoadingScreen } from "@/src/components/loading-screen";
import { EventStepperView } from "@/src/sections/event/stepper-view";
import axiosInstance, { endpoints } from "@/src/utils/axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [event, setEvent] = useState({});

  const fetchEvent = async () => {
    try {
      setIsLoading(true);
      const request = await axiosInstance.get(
        endpoints.nomad.event.getById(id)
      );
      setEvent(request?.data?.nomadEvent);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <EventStepperView defaultValues={event} isEdit={true} />
  );
};

export default page;
