import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const ClassContext = createContext();

export const ClassProvider = ({ children }) => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchClasses = async () => {
        try {
            const token = localStorage.getItem("token");

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
        fetchClasses();

        const handleStorageChange = (e) => {
            if (e.key === "token") {
                fetchClasses();
            }
        };
        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [localStorage.getItem("token")]);

    return (
        <ClassContext.Provider value={{ classes, setClasses, loading, fetchClasses, addClass }}>
            {children}
        </ClassContext.Provider>
    );
};
