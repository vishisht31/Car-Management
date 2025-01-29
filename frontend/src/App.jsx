import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import EditCarPage from "./pages/EditCarPage";
import { useAuth } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import SingleCarPage from "./pages/SingleCarPage";

function App() {
  const { isAuthorized } = useAuth();
  return (
    // <BrowserRouter>
    <div className="min-h-screen bg-gray-900 text-white">
      <ToastContainer autoClose={3000} />

      <Header />
      <Routes>
        <Route
          path="/"
          element={
            isAuthorized() ? <HomePage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/login"
          element={isAuthorized() ? <HomePage /> : <LoginPage />}
        />
        <Route path="/signup" element={<SignupPage />} />
        {/* <Route path="/cars/new" element={<AddCarPage />} /> */}
        <Route path="/cars/edit/:id/" element={<EditCarPage />} />
        <Route path="/cars/:id" element={<SingleCarPage />} />
      </Routes>
    </div>
    // </BrowserRouter>
  );
}

export default App;
