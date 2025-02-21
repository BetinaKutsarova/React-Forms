import { useLocation } from 'react-router-dom'
import AuthButtons from '../../ui/Navbars/AuthNav'
import './Navbar.css'

function Navbar() {
  const location = useLocation();
  const showAuthButtons = location.pathname === '/login' || 
                          location.pathname === '/register' || 
                          location.pathname === '/';
  
  return (
    <nav className="navbar">
      {showAuthButtons && <AuthButtons />}

      {/* {!showAuthButtons && (
        <div
        </div>
      )} */}

    </nav>
  );
}

export default Navbar;