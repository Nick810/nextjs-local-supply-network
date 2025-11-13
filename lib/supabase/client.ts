import { createBrowserClient } from '@supabase/ssr'

// export function createClient() {
//   return createBrowserClient(
//     process.env.NEXT_PUBLUC_SUPABASE_URL!,
//     process.env.NEXT_PUBLUC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!
//   )
// }

export function createClient() {
  return createBrowserClient(
    'https://utuuhojmyfelybiqbvzz.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0dXVob2pteWZlbHliaXFidnp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3Mzc5OTAsImV4cCI6MjA3ODMxMzk5MH0.OgcHgUtrfJEkrAB1kRjXPsquGUUIH-woug-yVEWIucg'
  )
}

