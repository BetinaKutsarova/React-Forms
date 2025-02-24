import { Link } from 'react-router-dom';
import './AuthNav.css';

function AuthNav() {
  return (
    <nav className="navbar">
      <Link to="/login" className="nav-link">Login</Link>
      <Link to="/register" className="nav-link">Register</Link>
    </nav>
  );
}

export default AuthNav;