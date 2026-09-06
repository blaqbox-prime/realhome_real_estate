import supabase from '@/lib/supabase'

const bucket = 'pictures'

export const uploadPicture = (file, { upsert = false } = {}) =>
  supabase.storage.from(bucket).upload(`public/${file.name}`, file, {
    cacheControl: '3600',
    upsert,
  })

export const getPictureUrl = (path) =>
  supabase.storage.from(bucket).getPublicUrl(path)
