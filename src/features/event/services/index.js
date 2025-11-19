import { useMutation, useQuery } from "@tanstack/react-query"; // ← TAMBAHKAN useMutation
import { getAllSdg, getAllEvents, addEventByAdmin } from "../hook";

export const useGetAllSdg = () => {
  return useQuery({
    queryKey: ["getAllSdg"],
    queryFn: async () => {
      const response = await getAllSdg();
      return response || [];
    },
  });
};

// Helper hook untuk format SDG options untuk react-select
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

// GET All Events
export const useGetAllEvents = () => {
  return useQuery({
    queryKey: ["getAllEvents"],
    queryFn: async () => {
      const response = await getAllEvents();
      return response || [];
    },
  });
};

// POST - Add Event
export const useAddEventByAdmin = () => {
  return useMutation({ // ← Sekarang useMutation sudah di-import
    mutationFn: (body) => {
      return addEventByAdmin(body);
    },
  });
};