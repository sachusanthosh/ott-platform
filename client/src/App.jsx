import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home/Home';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Landing from './pages/Landing/Landing';
import WatchLater from './pages/WatchLater/WatchLater';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import Signup from './pages/Signup/Signup';
import WatchHistory from './pages/WatchHistory/WatchHistory';
import Header from './components/Header/Header';
import Search from './pages/Search/Search';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import Login from './pages/Login/Login';

function App() {
  return (
    <>
      <Header/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/watch-later" element={<WatchLater />} />
        <Route path="/watch-history" element={<WatchHistory />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie-details" element={<MovieDetails />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
    </>
  );
}

export default App;