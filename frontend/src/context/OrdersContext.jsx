import { createContext, useContext, useState } from "react";

export const OrdersContext = createContext();

export const useOrdersContext = () => {
    return useContext(OrdersContext);
}

export const OrdersContextProvider = ({children}) => {
    const [orders, setOrders] = useState(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    return <OrdersContext.Provider value={{orders, setOrders, page, setPage, totalPages, setTotalPages}}>
        {children}
    </OrdersContext.Provider>
}