import supabase from '@/lib/supabase'

export const getProfileById = (profileId) =>
  supabase.from('profiles').select().eq('id', profileId)

export const saveProfile = (profile) =>
  supabase.from('profiles').upsert(profile).select()
