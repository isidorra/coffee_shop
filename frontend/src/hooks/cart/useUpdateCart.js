import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useCartContext } from "../../context/CartContext";
import toast from "react-hot-toast";

const useUpdateCart = () => {
  const [loading, setLoading] = useState(false);
  const { authUser } = useAuthContext();
  const { cartItems, setCartItems } = useCartContext();

  const updateCart = async (productId, quantity, stockQuantity) => {
    if(quantity > stockQuantity) return toast.error("Desired quantity not available.");
    setLoading(true);

    try {
      const response = await axios.put("/api/cart",{ productId: parseInt(productId), quantity: parseInt(quantity) }, {
          headers: {
            Authorization: `Bearer ${authUser.jwt}`,
          },
        }
      );

      if (response.status === 200) {
        if (quantity === 0) {
          //Remove item
          const updatedCartItems = cartItems.filter(
            (item) => item.product.id !== productId
          );
          setCartItems(updatedCartItems);
        } else {
          //Update item
          const updatedCartItems = cartItems.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          );
          setCartItems(updatedCartItems);
        }
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {loading, updateCart}
};

export default useUpdateCart;
