import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"

const Layout = () => {
  return (
    <div className="relative min-h-screen">
        <Navbar/>
        <div className="pb-24">
        <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default Layout