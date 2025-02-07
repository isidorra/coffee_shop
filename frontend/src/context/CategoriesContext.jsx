import { createContext, useContext, useState } from "react";

export const CategoriesContext = createContext();

export const useCategoriesContext = () => {
    return useContext(CategoriesContext);
}

export const CategoriesContextProvider = ({children}) => {
    const [categories, setCategories] = useState(null);

    return <CategoriesContext.Provider value={{categories, setCategories}}>
        {children}
    </CategoriesContext.Provider>
}