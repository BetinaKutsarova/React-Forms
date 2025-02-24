import { useLocation } from 'react-router-dom'
import AuthNav from '../../ui/Navbars/Auth/AuthNav'
import HomeNav from '../../ui/Navbars/Home/HomeNav';
import FavoritesNav from '../../ui/Navbars/Favorites/FavoritesNav';

function Navbar() { // this function acts as a controller to page-specific navbars as they have different styles
  const location = useLocation();
  const showAuthNav = location.pathname === '/login' || 
                          location.pathname === '/register' || 
                          location.pathname === '/';

  const showHomeNav = location.pathname === '/home'
  const showFavoritesNav = location.pathname === '/favorites'
  
  return (
    <>
      {showAuthNav && <AuthNav />}
      {showHomeNav && <HomeNav />}
      {showFavoritesNav && <FavoritesNav />}
    </>
  );
}

export default Navbar;