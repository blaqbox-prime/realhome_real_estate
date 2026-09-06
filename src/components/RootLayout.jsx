import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from '@/sections/Footer'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import supabase from '@/lib/supabase'
import { useAuthStore } from '@/zustand/store'

import 'react-toastify/dist/ReactToastify.css';

function RootLayout() {
  const setSession = useAuthStore((state) => state.setSession)
  const setHydrated = useAuthStore((state) => state.setHydrated)
  const fetchProfile = useAuthStore((state) => state.fetchProfile)
  const fetchAgent = useAuthStore((state) => state.fetchAgent)

  useEffect(() => {
    let mounted = true

    const syncSession = async (session) => {
      setSession(session)

      if (session?.user) {
        await Promise.all([
          fetchProfile(session.user.id),
          fetchAgent(session.user.id),
        ])
      }

      if (mounted) setHydrated(true)
    }

    supabase.auth.getSession().then(({ data }) => syncSession(data.session))
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      syncSession(session)
    })

    return () => {
      mounted = false
      authListener.subscription.unsubscribe()
    }
  }, [fetchAgent, fetchProfile, setHydrated, setSession])

  return (
    <div>
        {/* NAV */}
        <Navbar />


        {/* PAGES */}
        <Outlet /> 
        
        
        {/* FOOTER */}
        <Footer />
        <ToastContainer position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
transition="Bounce"/>
    </div>
  )
}

export default RootLayout