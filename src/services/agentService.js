import supabase from '@/lib/supabase'

export const getAgents = () => supabase.from('agents').select('id')

export const getAgentById = (agentId) =>
  supabase.from('agents').select('*, profiles(*)').eq('id', agentId)

export const getAgentPortfolio = (agentId) =>
  supabase.from('agents').select('*, profiles(*), properties(*)').eq('id', agentId)

export const getAgentByProfileId = (profileId) =>
  supabase.from('agents').select().eq('profile_id', profileId)

export const saveAgent = (agent) =>
  supabase.from('agents').upsert(agent).select()
