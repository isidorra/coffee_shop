import { FaTrashAlt } from "react-icons/fa";
import useUpdateCart from "../../hooks/cart/useUpdateCart";

const CartItem = ({ cartItem }) => {
  const { loading, updateCart } = useUpdateCart();

  const handleDecreaseQuantity = async () => {
    await updateCart(cartItem.product.id, cartItem.quantity - 1, cartItem.product.stockQuantity);
  };
  const handleIncreaseQuantity = async () => {
    await updateCart(cartItem.product.id, cartItem.quantity + 1, cartItem.product.stockQuantity);
  };
  const handleRemoveItem = async () => {
    await updateCart(cartItem.product.id, 0, cartItem.product.stockQuantity);
  };

  return (
    <div className="my-5">
      <div className="bg-secondary text-primary grid sm:grid-cols-5 items-center py-5 sm:px-10">
        <img
          src={`http://localhost:8080/uploads/${cartItem.product.image}`}
          className="w-32 mx-auto"
        />

        <p className="text-center sm:text-left">{cartItem.product.name}</p>

        <div className="my-5 sm:my-0">
          <p className="opacity-50 text-center mb-1 sm:mb-3 text-sm">Quantity</p>
          <div className="flex items-center gap-3 justify-center">
            <button
              onClick={handleDecreaseQuantity}
              disabled={loading}
              className="border border-primary py-[1px] px-3 hover:bg-primary/30 duration-200"
            >
              -
            </button>
            <p>{cartItem.quantity}</p>
            <button
              onClick={handleIncreaseQuantity}
              disabled={loading}
              className="border border-primary py-[1px] px-3 hover:bg-primary/30 duration-200"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <div>
            <p className="opacity-50 text-center mb-1 text-sm">Total</p>
            <p className="text-center">
              $ {parseFloat((cartItem.quantity * cartItem.product.price).toFixed(2))}
            </p>
          </div>
        </div>

        <button
          onClick={handleRemoveItem}
          disabled={loading}
          className="text-red-700 flex justify-end hover:opacity-50 duration-200 mx-auto my-5 sm:my-0"
        >
          <FaTrashAlt/>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
