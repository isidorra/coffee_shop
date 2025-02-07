import { LoaderIcon } from "react-hot-toast";
import {useCartContext} from "../../context/CartContext";
import useGetCart from "../../hooks/cart/useGetCart";
import CartItem from "../../components/cart/CartItem";
import { Link } from "react-router-dom";
import { HiArrowLongRight } from "react-icons/hi2";
import { useEffect, useState } from "react";

const Cart = () => {
    const {loading}= useGetCart();
    const {cartItems} = useCartContext();
    const [total, setTotal] = useState(0);

    useEffect(() => {
      const calculateTotal = () => {
        if (!cartItems || cartItems.length === 0) {
          setTotal(0); 
          return;
        }
        
        let sum = 0;
        for(let i = 0; i<cartItems.length; i++) 
          sum += cartItems[i].quantity * cartItems[i].product.price;
  
        setTotal(sum);
      };
  
      calculateTotal();
    }, [cartItems]);

  return (
    <div className="max-container px-5 py-3">
        <div className="flex items-center justify-between mt-5">
            <h2 className="uppercase text-xl sm:text-2xl font-semibold text-dark-gray">Cart</h2>
            {!loading && cartItems && cartItems.length > 0 &&
            <Link to={"/checkout"} className="bg-secondary text-primary p-2 uppercase text-center flex items-center gap-5 hover:gap-7 duration-200">
                <span>Checkout</span>
                <HiArrowLongRight className="text-2xl"/>
            </Link>}
        </div>
        {loading && <LoaderIcon className="text-secondary"/>}
        {!loading && cartItems && cartItems.length === 0 && <p className="opacity-50 mt-3">No products added to cart.</p>}
        {!loading && cartItems && cartItems.map((cartItem) => <CartItem cartItem={cartItem} key={cartItem.id}/>)}
        <div className="flex justify-end border-t border-secondary/20 mt-5 pt-5 text-xl text-dark-gray">
          <p>Total: ${parseFloat(total.toFixed(2))}</p>
        </div>

    </div>
  )
}

export default Cart