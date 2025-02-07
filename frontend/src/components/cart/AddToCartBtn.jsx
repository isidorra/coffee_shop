import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import useAddToCart from "../../hooks/cart/useAddToCart";
import { LoaderIcon } from "react-hot-toast";

const AddToCartBtn = ({productId, quantity, stockQuantity}) => {
  const { authUser } = useAuthContext();
  const {loading, addToCart} = useAddToCart();

  const handleClick = async() => {
    await addToCart(productId, quantity, stockQuantity);
  }

  return (
    <>
      {authUser && (
        <button disabled={loading} onClick={handleClick} className="bg-accent text-secondary w-full p-2 uppercase">
          {loading ? <LoaderIcon/> : <span>Add to Card</span>}
        </button>
      )}

      {!authUser && (
        <Link
          to={"/sign-up"}
          className="bg-accent text-secondary w-full p-2 uppercase text-center"
        >
          Add to Cart
        </Link>
      )}
    </>
  );
};

export default AddToCartBtn;
