import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthContextProvider = ({children}) => {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [profileInfo, setProfileInfo] = useState(null);

    return <AuthContext.Provider value={{authUser, setAuthUser, profileInfo, setProfileInfo}}>
        {children}
    </AuthContext.Provider>
}