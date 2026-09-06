import { create } from "zustand";
import { getAgentByProfileId } from "@/services/agentService";
import { getProfileById } from "@/services/profileService";

export const useFilterStore = create((set) => ({
    // State variables
    province: "Any",
    city: "Any",
    propertyType: "Any",
    minPrice: "Any",
    maxPrice: "Any",
    followers: 5,

    // Functions to update the values
    changeProvince: (new_province) => set(() => ({ province: new_province, city: "Any" })),
    changeCity: (new_city) => set(() => ({city: new_city})),
    changePropertyType: (new_type) => set(() => ({propertyType: new_type})),
    changeMinPrice: (new_price) => set(() => ({minPrice: new_price})),
    changeMaxPrice: (new_price) => set(() => ({maxPrice: new_price}))
}))

export const usePropertiesStore = create((set) => ({
    // state variable
    properties: [],
  loading: false,
  error: null,

    // Functions to update state
  setProperties: (list_of_properties) => set(() => ({ properties: list_of_properties, error: null })),
  setPropertiesLoading: (loading) => set(() => ({ loading })),
  setPropertiesError: (error) => set(() => ({ error, loading: false }))
}) )


export const useAuthStore = create((set, get) => ({
    // state variable
    user: null,
    profile: null,
    agent: null,
    isHydrated: false,

    // Functions to update state (SETTERS)
    setSession: (session) => set((state) => ({
      user: session?.user ?? null,
      profile: state.user?.id === session?.user?.id ? state.profile : null,
      agent: state.user?.id === session?.user?.id ? state.agent : null,
    })),
    setUser: (user) => set({ user }),
    setProfile: (profile) => set({ profile }),
    setAgent: (agent) => set({ agent }),
    setHydrated: (isHydrated) => set({ isHydrated }),

    clear: () => set({ agent: null, user: null, profile: null }),
  
  // Functions to fetch related state
  async fetchProfile(profileId) {
    const userId = profileId ?? get().user?.id;
    if (!userId) return null;
    const { data: profiles } = await getProfileById(userId);
    const profile = profiles?.[0] ?? null;
    set({ profile });
    return profile;
  },

  async fetchAgent(profileId) {
    const userId = profileId ?? get().user?.id;
    if (!userId) return;
    const { data: agents } = await getAgentByProfileId(userId);
    set({ agent: agents?.[0] ?? null });
  },

  
     
}) )

