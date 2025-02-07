import { useEffect, useState } from "react";
import { useCartContext } from "../../context/CartContext";
import useGetCart from "../../hooks/cart/useGetCart";
import { LoaderIcon } from "react-hot-toast";
import CartItem from "../../components/cart/CartItem";
import useCreateOrder from "../../hooks/order/useCreateOrder";
import { useNavigate } from "react-router-dom";
import CustomerInfo from "../../components/customer/CustomerInfo";
import useGetShippingPrice from "../../hooks/shipping/useGetShippingPrice";

const Checkout = () => {
  const { loading } = useGetCart();
  const { loadingOrderCreation, createOrder } = useCreateOrder();
  const { loadingShippingPrice, shippingPrice } = useGetShippingPrice();
  const { cartItems } = useCartContext();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const calculateTotal = () => {
      if (!cartItems || cartItems.length === 0) {
        setTotal(0);
        return;
      }

      let sum = 0;
      for (let i = 0; i < cartItems.length; i++)
        sum += cartItems[i].quantity * cartItems[i].product.price;


      setTotal(sum + shippingPrice);
    };

    calculateTotal();
  }, [cartItems, shippingPrice]);

  const handleClick = async () => {
    const success = await createOrder();
    if (success) navigate("/customer-profile");
  };

  return (
    <div className="max-container px-5 py-3">
      <h2 className="uppercase text-2xl font-semibold text-dark-gray mt-5">
        Checkout
      </h2>

      <div className="">
        <div>
          {loading && <LoaderIcon className="text-secondary" />}
          {!loading && cartItems && cartItems.length === 0 && (
            <p className="opacity-50 mt-3">No products added to cart.</p>
          )}
          {!loading &&
            cartItems &&
            cartItems.map((cartItem) => (
              <CartItem cartItem={cartItem} key={cartItem.id} />
            ))}
          <div className="border-t border-secondary/20 mt-5 pt-5">
            {!loadingShippingPrice && shippingPrice && (
              <div className="flex justify-end text-dark-gray">
              <p>Shipping: ${shippingPrice}</p>
              </div>
            )}
            <div className="flex justify-end text-dark-gray">
              <p className="text-xl">Total: ${parseFloat(total.toFixed(2))}</p>
            </div>
          </div>
        </div>
        <div>
          <CustomerInfo />
        </div>
      </div>

      <button
        disabled={loadingOrderCreation}
        onClick={handleClick}
        className="w-full bg-secondary text-primary uppercase text-lg p-2 mt-5 hover:bg-dark-gray duration-200"
      >
        {loadingOrderCreation ? <LoaderIcon /> : <span>Submit your order</span>}
      </button>
    </div>
  );
};

export default Checkout;
