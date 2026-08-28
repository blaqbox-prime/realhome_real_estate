
import './App.css'
import Home from './pages/Home'

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,
//     errorElement: <ErrorPage />,
//     children: routes
//   },

// ]);

function App() {

  // const fetchAgent = useAuthStore((state) => state.fetchAgent)
  // const fetchProfile = useAuthStore((state) => state.fetchProfile)
  // const fetchUser = useAuthStore((state) => state.fetchUser)

  // useEffect(() => {
  //   const fetchAuth = async () => {
  //     const {session} = await supabase.auth.getSession()

  //     if(session){
  //       fetchUser()
  //       fetchProfile()
  //       fetchAgent()
  //     }
  //   } 
    
  //   fetchAuth()
  
  // }, [])
  

  return (
    <Home />
  // <RouterProvider router={router}/>
  )
}

export default App
