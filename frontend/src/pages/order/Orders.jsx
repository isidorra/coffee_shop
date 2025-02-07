import { useOrdersContext } from "../../context/OrdersContext";
import useGetOrders from "../../hooks/order/useGetOrders";
import Pagination from "../../components/layout/Pagination";
import { format } from "date-fns";
import useUpdateStatus from "../../hooks/order/useUpdateStatus";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { LiaFileInvoiceSolid } from "react-icons/lia";

const Orders = () => {
  const { loading } = useGetOrders();
  const { orders, totalPages, page, setPage } = useOrdersContext();
  const { loadingUpdate, updateStatus } = useUpdateStatus();

  const handleUpdate = async (orderId, status) => {
    const success = await updateStatus(orderId, status);
    if (success) toast.success("Order status updated!");
  };
  return (
    <div className="py-3 px-1 sm:p-5">
      <h1 className="text-2xl font-semibold">Orders</h1>

      <table className="w-full mx-auto mt-3 sm:mt-7">
        <thead>
          <tr className="text-primary bg-secondary">
            <th className="text-xs sm:text-base font-medium p-1 text-left">Order ID</th>
            <th className="text-xs sm:text-base font-medium text-left">Created At</th>
            <th className="text-xs sm:text-base font-medium text-left">Customer</th>
            <th className="text-xs sm:text-base font-medium">Items</th>
            <th className="text-xs sm:text-base font-medium">Total Amount</th>
            <th className="text-xs sm:text-base font-medium">Status</th>
            <th className="text-xs sm:text-base font-medium">Invoice</th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            orders &&
            orders.map((order) => (
              <tr key={order.id} className="border-y border-dark-gray/20 p-1 text-xs sm:text-base">
                <td className="text-left sm:text-center">{order.id}</td>
                <td className="text-left sm:text-center">
                  {format(new Date(order.createdAt), "MMMM dd, yyyy")}
                </td>
                <td className="mx-auto flex flex-col justify-center">
                  <p>
                    <span className="font-semibold">Name:</span>{" "}
                    <span className="opacity-90">
                      {order.customerDto.firstName} {order.customerDto.lastName}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">Address:</span>{" "}
                    <span className="opacity-90">
                      {order.customerDto.address}
                    </span>
                  </p>
                  <p>
                    {order.customerDto.zipCode}, {order.customerDto.city},{" "}
                    {order.customerDto.country}
                  </p>
                  <p>
                    <span className="font-semibold">Phone Number:</span>{" "}
                    <span className="opacity-90">
                      {order.customerDto.phoneNumber}
                    </span>
                  </p>
                </td>
                <td>
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start sm:items-center justify-start gap-2"
                    >
                      <img
                        src={`http://localhost:8080/uploads/${item.product.image}`}
                        className="h-4 sm:h-16"
                      />
                      <p>
                        {item.product.name} x {item.quantity}
                      </p>
                    </div>
                  ))}
                </td>
                <td className="text-right sm:text-left">$ {parseFloat(order.totalAmount.toFixed(2))}</td>
                <td className="text-center">
                  {order.status}
                  {order.status === "PROCESSING" && (
                    <button
                      disabled={loadingUpdate}
                      onClick={() => handleUpdate(order.id, "ACCEPTED")}
                      className="block mx-auto border border-secondary p-1 mt-1"
                    >
                      Accept Order
                    </button>
                  )}
                  {order.status === "ACCEPTED" && (
                    <button
                      disabled={loadingUpdate}
                      onClick={() => handleUpdate(order.id, "DELIVERING")}
                      className="block mx-auto border border-secondary p-1 mt-1"
                    >
                      Put order on delivery
                    </button>
                  )}
                  {order.status === "DELIVERING" && (
                    <button
                      disabled={loadingUpdate}
                      onClick={() => handleUpdate(order.id, "DELIVERED")}
                      className="block mx-auto border border-secondary p-1 mt-1"
                    >
                      Order delivered
                    </button>
                  )}
                </td>
                <td>
                  {order.status !== "CANCELED" ? (
                    <Link
                      to={`/invoice/${order.id}`}
                      className="mx-auto block text-center text-2xl hover:bg-secondary/20 duration-200 w-fit"
                    >
                      <LiaFileInvoiceSolid className="mx-auto" />
                    </Link>
                  ) : (
                    <p className="text-center">-</p>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {!loading && orders && (
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          setCurrentPage={setPage}
        />
      )}
    </div>
  );
};

export default Orders;
