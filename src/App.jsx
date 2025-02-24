import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar/Navbar';
import Loader from './components/ui/Loader/Loader';
import './styles/common.css'

const Login = lazy(() => import('./pages/Login/Login'));
const Register = lazy(() => import('./pages/Register/Register'));
const Home = lazy(() => import('./pages/Home/home'));
const Favorites = lazy(() => import('./pages/Favorites/Favorites'));


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={< Loader />}>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App
