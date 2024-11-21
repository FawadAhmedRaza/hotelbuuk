"use client";
import React, { useEffect, useMemo, useState } from "react";

// Components and Others...
import {
  RHFCheckbox,
  RHFImageSelect,
  RHFInput,
  RHFRadio,
  RHFSelect,
  RHFTextArea,
} from "@/src/components/hook-form";
import { useForm, useFormContext } from "react-hook-form";
import { Button, ProfileCard, Typography } from "@/src/components";
import { bnb_amenities } from "@/src/_mock/_popolar-amentities";
import { businessCategories } from "@/src/_mock/_business_categories";
import { hotels } from "@/src/_mock/_hotel-qna";
import { getCities, getCountries } from "@/src/libs/helper";
import { useDispatch, useSelector } from "react-redux";
import { useBoolean } from "@/src/hooks";
import { useModal } from "@/src/hooks/use-modal";
import CreateEditAmenities from "./modals/create-edit-amenities";
import { RHFLocationSelect } from "@/src/components/hook-form/rhf-location-select";
import { getRooms } from "@/src/redux/hotel-rooms/thunk";
import { RHFRoomSelect } from "@/src/components/hook-form/rhf-room-select";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";
import { BusinessMeetingSkeleton } from "@/src/components/Skeleton/business-meeting-skeleton";
import HotelSelector from "@/src/components/hotel-selector";
import RoomSelector from "@/src/components/room-selector";

