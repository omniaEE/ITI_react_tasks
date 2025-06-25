import { create } from "zustand";
import { getSingleUserAPI, getUsersAPI } from "../api/userApi";

const useUserStore = create((set) => ({
  users: [],
  user: null,
  isLoading: false,
  hasErrors: null,
  getUser: async (data) => {
    console.log("Calling getUser with:", data);
    set({ isLoading: true });
    try {
      const respose = await getSingleUserAPI(data);
      console.log("Fetched user response:", respose.data);
      if (!respose.data?.[0]) throw new Error("User not found");
      set({ user: respose.data[0], isLoading: false });
    } catch (e) {
      console.error("Error fetching user:", e);
      set({ user: null, hasErrors: e, isLoading: false });
    }
  },
  getUsers: async () => {
    set({ isLoading: true });
    try {
      const respose = await getUsersAPI();
      set({ users: respose.data, isLoading: false });
    } catch (e) {
      console.error(e, "error");
      set({ hasErrors: e, isLoading: false });
    }
  },
}));

export default useUserStore;
