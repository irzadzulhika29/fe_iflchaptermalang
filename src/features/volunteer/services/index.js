import { useQuery, useMutation } from "@tanstack/react-query";
import { volunteerAPI } from "../api";

export const useGetAllVolunteers = () => {
  return useQuery({
    queryKey: ["volunteers"],
    queryFn: volunteerAPI.getAll,
  });
};

export const useRegisterVolunteer = () => {
  return useMutation({
    mutationFn: volunteerAPI.register,
  });
};