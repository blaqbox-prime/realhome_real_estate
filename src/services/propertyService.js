import supabase from '@/lib/supabase'

export const getProperties = () => supabase.from('properties').select()

export const getLatestProperties = () =>
  supabase.from('properties').select().order('created_at', { ascending: false })

export const getPropertyById = (propertyId) =>
  supabase.from('properties').select('*').eq('id', propertyId)

export const getPropertiesByAgent = (agentId) =>
  supabase.from('properties').select().eq('agent_id', agentId)

export const createProperty = (property) =>
  supabase.from('properties').insert(property).select()

export const deleteProperty = (propertyId) =>
  supabase.from('properties').delete().eq('id', propertyId)
