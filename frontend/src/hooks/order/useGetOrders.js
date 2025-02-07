import { useEffect, useState } from "react"
import {useAuthContext} from "../../context/AuthContext";
import {useOrdersContext} from "../../context/OrdersContext";
import axios from "axios";

const useGetOrders = () => {
  const [loading, setLoading] = useState(false);
  const {authUser} = useAuthContext();
  const {setOrders, page, setTotalPages} = useOrdersContext();

  useEffect(() => {
    const getOrders = async() => {
      let url = "";
      if(authUser.role === "ADMIN")
        url = `/api/orders?size=20&page=${page}`;
      else if(authUser.role === "CUSTOMER")
        url = `/api/orders/customer?size=20&page=${page}`;
      else return;

      setLoading(true);
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${authUser.jwt}`
          }
        });

        if(response.status === 200) {
          setOrders(response.data.content);
          setTotalPages(response.data.totalPages)
        }
      } catch(error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getOrders();
  }, [authUser, setOrders, page, setTotalPages]);

  return {loading};
}

export default useGetOrders