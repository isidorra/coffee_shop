import { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export const useCartContext = () => {
    return useContext(CartContext);
}

export const CartContextProvider = ({children}) => {
    const [cartItems, setCartItems] = useState(null);
    
    return <CartContext.Provider value={{cartItems, setCartItems}}>
        {children}
    </CartContext.Provider>
}