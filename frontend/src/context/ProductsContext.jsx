import { createContext, useContext, useState } from "react";

export const ProductsContext = createContext();

export const useProductsContext = () => {
    return useContext(ProductsContext);
}

export const ProductsContextProvider = ({children}) => {
    const [products, setProducts] = useState(null);

    return <ProductsContext.Provider value={{products, setProducts}}>
        {children}
    </ProductsContext.Provider>
}