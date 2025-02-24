import { useLocation } from 'react-router-dom'
import AuthNav from '../../ui/Navbars/AuthNav'
import HomeNav from '../../ui/Navbars/HomeNav';

function Navbar() {
  const location = useLocation();
  const showAuthButtons = location.pathname === '/login' || 
                          location.pathname === '/register' || 
                          location.pathname === '/';
  
  return (
    <>
      {showAuthButtons && <AuthNav />}
      {!showAuthButtons && <HomeNav />}
    </>
  );
}

export default Navbar;