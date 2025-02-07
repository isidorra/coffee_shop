import { LoaderIcon } from "react-hot-toast";
import useGetAnalytics from "../../hooks/analytics/useGetAnalytics";
import AnalyticsCard from "../../components/analytics/AnalyticsCard";
import { PiCoffeeBeanFill } from "react-icons/pi";
import { FaList } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi2";
import { BsBoxSeamFill } from "react-icons/bs";
import { MdOutlineAttachMoney } from "react-icons/md";
import BarChartProducts from "../../components/analytics/BarChartProducts";
import { useState } from "react";
import LineChartReport from "../../components/analytics/LineChartReport";

const AdminDashboard = () => {
  const { loading, analytics } = useGetAnalytics();
  const [year, setYear] = useState(new Date().getFullYear());
  return (
    <div className="p-5">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      {loading && <LoaderIcon />}
      {!loading && analytics && (
        <div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
            <AnalyticsCard
              icon={<PiCoffeeBeanFill />}
              name={"Products"}
              value={analytics.numberOfProducts}
            />
            <AnalyticsCard
              icon={<FaList />}
              name={"Categories"}
              value={analytics.numberOfCategories}
            />
            <AnalyticsCard
              icon={<HiUsers />}
              name={"Customers"}
              value={analytics.numberOfCustomers}
            />
            <AnalyticsCard
              icon={<BsBoxSeamFill />}
              name={"Delivered orders (all time)"}
              value={analytics.numberOfDeliveredOrders}
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-4 mt-5">
            <div>
              <h2 className="text-xl font-semibold mb-2">Orders</h2>
              <div className="grid grid-cols-2 gap-4">
                <AnalyticsCard
                  icon={<BsBoxSeamFill />}
                  name={"Today"}
                  value={analytics.numberOfTodayOrders}
                />
                <AnalyticsCard
                  icon={<BsBoxSeamFill />}
                  name={"This month"}
                  value={analytics.numberOfMonthOrders}
                />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Revenue ($)</h2>
              <div className="grid grid-cols-2 gap-4">
                <AnalyticsCard
                  icon={<MdOutlineAttachMoney />}
                  name={"Today"}
                  value={analytics.todayRevenue}
                />
                <AnalyticsCard
                  icon={<MdOutlineAttachMoney />}
                  name={"This month"}
                  value={analytics.monthRevenue}
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mt-16">
            <div>
              <h2 className="text-xl font-semibold mb-5 text-center">
                Sold quantities by product for this month
              </h2>
              <BarChartProducts data={analytics.soldItemsThisMonth} />
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-5 text-center">
                Sold quantities by product (all-time)
              </h2>
              <BarChartProducts data={analytics.soldItems} />
            </div>
          </div>

          <div className="mt-16">
            <div className="flex items-center gap-5 mb-10">
              <h2 className="text-xl font-semibold">Yearly Report for</h2>

              <input
                type="number"
                value={year}
                onChange={(ev) => setYear(ev.target.value)}
                min={2000}
                max={3000}
                className="bg-transparent border border-secondary/50 p-2"
              />
            </div>

            <LineChartReport year={year}/>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
