import supabase from '@/lib/supabase'

export const getSession = () => supabase.auth.getSession()
export const signIn = (credentials) => supabase.auth.signInWithPassword(credentials)
export const signUp = (credentials) => supabase.auth.signUp(credentials)
export const signOut = () => supabase.auth.signOut()
