import supabase from '@/lib/supabase'

export const getFavourite = (propertyId, profileId) =>
  supabase.from('favourites').select('*').eq('property_id', propertyId).eq('profile_id', profileId)

export const addFavourite = (propertyId, profileId) =>
  supabase.from('favourites').insert({ property_id: propertyId, profile_id: profileId })

export const removeFavourite = (propertyId, profileId) =>
  supabase.from('favourites').delete().eq('property_id', propertyId).eq('profile_id', profileId)

export const getUserFavourites = (profileId) =>
  supabase.from('favourites').select('*, properties(*)').eq('profile_id', profileId)

export const getWishlistItem = (propertyId, profileId) =>
  supabase.from('wishlist').select('*').eq('property_id', propertyId).eq('profile_id', profileId)

export const addWishlistItem = (propertyId, profileId) =>
  supabase.from('wishlist').insert({ property_id: propertyId, profile_id: profileId })

export const removeWishlistItem = (propertyId, profileId) =>
  supabase.from('wishlist').delete().eq('property_id', propertyId).eq('profile_id', profileId)

export const getUserWishlist = (profileId) =>
  supabase.from('wishlist').select('*, properties(*)').eq('profile_id', profileId)
