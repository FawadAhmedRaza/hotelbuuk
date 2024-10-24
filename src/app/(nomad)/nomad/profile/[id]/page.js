"use client"
import { NomadProfileScreen } from "@/src/screens/nomad";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getNomadProfileById } from "@/src/redux/nomad-profile/thunk";
import { LoadingScreen } from "@/src/components/loading-screen";
import { useEffect } from "react";
import NomadProfileSkeleton from "@/src/components/Skeleton/nomad-profile-skeleton";

const Page = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { isLoading, nomad } = useSelector(
    (state) => state.nomadProfile.getById
  );

  const fetchNomadProfileById = async () => {
    try {
      await dispatch(getNomadProfileById(id)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNomadProfileById();
  }, [id]);

  return isLoading ? (
    <NomadProfileSkeleton />
  ) : (
    <NomadProfileScreen defaultValues={nomad} isEdit={true} />
  );
};

export default Page;
