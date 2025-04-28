import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const ClassContext = createContext();

export const ClassProvider = ({ children }) => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const fetchClasses = async () => {
        try {
            if (!token) {
                setClasses([]);
                setLoading(false);
                return;
            }

            const decoded = jwt_decode(token);

            const response = await axios.post(
                "http://localhost:4555/room/classes",
                { id_user: decoded.id_user },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setClasses(response.data.classes || []);
        } catch (error) {
            console.error("Error fetching classes:", error);
            setClasses([]);
        } finally {
            setLoading(false);
        }
    };

    const addClass = (newClass) => {
        setClasses((prev) => [...prev, newClass]);
    };

    useEffect(() => {
        alert("buenas")
        fetchClasses();
    }, [token]);

    useEffect(() => {
        
        const handleStorageChange = (e) => {
            if (e.key === "token") {
                setToken(e.newValue);
            }
        };
        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return (
        <ClassContext.Provider value={{ classes, setClasses, loading, fetchClasses, addClass, setToken }}>
            {children}
        </ClassContext.Provider>
    );
};