export const BussinessMeeting = () => {
  const { user } = useAuthContext();
  const [location, setLocation] = useState("");
  const { watch, setValue } = useFormContext();
  const dispatch = useDispatch();
  const openAmenitiesModal = useModal();
  const hotel = watch("business_meeting.hotel_id");
  const [resetRoom, setResetRoom] = useState(false);

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  const { hotels } = useSelector((state) => state.hotelInfo);
  const { amenities } = useSelector((state) => state.eventAmenities);
  const { rooms } = useSelector((state) => state.rooms.getAllRooms);
  const { nomad, isLoading } = useSelector(
    (state) => state.nomadProfile.getById
  );
  const nomadProfile = useMemo(() => nomad, [nomad]);

  let modifiedHotelList = hotels?.map((item) => {
    return {
      hotel_name: item?.hotel_name,
      image: item?.hotel_image,
      address: item?.address,
      value: item?.id,
    };
  });

  let modifiedRoomsList = rooms?.map((item) => {
    return {
      room_name: item?.room_name,
      image: item?.room_images[0]?.img,
      price: item?.price,
      value: item?.id,
    };
  });

  console.log("Hotels Data", hotels);

  const accomodationType = watch("business_meeting.accomodation_type");

  const country = watch("business_meeting.country");
  const city = watch("business_meeting.city");
  const address = watch("business_meeting.address");
  const roomId = watch("business_meeting.room_id"); // Change key as per your form structure

  const selectedAmenities = watch("business_meeting.amenities") || [];
  const [type, setType] = useState(accomodationType);

  const handleCheckboxChange = (amenity, checked) => {
    setValue(
      "business_meeting.amenities",
      checked
        ? [...selectedAmenities, amenity] // add if checked
        : selectedAmenities.filter((selected) => selected.name !== amenity.name) // remove if unchecked
    );
  };

  useEffect(() => {
    setType(accomodationType); // Update local state when type changes
  }, [accomodationType]);

  useEffect(() => {
    async function fetchCountries() {
      const allCountries = await getCountries();
      setCountries(allCountries);
    }
    fetchCountries();
  }, []);

  useEffect(() => {
    async function fetchCities() {
      const allCities = await getCities(country);
      setCities(allCities);
    }
    fetchCities();

    cities?.map((item) => {
      if (item !== city) {
        setValue("business_meeting.city", ""); // Reset the city fie
      }
    });
  }, [country]);

  const handleChange = (detail) => {
    setValue("business_meeting.address", detail.formatted_address);
  };

  const fetchRooms = async () => {
    try {
      await dispatch(getRooms(hotel)).unwrap();
    } catch (error) {
      console.log("Error fetching rooms:", error);
    }
  };
  const fetchNomadProfileById = async () => {
    try {
      await dispatch(getNomadProfileById(user?.nomad[0].id)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNomadProfileById();
    // Reset room selection
    // setValue("business_meeting.room_id", null);

    // Fetch rooms for the selected hotel
    if (hotel) {
      fetchRooms();
    }
  }, [hotel]);

  if (isLoading) {
    return <BusinessMeetingSkeleton />;
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col  justify-between items-start gap-5 lg:gap-10 w-full h-full">
        {/* left  */}
        <div className="flex flex-col gap-5 w-full">
          <div className="flex justify-center ">
            <ProfileCard nomad={nomadProfile} />
          </div>
          <RHFInput
            name="business_meeting.title"
            label="Title"
            placeholder="Tesla Factory Tour "
          />
          <RHFInput
            name="business_meeting.official_name"
            label="Official Name"
            placeholder="John Tesla Factory Tour"
          />
          <RHFTextArea
            name="business_meeting.description"
            label="Description"
            required={true}
            placeholder="Describe your Business Tour "
          />

          <div className="flex flex-col gap-3 w-full">
            <Typography variant="h5" className="font-semibold">
              Accommodation Type (Where Guests will Sleep)
            </Typography>
            <div className="flex flex-col  gap-5 w-full">
              <div className="flex flex-col gap-1">
                <RHFRadio
                  id="hotel"
                  name="business_meeting.accomodation_type"
                  value="hotel"
                  label="Hotel"
                />
                <Typography variant="p" className="!text-xs">
                  (You partnered with local hotels to take their guests on
                  Business Tours){" "}
                </Typography>
              </div>
              <div className="flex flex-col gap-1">
                <RHFRadio
                  id="bnb"
                  name="business_meeting.accomodation_type"
                  value="bnb"
                  label="B&B"
                />
                <Typography variant="p" className="!text-xs">
                  (Business Guests stay in your B&B. You also take them on
                  Business Tours)
                </Typography>
              </div>
            </div>
          </div>

          {type === "bnb" ? (
            <>
              <div className="flex flex-col gap-3 w-full">
                <Typography variant="h5" className="font-semibold">
                  Location
                </Typography>
                <div className="flex flex-col md:flex-row gap-4  w-full">
                  <RHFSelect
                    name="business_meeting.country"
                    placeholder="Select your Country"
                    label="Country"
                    options={countries}
                  />
                  <RHFSelect
                    name="business_meeting.city"
                    placeholder="Select your City"
                    label="City"
                    options={cities}
                  />
                </div>
              </div>
              <RHFLocationSelect
                label="Street Address"
                placeholder="Address of your B&B"
                onChange={(details) =>
                  setValue(
                    "business_meeting.address",
                    details?.formatted_address
                  )
                }
              />

              <RHFTextArea
                label="About bnb"
                placeholder="Enter short details about bnb"
                name="business_meeting.about_bnb"
              />
            </>
          ) : (
            <>
              {/* <RHFImageSelect
                name="  "
                placeholder="Select Hotels"
                label="Hotels"
                className={"z-50"}
                options={modifiedHotelList}
              /> */}

              <HotelSelector hotels={hotels} />

              <RoomSelector
                rooms={rooms}
                selectedHotelId={hotel} // The selected hotel ID from the parent
                preselectedRoomId={roomId} // Preselected room ID from database
                onRoomSelect={(roomId) =>
                  setValue("business_meeting.room_id", roomId)
                }
              />

              {/* <RHFRoomSelect
                name="business_meeting.room_id"
                placeholder="Select Room"
                label="Rooms"
                hotelRooms={modifiedRoomsList}
              /> */}
            </>
          )}

          <div className="flex flex-col gap-5 ">
            <div className="flex gap-3 justify-start items-center">
              <Typography variant="h4" className="font-semibold">
                Available Amenities
              </Typography>
              <Typography
                variant="h5"
                className="font-semibold !text-gray-500 cursor-pointer"
                onClick={openAmenitiesModal.onTrue}
              >
                Add more
              </Typography>
            </div>
            <div className="grid grid-cols-1  md:grid-cols-3 gap-3 py-5 lg:py-0">
              {amenities?.map((amenity, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`amenities-${index}`}
                    checked={selectedAmenities?.some(
                      (selected) => selected?.name === amenity?.name
                    )} // check if the facility is selected
                    onChange={(e) =>
                      handleCheckboxChange(amenity, e.target.checked)
                    }
                    className="h-4 w-4 rounded-xl border border-black accent-black transition-colors duration-200"
                  />
                  <label
                    className="text-sm text-gray-700 cursor-pointer select-none font-montserrat font-medium"
                    htmlFor={`amenities-${index}`}
                  >
                    {amenity?.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Right  */}
        <div className="flex flex-col justify-between items-start gap-10 w-full h-full">
          <RHFSelect
            name="business_meeting.business_category"
            placeholder="Select Bussiness Category"
            label="Bussiness Category"
            options={businessCategories}
          />
        </div>
      </div>

      {openAmenitiesModal.onTrue && (
        <CreateEditAmenities
          isOpen={openAmenitiesModal.value}
          onClose={openAmenitiesModal.onFalse}
        />
      )}
    </div>
  );
};
