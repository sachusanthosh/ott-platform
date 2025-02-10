import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState, Suspense, lazy } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Header from "./components/Header/Header";

const Home = lazy(() => import("./pages/Home/Home"));
const ProfilePage = lazy(() => import("./pages/ProfilePage/ProfilePage"));
const Landing = lazy(() => import("./pages/Landing/Landing"));
const WatchLater = lazy(() => import("./pages/WatchLater/WatchLater"));
const MovieDetails = lazy(() => import("./pages/MovieDetails/MovieDetails"));
const Signup = lazy(() => import("./pages/Signup/Signup"));
const WatchHistory = lazy(() => import("./pages/WatchHistory/WatchHistory"));
const Search = lazy(() => import("./pages/Search/Search"));
const ChangePassword = lazy(() => import("./pages/ChangePassword/ChangePassword"));
const Login = lazy(() => import("./pages/Login/Login"));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  return (
    <>
      <Header />
      {isAuthenticated && <Navbar />}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Landing />} />
          <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
          <Route path="/watch-later" element={isAuthenticated ? <WatchLater /> : <Navigate to="/login" />} />
          <Route path="/watch-history" element={isAuthenticated ? <WatchHistory /> : <Navigate to="/login" />} />
          <Route path="/search" element={isAuthenticated ? <Search /> : <Navigate to="/login" />} />
          <Route path="/movie-details" element={isAuthenticated ? <MovieDetails /> : <Navigate to="/login" />} />
          <Route path="/signup" element={isAuthenticated ? <Navigate to="/home" /> : <Signup />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
          <Route path="/change-password" element={isAuthenticated ? <ChangePassword /> : <Navigate to="/login" />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;