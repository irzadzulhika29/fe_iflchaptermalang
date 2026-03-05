import { useMutation, useQuery } from "@tanstack/react-query"; // ← TAMBAHKAN useMutation
import { getAllSdg, getAllEvents, addEventByAdmin, editEventByAdmin, deleteEventByAdmin } from "../hook";

export const useGetAllSdg = () => {
  return useQuery({
    queryKey: ["getAllSdg"],
    queryFn: async () => {
      const response = await getAllSdg();
      return response || [];
    },
  });
};

export const useGetSdgOptions = () => {
  const { data, isLoading, error } = useGetAllSdg();
  
  const sdgOptions = data?.map((sdg) => ({
    value: sdg.id,
    label: `${sdg.code} - ${sdg.name}`,
    code: sdg.code,
    description: sdg.description,
  })) || [];
  
  return { sdgOptions, isLoading, error };
};

export const useGetAllEvents = () => {
  return useQuery({
    queryKey: ["getAllEvents"],
    queryFn: async () => {
      const response = await getAllEvents();
      return response || [];
    },
  });
};

export const useAddEventByAdmin = () => {
  return useMutation({
    mutationFn: (body) => {
      return addEventByAdmin(body);
    },
  });
};

export const useEditEventByAdmin = () => {
  return useMutation({
    mutationFn: ({ eventId, body }) => {
      return editEventByAdmin({ eventId, body });
    },
  });
};

export const useDeleteEventByAdmin = () => {
  return useMutation({
    mutationFn: deleteEventByAdmin,
  });
};