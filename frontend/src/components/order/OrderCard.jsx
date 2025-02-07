import { format } from "date-fns";
import useCancelOrder from "../../hooks/order/useCancelOrder";
import { LoaderIcon } from "react-hot-toast";

const OrderCard = ({ order }) => {
  const {loading, cancelOrder} = useCancelOrder();

  const handleClick = async() => {
    await cancelOrder(order.id);
  }
  return (
    <div className="bg-secondary text-primary p-5 my-5">
      <div className="flex items-center justify-between mb-5 border-b border-primary/20 pb-5">
        <h2 className="text-xl font-semibold">Order #{order.id}</h2>

        {(order.status === "PROCESSING" || order.status === "ACCEPTED") && 
          <button disabled={loading} onClick={handleClick} className="text-red-600">
            {loading ? <LoaderIcon/> : <span>Cancel Order</span>}
          </button>
        }
      </div>
      <div className="grid sm:grid-cols-4 gap-4 sm:gap-0 items-start">
          <div>
            <p className="uppercase opacity-50 text-sm">Created at</p>
            <p>{format(new Date(order.createdAt), "MMMM dd, yyyy")}</p>
          </div>
          <div>
            <p className="uppercase opacity-50 text-sm">Amount</p>
            <p>$ {parseFloat(order.totalAmount.toFixed(2))}</p>
          </div>
          
          <div>
            <p className="uppercase opacity-50 text-sm">Items</p>
            <ul>
              {order.items.map((item) => (
                <li key={item.id} className="flex items-center gap-2">
                  <img src={`http://localhost:8080/uploads/${item.product.image}`} className="w-10"/>
                  <p>{item.product.name} x {item.quantity}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="uppercase opacity-50 text-sm">Status</p>
            <p>{order.status}</p>
          </div>
      </div>
      
    </div>
  );
};

export default OrderCard;
