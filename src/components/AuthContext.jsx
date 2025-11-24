import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

    const getInitialUser = () => {
        const storedUser = localStorage.getItem("authUser");
        if (!storedUser || storedUser === "undefined") return null;

        try {
            return JSON.parse(storedUser);
        } catch {
            console.error("Ошибка парсинга authUser");
            return null;
        }
    };

    const [token, setToken] = useState(localStorage.getItem("authToken"));
    const [user, setUser] = useState(getInitialUser());
    const isAuthenticated = !!token;

    const loginSuccess = (userData, userToken) => {
        setToken(userToken);
        setUser(userData);

        localStorage.setItem("authToken", userToken);
        localStorage.setItem("authUser", JSON.stringify(userData));
    };

    const register = async (email, password) => {
        try {
            const response = await fetch(
                `https://mokky.dev/projects/8793bad894280e6b/register`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                }
            );

            const data = await response.json();
            if (response.ok) {
                loginSuccess(data.user, data.token);
                return { success: true };
            }
            return { success: false, error: data.message || "Ошибка" };
        } catch {
            return { success: false, error: "Ошибка сети" };
        }
    };

    const login = async (email, password) => {
        try {
            const response = await fetch(
                `https://mokky.dev/projects/8793bad894280e6b/auth`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                }
            );

            const data = await response.json();
            if (response.ok) {
                loginSuccess(data.user, data.token);
                return { success: true };
            }

            return { success: false, error: data.message || "Ошибка" };
        } catch {
            return { success: false, error: "Ошибка сети" };
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("authToken");
        localStorage.removeItem("authUser");
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                token,
                register,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
