import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useOrdersContext } from "../../context/OrdersContext";

const useUpdateStatus = () => {
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const { authUser } = useAuthContext();
  const { orders, setOrders } = useOrdersContext();

  const updateStatus = async (orderId, status) => {
    setLoadingUpdate(true);
    try {
      const response = await axios.put(
        `/api/orders/${orderId}`,
        {},
        {
          params: { orderStatus: status },
          headers: {
            Authorization: `Bearer ${authUser.jwt}`,
          },
        }
      );

      if (response.status === 200) { 
        const updatedOrders = orders.map((order) =>
            order.id === orderId ? { ...order, status } : order
        );

        setOrders(updatedOrders);
        return true;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingUpdate(false);
    }
  };

  return {loadingUpdate, updateStatus};
};

export default useUpdateStatus;
