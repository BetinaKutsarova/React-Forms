import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import '../CommonNav.css';

function FavoritesNav() {
  return (
    <nav className="home-navbar">
        <Link to="/home" className="home-nav-link">
        <FaHome size={24} />
        </Link>
    </nav>
  );
}

export default FavoritesNav;