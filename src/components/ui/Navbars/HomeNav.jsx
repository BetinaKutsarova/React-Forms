import { Link } from 'react-router-dom';
import { LuSalad } from "react-icons/lu";
import './HomeNav.css';

function HomeNav() {
  return (
    <nav className="home-navbar">
      <Link to="/favorites" className="home-nav-link">
        <LuSalad size={24} />
      </Link>
    </nav>
  );
}

export default HomeNav;