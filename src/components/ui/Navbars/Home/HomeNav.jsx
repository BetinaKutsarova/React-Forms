import { Link } from 'react-router-dom';
import { PiPlantFill } from 'react-icons/pi';
import '../CommonNav.css';

function HomeNav() {
  return (
    <nav className="home-navbar">
      <Link to="/favorites" className="home-nav-link">
        <PiPlantFill size={24} />
      </Link>
    </nav>
  );
}

export default HomeNav;