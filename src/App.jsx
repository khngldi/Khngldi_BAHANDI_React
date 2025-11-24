import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoute from "./components/AppRoute";
import { AuthProvider } from "./components/AuthContext";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <AppRoute />
                <Footer />
            </Router>
        </AuthProvider>
    );
}

export default App;
