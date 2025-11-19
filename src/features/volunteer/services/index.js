import { useQuery } from "@tanstack/react-query";
import { getAllVolunteers } from "../hooks";

export const useGetAllVolunteers = () => {
  return useQuery({
    queryKey: ["getAllVolunteers"],
    queryFn: async () => {
      const responseGetAllVolunteers = await getAllVolunteers();
      return responseGetAllVolunteers || "";
    },
  });
};