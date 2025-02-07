import { Link } from "react-router-dom";
import Logout from "../auth/Logout"
import Logo from "../layout/Logo";
import { MdDashboard } from "react-icons/md";
import { PiCoffeeBeanFill } from "react-icons/pi";
import { FaList } from "react-icons/fa6";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { FaCircleUser } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";

const AdminSidebar = () => {
  return (
    <div className="min-h-screen w-[50px] sm:w-[180px] h-full border-r border-dark-gray bg-primary flex flex-col justify-between fixed p-5">
        <div className="flex flex-col gap-10">
           
              <Logo/>
           
         
        

            <div className="flex flex-col gap-3 sm:gap-1 items-center sm:items-start">
              <Link to={"/"} className="flex items-center gap-1 hover:bg-dark-gray/10 duration-200 p-1">
                <MdDashboard className="text-xl sm:text-base"/>
                <span className="hidden sm:block">Dashboard</span>
              </Link>

              <Link to={"/products"} className="flex items-center gap-1 hover:bg-dark-gray/10 duration-200 p-1">
                <PiCoffeeBeanFill className="text-xl sm:text-base"/>
                <span className="hidden sm:block">Products</span>
              </Link>

              <Link to={"/categories"} className="flex items-center gap-1 hover:bg-dark-gray/10 duration-200 p-1">
                <FaList className="text-xl sm:text-base"/>
                <span className="hidden sm:block">Categories</span>
              </Link>

              <Link to={"/orders"} className="flex items-center gap-1 hover:bg-dark-gray/10 duration-200 p-1">
                <BsFillBoxSeamFill className="text-xl sm:text-base"/>
                <span className="hidden sm:block">Orders</span>
              </Link>

              <Link to={"/settings"} className="flex items-center gap-1 hover:bg-dark-gray/10 duration-200 p-1">
                <IoMdSettings className="text-xl sm:text-base"/>
                <span className="hidden sm:block">Settings</span>
              </Link>

              <Link to={"/admin-profile"} className="flex items-center gap-1 hover:bg-dark-gray/10 duration-200 p-1">
                <FaCircleUser className="text-xl sm:text-base"/>
                <span className="hidden sm:block">Profile</span>
              </Link>
            </div>
        </div>

        <div className="text-sm sm:text-base mx-auto">
          <Logout/>
        </div>
    </div>
  )
}

export default AdminSidebar