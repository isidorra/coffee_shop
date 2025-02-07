import { LoaderIcon } from "react-hot-toast";
import { useOrdersContext } from "../../context/OrdersContext";
import useGetOrders from "../../hooks/order/useGetOrders";
import OrderCard from "./OrderCard";
import Pagination from "../layout/Pagination";

const CustomerOrders = () => {
  const { loading } = useGetOrders();
  const { orders, totalPages, page, setPage } = useOrdersContext();

  return (
    <div>
      {loading && <LoaderIcon />}
      {!loading && orders && orders.length === 0 && <p>No orders made.</p>}
      {!loading &&
        orders &&
        orders.map((order) => <OrderCard order={order} key={order.id} />)}

      {!loading && orders &&
        <Pagination totalPages={totalPages} currentPage={page} setCurrentPage={setPage}/>
      }
    </div>
  );
};

export default CustomerOrders;
