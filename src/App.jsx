import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoute from "./components/AppRoute";
import { AuthProvider, useAuth } from "./components/AuthContext";

function App() {
    return (
        <AuthProvider>
            <Router>
                <NavbarWrapper />
                <AppRoute />
                <Footer />
            </Router>
        </AuthProvider>
    );
}

function NavbarWrapper() {
    const { user } = useAuth();
    return <Navbar userEmail={user?.email} />;
}

export default App;
