import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

export const useUpdateVolunteerStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: volunteerAPI.updateStatus,
    onSuccess: () => {
      // Invalidate and refetch volunteers list
      queryClient.invalidateQueries({ queryKey: ["volunteers"] });
    },
  });
};