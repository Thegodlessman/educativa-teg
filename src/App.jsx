import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './views/LandingPage/LandingPage';
import ContactPage from './views/ContactPage/ContactPage';
import LoginPage from './views/LoginPage/LoginPage.jsx';
import RegisterPage from './views/RegisterPage/RegisterPage.jsx';
import ProfilePage from './views/ProfilePage/ProfilePage.jsx';
import RoleProtectedRoute from './components/RoleProtectedRoute/RoleProtectedRoute';

import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/profile"
                    element={
                        <RoleProtectedRoute allowedRoles={['Usuario', 'Estudiante', 'Profesor', 'Administrador', 'Desarrollador']}>
                            <ProfilePage />
                        </RoleProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
