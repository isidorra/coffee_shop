import { Outlet } from "react-router-dom"
import AdminSidebar from "./AdminSidebar"

const AdminLayout = () => {
  return (
    <div className="">
        <AdminSidebar/>
        <div className="flex-1 pl-[50px] sm:pl-[180px]">
          <Outlet/>
        </div>
    </div>
  )
}

export default AdminLayout