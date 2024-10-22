"use client";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { LoadingScreen } from "@/src/components/loading-screen";
import { useEffect } from "react";
import { getHotelById } from "@/src/redux/hotel-info/thunk";
import HotelProfileScreen from "@/src/screens/hotel-info/hotel-profile-screen";

const Page = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { isLoading, hotel } = useSelector((state) => state.hotelInfo.getById);
  console.log("single hotel", hotel);

  const fetchHotelProfileById = async () => {
    try {
      await dispatch(getHotelById(id)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHotelProfileById();
  }, [id]);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <HotelProfileScreen defaultValues={hotel} isEdit={true} />
  );
};

export default Page;
